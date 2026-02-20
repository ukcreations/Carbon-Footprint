import { EmissionResults, GapAnalysis } from './emissions';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

export interface ExportData {
  type: 'calculator' | 'realtime';
  timestamp: string;
  data: EmissionResults | RealtimeData;
  gapAnalysis?: GapAnalysis;
}

export interface RealtimeData {
  dailyData: Array<{
    day: string;
    actual: number;
    predicted: number;
    target: number;
  }>;
  monthlyData: Array<{
    month: string;
    emissions: number;
    credits: number;
  }>;
  sourceData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  accuracyData: Array<{
    week: string;
    actual: number;
    predicted: number;
    diff: number;
  }>;
  stats: Array<{
    label: string;
    value: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
  }>;
}

export class DataExporter {
  static exportToJSON(data: ExportData, filename?: string): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const defaultFilename = `carbon-emissions-${data.type}-${new Date().toISOString().split('T')[0]}.json`;
    saveAs(blob, filename || defaultFilename);
  }

  static exportToCSV(data: ExportData, filename?: string): void {
    let csvContent = '';
    
    if (data.type === 'calculator') {
      const results = data.data as EmissionResults;
      
      csvContent = 'Carbon Emissions Calculator Results\n';
      csvContent += `Generated,${new Date().toLocaleString()}\n\n`;
      csvContent += 'Emission Source,CO2 (kg),Percentage (%)\n';
      csvContent += `Diesel,${results.diesel.toFixed(2)},${results.breakdown.find(b => b.label === 'Diesel')?.percentage.toFixed(1) || 0}\n`;
      csvContent += `Electricity,${results.electricity.toFixed(2)},${results.breakdown.find(b => b.label === 'Electricity')?.percentage.toFixed(1) || 0}\n`;
      csvContent += `Explosives,${results.explosives.toFixed(2)},${results.breakdown.find(b => b.label === 'Explosives')?.percentage.toFixed(1) || 0}\n`;
      csvContent += `Methane,${results.methane.toFixed(2)},${results.breakdown.find(b => b.label === 'Methane')?.percentage.toFixed(1) || 0}\n`;
      csvContent += `Total,${results.total.toFixed(2)},100\n`;
      
      if (data.gapAnalysis) {
        csvContent += '\nGap Analysis\n';
        csvContent += 'Target Emissions (kg CO2),' + data.gapAnalysis.targetEmissions.toFixed(2) + '\n';
        csvContent += 'Total Emissions (kg CO2),' + data.gapAnalysis.totalEmissions.toFixed(2) + '\n';
        csvContent += 'Carbon Sequestration (kg CO2),' + data.gapAnalysis.carbonSequestration.toFixed(2) + '\n';
        csvContent += 'Emission Gap (kg CO2),' + data.gapAnalysis.gap.toFixed(2) + '\n';
        csvContent += 'Gap Percentage (%),' + data.gapAnalysis.gapPercentage.toFixed(1) + '\n';
        csvContent += 'Status,' + data.gapAnalysis.status + '\n';
        csvContent += 'Carbon Credits Needed,' + data.gapAnalysis.carbonCreditsNeeded.toFixed(3) + '\n';
      }
    } else {
      const realtimeData = data.data as RealtimeData;
      
      csvContent = 'Real-Time Carbon Emissions Dashboard\n';
      csvContent += `Generated,${new Date().toLocaleString()}\n\n`;
      
      csvContent += 'Daily Emissions Data\n';
      csvContent += 'Day,Actual (tons),Predicted (tons),Target (tons)\n';
      realtimeData.dailyData.forEach(row => {
        csvContent += `${row.day},${row.actual},${row.predicted},${row.target}\n`;
      });
      
      csvContent += '\nMonthly Trends\n';
      csvContent += 'Month,Emissions (tons),Credits Earned\n';
      realtimeData.monthlyData.forEach(row => {
        csvContent += `${row.month},${row.emissions},${row.credits}\n`;
      });
      
      csvContent += '\nEmission Sources\n';
      csvContent += 'Source,Percentage (%)\n';
      realtimeData.sourceData.forEach(row => {
        csvContent += `${row.name},${row.value}\n`;
      });
      
      csvContent += '\nPrediction Accuracy\n';
      csvContent += 'Week,Actual (tons),Predicted (tons),Difference\n';
      realtimeData.accuracyData.forEach(row => {
        csvContent += `${row.week},${row.actual},${row.predicted},${row.diff}\n`;
      });
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const defaultFilename = `carbon-emissions-${data.type}-${new Date().toISOString().split('T')[0]}.csv`;
    saveAs(blob, filename || defaultFilename);
  }

  static exportToPDF(data: ExportData, filename?: string): void {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;
    
    // Header
    doc.setFontSize(20);
    doc.text('Carbon Emissions Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    doc.setFontSize(12);
    doc.text(`Type: ${data.type === 'calculator' ? 'Calculator Results' : 'Real-Time Dashboard'}`, margin, yPosition);
    yPosition += 8;
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 15;
    
    if (data.type === 'calculator') {
      const results = data.data as EmissionResults;
      
      // Total Emissions
      doc.setFontSize(16);
      doc.text('Total Emissions', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(14);
      doc.text(`${results.total.toFixed(2)} kg CO₂`, margin, yPosition);
      if (results.total >= 1000) {
        yPosition += 8;
        doc.text(`= ${(results.total / 1000).toFixed(2)} tons CO₂`, margin, yPosition);
      }
      yPosition += 15;
      
      // Breakdown
      doc.setFontSize(16);
      doc.text('Emission Breakdown', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      results.breakdown.forEach(item => {
        doc.text(`${item.label}: ${item.value.toFixed(2)} kg CO₂ (${item.percentage.toFixed(1)}%)`, margin, yPosition);
        yPosition += 7;
      });
      
      // Gap Analysis
      if (data.gapAnalysis) {
        yPosition += 10;
        doc.setFontSize(16);
        doc.text('Gap Analysis', margin, yPosition);
        yPosition += 10;
        
        doc.setFontSize(11);
        doc.text(`Target Emissions: ${data.gapAnalysis.targetEmissions.toFixed(2)} kg CO₂`, margin, yPosition);
        yPosition += 7;
        doc.text(`Total Emissions: ${data.gapAnalysis.totalEmissions.toFixed(2)} kg CO₂`, margin, yPosition);
        yPosition += 7;
        doc.text(`Carbon Sequestration: ${data.gapAnalysis.carbonSequestration.toFixed(2)} kg CO₂`, margin, yPosition);
        yPosition += 7;
        doc.text(`Emission Gap: ${data.gapAnalysis.gap.toFixed(2)} kg CO₂`, margin, yPosition);
        yPosition += 7;
        doc.text(`Gap Percentage: ${data.gapAnalysis.gapPercentage.toFixed(1)}%`, margin, yPosition);
        yPosition += 7;
        doc.text(`Status: ${data.gapAnalysis.status}`, margin, yPosition);
        yPosition += 7;
        
        if (data.gapAnalysis.carbonCreditsNeeded > 0) {
          doc.text(`Carbon Credits Needed: ${data.gapAnalysis.carbonCreditsNeeded.toFixed(3)}`, margin, yPosition);
          yPosition += 7;
        }
      }
    } else {
      const realtimeData = data.data as RealtimeData;
      
      // Stats
      doc.setFontSize(16);
      doc.text('Key Metrics', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      realtimeData.stats.forEach(stat => {
        const trendText = stat.trend ? ` (${stat.trend.isPositive ? '+' : '-'}${stat.trend.value}%)` : '';
        doc.text(`${stat.label}: ${stat.value}${trendText}`, margin, yPosition);
        yPosition += 7;
      });
      
      // Add new page for detailed data if needed
      if (yPosition > 200) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Daily Data Summary
      yPosition += 10;
      doc.setFontSize(16);
      doc.text('Daily Emissions Summary', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      const avgActual = realtimeData.dailyData.reduce((sum, d) => sum + d.actual, 0) / realtimeData.dailyData.length;
      const avgPredicted = realtimeData.dailyData.reduce((sum, d) => sum + d.predicted, 0) / realtimeData.dailyData.length;
      const avgTarget = realtimeData.dailyData.reduce((sum, d) => sum + d.target, 0) / realtimeData.dailyData.length;
      
      doc.text(`Average Actual: ${avgActual.toFixed(0)} tons`, margin, yPosition);
      yPosition += 7;
      doc.text(`Average Predicted: ${avgPredicted.toFixed(0)} tons`, margin, yPosition);
      yPosition += 7;
      doc.text(`Target: ${avgTarget.toFixed(0)} tons`, margin, yPosition);
      yPosition += 7;
      
      // Source Breakdown
      yPosition += 10;
      doc.setFontSize(16);
      doc.text('Emission Sources', margin, yPosition);
      yPosition += 10;
      
      doc.setFontSize(11);
      realtimeData.sourceData.forEach(source => {
        doc.text(`${source.name}: ${source.value}%`, margin, yPosition);
        yPosition += 7;
      });
    }
    
    const defaultFilename = `carbon-emissions-${data.type}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename || defaultFilename);
  }

  static exportToXML(data: ExportData, filename?: string): void {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<CarbonEmissionsReport>\n';
    xmlContent += `  <Type>${data.type}</Type>\n`;
    xmlContent += `  <Timestamp>${data.timestamp}</Timestamp>\n`;
    xmlContent += `  <Generated>${new Date().toISOString()}</Generated>\n`;
    
    if (data.type === 'calculator') {
      const results = data.data as EmissionResults;
      xmlContent += '  <CalculatorResults>\n';
      xmlContent += `    <TotalEmissions>${results.total.toFixed(2)}</TotalEmissions>\n`;
      xmlContent += '    <Breakdown>\n';
      xmlContent += `      <Diesel>${results.diesel.toFixed(2)}</Diesel>\n`;
      xmlContent += `      <Electricity>${results.electricity.toFixed(2)}</Electricity>\n`;
      xmlContent += `      <Explosives>${results.explosives.toFixed(2)}</Explosives>\n`;
      xmlContent += `      <Methane>${results.methane.toFixed(2)}</Methane>\n`;
      xmlContent += '    </Breakdown>\n';
      
      if (data.gapAnalysis) {
        xmlContent += '    <GapAnalysis>\n';
        xmlContent += `      <TargetEmissions>${data.gapAnalysis.targetEmissions.toFixed(2)}</TargetEmissions>\n`;
        xmlContent += `      <CarbonSequestration>${data.gapAnalysis.carbonSequestration.toFixed(2)}</CarbonSequestration>\n`;
        xmlContent += `      <Gap>${data.gapAnalysis.gap.toFixed(2)}</Gap>\n`;
        xmlContent += `      <GapPercentage>${data.gapAnalysis.gapPercentage.toFixed(1)}</GapPercentage>\n`;
        xmlContent += `      <Status>${data.gapAnalysis.status}</Status>\n`;
        xmlContent += `      <CarbonCreditsNeeded>${data.gapAnalysis.carbonCreditsNeeded.toFixed(3)}</CarbonCreditsNeeded>\n`;
        xmlContent += '    </GapAnalysis>\n';
      }
      
      xmlContent += '  </CalculatorResults>\n';
    }
    
    xmlContent += '</CarbonEmissionsReport>';
    
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const defaultFilename = `carbon-emissions-${data.type}-${new Date().toISOString().split('T')[0]}.xml`;
    saveAs(blob, filename || defaultFilename);
  }
}
