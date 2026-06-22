#!/usr/bin/env python3
"""
Transform neighborhoods.js into a full ES module with:
- Computed slug field
- Normalized scores (all 0-100)
- New fields: floodZone, noiseComplaintsPer1000, commuteTimes
"""

import re, json, sys, os

COMMUTE_DEFAULTS = {
    "Chelsea": [15, 20, 30, 25, 60],
    "Upper East Side": [20, 40, 50, 35, 65],
    "Midtown West/Hell's Kitchen": [5, 25, 35, 30, 55],
    "Tribeca": [20, 10, 20, 35, 65],
    "Midtown East/Turtle Bay": [10, 30, 40, 28, 58],
    "East Village": [25, 25, 35, 35, 65],
    "Lower East Side": [25, 20, 30, 40, 65],
    "West Village/Greenwich Village": [20, 20, 30, 35, 65],
    "Chinatown/Little Italy": [25, 15, 25, 40, 65],
    "Financial District/Battery Park City": [30, 5, 20, 40, 70],
    "SoHo/NoHo": [20, 15, 25, 35, 65],
    "Upper West Side (59th-86th)": [20, 40, 50, 35, 65],
    "Upper West Side (86th-110th)": [25, 45, 55, 40, 70],
    "Gramercy/Stuyvesant Town": [20, 25, 35, 30, 60],
    "Williamsburg (north)/Greenpoint": [35, 45, 25, 25, 65],
    "Park Slope": [40, 45, 25, 40, 65],
    "Prospect Heights": [40, 45, 25, 40, 65],
    "Boerum Hill": [35, 35, 20, 40, 65],
    "Brooklyn Heights": [35, 30, 15, 40, 65],
    "Downtown Brooklyn": [35, 30, 5, 35, 60],
    "Cobble Hill": [35, 35, 20, 40, 65],
    "Carroll Gardens": [35, 35, 20, 40, 65],
    "DUMBO/Vinegar Hill": [35, 30, 15, 35, 65],
    "Fort Greene": [35, 40, 20, 35, 65],
    "Clinton Hill": [35, 40, 20, 35, 65],
    "Williamsburg (waterfront/south)": [30, 40, 25, 25, 60],
    "East Williamsburg": [35, 45, 30, 30, 60],
    "Bushwick": [40, 50, 35, 35, 55],
    "Ridgewood": [40, 50, 40, 35, 55],
    "Gowanus": [40, 40, 25, 40, 65],
    "Red Hook": [45, 40, 25, 45, 70],
    "Greenwood Heights": [40, 45, 30, 40, 65],
    "Sunset Park": [40, 45, 30, 40, 60],
    "Bay Ridge": [55, 55, 40, 55, 65],
    "Dyker Heights": [55, 55, 40, 55, 65],
    "Bensonhurst": [55, 60, 45, 55, 65],
    "Borough Park": [55, 60, 40, 55, 65],
    "Midwood": [55, 60, 45, 55, 60],
    "Kensington": [50, 55, 40, 50, 60],
    "East Flatbush": [55, 60, 40, 55, 60],
    "Flatbush/Ditmas Park": [50, 55, 35, 50, 60],
    "Prospect-Lefferts Gardens": [45, 50, 30, 45, 60],
    "Canarsie": [60, 65, 45, 60, 55],
    "East New York": [55, 60, 40, 50, 55],
    "Brownsville": [55, 60, 40, 50, 55],
    "Sheepshead Bay": [60, 65, 50, 60, 60],
    "Brighton Beach": [65, 70, 55, 65, 60],
    "Coney Island": [65, 70, 55, 65, 60],
    "Gravesend": [60, 65, 50, 60, 60],
    "Windsor Terrace": [40, 45, 30, 40, 65],
    "Mill Basin/Marine Park": [65, 70, 50, 60, 55],
    "Crown Heights (West of Franklin)": [40, 50, 30, 40, 60],
    "Crown Heights (East of Franklin)": [45, 55, 35, 45, 65],
    "Bed-Stuy (East of Nostrand)": [45, 55, 35, 40, 65],
    "Bedford-Stuyvesant (West of Nostrand)": [40, 50, 30, 35, 60],
    "Astoria": [35, 50, 45, 25, 55],
    "Ditmars-Steinway": [35, 50, 45, 25, 55],
    "Long Island City (waterfront)": [25, 40, 35, 5, 50],
    "Long Island City (interior)": [25, 40, 35, 5, 50],
    "Jackson Heights": [40, 55, 50, 30, 45],
    "Elmhurst": [40, 55, 50, 30, 45],
    "Corona": [40, 55, 50, 30, 45],
    "Flushing": [45, 60, 55, 35, 40],
    "Forest Hills": [40, 55, 50, 35, 45],
    "Rego Park": [40, 55, 50, 35, 45],
    "Kew Gardens": [40, 55, 50, 35, 40],
    "Jamaica": [50, 65, 60, 45, 30],
    "Woodside": [35, 50, 45, 25, 50],
    "Maspeth": [45, 60, 50, 35, 50],
    "Middle Village": [45, 60, 55, 40, 50],
    "Glendale": [45, 60, 55, 40, 50],
    "Woodhaven": [50, 65, 60, 45, 45],
    "Richmond Hill": [50, 65, 60, 45, 45],
    "South Jamaica": [55, 70, 65, 50, 35],
    "Ozone Park": [50, 65, 60, 45, 40],
    "Howard Beach": [55, 70, 65, 50, 30],
    "East Elmhurst": [35, 50, 45, 25, 50],
    "Briarwood": [45, 60, 55, 40, 40],
    "Bayside": [50, 65, 60, 45, 45],
    "Fresh Meadows": [50, 65, 60, 45, 45],
    "Douglaston/Little Neck": [55, 70, 65, 50, 50],
    "Riverdale": [50, 70, 75, 65, 80],
    "Fordham": [40, 60, 65, 55, 70],
    "Morris Park": [45, 65, 70, 60, 70],
    "Tremont": [40, 60, 65, 55, 70],
    "Highbridge/Concourse": [35, 55, 60, 50, 70],
    "Kingsbridge": [45, 65, 70, 60, 75],
    "Mott Haven": [30, 50, 55, 45, 65],
    "Hunts Point": [40, 60, 60, 50, 65],
    "Woodlawn": [50, 70, 75, 65, 80],
    "Pelham Bay": [55, 75, 80, 70, 75],
    "Morrisania": [35, 55, 60, 50, 65],
    "Throgs Neck": [60, 80, 80, 70, 75],
    "Great Kills/Eltingville": [70, 80, 80, 80, 80],
    "New Dorp/Midland Beach": [70, 80, 80, 80, 80],
    "New Springville/Bulls Head": [70, 80, 80, 80, 80],
    "Hamilton Heights/Sugar Hill": [35, 55, 65, 50, 80],
    "Washington Heights (South/155th-179th)": [40, 60, 70, 55, 80],
    "Washington Heights (North/Hudson Heights)": [45, 65, 75, 60, 85],
    "Inwood": [50, 70, 80, 65, 90],
    "Central Harlem (South/110th-127th)": [25, 45, 55, 40, 70],
    "Central Harlem (North/127th-155th)": [30, 50, 60, 45, 75],
    "East Harlem (South/96th-115th)": [25, 45, 55, 40, 70],
    "East Harlem (North/115th-125th)": [30, 50, 60, 45, 75],
    "Morningside Heights": [30, 50, 60, 45, 75],
}

NOISE_DEFAULTS = {
    # noise complaints per 1,000 residents
    # TODO: Replace with NYC Open Data 311 API
    "Chelsea": 42, "Upper East Side": 28, "Midtown West/Hell's Kitchen": 65,
    "East Village": 78, "Lower East Side": 82, "West Village/Greenwich Village": 55,
    "Bushwick": 88, "Williamsburg (north)/Greenpoint": 72, "Astoria": 48,
    "Park Slope": 32, "Brooklyn Heights": 24, "Tribeca": 30,
    "Financial District/Battery Park City": 35, "Chinatown/Little Italy": 60,
    "SoHo/NoHo": 45, "Upper West Side (59th-86th)": 38,
    "Gramercy/Stuyvesant Town": 40, "Long Island City (waterfront)": 52,
    "Williamsburg (waterfront/south)": 76, "Mott Haven": 70,
    "Hunts Point": 68, "East Harlem (South/96th-115th)": 65,
    "Central Harlem (South/110th-127th)": 60, "Crown Heights (West of Franklin)": 55,
    "Flatbush/Ditmas Park": 48, "Flushing": 52, "Jackson Heights": 58,
    "Red Hook": 45, "Sunset Park": 48, "Forest Hills": 30, "Riverdale": 22,
}

FLOOD_ZONES = {
    # TODO: Replace with real FEMA flood data
    "Red Hook": True, "Coney Island": True, "Brighton Beach": True,
    "Howard Beach": True, "Mill Basin/Marine Park": True,
}

def make_slug(name):
    s = name.lower()
    s = re.sub(r"['/\u2019]", '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def safe_float(v, default=0.0):
    if v is None or v == '': return default
    try: return float(v)
    except: return default

def get_commute(name):
    times = COMMUTE_DEFAULTS.get(name, [45, 55, 55, 50, 60])
    return {"midtown": times[0], "fidi": times[1], "downtownBklyn": times[2],
            "lic": times[3], "jfk": times[4]}

# Read source
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src_path = os.path.join(base, 'data', 'neighborhoods.js')
with open(src_path, 'r') as f:
    src = f.read()

src = src.strip()
src = re.sub(r'^const NEIGHBORHOODS\s*=\s*', '', src)
src = re.sub(r';\s*$', '', src)
src = re.sub(r',(\s*[}\]])', r'\1', src)
data = json.loads(src)
print(f'Parsed {len(data)} neighborhoods', file=sys.stderr)

out_entries = []
for n in data:
    name = n.get('Neighborhood', '')
    slug = make_slug(name)
    safety = round(safe_float(n.get('Safety Score (/10)'), 5.0) * 10, 1)
    sketchy = round(safe_float(n.get('Avg Subway Sketchy Index'), 30.0), 1)
    tc = n.get('Transit Crime per 1K')

    entry = {
        "slug": slug,
        "name": name,
        "borough": n.get('Borough', ''),
        "precinct": n.get('Precinct(s)', None),
        "studioRentRange": n.get('Studio Rent Range', '') or '',
        "rent1BR": n.get('1 Bedroom Rent Range', '') or '',
        "rent2BR": n.get('2 Bedroom Rent Range', '') or '',
        "mapColor": n.get('Map Color', '') or '',
        # Normalized 0-100 scores
        # safetyScore: original /10 -> *10 = 0-100
        "safetyScore": safety,
        "crimePerK": safe_float(n.get('Crime per 1K'), None) if n.get('Crime per 1K', '') != '' else None,
        "transitCrimePerK": safe_float(tc, None) if tc and tc != '' else None,
        "subwaySketchyIndex": sketchy,
        "schoolScore": safe_float(n.get('School Quality Score'), None) if n.get('School Quality Score', '') != '' else None,
        "transitScore": safe_float(n.get('Transit Access Score'), None) if n.get('Transit Access Score', '') != '' else None,
        "walkScore": safe_float(n.get('Walk Score'), None) if n.get('Walk Score', '') != '' else None,
        "bikeScore": safe_float(n.get('Bike Score'), None) if n.get('Bike Score', '') != '' else None,
        "stationsInArea": int(safe_float(n.get('# Stations in Area'), 0)),
        # Density scores: raw 1-5 -> *20 = 0-100
        "restaurantDensity": int(safe_float(n.get('Restaurant Density'), 0) * 20),
        "nightlifeScore": int(safe_float(n.get('Nightlife/Social Score'), 0) * 20),
        "medicalDensity": int(safe_float(n.get('Medical Needs Density'), 0) * 20),
        "groceryScore": int(safe_float(n.get('Grocery Store Density'), 0) * 20),
        "parkScore": int(safe_float(n.get('Park Access Score'), 0) * 20),
        "medianIncome": n.get('Median Household Income', '') or '',
        "medianAge": safe_float(n.get('Median Age'), None) if n.get('Median Age', '') != '' else None,
        "nychaHighCrimeNearby": int(safe_float(n.get('NYCHA High-Crime Dev Nearby'), 0)),
        "livabilityScore": round(safe_float(n.get('Composite Livability Score'), 0), 2),
        "notes": n.get('Notes', '') or '',
        # New fields
        "floodZone": FLOOD_ZONES.get(name, False),
        "noiseComplaintsPer1000": NOISE_DEFAULTS.get(name, 45),
        "commuteTimes": get_commute(name),
    }
    out_entries.append(entry)

# Render JS
lines = []
lines.append('/**')
lines.append(' * NYC Livability Index — Neighborhoods Data')
lines.append(' *')
lines.append(' * Field documentation (all numeric scores are 0-100 scale):')
lines.append(' *   slug              — URL-safe identifier (e.g. "bushwick")')
lines.append(' *   name              — Display name')
lines.append(' *   borough           — Manhattan | Brooklyn | Queens | Bronx | Staten Island')
lines.append(' *   safetyScore       — 0-100 (source: /10 scale * 10)')
lines.append(' *   transitScore      — 0-100 (direct from data)')
lines.append(' *   walkScore         — 0-100 (Walk Score)')
lines.append(' *   bikeScore         — 0-100 (Bike Score)')
lines.append(' *   schoolScore       — 0-100 (NYC school quality)')
lines.append(' *   nightlifeScore    — 0-100 (source: 1-5 scale * 20)')
lines.append(' *   groceryScore      — 0-100 (source: 1-5 scale * 20)')
lines.append(' *   parkScore         — 0-100 (source: 1-5 scale * 20)')
lines.append(' *   restaurantDensity — 0-100 (source: 1-5 scale * 20)')
lines.append(' *   medicalDensity    — 0-100 (source: 1-5 scale * 20)')
lines.append(' *   subwaySketchyIndex— 0-100 (higher = sketchier; methodology: [To be provided])')
lines.append(' *   livabilityScore   — 0-100 (composite pre-computed; methodology coming soon)')
lines.append(' *   floodZone         — boolean (TODO: Replace with real FEMA flood data)')
lines.append(' *   noiseComplaintsPer1000 — number (TODO: Replace with NYC Open Data 311 API)')
lines.append(' *   commuteTimes      — {midtown, fidi, downtownBklyn, lic, jfk} in minutes')
lines.append(' *                       (TODO: Replace with real MTA data)')
lines.append(' *')
lines.append(f' * @last-updated 2026-04-21')
lines.append(' */')
lines.append('')
lines.append("export const DATA_LAST_UPDATED = '2026-04-21';")
lines.append('')
lines.append('export const neighborhoods = [')

for i, entry in enumerate(out_entries):
    comma = ',' if i < len(out_entries) - 1 else ''
    lines.append('  ' + json.dumps(entry, ensure_ascii=False) + comma)

lines.append('];')
lines.append('')
lines.append('// Data validation — runs on module load')
lines.append('(function validateData() {')
lines.append('  const required = ["slug","name","borough","safetyScore","transitScore","walkScore","livabilityScore"];')
lines.append('  const scoreFields = ["safetyScore","transitScore","walkScore","bikeScore","schoolScore","nightlifeScore","groceryScore","parkScore"];')
lines.append('  neighborhoods.forEach(n => {')
lines.append('    required.forEach(f => {')
lines.append('      if (n[f] == null) console.error(`[Data] ${n.name}: missing required field "${f}"`);')
lines.append('    });')
lines.append('    scoreFields.forEach(f => {')
lines.append('      const v = n[f];')
lines.append('      if (v != null && (v < 0 || v > 100)) console.error(`[Data] ${n.name}: ${f}=${v} out of 0-100 range`);')
lines.append('    });')
lines.append('  });')
lines.append('})();')
lines.append('')

out_path = os.path.join(base, 'data', 'neighborhoods.js')
with open(out_path, 'w') as f:
    f.write('\n'.join(lines))

print(f'Written {len(out_entries)} neighborhoods to {out_path}', file=sys.stderr)
print('DONE')
