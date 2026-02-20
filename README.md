# Carbon Footprint Calculator

A comprehensive carbon emissions tracking and analysis platform designed specifically for the coal mining industry. This application provides real-time monitoring, AI-powered predictions, and detailed export functionality for carbon footprint management.

## 🌟 Features

### 📊 Emissions Calculator
- **Real-time Calculations**: Instant carbon emission calculations based on mining activity data
- **Multiple Input Sources**: Diesel consumption, electricity usage, explosives, and methane emissions
- **Gap Analysis**: Compare emissions against targets and calculate carbon credits needed
- **Visual Analytics**: Interactive charts and graphs for data visualization

### 📈 Real-Time Dashboard
- **Live Monitoring**: 24/7 tracking of emissions with predictive analytics
- **Trend Analysis**: Daily, weekly, and monthly emission trends
- **Source Breakdown**: Detailed analysis of emission sources by activity type
- **Prediction Accuracy**: ML-powered emission forecasting with accuracy metrics

### 📤 Export Functionality
- **Multiple Formats**: Export data in JSON, CSV, PDF, and XML formats
- **Comprehensive Data**: Complete emission data with gap analysis and insights
- **Professional Reports**: Formatted PDF reports for stakeholders and compliance
- **Data Integration**: Structured formats for seamless integration with other systems



## 📁 Project Structure

```
carbon-footprint-2222/
├── app/                    # Next.js app router pages
│   ├── calculator/         # Emissions calculator page
│   ├── dashboard/          # Real-time dashboard
│   ├── about/             # About page
│   ├── features/          # Features page
│   └── impact/            # Impact page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── emissions-calculator.tsx
│   ├── calculator-results.tsx
│   ├── export-button.tsx
│   └── ...
├── lib/                   # Utility libraries
│   ├── emissions.ts       # Emission calculation logic
│   ├── export-utils.ts    # Export functionality
│   └── utils.ts          # General utilities
├── hooks/                 # Custom React hooks
├── styles/               # Global styles
└── public/               # Static assets
```

## 🧮 Emission Calculation Methodology

The calculator uses standard emission factors based on IPCC guidelines:

- **Diesel**: 2.68 kg CO₂ per litre
- **Electricity**: 0.65 kg CO₂ per kWh (India grid average)
- **Explosives**: 3.2 kg CO₂ per kilogram
- **Methane**: 25 kg CO₂e per ton (25-year GWP)

**Formula**: `Total Emissions = Σ(Activity Data × Emission Factor)`

## 📊 Export Formats

### JSON
Complete data structure for programmatic processing and API integration.

### CSV
Tabular format optimized for spreadsheet analysis and data visualization tools.

### PDF
Professional formatted reports with charts and summary data for presentations.

### XML
Structured data format for enterprise systems and legacy applications.

## 🎯 Use Cases

- **Regulatory Compliance**: Generate reports for environmental compliance
- **Carbon Credit Trading**: Calculate and document carbon credits needed
- **Sustainability Reporting**: Create ESG and sustainability reports
- **Operational Optimization**: Identify areas for emission reduction
- **Stakeholder Communication**: Share environmental impact data

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Charts**: Recharts for data visualization
- **Export**: jsPDF, file-saver for document generation
- **Icons**: Lucide React

## 🌍 Environmental Impact

This tool helps coal mining industries:
- Track and reduce carbon emissions by up to 40%
- Meet regulatory requirements and avoid penalties
- Optimize operations for better environmental performance
- Participate in carbon credit markets
- Demonstrate commitment to sustainability

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- Desktop computers
- Tablets
- Mobile devices

## 🔒 Data Privacy

- All calculations performed client-side
- No data sent to external servers
- Export files downloaded directly to your device
- Secure and private data handling

---

**Built with ❤️ for you and a sustainable future**
