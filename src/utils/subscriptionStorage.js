import { calculateNextRenewal } from './dateHelpers';

const STORAGE_KEY = 'subtracker-subscriptions';

export const getSubscriptions = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading subscriptions:', error);
    return [];
  }
};

export const saveSubscriptions = (subscriptions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
  } catch (error) {
    console.error('Error saving subscriptions:', error);
  }
};

export const addSubscription = (formData) => {
  const newSubscription = {
    id: Date.now().toString(),
    ...formData,
    nextRenewal: calculateNextRenewal(formData.startDate, formData.renewalCycle),
    isActive: true
  };

  const subscriptions = getSubscriptions();
  subscriptions.push(newSubscription);
  saveSubscriptions(subscriptions);

  return newSubscription;
};

export const updateSubscription = (id, updates) => {
  const subscriptions = getSubscriptions();
  const index = subscriptions.findIndex(sub => sub.id === id);

  if (index !== -1) {
    subscriptions[index] = { ...subscriptions[index], ...updates };

    if (updates.startDate || updates.renewalCycle) {
      subscriptions[index].nextRenewal = calculateNextRenewal(
        subscriptions[index].startDate,
        subscriptions[index].renewalCycle
      );
    }

    saveSubscriptions(subscriptions);
  }
};

export const deleteSubscription = (id) => {
  const subscriptions = getSubscriptions();
  const filtered = subscriptions.filter(sub => sub.id !== id);
  saveSubscriptions(filtered);
};