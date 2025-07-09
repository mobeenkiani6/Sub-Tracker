import React, { useState } from 'react';
import { Moon, Sun, Bell, Download, Trash2, Shield } from 'lucide-react';

export const Settings = ({ onClearAllData }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailReminders, setEmailReminders] = useState(false);

  const handleExportData = () => {
    const subscriptions = JSON.parse(localStorage.getItem('subtracker-subscriptions') || '[]');
    const dataStr = JSON.stringify(subscriptions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'subtracker-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      onClearAllData();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Customize your SubTracker experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Sun size={20} className="mr-2" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bell size={20} className="mr-2" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Browser Notifications</p>
                <p className="text-sm text-gray-600">Get notified about upcoming renewals</p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  notifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Reminders</p>
                <p className="text-sm text-gray-600">Receive email notifications (coming soon)</p>
              </div>
              <button
                onClick={() => setEmailReminders(!emailReminders)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailReminders ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                disabled
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailReminders ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield size={20} className="mr-2" />
            Data Management
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Export Data</p>
                <p className="text-sm text-gray-600">Download your subscription data as JSON</p>
              </div>
              <button
                onClick={handleExportData}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors flex items-center space-x-2"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Clear All Data</p>
                <p className="text-sm text-gray-600">Remove all subscriptions and reset the app</p>
              </div>
              <button
                onClick={handleClearData}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About SubTracker</h2>
          <div className="space-y-2">
            <p className="text-gray-600">Version 1.0.0</p>
            <p className="text-gray-600">
              SubTracker helps you manage and track all your subscription services in one place.
              Stay on top of your monthly expenses and never miss a renewal again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};