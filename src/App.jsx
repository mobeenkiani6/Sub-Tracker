import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './pages/Dashboard';
import { SubscriptionsList } from './pages/SubscriptionsList';
import { Settings } from './pages/Settings';
import { AddSubscriptionForm } from './components/AddSubscriptionForm';
import {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription
} from './utils/subscriptionStorage';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [subscriptions, setSubscriptions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);

  useEffect(() => {
    setSubscriptions(getSubscriptions());
  }, []);

  const handleAddSubscription = (formData) => {
    const newSubscription = addSubscription(formData);
    setSubscriptions(prev => [...prev, newSubscription]);
    setShowAddForm(false);
  };

  const handleEditSubscription = (subscription) => {
    setEditingSubscription(subscription);
    setShowAddForm(true);
  };

  const handleUpdateSubscription = (formData) => {
    if (editingSubscription) {
      updateSubscription(editingSubscription.id, formData);
      setSubscriptions(getSubscriptions());
      setEditingSubscription(null);
      setShowAddForm(false);
    }
  };

  const handleDeleteSubscription = (id) => {
    if (window.confirm('Are you sure you want to delete this subscription?')) {
      deleteSubscription(id);
      setSubscriptions(getSubscriptions());
    }
  };

  const handleClearAllData = () => {
    localStorage.removeItem('subtracker-subscriptions');
    setSubscriptions([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 'add') {
      setShowAddForm(true);
      setEditingSubscription(null);
    } else {
      setShowAddForm(false);
      setEditingSubscription(null);
    }
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingSubscription(null);
    if (currentPage === 'add') {
      setCurrentPage('dashboard');
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard subscriptions={subscriptions} />;
      case 'subscriptions':
        return (
          <SubscriptionsList
            subscriptions={subscriptions}
            onEdit={handleEditSubscription}
            onDelete={handleDeleteSubscription}
            onAddNew={() => setShowAddForm(true)}
          />
        );
      case 'settings':
        return <Settings onClearAllData={handleClearAllData} />;
      default:
        return <Dashboard subscriptions={subscriptions} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>{renderCurrentPage()}</main>

      {showAddForm && (
        <AddSubscriptionForm
          onSubmit={editingSubscription ? handleUpdateSubscription : handleAddSubscription}
          onCancel={handleCloseForm}
          initialData={
            editingSubscription
              ? {
                  name: editingSubscription.name,
                  price: editingSubscription.price,
                  renewalCycle: editingSubscription.renewalCycle,
                  startDate: editingSubscription.startDate,
                  category: editingSubscription.category,
                  notes: editingSubscription.notes || ''
                }
              : undefined
          }
          isEdit={!!editingSubscription}
        />
      )}
    </div>
  );
}

export default App;
