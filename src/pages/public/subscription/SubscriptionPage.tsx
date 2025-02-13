import React from 'react';
import SubscriptionForm from './SubscriptionForm';

const SubscriptionPage: React.FC = () => {

    const handleSubscriptionSuccess = () => {
      console.log('Subscription request submitted successfully!');
    };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-center text-2xl font-bold">طلب اشتراك</h1>
      <p className="mb-6 text-center">املأ النموذج التالي لطلب الاشتراك في نظام فلك للموارد البشرية.</p>
      <SubscriptionForm onSuccess={handleSubscriptionSuccess} />
    </div>
  );
};

export default SubscriptionPage;