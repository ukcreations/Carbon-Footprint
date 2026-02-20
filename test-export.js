// Test script to verify export functionality
// This can be run in the browser console to test all export formats

const testCalculatorData = {
  type: 'calculator',
  timestamp: new Date().toISOString(),
  data: {
    diesel: 1340,
    electricity: 325,
    explosives: 640,
    methane: 500,
    total: 2805,
    breakdown: [
      { label: 'Diesel', value: 1340, percentage: 47.8 },
      { label: 'Methane', value: 500, percentage: 17.8 },
      { label: 'Explosives', value: 640, percentage: 22.8 },
      { label: 'Electricity', value: 325, percentage: 11.6 }
    ]
  },
  gapAnalysis: {
    totalEmissions: 2805,
    targetEmissions: 2500,
    carbonSequestration: 300,
    gap: 2505,
    gapPercentage: 12.2,
    status: 'above',
    carbonCreditsNeeded: 0.305
  }
};

const testRealtimeData = {
  type: 'realtime',
  timestamp: new Date().toISOString(),
  data: {
    dailyData: [
      { day: 'Mon', actual: 450, predicted: 480, target: 400 },
      { day: 'Tue', actual: 520, predicted: 510, target: 400 },
      { day: 'Wed', actual: 480, predicted: 500, target: 400 },
      { day: 'Thu', actual: 510, predicted: 490, target: 400 },
      { day: 'Fri', actual: 560, predicted: 540, target: 400 },
      { day: 'Sat', actual: 380, predicted: 420, target: 400 },
      { day: 'Sun', actual: 350, predicted: 380, target: 400 }
    ],
    monthlyData: [
      { month: 'Jan', emissions: 12400, credits: 8200 },
      { month: 'Feb', emissions: 13200, credits: 7800 },
      { month: 'Mar', emissions: 11800, credits: 8600 },
      { month: 'Apr', emissions: 14300, credits: 7200 },
      { month: 'May', emissions: 13100, credits: 8900 },
      { month: 'Jun', emissions: 12800, credits: 8500 }
    ],
    sourceData: [
      { name: 'Excavation', value: 45, color: '#1a5f3f' },
      { name: 'Equipment', value: 30, color: '#2d9d5e' },
      { name: 'Transportation', value: 20, color: '#4db877' },
      { name: 'Other', value: 5, color: '#7ec9a3' }
    ],
    accuracyData: [
      { week: 'W1', actual: 3200, predicted: 3180, diff: 20 },
      { week: 'W2', actual: 3450, predicted: 3420, diff: 30 },
      { week: 'W3', actual: 3100, predicted: 3080, diff: 20 },
      { week: 'W4', actual: 3350, predicted: 3400, diff: -50 }
    ],
    stats: [
      {
        label: "Today's Emissions",
        value: '485 tons',
        trend: { value: 8, isPositive: false }
      },
      {
        label: 'Week Average',
        value: '470 tons',
        trend: { value: 5, isPositive: true }
      },
      {
        label: 'Carbon Credits',
        value: '8,200',
        trend: { value: 12, isPositive: true }
      },
      {
        label: 'Emission Gap',
        value: '18.5%',
        trend: { value: 3, isPositive: false }
      }
    ]
  }
};

console.log('Test data prepared for export functionality');
console.log('Calculator data:', testCalculatorData);
console.log('Realtime data:', testRealtimeData);

// Instructions:
// 1. Open the browser console on the calculator or dashboard page
// 2. Copy and paste this script to test the export functions
// 3. The export functions should be available through the DataExporter class
