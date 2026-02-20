# Export Functionality Documentation

## Overview
The Carbon Footprint application now includes comprehensive export functionality for both calculator results and real-time dashboard data. Users can export their emissions data in multiple formats for reporting, analysis, and compliance purposes.

## Export Formats

### 1. JSON (JavaScript Object Notation)
- **Best for**: Data integration, API consumption, programmatic processing
- **Features**: Complete data structure preservation, including all metadata
- **File extension**: `.json`

### 2. CSV (Comma-Separated Values)
- **Best for**: Excel/Spreadsheet analysis, data visualization tools
- **Features**: Tabular format, easy to import into data analysis tools
- **File extension**: `.csv`

### 3. PDF (Portable Document Format)
- **Best for**: Reports, presentations, printing, sharing with stakeholders
- **Features**: Formatted document with charts and summary data
- **File extension**: `.pdf`

### 4. XML (eXtensible Markup Language)
- **Best for**: Enterprise systems, legacy applications, structured data exchange
- **Features**: Hierarchical data structure, self-describing tags
- **File extension**: `.xml`

## Export Locations

### Calculator Page (`/calculator`)
Export buttons are available in two locations:
1. **Results Section**: After calculating emissions, an export button appears in the results header
2. **Visualization Section**: In the charts and graphs section header

### Dashboard Page (`/dashboard`)
Export button is available in:
1. **Page Header**: Top-right corner of the dashboard for exporting real-time data

## Data Exported

### Calculator Data Includes:
- **Input Values**: Diesel, electricity, explosives, methane consumption
- **Calculated Emissions**: Individual source emissions and total
- **Percentage Breakdown**: Contribution of each emission source
- **Gap Analysis** (if calculated): Target vs actual comparison, carbon credits needed
- **Timestamp**: When the calculation was performed
- **Metadata**: Emission factors used, calculation methodology

### Real-Time Dashboard Data Includes:
- **Daily Emissions**: Actual vs predicted vs target for the past week
- **Monthly Trends**: Historical emissions and carbon credits data
- **Source Breakdown**: Emission sources by percentage
- **Prediction Accuracy**: Model performance metrics
- **Key Statistics**: Current KPIs with trends
- **System Alerts**: Current operational status and warnings

## File Naming Convention
All exported files follow this naming pattern:
```
carbon-emissions-{type}-{date}.{extension}
```
Where:
- `{type}` is either "calculator" or "realtime"
- `{date}` is the export date in YYYY-MM-DD format
- `{extension}` is the file format (json, csv, pdf, xml)

Example: `carbon-emissions-calculator-2026-02-16.pdf`

## Usage Instructions

### For Calculator Results:
1. Navigate to `/calculator`
2. Enter your mining activity data (diesel, electricity, explosives, methane)
3. Click "Calculate Emissions"
4. View results and optionally perform gap analysis
5. Click the "Export" button in the results section
6. Choose your preferred export format from the dropdown menu

### For Real-Time Dashboard:
1. Navigate to `/dashboard`
2. View the live emissions data and visualizations
3. Click the "Export" button in the top-right corner
4. Choose your preferred export format from the dropdown menu

## Technical Implementation

### Dependencies
- `jspdf`: PDF generation
- `file-saver`: File download functionality
- `html2canvas`: HTML to canvas conversion (for PDF exports)

### Core Components
- `ExportButton`: Reusable dropdown component with format selection
- `DataExporter`: Utility class with format-specific export methods
- `ExportData` interface: TypeScript type definitions for export data structure

### Export Methods
- `DataExporter.exportToJSON()`: Converts data to formatted JSON
- `DataExporter.exportToCSV()`: Creates tabular CSV format
- `DataExporter.exportToPDF()`: Generates formatted PDF document
- `DataExporter.exportToXML()`: Creates structured XML document

## Data Privacy and Security
- All exports are processed client-side in the browser
- No data is sent to external servers during export
- Files are downloaded directly to the user's device
- Exported data contains only what is visible in the current session

## Troubleshooting

### Common Issues:
1. **Export button not visible**: Ensure you have calculated emissions first (calculator) or that the dashboard has loaded completely
2. **File download fails**: Check browser download settings and ensure pop-ups are allowed
3. **PDF formatting issues**: Some browsers may have different PDF rendering; try a different browser if needed
4. **CSV import issues**: Ensure your spreadsheet software is set to UTF-8 encoding

### Browser Compatibility:
- Chrome/Chromium: Full support for all formats
- Firefox: Full support for all formats
- Safari: Full support for all formats
- Edge: Full support for all formats

## Future Enhancements
Potential improvements for the export functionality:
- Email export functionality
- Scheduled automatic exports
- Custom report templates
- Integration with cloud storage services
- Advanced filtering options for exported data
- Multi-language support for exported documents
