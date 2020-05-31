import moment from 'moment';

export const generateLeasePaymentCycles = ({start_date, end_date, rent, frequency, payment_day}) => {
    let cycles = [];
    const amountForDay = rent/7;
    const cycleDuration = calculateDurationDaysCount(frequency);

    // Initial start date position
    const startDateIndex = moment(start_date).day();
    const paymentDateIndex = moment(moment().days(payment_day)).day();

    let leaseCycleStartDate = start_date;

    // Check if lease start day is the same as payment day
    if (startDateIndex !== paymentDateIndex) {
        const {gap, leaseStart} = calculateLeaseCycleStartDate(startDateIndex, paymentDateIndex, start_date);
        leaseCycleStartDate = moment(leaseStart).add(1, 'days').format('yyyy-MM-DD');
        cycles.push({from: start_date, to: moment(leaseStart).format('yyyy-MM-DD'), days: gap, amount: (amountForDay * gap).toFixed(2)});
    }
    
    // Generate full lease cycle of frequency to the lease end date
    while (moment(leaseCycleStartDate).add(cycleDuration, 'days') <= moment(end_date)) {
        const cycleEndDate = moment(leaseCycleStartDate).add(cycleDuration - 1, 'days');
        cycles.push({from: moment(leaseCycleStartDate).format('yyyy-MM-DD'), to: moment(cycleEndDate).format('yyyy-MM-DD'), days: cycleDuration, amount: (amountForDay * cycleDuration).toFixed(2)});
        leaseCycleStartDate = cycleEndDate.add(1, 'days');
    }

    // Calculate remaining days to lease end date from full lease cycle end
    const endCycle = moment(end_date).diff(moment(leaseCycleStartDate).subtract(1, 'days'), 'days');
    cycles.push({from: moment(leaseCycleStartDate).format('yyyy-MM-DD'), to: end_date, days: endCycle, amount: (amountForDay * endCycle).toFixed(2)});

    return cycles;
}

export const calculateDurationDaysCount = type => {
    switch (type) {
        case 'monthly':
            return 28;
        case 'fortnightly':
            return 14;
        case 'weekly':
            return 7;
        default:
            return 7;
    }
};

const calculateLeaseCycleStartDate = (startDateIndex, paymentDateIndex, start_date) => {
    let gap, leaseStart;

    if (startDateIndex < paymentDateIndex) {
        leaseStart = moment(start_date).add(paymentDateIndex - startDateIndex - 1, 'days');
        gap = paymentDateIndex - startDateIndex;
    } else {
        leaseStart = moment(start_date).add(7 - paymentDateIndex, 'days');
        gap = 7 - paymentDateIndex + 1;
    }    
    
    return {gap, leaseStart};
}