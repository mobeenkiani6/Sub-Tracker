import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import { formatDate, getDaysUntilRenewal } from '../utils/dateHelpers';

export const UpcomingRenewals = ({ subscriptions }) => {
  const upcomingRenewals = subscriptions
    .map(sub => ({
      ...sub,
      daysUntilRenewal: getDaysUntilRenewal(sub.nextRenewal)
    }))
    .filter(sub => sub.daysUntilRenewal <= 30)
    .sort((a, b) => a.daysUntilRenewal - b.daysUntilRenewal);

  const getStatusColor = (days) => {
    if (days < 0) return 'text-red-600 bg-red-50';
    if (days === 0) return 'text-red-600 bg-red-50';
    if (days <= 7) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getStatusIcon = (days) => {
    if (days < 0 || days === 0) return <AlertCircle size={16} className="text-red-600" />;
    if (days <= 7) return <Clock size={16} className="text-orange-600" />;
    return <Calendar size={16} className="text-blue-600" />;
  };

  const getStatusText = (days) => {
    if (days < 0) return 'Overdue';
    if (days === 0) return 'Due Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Renewals</h3>
      
      {upcomingRenewals.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No renewals in the next 30 days</p>
          <p className="text-sm mt-2">You're all set!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingRenewals.map(sub => (
            <div
              key={sub.id}
              className={`p-4 rounded-lg border-l-4 ${
                sub.daysUntilRenewal <= 0
                  ? 'border-red-500 bg-red-50'
                  : sub.daysUntilRenewal <= 7
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-blue-500 bg-blue-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(sub.daysUntilRenewal)}
                  <div>
                    <p className="font-medium text-gray-900">{sub.name}</p>
                    <p className="text-sm text-gray-600">{formatDate(sub.nextRenewal)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold px-2 py-1 rounded ${getStatusColor(sub.daysUntilRenewal)}`}>
                    {getStatusText(sub.daysUntilRenewal)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">${sub.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};