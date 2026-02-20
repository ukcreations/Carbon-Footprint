// Emission factors based on standard carbon accounting principles
export const EMISSION_FACTORS = {
  diesel: 2.68, // kg CO₂ per Litre
  electricity: 0.65, // kg CO₂ per KWh (India average grid)
  explosives: 3.2, // kg CO₂ per Kg
  methane: 25, // kg CO₂ per Ton (GWP 25-year)
};

export interface EmissionInputs {
  diesel: number;
  electricity: number;
  explosives: number;
  methane: number;
}

export interface EmissionResults {
  diesel: number;
  electricity: number;
  explosives: number;
  methane: number;
  total: number;
  breakdown: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

export interface GapAnalysis {
  totalEmissions: number;
  targetEmissions: number;
  carbonSequestration: number;
  gap: number;
  gapPercentage: number;
  status: 'above' | 'below' | 'on-target';
  carbonCreditsNeeded: number;
}

/**
 * Calculate carbon emissions from mining activities
 * Formula: Emission = Activity Data × Emission Factor
 */
export function calculateEmissions(inputs: EmissionInputs): EmissionResults {
  // Validate inputs
  Object.values(inputs).forEach((value) => {
    if (value < 0) {
      throw new Error('All input values must be non-negative');
    }
    if (!Number.isFinite(value)) {
      throw new Error('All input values must be valid numbers');
    }
  });

  // Calculate individual emissions
  const dieselEmission = inputs.diesel * EMISSION_FACTORS.diesel;
  const electricityEmission = inputs.electricity * EMISSION_FACTORS.electricity;
  const explosivesEmission = inputs.explosives * EMISSION_FACTORS.explosives;
  const methaneEmission = inputs.methane * EMISSION_FACTORS.methane;

  const total =
    dieselEmission +
    electricityEmission +
    explosivesEmission +
    methaneEmission;

  // Create breakdown for visualization
  const breakdown = [
    {
      label: 'Diesel',
      value: dieselEmission,
      percentage: total > 0 ? (dieselEmission / total) * 100 : 0,
    },
    {
      label: 'Electricity',
      value: electricityEmission,
      percentage: total > 0 ? (electricityEmission / total) * 100 : 0,
    },
    {
      label: 'Explosives',
      value: explosivesEmission,
      percentage: total > 0 ? (explosivesEmission / total) * 100 : 0,
    },
    {
      label: 'Methane',
      value: methaneEmission,
      percentage: total > 0 ? (methaneEmission / total) * 100 : 0,
    },
  ].sort((a, b) => b.value - a.value);

  return {
    diesel: dieselEmission,
    electricity: electricityEmission,
    explosives: explosivesEmission,
    methane: methaneEmission,
    total,
    breakdown,
  };
}

/**
 * Calculate gap analysis based on total emissions and targets
 * Gap = Total Emissions - Carbon Sequestration Capacity
 */
export function calculateGapAnalysis(
  totalEmissions: number,
  targetEmissions: number = 1000, // Default monthly target in kg CO₂
  carbonSequestration: number = 200 // Default sequestration capacity in kg CO₂
): GapAnalysis {
  const gap = totalEmissions - carbonSequestration;
  const gapPercentage =
    targetEmissions > 0 ? ((totalEmissions - targetEmissions) / targetEmissions) * 100 : 0;

  let status: 'above' | 'below' | 'on-target' = 'on-target';
  if (totalEmissions > targetEmissions) {
    status = 'above';
  } else if (totalEmissions < targetEmissions) {
    status = 'below';
  }

  // Carbon credits calculation: 1 credit = 1 ton CO₂
  // If emissions exceed target, calculate credits needed
  const excessEmissions = Math.max(0, totalEmissions - targetEmissions);
  const carbonCreditsNeeded = excessEmissions / 1000; // Convert kg to tons

  return {
    totalEmissions,
    targetEmissions,
    carbonSequestration,
    gap,
    gapPercentage,
    status,
    carbonCreditsNeeded,
  };
}

/**
 * Format emission values for display
 */
export function formatEmission(value: number, unit: string = 'kg CO₂'): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)} M ${unit}`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(2)} k ${unit}`;
  }
  return `${value.toFixed(2)} ${unit}`;
}

/**
 * Get emission factor description
 */
export function getEmissionFactorDescription(
  factor: keyof typeof EMISSION_FACTORS
): string {
  const descriptions: Record<keyof typeof EMISSION_FACTORS, string> = {
    diesel: 'CO₂ emissions per litre of diesel fuel consumed',
    electricity: 'CO₂ emissions per kilowatt-hour (India grid average)',
    explosives: 'CO₂ emissions per kilogram of explosives used',
    methane: 'CO₂ equivalent per ton of methane (25-year GWP)',
  };
  return descriptions[factor];
}
