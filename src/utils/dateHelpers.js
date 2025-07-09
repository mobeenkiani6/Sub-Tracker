export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getDaysUntilRenewal = (renewalDate) => {
  const today = new Date();
  const renewal = new Date(renewalDate);
  const diffTime = renewal.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateNextRenewal = (startDate, renewalCycle) => {
  const start = new Date(startDate);
  const today = new Date();

  if (renewalCycle === 'monthly') {
    let nextRenewal = new Date(start);
    while (nextRenewal <= today) {
      nextRenewal.setMonth(nextRenewal.getMonth() + 1);
    }
    return nextRenewal.toISOString().split('T')[0];
  } else {
    let nextRenewal = new Date(start);
    while (nextRenewal <= today) {
      nextRenewal.setFullYear(nextRenewal.getFullYear() + 1);
    }
    return nextRenewal.toISOString().split('T')[0];
  }
};

export const isWithinDays = (date, days) => {
  const targetDate = new Date(date);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= days;
};