import React from 'react';
import { DollarSign, CreditCard, TrendingUp, Calendar } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { CostBreakdown } from '../components/CostBreakdown';
import { UpcomingRenewals } from '../components/UpcomingRenewals';
import { isWithinDays } from '../utils/dateHelpers';

export const Dashboard = ({ subscriptions }) => {
  const totalMonthly = subscriptions.reduce((sum, sub) => {
    const monthlyPrice = sub.renewalCycle === 'yearly' ? sub.price / 12 : sub.price;
    return sum + monthlyPrice;
  }, 0);

  const totalYearly = subscriptions.reduce((sum, sub) => {
    const yearlyPrice = sub.renewalCycle === 'monthly' ? sub.price * 12 : sub.price;
    return sum + yearlyPrice;
  }, 0);

  const upcomingRenewals = subscriptions.filter(sub =>
    isWithinDays(sub.nextRenewal, 7)
  ).length;

  const activeSubscriptions = subscriptions.filter(sub => sub.isActive).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your subscription spending</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Monthly Total"
          value={`$${totalMonthly.toFixed(2)}`}
          icon={DollarSign}
          iconColor="bg-green-500"
        />
        <StatsCard
          title="Yearly Total"
          value={`$${totalYearly.toFixed(2)}`}
          icon={TrendingUp}
          iconColor="bg-blue-500"
        />
        <StatsCard
          title="Active Subscriptions"
          value={activeSubscriptions.toString()}
          icon={CreditCard}
          iconColor="bg-purple-500"
        />
        <StatsCard
          title="Due This Week"
          value={upcomingRenewals.toString()}
          icon={Calendar}
          iconColor="bg-orange-500"
        />
      </div>

      {/* Charts and Renewals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CostBreakdown subscriptions={subscriptions} />
        <UpcomingRenewals subscriptions={subscriptions} />
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">Export Data</h4>
              <p className="text-sm text-gray-600 mt-1">Download your subscription data as CSV</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">Set Reminders</h4>
              <p className="text-sm text-gray-600 mt-1">Get notified before renewals</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-medium text-gray-900">Budget Goals</h4>
              <p className="text-sm text-gray-600 mt-1">Set monthly spending targets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};