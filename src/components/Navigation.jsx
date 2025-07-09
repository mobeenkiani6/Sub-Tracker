import React from 'react';
import { Home, List, Plus, Settings } from 'lucide-react';

export const Navigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'subscriptions', label: 'Subscriptions', icon: List },
    { id: 'add', label: 'Add New', icon: Plus },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">SubTracker</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map(item => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} className="mr-2" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};