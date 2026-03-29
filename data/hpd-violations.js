const HPD_VIOLATIONS = [
  {
    "Code": "004",
    "Statute": "\u00a7 213",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An interior room is being used as living space but doesn't have a window to the outside or a large enough opening to a room that does. Basically, someone's bedroom or living room has no air or natural light.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "006",
    "Statute": "\u00a7 36, 66, 67, 178, 217",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Windows, vents, or skylights are blocked or wrapped up, preventing proper airflow. The building isn't getting the ventilation it needs.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "007",
    "Statute": "\u00a7 178, 217",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The stairwell doesn't have the required fixed ventilation opening (at least 40 sq. inches) at the top. Stairwells need airflow, especially for smoke evacuation in fires.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "008",
    "Statute": "\u00a7 178, 217",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "There's no ventilating skylight over the stairwell. Required so heat and smoke can escape upward in an emergency.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "010",
    "Statute": "\u00a7 178, 217",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The skylight ventilation is missing or inadequate \u2014 needs at least 40 sq. inches of openable area for airflow.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "011",
    "Statute": "\u00a7 178, 217",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A dome light under a skylight is blocking the light and air from reaching the stairwell below. It needs to be removed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "030",
    "Statute": "\u00a7 78",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A floor that should be paved with concrete isn't \u2014 likely a cellar or basement with a dirt or broken floor, which can attract pests and moisture.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "051",
    "Statute": "\u00a7 12",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Combustible materials (things that can catch fire) are being stored unsafely in the building \u2014 a serious fire hazard.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "057",
    "Statute": "\u00a7 12",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something illegal is being kept on the premises \u2014 could be animals, hazardous materials, or other prohibited items.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "065",
    "Statute": "\u00a7 66",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building is being used as a lodging house (like a hostel or rooming house) without the proper certificate of occupancy. This means it hasn't been approved as safe for that kind of use.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "069",
    "Statute": "\u00a7 61",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Part of the building is being used in a way it wasn't approved for, and there's no certificate of occupancy on file. The use must stop until proper approvals are obtained.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "072",
    "Statute": "\u00a7 61",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A manufacturing business is operating in what should be a residential building. This is illegal and potentially dangerous.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "080",
    "Statute": "\u00a7 231",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The building doesn't have a legally required second way out (second means of egress). In a fire, residents could be trapped. This is an emergency-level safety issue.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "081",
    "Statute": "\u00a7 187",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The building needs either a sprinkler system or a second way out and has neither. Extremely dangerous fire safety deficiency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "081B",
    "Statute": "\u00a7 194",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Sprinkler heads are missing in rooms that require them (Class B occupancy rooms, like SROs or rooming houses).",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "084",
    "Statute": "\u00a7 67",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A printed floor plan showing how to exit the building isn't posted where it should be. Residents and visitors need to see escape routes.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "106",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The fire escape drop ladder (the one that slides down to street level) isn't properly secured at the bottom. It might not work when you need it most.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "109",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The fire escape drop ladder is missing a stop at the top of the guide rods, so it could be accidentally removed entirely.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "118",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Part of the fire escape structure isn't properly braced \u2014 it could be unstable or wobbly.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "121",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A fire escape component needs to be spliced with a proper plate \u2014 structural integrity issue.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "135",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An unnecessary opening in the fire escape area needs to be closed for safety.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "142",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A fire escape balcony isn't properly supported with tie rods or suspension rods. It could collapse under weight.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "159",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There are no guardrails around a rooftop skylight near the fire escape path. Someone could fall through the skylight.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "160",
    "Statute": "\u00a7 62, 187, 231",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The roof area near the fire escape exit (bulkhead or scuttle) lacks guardrails or parapet walls. Fall hazard.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "176",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's no way to get from the backyard to the street \u2014 residents escaping via rear fire escapes would be trapped in the yard.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "181",
    "Statute": "\u00a7 53, 187, 231",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "No fireproof passageway connects the rear fire escapes to the street. In a fire, people coming down the back fire escape have no safe route out.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "188",
    "Statute": "\u00a7 185, 240",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The cellar ceiling isn't properly fire-retarded. Fire could spread quickly from the cellar to floors above.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "208",
    "Statute": "\u00a7 66, 67, 104, 147, 188, 233",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The scuttle cover (roof access hatch) doesn't have proper hinges, making roof access for emergencies unreliable.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "209",
    "Statute": "\u00a7 233",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A closet door is blocking the path to the roof scuttle. Needs to be removed so residents can reach the roof in an emergency.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "213",
    "Statute": "\u00a7 61",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An opening between a store and the public hallway isn't sealed with fire-resistant material or a self-closing fire door. Fire could spread from the store into residential areas.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "214",
    "Statute": "\u00a7 189",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A window (sash) in the wall between a room and the public hallway needs to be removed and the opening sealed. This is a fire spread risk.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "219",
    "Statute": "\u00a7 190",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The stairs have open spaces between the treads (steps). This is a trip/fall hazard, especially for children.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "222",
    "Statute": "\u00a7 242",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The cellar stairs don't have a proper fire-rated enclosure with self-closing doors at top and bottom. Fire and smoke from the cellar could fill the building.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "225",
    "Statute": "\u00a7 51",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The elevator shaft isn't properly enclosed. This is a fire safety issue \u2014 shafts act like chimneys during fires.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "226",
    "Statute": "\u00a7 65",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The central heating plant (boiler room) isn't properly enclosed. Fire or carbon monoxide could escape into living areas.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "230",
    "Statute": "\u00a7 192",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There's no independent entrance from outside to the cellar. Required for fire department access and emergency egress.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "462",
    "Statute": "\u00a7 212",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A door or window to the fire escape can't be opened easily, blocking access to the escape route.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "464",
    "Statute": "\u00a7 212",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The fire escape is missing the iron ladder that should go from the lowest window down to the ground.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "483",
    "Statute": "\u00a7 62",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A TV or radio antenna is improperly installed \u2014 too low or attached to the fire escape or vent pipe, creating a hazard.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "484",
    "Statute": "\u00a7 329",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building's certificate of inspection visits isn't posted near the mailboxes in a proper frame as required.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "485",
    "Statute": "\u00a7 329",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The inspection certificate isn't posted in an accessible spot for the inspector to sign.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "491",
    "Statute": "\u00a7 300",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An unauthorized alteration was made to the building. It needs to either be legalized with plans and permits or restored to its original legal condition.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "494",
    "Statute": "\u00a7 4, 8, 25, 67",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building is actually a multiple dwelling (apartments) but is classified as something else. Needs to file for proper certificate of occupancy.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "495",
    "Statute": "\u00a7 300, 301, 302",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Illegal alterations were made. Must file plans and get a certificate of occupancy to legalize them, or undo the changes.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "500",
    "Statute": "\u00a7 26-1103",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The landlord hasn't posted the required notice (in English and Spanish) about the availability of HPD's housing information guide.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "501",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something in the apartment or building is broken or defective and needs to be properly repaired. This is a general repair violation.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "502",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something is broken and needs to be repaired with matching material (e.g., a tile replaced with the same kind of tile).",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "503",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's a structural defect that makes the building unsafe \u2014 could be a cracked beam, failing wall, or sagging floor. Dangerous.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "504",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something required is missing and needs to be provided (general \u2014 could be a fixture, guard, or fitting).",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "505",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something is broken beyond repair and needs to be replaced entirely with a new one.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "506",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A required item is completely missing and must be replaced with a new one.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "507",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The roof is leaking. Water intrusion can cause mold, structural damage, and electrical hazards.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "508",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Plaster on the walls or ceiling is broken or cracked and needs to be repaired and painted.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "509",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something is loose and needs to be properly secured \u2014 could be a railing, fixture, or structural element.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "510",
    "Statute": "\u00a7 27-2005 & \u00a7 309",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A nuisance condition exists that must be abated. This is a catch-all for hazardous conditions (odors, unsanitary situations, etc.).",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "511",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A gas appliance is leaking carbon monoxide \u2014 an invisible, odorless, deadly gas. Extremely dangerous, life-threatening.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "512",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Part of the fire escape is broken, defective, or missing. Your emergency exit route may not be safe to use.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "513",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The fire escape drop ladder is stuck and won't slide down properly in the guide rods.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "514",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Part of the fire escape isn't properly secured \u2014 bolts, brackets, or connections are loose.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "515",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There are holes in the wall around the fire escape brackets or rails. This weakens the attachment points.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "516",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The braces of the fire escape brackets aren't sitting flush against the wall \u2014 the fire escape may not be fully supported.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "517",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A fire escape bracket is broken and needs to be completely replaced. The structural connection to the building is compromised.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "518",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The iron bar at the base of the gooseneck ladder (top of fire escape to roof) is broken or defective.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "519",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Additional fire escapes on the building are unsafe and need to be removed or made safe.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "520",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A dangerous, inadequate extra fire escape needs to be removed entirely \u2014 it's more hazard than help.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "521",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Window bars or illegal gates are blocking access to the fire escape. In a fire, you couldn't get out.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "522",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Bars or gates are blocking at least one window that should be a clear exit. Residents need at least one unobstructed window.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "523",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A gate in a fence at the lot line is locked and blocking the escape route from the fire escape to the street.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "524",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Something is blocking the fireproof passageway \u2014 the protected hallway meant to lead from fire escapes to the street.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "525",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The iron ladder to the roof scuttle isn't fixed in place. It could shift or fall when someone tries to climb to the roof in an emergency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "526",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "An illegal lock or fastening device is installed that could trap residents during an emergency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "527",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A closet was built around the scuttle ladder to the roof, blocking emergency roof access.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "528",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Glass in a fire-rated area needs to be replaced with wire glass (fire-resistant glass).",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "529",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Something needs to be refitted \u2014 a door, window, or fixture isn't sitting properly in its frame.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "530",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "Fire doors aren't self-closing as required. They must shut automatically to prevent fire and smoke from spreading.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "531",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A transom (small window above a door) needs to be made permanently fixed/closed to prevent fire spread.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "532",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The outside cellar entrance is missing a permanent iron ladder or fireproof stair.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "533",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Illegal fastenings are locking the grating door to the outside cellar entrance, blocking an exit.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "534",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The toilet is missing a proper seat.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "535",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Torn or loose floor covering (like old linoleum or carpet) is a trip hazard and needs to be removed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "536",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "Someone installed a device (like a doorstop or wedge) preventing a fire door from closing on its own.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "537",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "Louvered or screen doors that aren't fire-rated are installed at an entrance that requires a fire-rated door.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "538",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Stuff is blocking a hallway, stairway, or exit path. Encumbrances in egress routes are life-threatening in a fire.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "539",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Items are blocking the fire escape \u2014 furniture, bikes, storage, etc. The fire escape must be completely clear.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "540",
    "Statute": "\u00a7 27-848",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The warning sign on the refuse chute door needs to be replaced.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "546",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A double-cylinder deadbolt (needs a key from both sides) is installed on a door. In a fire, you could be trapped inside if you can't find the key.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "549",
    "Statute": "\u00a7 27-2005, 2012 & \u00a7 309",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Excessive stored materials are creating a fire hazard or blocking exits.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "550",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's a mold problem. The landlord must find the source (usually a leak) and fix both the source and the mold. Mold can cause serious respiratory issues.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "551",
    "Statute": "\u00a7 27-2010, 2011, 2012",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Unsanitary conditions need to be cleaned and disinfected \u2014 something was removed but the area still needs sanitizing.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "552",
    "Statute": "\u00a7 27-2010, 2011, 2012",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Garbage, trash, or rubbish has piled up somewhere in the building and needs to be cleaned out.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "553",
    "Statute": "\u00a7 27-2011",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An area of the building is dirty and needs to be cleaned to the department's satisfaction.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "554",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Metal surfaces (like fire escapes or railings) need to be painted according to department rules to prevent rust.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "555",
    "Statute": "\u00a7 27-2013",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Lead paint is peeling and needs to be removed or safely covered. Peeling lead paint is extremely dangerous, especially for children \u2014 it can cause brain damage.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "556",
    "Statute": "\u00a7 27-2013",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Surfaces need to be painted with a light color. This helps with visibility and cleanliness in hallways and stairwells.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "557",
    "Statute": "\u00a7 27-2013",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Dirty or peeling wallpaper needs to be removed and the walls repainted or re-papered.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "558",
    "Statute": "\u00a7 27-2013",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The apartment hasn't been painted in over 3 years (landlords are required to paint every 3 years in NYC). Needs a fresh coat.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "559",
    "Statute": "\u00a7 27-2013",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "No decorating in 3+ years, and the wallpaper is dirty/loose. Must be removed and walls repainted or repapered.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "560",
    "Statute": "\u00a7 27-2013",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The landlord isn't keeping records of when windows and apartments were last painted, as required.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "561",
    "Statute": "\u00a7 27-2014",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Metal surfaces have rust that needs to be scraped off and repainted with two coats of paint.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "562",
    "Statute": "\u00a7 27-2014",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The exterior window frames and sashes need repainting \u2014 they're deteriorated.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "563",
    "Statute": "\u00a7 27-2015",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Interior surfaces (like cellar or hallway walls) need to be whitewashed or painted a light color.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "564",
    "Statute": "\u00a7 27-2081",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Same as 563 \u2014 surfaces need whitewashing or light-colored paint, cited under a different code section.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "565",
    "Statute": "\u00a7 27-2015",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The exterior walls are dirty and unsanitary and need to be thoroughly cleaned.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "566",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There's a vermin infestation (general \u2014 could be various insects or pests). The landlord must hire an exterminator.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "567",
    "Statute": "\u00a7 27-2018",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Rat infestation. Rodents carry disease and can chew through wiring (fire risk). Must be professionally exterminated immediately.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "568",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Roach infestation. Cockroaches trigger allergies and asthma and indicate unsanitary conditions. The landlord must get an exterminator \u2014 sealing gaps alone won't fix this.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "569",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Mouse infestation. Mice carry disease, contaminate food, and chew through wiring. Landlord must exterminate.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "570",
    "Statute": "\u00a7 27-2018",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Bedbug infestation. Bedbugs spread between units through walls and furniture. The landlord is responsible for professional extermination \u2014 this is NOT the tenant's fault or responsibility to fix.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "571",
    "Statute": "\u00a7 27-2021",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building doesn't have proper separate trash and recycling bins, or garbage isn't being collected regularly.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "572",
    "Statute": "\u00a7 27-2021",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "There's no designated place inside the building to store trash cans, and/or the area isn't being disinfected.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "573",
    "Statute": "\u00a7 27-2022",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No sign is posted telling residents when and how garbage is collected.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "576",
    "Statute": "\u00a7 27-2024",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "No cold water supply. You literally can't drink water, wash hands, or flush toilets.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "577",
    "Statute": "\u00a7 27-2024",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No hot water. Landlords must provide hot water 24/7, 365 days a year in NYC. No exceptions.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "578",
    "Statute": "\u00a7 27-2026",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Water supply pipes are leaking or defective \u2014 could cause water damage, mold, and loss of water pressure.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "579",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Faucets are leaking or broken. Wastes water and can cause damage over time.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "580",
    "Statute": "\u00a7 27-2024",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The rooftop water tank is missing its required metal or metal-covered lid, leaving the water supply exposed to contamination.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "581",
    "Statute": "\u00a7 27-2024",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The rooftop water tank needs to be drained and cleaned inside. All the building's water comes through this tank.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "582",
    "Statute": "\u00a7 27-2024",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The rooftop water tank is missing its ball cock (the valve that controls water flow into the tank).",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "583",
    "Statute": "\u00a7 27-2026, 2027",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's an active water leak that needs to be traced to its source and fixed. Water leaks cause mold, damage, and can compromise building structure.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "586",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building's sewer/drain connection is improper or missing. Sewage may not be draining correctly.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "587",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There's a cesspool (open sewage pit) that must be removed and the building properly connected to the city sewer. Extremely unsanitary.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "588",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A drain is missing its strainer \u2014 debris can clog the drain and cause backups.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "589",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A plumbing trap is missing its cover \u2014 sewer gases could escape into the building.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "590",
    "Statute": "\u00a7 27-2066",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An apartment doesn't have its own toilet \u2014 every unit must have one.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "591",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The toilet bowl isn't properly connected \u2014 could leak sewage or rock when sat on.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "592",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The toilet's flush pipe is defective and needs to be replaced.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "593",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The toilet won't flush properly \u2014 the flushing mechanism is broken.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "594",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The connection between the flush pipe and the toilet is leaking.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "595",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The toilet is clogged/obstructed and needs to be cleared.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "596",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A plumbing fixture (sink, tub, toilet component) is broken and must be replaced.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "597",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Old plumbing fixtures that are no longer in use need to be removed and the pipes properly sealed to prevent leaks and gas.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "598",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A plumbing connection is broken or defective \u2014 could be leaking water or sewage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "599",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Gas is escaping from openings in plumbing that should be sealed gas-tight. Gas leaks are explosion risks.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "600",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A plumbing trap cleanout is missing its screw cap \u2014 sewer gas could be leaking into the unit.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "606",
    "Statute": "\u00a7 27-2056.5",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Lead paint that tested positive is peeling or on a deteriorated surface. Must be corrected using approved interim controls. Lead is toxic, especially to young children.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "607",
    "Statute": "\u00a7 27-2056.5",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Lead paint confirmed on wood trim, doors, or windows is peeling. Must be fixed with interim controls and a dust test afterward.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "610",
    "Statute": "\u00a7 27-2056.5",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Paint presumed to contain lead is peeling. Must be treated as lead paint and corrected with interim controls.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "611",
    "Statute": "\u00a7 27-2056.5",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Presumed lead paint on trim, doors, or windows is peeling. Interim controls plus dust testing required.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "612",
    "Statute": "\u00a7 27-2056.5",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Presumed lead paint is on an unstable or unsound surface. The surface itself is failing, which makes the lead paint even more dangerous.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "614",
    "Statute": "\u00a7 27-2056.8",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The landlord hasn't filed the required certification proving they addressed lead paint hazards when a unit was vacant \u2014 this is required every time a unit turns over.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "616",
    "Statute": "\u00a7 27-2056.6",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Presumed lead paint is peeling and must be corrected using specific approved work practices for safe lead removal.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "617",
    "Statute": "\u00a7 27-2056.6",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Confirmed lead paint is peeling and must be corrected using specific approved work practices.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "618",
    "Statute": "\u00a7 27-2056.7",
    "Class": "B-OTC",
    "Correction Time": "45 days",
    "What It Means (Plain English)": "The landlord failed to provide HPD with records about lead paint inspections and work within 45 days of being asked. This is a record-keeping violation.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "619",
    "Statute": "\u00a7 27-2056.4",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "The landlord failed to notify tenants about lead hazards and/or investigate them as required by Local Law 1.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "620",
    "Statute": "\u00a7 27-2056.4(h), 27-2056.17",
    "Class": "B-OTC",
    "Correction Time": "45 days",
    "What It Means (Plain English)": "Same as 618 \u2014 failure to produce lead paint records when demanded by HPD.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "646",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An opening in the plumbing system needs to be properly sealed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "647",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "After removing a broken/unused fixture, the hub opening wasn't sealed \u2014 sewer gas could escape.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "648",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Holes in plumbing pipes need to be properly plugged with screw plugs.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "649",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A drain or pipe is obstructed or defective and needs to be cleared and repaired.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "650",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building needs a properly connected rain leader (downspout) to handle roof drainage. Without it, water pools and causes damage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "652",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A rain leader (downspout) is broken or defective \u2014 rainwater isn't draining properly from the roof.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "653",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A gutter needs to be installed and connected to the drainage system.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "654",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A gutter is broken and needs repair \u2014 water is likely overflowing and causing damage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "655",
    "Statute": "\u00a7 27-2027",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A gutter needs to be re-angled so water flows toward the downspout instead of pooling.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "657",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Broken flooring in a common area needs to be removed and replaced with concrete.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "658",
    "Statute": "\u00a7 27-2005",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Broken or defective paved flooring needs to be repaired.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "659",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A surface needs to be properly graded (angled) toward a drain and paved with concrete so water drains correctly.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "660",
    "Statute": "\u00a7 27-2027",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A surface needs to be re-graded so water slopes toward the existing drain.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "664",
    "Statute": "\u00a7 27-2028, 2032",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No working heat. The building doesn't have an adequate heating system. NYC law requires heat Oct 1 \u2013 May 31 (68\u00b0F during day when it's below 55\u00b0F outside, 62\u00b0F at night).",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "665",
    "Statute": "\u00a7 27-2028",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No central heating system exists at all \u2014 one must be installed or individual heaters provided.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "666",
    "Statute": "\u00a7 27-2029",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "The apartment isn't getting enough heat, even though the building may have a heating system. The landlord must fix whatever is preventing heat from reaching the unit.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "668",
    "Statute": "\u00a7 27-2028",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The heating system is producing coal gas (toxic fumes). Needs immediate repair.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "669",
    "Statute": "\u00a7 27-2031",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "There's no hot water heating system \u2014 one needs to be installed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "670",
    "Statute": "\u00a7 27-2031",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No hot water is coming from the fixtures. NYC requires hot water at a minimum of 120\u00b0F at the tap, 24/7/365.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "671",
    "Statute": "\u00a7 27-2033",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No notice is posted saying who has the key to the building's heating system and where to find them.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "672",
    "Statute": "\u00a7 27-2033",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "The heating system isn't accessible \u2014 the person responsible may not be able to turn it on or fix it when needed.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "673",
    "Statute": "\u00a7 27-2030",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A hot water or heating appliance is producing carbon monoxide. Life-threatening \u2014 CO is invisible and deadly.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "674",
    "Statute": "\u00a7 27-2029",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "Someone installed a device on the heating system that can shut it down (like a timer or kill switch). This is illegal.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "675",
    "Statute": "\u00a7 27-2032, 2034",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "An illegal space heater or hot water heater is being used that doesn't vent to the outside \u2014 carbon monoxide risk.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "677",
    "Statute": "\u00a7 27-2035",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A gas-fired refrigerator is being used, which is illegal in NYC apartments due to CO and fire risks.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "678",
    "Statute": "\u00a7 27-2036",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The landlord isn't keeping the required annual self-inspection reports for gas heaters and appliances.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "680",
    "Statute": "\u00a7 27-2037, 2039",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The laundry room doesn't have adequate lighting.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "681",
    "Statute": "\u00a7 27-2037",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The bathroom or toilet area doesn't have proper lighting.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "682",
    "Statute": "\u00a7 27-2038",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An area of the building lacks adequate lighting \u2014 could be a hallway, stairway, or common area.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "683",
    "Statute": "\u00a7 27-2039",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Required lighting (at least 60 watts or equivalent) isn't provided in a specific location.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "684",
    "Statute": "\u00a7 27-2037",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Adequate lighting isn't provided in a required area.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "685",
    "Statute": "\u00a7 27-2039",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "There's no light over the mailboxes in the hallway. Makes it hard to read mail and creates a security issue.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "686",
    "Statute": "\u00a7 27-2040",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The front entrance of the building doesn't have a working light. Must stay lit from sunset to sunrise for safety.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "687",
    "Statute": "\u00a7 27-2040",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Exterior areas (like courtyards, alleys, or paths) aren't adequately lit from sunset to sunrise. Security risk.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "688",
    "Statute": "\u00a7 27-2037, 2038",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The electrical supply to fixtures is unsafe or inadequate \u2014 could mean no power or dangerous wiring.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "689",
    "Statute": "\u00a7 27-2005, 2006, 2037",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Unsafe electrical wiring condition \u2014 exposed wires, improper connections, or other conditions that could cause electrocution or fire.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "690",
    "Statute": "\u00a7 27-2041",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The apartment door doesn't have a peephole so you can see who's outside before opening. Required for security.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "691",
    "Statute": "\u00a7 27-2042",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A self-service elevator doesn't have a mirror so you can see inside before entering. Safety/security feature.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "692",
    "Statute": "\u00a7 27-2043",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The apartment entrance door doesn't have a working lock and key. You can't secure your own home.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "693",
    "Statute": "\u00a7 27-2044",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "Doors required to be self-closing (fire doors, entrance doors) aren't closing on their own.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "694",
    "Statute": "\u00a7 27-2044",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Glass in doors or transoms that should be fire-rated wire glass is regular glass instead.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "695",
    "Statute": "\u00a7 27-2044",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A window in the partition between an apartment and the hallway needs to be removed and sealed \u2014 fire/smoke hazard.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "696",
    "Statute": "\u00a7 27-2044",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A ceiling that's required to be fire-retarded (usually cellar or first floor) isn't properly fireproofed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "697",
    "Statute": "\u00a7 27-2005, 2044",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "The apartment's main entrance door isn't a proper fire-rated, self-closing door with required hardware (deadbolt, peephole, chain guard).",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "698",
    "Statute": "\u00a7 27-2044",
    "Class": "C",
    "Correction Time": "5 days",
    "What It Means (Plain English)": "A door opening from an apartment to the hallway (other than the main entrance) isn't a proper one-hour fire-rated self-closing door.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "699",
    "Statute": "\u00a7 27-2044",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Transoms (windows above doors) opening to the hallway aren't sealed with fire-rated material.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "700",
    "Statute": "\u00a7 27-2045",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The required smoke detector notice isn't posted near the mailboxes.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "701",
    "Statute": "\u00a7 27-2045, 2046",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's no working smoke detector in the apartment or building. Smoke detectors save lives \u2014 this is an emergency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "702",
    "Statute": "\u00a7 27-2045",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A smoke detector is broken or not working and needs to be fixed or replaced immediately.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "703",
    "Statute": "\u00a7 27-2045, 2046",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The landlord hasn't filed the required certification proving smoke detectors were properly installed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "704",
    "Statute": "\u00a7 27-2045, 2046",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The landlord isn't keeping required records of smoke detector installation and maintenance.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "706",
    "Statute": "\u00a7 27-2047",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Mail isn't being properly distributed to tenants \u2014 the landlord must arrange for delivery and distribution.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "707",
    "Statute": "\u00a7 27-2047",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building doesn't have proper mailboxes or a directory listing residents, as required by postal regulations.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "708",
    "Statute": "\u00a7 27-2048",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Floor numbers aren't posted in the hallways or stairwells. You should be able to tell what floor you're on.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "709",
    "Statute": "\u00a7 27-2049",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building's street number isn't posted on the front, visible from the sidewalk. Makes it hard for emergency services to find.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "712",
    "Statute": "\u00a7 27-2050",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The sprinkler system is missing a required hose valve at the top of the highest sprinkler line.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "713",
    "Statute": "\u00a7 27-2050",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building doesn't have the required garden hose and bucket on-site for testing the sprinkler system.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "714",
    "Statute": "\u00a7 27-2050",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The sprinkler system's main shutoff valve isn't sealed in the open position \u2014 someone could accidentally or intentionally shut off the sprinklers.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "715",
    "Statute": "\u00a7 27-2050",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No spare sprinkler heads or wrench are kept on-site for emergency repairs.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "716",
    "Statute": "\u00a7 27-2051",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A building that requires a live-in manager doesn't have one. Someone must be responsible for day-to-day operations.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "717",
    "Statute": "\u00a7 27-2005, 2050",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The sprinkler and/or standpipe system doesn't have adequate water supply. In a fire, the fire suppression system wouldn't work.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "721",
    "Statute": "\u00a7 27-2053",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The building doesn't have a janitor, superintendent, or janitorial service.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "722",
    "Statute": "\u00a7 27-2053",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No sign posted with the super/janitor's name, apartment number, and phone number. You need to know who to call.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "724",
    "Statute": "\u00a7 27-2055",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The landlord hasn't certified that the janitor is actually qualified to do the job.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "726",
    "Statute": "\u00a7 27-2059",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An interior room is being used for living but doesn't have a large enough opening to a room with an outside window. Same concept as code 004.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "727",
    "Statute": "\u00a7 27-2061",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An interior room with no windows or adequate openings is being used as a living space. Must stop using it for that purpose.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "729",
    "Statute": "\u00a7 27-2153",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "The building has been selected for HPD's Alternative Enforcement Program \u2014 this means it has so many violations that HPD will do building-wide inspections and may do the repairs themselves and bill the landlord. Bad sign for the building.",
    "Penalty if Not Fixed": "Civil penalties, liens on property"
  },
  {
    "Code": "730",
    "Statute": "\u00a7 27-2091(C)",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "HPD has ordered the landlord to fix underlying conditions behind repeated violations. If they don't, HPD will do the work and charge the landlord. Similar to AEP \u2014 indicates a chronically neglected building.",
    "Penalty if Not Fixed": "Civil penalties, tax liens"
  },
  {
    "Code": "731",
    "Statute": "\u00a7 27-2064",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The bathroom or toilet area doesn't have proper floor-to-ceiling partitions for privacy.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "732",
    "Statute": "\u00a7 27-2064",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The bathroom floor isn't waterproof. Water can seep through and damage the unit below.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "733",
    "Statute": "\u00a7 27-2065",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The bathroom or toilet area has no ventilation \u2014 moisture, odors, and mold are the result.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "734",
    "Statute": "\u00a7 27-2067",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A floor with rooming house (Class B) occupants doesn't have at least one toilet on that floor.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "735",
    "Statute": "\u00a7 27-2067",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A rooming house doesn't have enough bathrooms \u2014 needs a toilet, sink, and shower/tub for every 6 people.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "736",
    "Statute": "\u00a7 27-2067",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Same as 735 \u2014 not enough sanitary facilities for the number of Class B occupants.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "737",
    "Statute": "\u00a7 27-2067",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A single-room-occupancy (SRO) building doesn't have enough bathrooms for the number of residents.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "738",
    "Statute": "\u00a7 27-2067",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An SRO needs more plumbing fixtures installed to meet the 1-per-6-person ratio.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "739",
    "Statute": "\u00a7 27-2068",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A rooming house needs additional toilets and sinks \u2014 must have at least 1 per 7 sleeping rooms.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "741",
    "Statute": "\u00a7 27-2070",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An illegal kitchen/cooking area was set up without approval. It must be removed or legalized.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "742",
    "Statute": "\u00a7 27-2070",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "There's not enough gas getting to the stove or other gas fixtures \u2014 they may not work properly or at all.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "745",
    "Statute": "\u00a7 27-2074",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A room less than 6 feet wide is being used for living. That's too narrow to legally be a bedroom or living space.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "746",
    "Statute": "\u00a7 27-2075",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The apartment is overcrowded \u2014 too many people living in the space for its size. This violates occupancy standards and is a fire/safety hazard.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "748",
    "Statute": "\u00a7 27-2075",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A rooming unit doesn't have a sign showing the maximum number of people allowed to sleep there.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "749",
    "Statute": "\u00a7 27-2076",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Someone is sleeping in the kitchen, which is illegal. Kitchens are not approved sleeping areas.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "750",
    "Statute": "\u00a7 27-2076",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Children under 16 are living in a space not approved for occupancy \u2014 could be a basement, attic, or commercial space.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "751",
    "Statute": "\u00a7 27-2077",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An illegal rooming unit (rented sleeping room) exists that wasn't approved. Must be discontinued.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "752",
    "Statute": "\u00a7 27-2078",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An apartment has more than 2 boarders/roomers/lodgers, which exceeds what's legally allowed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "753",
    "Statute": "\u00a7 27-2077, 2078",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building is being used for single-room occupancy (SRO) purposes without approval.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "754",
    "Statute": "\u00a7 27-2078",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rooms are being separately rented as sleeping rooms without proper access to exits. Dangerous in emergencies.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "755",
    "Statute": "\u00a7 27-2079",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "The building is operating as an SRO without proper approval \u2014 must stop this use.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "756",
    "Statute": "\u00a7 27-2080",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No tenant register is kept on the premises. Required for SRO and rooming house buildings.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "759",
    "Statute": "\u00a7 27-2091 & \u00a7 302",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "HPD has ordered apartments vacated due to dangerous conditions \u2014 they CANNOT be re-occupied until HPD inspects and revokes the order. If you see this on a listing, do NOT move in.",
    "Penalty if Not Fixed": "Commissioner's Order"
  },
  {
    "Code": "760",
    "Statute": "\u00a7 27-2091 & \u00a7 302",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "Same as 759 \u2014 the entire building has been vacated by HPD order. Occupants need relocation services.",
    "Penalty if Not Fixed": "Commissioner's Order"
  },
  {
    "Code": "761",
    "Statute": "\u00a7 27-2081",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rooms are being used for living illegally. Plumbing must be disconnected and pipes sealed \u2014 the space is not habitable.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "762",
    "Statute": "\u00a7 27-2081",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rooms that don't meet habitability standards are being used for living. Must stop immediately.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "764",
    "Statute": "\u00a7 27-2081",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A space not approved for living (like a cellar or garage) is being used as a residence.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "765",
    "Statute": "\u00a7 27-2142",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "HPD has vacated specific apartments due to danger. They can't be reoccupied until the violations are fixed and HPD approves. Major red flag.",
    "Penalty if Not Fixed": "Commissioner's Order"
  },
  {
    "Code": "766",
    "Statute": "\u00a7 27-2089",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "The building has been empty (except for a caretaker) for 60+ days. Can't be reoccupied without a new certificate of occupancy \u2014 HPD wants to make sure it's safe.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "767",
    "Statute": "\u00a7 27-2089",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "HPD ordered the building vacated AND it needs a whole new certificate of occupancy before anyone can live there again.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "768",
    "Statute": "\u00a7 27-2089",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "People moved back into a formerly vacant building without getting the required certificate of occupancy. Building may be unsafe.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "769",
    "Statute": "\u00a7 27-2004",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A building classified for summer resort use only is being lived in year-round. Not built or approved for that.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "771",
    "Statute": "\u00a7 27-2096",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The building owner hasn't filed their registration statement with HPD. Every landlord must register their building.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "772",
    "Statute": "\u00a7 27-2098",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Same as 771 \u2014 building isn't registered with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "773",
    "Statute": "\u00a7 27-2098",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The owner hasn't filed an emergency contact phone number with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "774",
    "Statute": "\u00a7 27-2101",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The landlord changed their managing agent but didn't update HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "775",
    "Statute": "\u00a7 27-2099",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The building changed ownership but the new owner didn't register with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "776",
    "Statute": "\u00a7 27-2100",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The registration statement on file has an incorrect address for the owner or agent.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "777",
    "Statute": "\u00a7 27-2102",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "A lessee (someone leasing the whole building) hasn't registered with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "778",
    "Statute": "\u00a7 27-2104",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "The building's HPD registration number and address aren't posted in the lobby as required.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "779",
    "Statute": "\u00a7 27-2105",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Rent bills or receipts don't include the managing agent's or owner's name and address as required.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "780",
    "Statute": "\u00a7 27-2107",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "The owner never filed a valid registration statement. Major consequence: they can't certify violations are fixed, face civil penalties, and can't evict for nonpayment of rent until they register.",
    "Penalty if Not Fixed": "Civil penalties, no eviction rights"
  },
  {
    "Code": "790",
    "Statute": "\u00a7 27-2043.1",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Window guards are missing or broken. NYC law requires them in apartments where children 10 or under live, and in common areas of all buildings.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "791",
    "Statute": "\u00a7 27-2043.1",
    "Class": "C",
    "Correction Time": "21 days",
    "What It Means (Plain English)": "Window guards are missing or defective in the building's common areas (hallways, stairwells).",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "801",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Something in the apartment or building is broken and needs proper repair. General repair violation.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "802",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A broken item needs to be repaired with matching material.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "803",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Structural defect making the building unsafe. Could be a cracked wall, sagging beam, or failing foundation.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "804",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Something required is missing and needs to be provided.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "805",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Something is broken beyond repair and needs full replacement.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "806",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "A required item is missing and needs a new one installed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "807",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "The roof is leaking. Can cause mold, structural damage, and electrical hazards.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "808",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Plaster is cracked or broken on walls/ceiling. Needs repair and a fresh coat of paint.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "809",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Something is loose \u2014 a railing, fixture, or component \u2014 and needs to be secured.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "810",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A nuisance condition exists that must be eliminated. Catch-all for immediately hazardous conditions.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "811",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A gas appliance is leaking carbon monoxide \u2014 deadly gas. Life-threatening emergency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "812",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Fire escape has broken, defective, or missing components. Emergency escape route may be unusable.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "813",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Fire escape drop ladder is stuck and won't slide properly.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "814",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Part of the fire escape isn't properly secured.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "815",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Holes in the wall where fire escape brackets/rails attach need to be filled.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "816",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Fire escape bracket braces aren't properly seated against the wall.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "817",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A fire escape bracket is broken and must be fully replaced. The structural connection is compromised.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "818",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "The iron bar at the base of the rooftop gooseneck ladder is broken or defective.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "819",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Unsafe additional fire escapes need to be removed or repaired.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "820",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A dangerous, inadequate fire escape must be removed entirely.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "821",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Bars or gates are blocking the window to the fire escape. In a fire, you can't get out.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "822",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "At least one window is blocked by bars or gates. You need a clear exit window.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "826",
    "Statute": "\u00a7 27-2005",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "An illegal lock or fastening is installed that could trap people during an emergency.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "829",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Something needs to be refitted \u2014 a door, window, or fixture isn't fitting properly.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "834",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Toilet is missing its seat.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "835",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Torn or loose floor covering is a trip hazard.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "838",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Items are blocking a hallway, stairway, or exit. Life-threatening in a fire.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "839",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Objects are blocking the fire escape. Must be completely clear at all times.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "846",
    "Statute": "\u00a7 27-2005, 2007",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "A double-cylinder deadbolt (key needed from both sides) is installed. You could be trapped in a fire.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "849",
    "Statute": "\u00a7 27-2005, 2012 & \u00a7 309",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Excessive storage of materials creating a fire or safety hazard.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "851",
    "Statute": "\u00a7 27-2010, 2011, 2012",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An area needs to be cleaned and disinfected after something unsanitary was removed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "852",
    "Statute": "\u00a7 27-2010, 2011, 2012",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Trash and debris have accumulated and need to be cleaned up.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "853",
    "Statute": "\u00a7 27-2010, 2011, 2012",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "An area is dirty and needs to be cleaned.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "856",
    "Statute": "\u00a7 27-2013",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Surfaces need to be painted with a light color.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "857",
    "Statute": "\u00a7 27-2013",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Dirty or peeling wallpaper needs to be removed, and walls repainted or repapered.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "861",
    "Statute": "\u00a7 27-2014",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Metal surfaces have rust that must be scraped and repainted.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "862",
    "Statute": "\u00a7 27-2014",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Exterior window frames and sashes need repainting.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "866",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Vermin infestation (general pests). Landlord must get an exterminator.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "867",
    "Statute": "\u00a7 27-2018",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Rat infestation. Rodents carry disease and are a fire risk (chew wiring). Needs immediate professional extermination.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "868",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Roach infestation. Triggers allergies/asthma. Landlord must hire an exterminator.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "869",
    "Statute": "\u00a7 27-2018",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Mouse infestation. Mice contaminate food and chew wiring. Landlord must exterminate.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "870",
    "Statute": "\u00a7 27-2018",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Bedbug infestation. Spreads through walls between units. Landlord's responsibility to hire a professional exterminator.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "871",
    "Statute": "\u00a7 27-2023",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No proper trash/recycling bins or regular garbage collection.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "872",
    "Statute": "\u00a7 27-2023",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "No designated trash storage area in the building.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "876",
    "Statute": "\u00a7 27-2024",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "No cold water supply to fixtures.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "877",
    "Statute": "\u00a7 27-2024",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No hot water. Must be provided 24/7/365.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "878",
    "Statute": "\u00a7 27-2026",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Leaking or defective water supply pipes.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "879",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Leaking or broken faucets.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "883",
    "Statute": "\u00a7 27-2026, 2027",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Active water leak \u2014 source must be found and fixed, and water damage addressed.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "888",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Drain missing its strainer.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "889",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Plumbing trap missing its cover \u2014 sewer gas exposure risk.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "891",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Toilet isn't properly seated \u2014 could leak sewage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "892",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Toilet flush pipe is defective.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "893",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Toilet won't flush properly.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "894",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Toilet flush pipe connection is leaking.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "895",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Toilet is clogged/obstructed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "896",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A plumbing fixture is broken and must be replaced.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "897",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Unused plumbing fixtures should be removed and pipes sealed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "898",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A plumbing connection is broken \u2014 could be leaking.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "899",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Openings in gas piping aren't sealed \u2014 gas could be leaking.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "900",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Plumbing trap cleanout missing its cap \u2014 sewer gas risk.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "946",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "A plumbing opening needs to be sealed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "947",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Hub opening not sealed after fixture removal \u2014 sewer gas could escape.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "948",
    "Statute": "\u00a7 27-2026",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Holes in pipes need to be properly plugged.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "949",
    "Statute": "\u00a7 27-2026",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Pipes are obstructed or defective and need clearing/repair.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "950",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Building needs a proper rain leader connected to the sewer for drainage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "952",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rain leader (downspout) is broken.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "953",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Gutter needed and must be connected to drainage.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "954",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Gutter is broken and needs repair.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "955",
    "Statute": "\u00a7 27-2027",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Gutter needs re-angling so water drains toward the downspout.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "958",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Broken paving needs repair.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "959",
    "Statute": "\u00a7 27-2027",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Surface needs proper grading toward drain and concrete paving.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "960",
    "Statute": "\u00a7 27-2027",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Surface needs re-grading toward existing drain.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "964",
    "Statute": "\u00a7 27-2028, 2032",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No working heat from an approved system.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "965",
    "Statute": "\u00a7 27-2028",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No heating system installed at all.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "966",
    "Statute": "\u00a7 27-2029",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "Apartment not getting adequate heat.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "968",
    "Statute": "\u00a7 27-2038",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Heating system producing toxic coal gas.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "969",
    "Statute": "\u00a7 27-2031",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "No hot water system installed \u2014 one needs to be put in.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "970",
    "Statute": "\u00a7 27-2031",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "No hot water at fixtures. Must be available 24/7.",
    "Penalty if Not Fixed": "$250/day penalty"
  },
  {
    "Code": "975",
    "Statute": "\u00a7 27-2032, 2034",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Illegal space/hot water heater that doesn't vent to outside \u2014 carbon monoxide risk.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "976",
    "Statute": "\u00a7 27-2032, 2034",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Same as 975 \u2014 illegal heater without proper outside venting.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "977",
    "Statute": "\u00a7 27-2035",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Illegal gas-fired refrigerator being used \u2014 CO and fire risk.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "981",
    "Statute": "\u00a7 27-2037",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Bathroom/toilet area lacks proper lighting.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "982",
    "Statute": "\u00a7 27-2038",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Inadequate lighting in a required area.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "988",
    "Statute": "\u00a7 27-2037, 2038",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Electrical supply to fixtures is unsafe or inadequate.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "989",
    "Statute": "\u00a7 27-2005, 2006, 2037",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Unsafe electrical wiring \u2014 could cause electrocution or fire.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "990",
    "Statute": "\u00a7 27-2041",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Apartment door missing a peephole.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "992",
    "Statute": "\u00a7 27-2043",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Apartment entrance door has no working lock. You can't secure your home.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1000",
    "Statute": "\u00a7 27-2045",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Smoke detector notice not posted near mailboxes.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1001",
    "Statute": "\u00a7 27-2045",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "No working smoke detector installed. Life-saving device missing.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1002",
    "Statute": "\u00a7 27-2044",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Smoke detector is broken and needs repair or replacement.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1003",
    "Statute": "\u00a7 27-2045",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Landlord hasn't filed proof that smoke detectors were properly installed.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1004",
    "Statute": "\u00a7 27-2045",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Landlord not keeping required smoke detector maintenance records.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1009",
    "Statute": "\u00a7 27-2049",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Building street number not posted visibly from the sidewalk.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1017",
    "Statute": "\u00a7 27-2005, 2050",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Sprinkler/standpipe system doesn't have enough water supply. Fire suppression would fail.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1026",
    "Statute": "\u00a7 27-2062",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Interior room used for living without proper-sized opening to a room with an outside window.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1027",
    "Statute": "\u00a7 27-2062",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Interior room with no windows being used as living space.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1028",
    "Statute": "\u00a7 27-2062",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Interior room used for living needs a 60 sq. ft. alcove opening to a room with an outside window.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1030",
    "Statute": "\u00a7 27-2069",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An apartment doesn't have a toilet, sink, and bath/shower on the same floor. All three are required.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1031",
    "Statute": "\u00a7 27-2064",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Bathroom/toilet lacks proper floor-to-ceiling walls for privacy.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1032",
    "Statute": "\u00a7 27-2064",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Bathroom floor isn't waterproof.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1033",
    "Statute": "\u00a7 27-2065",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Bathroom has no ventilation \u2014 leads to moisture, mold, and odor problems.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1041",
    "Statute": "\u00a7 27-2073",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Illegal cooking area set up without approval.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1042",
    "Statute": "\u00a7 27-2073",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Not enough gas supply to fixtures \u2014 stove may not work properly.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1046",
    "Statute": "\u00a7 27-2075",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Apartment is unlawfully overcrowded. Safety and fire hazard.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1049",
    "Statute": "\u00a7 27-2076",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Kitchen being used as a sleeping area, which is illegal.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1051",
    "Statute": "\u00a7 27-2077",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "An illegal rooming unit must be discontinued.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1054",
    "Statute": "\u00a7 27-2078",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Apartment has more than 2 roomers/boarders/lodgers, exceeding the legal limit.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1061",
    "Statute": "\u00a7 27-2087",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rooms are being illegally used for living. Plumbing must be disconnected and pipes sealed.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1062",
    "Statute": "\u00a7 27-2087",
    "Class": "B",
    "Correction Time": "30 days",
    "What It Means (Plain English)": "Rooms don't meet habitability standards and must stop being used for living, or get a certificate of occupancy.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1067",
    "Statute": "\u00a7 27-2142",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "HPD has vacated these apartments \u2014 they are UNSAFE and cannot be lived in until HPD says so. If you see this on a listing, run.",
    "Penalty if Not Fixed": "Commissioner's Order"
  },
  {
    "Code": "1068",
    "Statute": "\u00a7 27-2142",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "People moved back into apartments that HPD ordered vacated, without getting approval. Building may still be dangerous.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1071",
    "Statute": "\u00a7 27-2096",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Building owner hasn't filed a true registration statement with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1072",
    "Statute": "\u00a7 27-2098",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Building not registered with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1074",
    "Statute": "\u00a7 27-2098",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "No managing agent designated with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1075",
    "Statute": "\u00a7 27-2099",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Building ownership changed but new owner didn't register with HPD.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1076",
    "Statute": "\u00a7 27-2100",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Registration statement has wrong address for the responsible party.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1079",
    "Statute": "\u00a7 27-2105",
    "Class": "A",
    "Correction Time": "90 days",
    "What It Means (Plain English)": "Rent bills/receipts don't show the managing agent's or owner's name and address.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1492",
    "Statute": "\u00a7 9, 170, 171, 300, 301, 302",
    "Class": "B-OTC",
    "Correction Time": "Varies",
    "What It Means (Plain English)": "A private house was illegally converted into apartments. Must either get proper approvals or restore it to a single-family home. Common in NYC \u2014 these conversions often lack fire safety features.",
    "Penalty if Not Fixed": "Civil penalties, litigation"
  },
  {
    "Code": "1493",
    "Statute": "\u00a7 9, 56, 193, 300, 302",
    "Class": "C",
    "Correction Time": "Immediately",
    "What It Means (Plain English)": "A frame (wood) house was illegally converted to apartments. Frame buildings are especially dangerous as multi-family because wood burns fast and fire spreads quickly.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1501",
    "Statute": "\u00a7 27-2046.1",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Carbon monoxide detector notice not posted in common area or provided to tenants.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1502",
    "Statute": "\u00a7 27-2046.1, 2046.2",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "No working carbon monoxide detector. CO is invisible and odorless \u2014 without a detector, you won't know there's a leak until it's too late.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1503",
    "Statute": "\u00a7 27-2046.1",
    "Class": "C",
    "Correction Time": "24 hours",
    "What It Means (Plain English)": "Carbon monoxide detector is broken and needs immediate repair or replacement.",
    "Penalty if Not Fixed": "ERP eligible"
  },
  {
    "Code": "1504",
    "Statute": "\u00a7 27-2046.1, 2046.2",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Landlord hasn't filed certification of CO detector installation.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1505",
    "Statute": "\u00a7 27-2046.1, 2046.2",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "Landlord not keeping required CO detector maintenance records.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  },
  {
    "Code": "1506",
    "Statute": "\u00a7 27-2005",
    "Class": "A",
    "Correction Time": "14 days",
    "What It Means (Plain English)": "No gas leak procedure notice posted in the building's common area.",
    "Penalty if Not Fixed": "Fines, civil lawsuits"
  }
];
