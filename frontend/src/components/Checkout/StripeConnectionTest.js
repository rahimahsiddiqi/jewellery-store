import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiLoader } from 'react-icons/fi';

const StripeConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [error, setError] = useState(null);

  useEffect(() => {
    const testStripeConnection = async () => {
      try {
        // Test if we can create a payment intent (this will verify our keys work)
        const response = await fetch('/api/payments/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: 100, // Test with 100 PKR
            currency: 'pkr',
            customer_email: 'test@example.com'
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.clientSecret) {
            setConnectionStatus('connected');
          } else {
            setConnectionStatus('error');
            setError('Invalid response from Stripe');
          }
        } else {
          setConnectionStatus('error');
          const errorData = await response.json();
          setError(errorData.message || 'Failed to connect to Stripe');
        }
      } catch (err) {
        setConnectionStatus('error');
        setError(err.message);
      }
    };

    testStripeConnection();
  }, []);

  const getStatusDisplay = () => {
    switch (connectionStatus) {
      case 'testing':
        return (
          <div className="flex items-center text-blue-600">
            <FiLoader className="animate-spin mr-2" />
            Testing Stripe connection...
          </div>
        );
      case 'connected':
        return (
          <div className="flex items-center text-green-600">
            <FiCheckCircle className="mr-2" />
            ✅ Stripe connected successfully!
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600">
            <FiXCircle className="mr-2" />
            ❌ Stripe connection failed: {error}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
      <div className="text-sm">
        {getStatusDisplay()}
      </div>
    </div>
  );
};

export default StripeConnectionTest; 