import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = [
  '#EF4444', // red
  '#3B82F6', // blue  
  '#8B5CF6', // purple
  '#10B981', // green
  '#F59E0B', // orange
  '#EC4899', // pink
  '#6B7280'  // gray
];

const categoryLabels = {
  streaming: 'Streaming',
  productivity: 'Productivity',
  gaming: 'Gaming',
  fitness: 'Fitness',
  news: 'News',
  music: 'Music',
  other: 'Other'
};

export const CostBreakdown = ({ subscriptions }) => {
  const categoryData = subscriptions.reduce((acc, sub) => {
    const monthlyPrice = sub.renewalCycle === 'yearly' ? sub.price / 12 : sub.price;
    const category = sub.category;
    
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += monthlyPrice;
    return acc;
  }, {});

  const chartData = Object.entries(categoryData).map(([category, value]) => ({
    name: categoryLabels[category] || category,
    value: parseFloat(value.toFixed(2))
  }));

  const totalMonthly = chartData.reduce((sum, item) => sum + item.value, 0);

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
        <div className="text-center text-gray-500 py-8">
          <p>No subscriptions to display</p>
          <p className="text-sm mt-2">Add some subscriptions to see your cost breakdown</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cost Breakdown</h3>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Monthly</p>
          <p className="text-2xl font-bold text-blue-600">${totalMonthly.toFixed(2)}</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value}`, 'Monthly Cost']} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">${item.value.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};