const VOLUME_CONVERSIONS = {
    // To milliliters (ml)
    tsp: 4.93,
    tbsp: 14.79,
    'fl oz': 29.57,
    cup: 236.59,
    gal: 3785.41,
    
    // From milliliters
    ml: 1,
    l: 1000,
    m3: 1000000
};

const WEIGHT_CONVERSIONS = {
    // To grams (g)
    oz: 28.35,
    lb: 453.59,
    
    // From grams
    mg: 0.001,
    g: 1,
    kg: 1000
};

export const convertUnit = (amount, fromUnit, toSystem) => {
    // Normalize unit names
    fromUnit = fromUnit.toLowerCase();
    
    // Don't convert count units
    if (fromUnit === 'count') return { amount, unit: fromUnit };
    
    // Determine if it's a volume or weight measurement
    const isVolume = fromUnit in VOLUME_CONVERSIONS;
    const isWeight = fromUnit in WEIGHT_CONVERSIONS;
    
    if (!isVolume && !isWeight) return { amount, unit: fromUnit };
    
    if (isVolume) {
        // Convert to ml first
        const mlAmount = amount * VOLUME_CONVERSIONS[fromUnit];
        
        if (toSystem === 'metric') {
            // Convert to appropriate metric unit
            if (mlAmount >= 1000000) return { amount: mlAmount / 1000000, unit: 'm3' };
            if (mlAmount >= 1000) return { amount: mlAmount / 1000, unit: 'l' };
            return { amount: mlAmount, unit: 'ml' };
        } else {
            // Convert to appropriate imperial unit
            if (mlAmount >= 3785.41) return { amount: mlAmount / 3785.41, unit: 'gal' };
            if (mlAmount >= 236.59) return { amount: mlAmount / 236.59, unit: 'cup' };
            if (mlAmount >= 29.57) return { amount: mlAmount / 29.57, unit: 'fl oz' };
            if (mlAmount >= 14.79) return { amount: mlAmount / 14.79, unit: 'tbsp' };
            return { amount: mlAmount / 4.93, unit: 'tsp' };
        }
    }
    
    if (isWeight) {
        // Convert to g first
        const gAmount = amount * WEIGHT_CONVERSIONS[fromUnit];
        
        if (toSystem === 'metric') {
            // Convert to appropriate metric unit
            if (gAmount >= 1000) return { amount: gAmount / 1000, unit: 'kg' };
            if (gAmount < 1) return { amount: gAmount * 1000, unit: 'mg' };
            return { amount: gAmount, unit: 'g' };
        } else {
            // Convert to appropriate imperial unit
            if (gAmount >= 453.59) return { amount: gAmount / 453.59, unit: 'lb' };
            return { amount: gAmount / 28.35, unit: 'oz' };
        }
    }
};