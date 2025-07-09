import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { SubscriptionCard } from '../components/SubscriptionCard';

export const SubscriptionsList = ({
  subscriptions,
  onEdit,
  onDelete,
  onAddNew
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['all', 'streaming', 'productivity', 'gaming', 'fitness', 'news', 'music', 'other'];

  const filteredAndSortedSubscriptions = subscriptions
    .filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || sub.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return b.price - a.price;
        case 'renewal':
          return new Date(a.nextRenewal).getTime() - new Date(b.nextRenewal).getTime();
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="mt-2 text-gray-600">Manage all your subscriptions in one place</p>
        </div>
        <button
          onClick={onAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add New</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="renewal">Sort by Renewal Date</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Grid */}
      {filteredAndSortedSubscriptions.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Start tracking your subscriptions to see them here'
              }
            </p>
            <button
              onClick={onAddNew}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Add Your First Subscription
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedSubscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
