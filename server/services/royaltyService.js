/**
 * Royalty Calculation Service
 * 
 * Handles complex logic for Transfer and Content Consultants (TCC) royalty distributions.
 * This service encapsulates business rules to ensure accuracy across diverse contract types.
 */

/**
 * Calculates net royalty for a specific period based on gross revenue and contract terms.
 * 
 * @param {number} grossRevenue - Total revenue generated for the period.
 * @param {Object} contract - Contract terms (rate, deductions, thresholds).
 * @returns {Object} Calculated royalty components.
 */
export const calculateRoyalty = (grossRevenue, contract) => {
    const { rate, deductions = 0, threshold = 0 } = contract;

    // Business Logic: Royalties are only paid on revenue exceeding the contract threshold.
    const applicableRevenue = Math.max(0, grossRevenue - threshold);
    
    // Net profit after fixed contract deductions
    const netRevenue = Math.max(0, applicableRevenue - deductions);
    
    const payout = netRevenue * (rate / 100);

    return {
        grossRevenue,
        applicableRevenue,
        netRevenue,
        payout: Number(payout.toFixed(2)),
        timestamp: new Date().toISOString()
    };
};

/**
 * Aggregates royalty data across multiple products or creators.
 * Uses a reducer pattern to ensure immutability and predictability.
 */
export const aggregateRoyalties = (dataPoints, contract) => {
    return dataPoints.reduce((acc, point) => {
        const calc = calculateRoyalty(point.revenue, contract);
        acc.totalPayout += calc.payout;
        acc.totalRevenue += calc.grossRevenue;
        acc.breakdown.push(calc);
        return acc;
    }, { totalPayout: 0, totalRevenue: 0, breakdown: [] });
};
