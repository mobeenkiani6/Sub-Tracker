// Possible categories
export const CategoryTypes = [
  'streaming',
  'productivity',
  'gaming',
  'fitness',
  'news',
  'music',
  'other'
];

/**
 * @typedef {Object} Subscription
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {'monthly' | 'yearly'} renewalCycle
 * @property {string} startDate
 * @property {string} category
 * @property {string} [notes]
 * @property {string} nextRenewal
 * @property {boolean} isActive
 */

/**
 * @typedef {Object} SubscriptionFormData
 * @property {string} name
 * @property {number} price
 * @property {'monthly' | 'yearly'} renewalCycle
 * @property {string} startDate
 * @property {string} category
 * @property {string} [notes]
 */
