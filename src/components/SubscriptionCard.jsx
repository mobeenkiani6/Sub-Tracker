import React from 'react';
import { Calendar, DollarSign, Edit2, Trash2, Clock } from 'lucide-react';
import { formatDate, getDaysUntilRenewal } from '../utils/dateHelpers';

const categoryColors = {
  streaming: 'bg-red-100 text-red-700',
  productivity: 'bg-blue-100 text-blue-700',
  gaming: 'bg-purple-100 text-purple-700',
  fitness: 'bg-green-100 text-green-700',
  news: 'bg-orange-100 text-orange-700',
  music: 'bg-pink-100 text-pink-700',
  other: 'bg-gray-100 text-gray-700'
};

export const SubscriptionCard = ({
  subscription,
  onEdit,
  onDelete
}) => {
  const daysUntilRenewal = getDaysUntilRenewal(subscription.nextRenewal);
  const monthlyPrice = subscription.renewalCycle === 'yearly' 
    ? subscription.price / 12 
    : subscription.price;

  const getRenewalStatus = () => {
    if (daysUntilRenewal < 0) return { text: 'Overdue', color: 'text-red-600' };
    if (daysUntilRenewal === 0) return { text: 'Due Today', color: 'text-red-600' };
    if (daysUntilRenewal <= 7) return { text: `${daysUntilRenewal} days`, color: 'text-orange-600' };
    return { text: `${daysUntilRenewal} days`, color: 'text-gray-600' };
  };

  const renewalStatus = getRenewalStatus();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{subscription.name}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColors[subscription.category]}`}>
            {subscription.category}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(subscription)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => onDelete(subscription.id)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <DollarSign size={16} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Price</p>
            <p className="font-semibold text-gray-900">
              ${subscription.price}/{subscription.renewalCycle === 'monthly' ? 'mo' : 'yr'}
            </p>
            {subscription.renewalCycle === 'yearly' && (
              <p className="text-xs text-gray-500">${monthlyPrice.toFixed(2)}/mo</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Next Renewal</p>
            <p className="font-semibold text-gray-900">{formatDate(subscription.nextRenewal)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 md:col-span-2">
          <Clock size={16} className={renewalStatus.color} />
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className={`font-semibold ${renewalStatus.color}`}>{renewalStatus.text}</p>
          </div>
        </div>
      </div>

      {subscription.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-700">{subscription.notes}</p>
        </div>
      )}
    </div>
  );
};