import moment from 'moment';

export const calculateLeasePayments = ({start_date, end_date, rent, frequency, payment_day}) => {
    console.log({start_date, end_date, rent, frequency, payment_day});

    const amountForDay = rent/7;
    let cycleDuration;
    let cycles = [];

    switch (frequency) {
        case 'monthly':
            cycleDuration = 30;
            break;
        case 'fortnightly':
            cycleDuration = 14;
            break;
        case 'weekly':
            cycleDuration = 7;
            break;
        default:
            break;
    }

    const start = moment(start_date).day();
    const paymentDate = moment(moment().days(payment_day)).day();
    
    let startGap, leaseStartDate;

    console.log(start, paymentDate);
    
    // Check for the initial lease cycle start date
    if (start <= paymentDate) {
        leaseStartDate = moment(start_date).add(7 - paymentDate - 1, 'days');
        startGap = 7 - paymentDate;
    } else {
        leaseStartDate = moment(start_date).add(7 - paymentDate - 1, 'days');
        startGap = 7 - paymentDate;
    }

    console.log(leaseStartDate, startGap);

    // Add the duration form start date to lease cycle start
    cycles.push({from: start_date, to: moment(leaseStartDate).format('yyyy-MM-DD'), days: startGap, amount: (amountForDay * startGap).toFixed(2)});
    
    let cycleStartDate = leaseStartDate.add(1, 'days');

    // Generate full lease cycle of frequency until lease end date
    while (moment(cycleStartDate).add(cycleDuration, 'days') < moment(end_date)) {
        const secondEndDate = moment(cycleStartDate).add(cycleDuration - 1, 'days');
        cycles.push({from: moment(cycleStartDate).format('yyyy-MM-DD'), to: moment(secondEndDate).format('yyyy-MM-DD'), days: cycleDuration, amount: (amountForDay * cycleDuration).toFixed(2)});
        cycleStartDate = secondEndDate.add(1, 'days');
    }

    // Remaining days to lease end date from full lease cycle end
    const endCycle = moment(end_date).diff(moment(cycleStartDate).subtract(1, 'days'), 'days');
    cycles.push({from: moment(cycleStartDate).format('yyyy-MM-DD'), to: end_date, days: endCycle, amount: (amountForDay * endCycle).toFixed(2)});

    return cycles;
}