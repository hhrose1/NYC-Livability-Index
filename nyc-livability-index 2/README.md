# NYC Neighborhood Livability Index

A data-driven web tool to help you find the perfect NYC neighborhood based on your priorities.

## Features

### Tier 1: Neighborhood Explorer ✅
- **8 customizable priority sliders**: Safety, Transit Access, Affordability, Nightlife, Walkability, School Quality, Grocery Access, Park Access
- **Budget filtering**: Set your max monthly rent
- **Smart ranking algorithm**: Calculates personalized match scores based on your priorities
- **111 NYC neighborhoods** with comprehensive data on:
  - Safety scores and crime statistics
  - Transit access and subway quality
  - Rent prices and affordability
  - Walkability and bike scores
  - School quality ratings
  - Restaurant, nightlife, and grocery density
  - Park access
  - And more!

### Tier 2: Address Lookup (Coming Soon)
- Detailed address-level reports
- NYC Open Data API integration (HPD violations, DOB complaints, 311 data)
- Subway station "sketchy index" for nearby stations

## How to Use

1. Open `index.html` in your browser
2. Adjust the priority sliders based on what matters most to you
3. Enter your budget (optional)
4. Click "Find My Neighborhoods"
5. Browse your top matches with detailed stats

## Project Structure

```
nyc-livability-index/
├── index.html              # Main HTML page
├── css/
│   └── style.css          # All styling
├── js/
│   └── app.js             # Application logic
└── data/
    └── neighborhoods.js   # Neighborhood dataset (111 neighborhoods)
```

## Data Sources

- NYC Open Data
- Walk Score API
- Crime statistics from NYPD
- School quality ratings
- Transit data
- Custom neighborhood analysis

## GitHub Pages Setup

1. Push this repo to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and wait a few minutes
6. Your site will be live at `https://[your-username].github.io/[repo-name]/`

## Local Development

Just open `index.html` in your browser. No build process or server required!

## Future Enhancements

- [ ] Address lookup feature (Tier 2)
- [ ] Interactive map view
- [ ] Neighborhood comparison tool
- [ ] Save favorite neighborhoods
- [ ] Export results to PDF
- [ ] Additional filtering options

## License

MIT License - feel free to use and modify!

---

Made with ❤️ for NYC apartment hunters
