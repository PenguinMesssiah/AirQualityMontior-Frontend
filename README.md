# Air Quality Monitoring System - Frontend

A community-driven air quality monitoring dashboard built in collaboration with Arts Excursion Unlimited and Carnegie Mellon University's Social Haptics Robotics & Education Lab, serving the Greenfield, Hazelwood, and Glen-Hazel neighborhoods of Pittsburgh.

## Overview

This React-based web application visualizes real-time air quality data collected from custom-built monitoring units deployed throughout the Greater Hazelwood area. The dashboard provides EPA AQI-compliant data visualization, empowering residents to make informed decisions about their health and safety.

## Features

- **Real-time Air Quality Monitoring** - Live data from distributed sensor network
- **EPA AQI Compliance** - Color-coded air quality indicators following EPA standards
- **Interactive Maps** - Leaflet-powered visualization of sensor locations
- **Time-Series Charts** - Historical data analysis with filtering capabilities
- **Responsive Design** - Mobile-friendly interface built with React Bootstrap
- **Educational Resources** - Workshop curriculum and assembly guides

## Tech Stack

### Frontend
- **React 19** - Modern component-based UI
- **Vite** - Fast build tool and development server
- **React Bootstrap** - UI component library
- **React Router** - Client-side routing
- **Leaflet** - Interactive mapping
- **Recharts** - Data visualization
- **Tailwind CSS** - Utility-first styling

### Backend
- **Flask** - Python web framework with Flask-CORS
- **MongoDB** - NoSQL database for time-series data
- **PyMongo** - MongoDB driver for Python
- **Cloudflare Tunnel** - Secure tunneling for public access
- **Python 3.x** - Core programming language

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/PenguinMesssiah/AirQualityMontior-Frontend.git
cd AirQualityMontior-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `https://artsexcursionairquality.org`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── Components/       # Reusable React components
│   ├── AEUCarousel.jsx
│   ├── AirQualityCurriculum.jsx
│   ├── BarChart.jsx
│   ├── CommunityVoices.jsx
│   ├── Dropdown.jsx
│   ├── Footer.jsx
│   ├── NavBar.jsx
│   ├── OverviewCard.jsx
│   ├── SpineChart.jsx
│   └── TechnicalResources.jsx
├── Pages/           # Page-level components
│   ├── AboutUs.jsx
│   └── Dashboard.jsx
├── assets/          # Static assets (images, icons)
├── utils/           # Utility functions
└── App.jsx          # Main application component
```

## API Integration

This frontend connects to a Flask-based REST API hosted on a Raspberry Pi backend. Configure the API endpoint in your environment:

```javascript
// Update API endpoint in your configuration
const API_BASE_URL = 'https://artsexcursionairquality.org:5000/api'
```

## Contributing

We welcome contributions from the community! This project was built through collaborative learning, and we encourage others to participate.

### Development Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- **Arts Excursion Unlimited** - Community partnership and workshop facilitation
- **Carnegie Mellon University SHARE Lab** - Technical guidance and research support
- **Greenfield, Hazelwood, and Glen-Hazel Community Members** - Active participation and invaluable feedback

## Related Repositories

- [Backend Repository](https://github.com/PenguinMesssiah/HazelwoodServer) - Flask API and data storage
- [Arduino Firmware](https://drive.google.com/file/d/1hvZsCnCgavwJCYUJWfIVS5v6UL0-1wS7/view?usp=drive_link) - Sensor code for Feather M4
- [3D Enclosure](https://www.adafruit.com/product/3931) - Flanged Weatherproof Enclosure

## Resources

- [Workshop Curriculum](LINK_TO_CURRICULUM) - Complete educational materials
- [Assembly Guide](LINK_TO_ASSEMBLY) - Step-by-step hardware build instructions
- [Project Website](https://artsexcursionairquality.org) - Live dashboard

## Contact

For questions or collaboration opportunities, please open an issue or contact the project maintainers.

---

*Built with ❤️ by the Greater Hazelwood community*
