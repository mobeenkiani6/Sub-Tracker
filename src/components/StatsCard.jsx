import React from 'react';

export const StatsCard = ({
  title,
  value,
  change,
  icon: Icon,
  iconColor
}) => {
  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-red-600';
      case 'down': return 'text-green-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${getTrendColor(change.trend)}`}>
              {change.value}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${iconColor}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};