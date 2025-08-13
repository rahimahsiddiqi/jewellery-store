import React from 'react';
import { FiInfo } from 'react-icons/fi';

const StripeTestInfo = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <FiInfo className="text-green-600 mt-1 mr-3 flex-shrink-0" />
        <div>
          <h3 className="text-green-800 font-medium mb-2">✅ Stripe Integration Ready - Test Payment Information</h3>
          <div className="text-sm text-green-700 space-y-1">
            <p><strong>Test Card:</strong> 4242 4242 4242 4242</p>
            <p><strong>Expiry:</strong> Any future date (e.g., 12/25)</p>
            <p><strong>CVC:</strong> Any 3 digits (e.g., 123)</p>
            <p><strong>ZIP:</strong> Any 5 digits (e.g., 12345)</p>
          </div>
          <p className="text-xs text-green-600 mt-2">
            🎉 Stripe is now integrated! This is a test environment. No real charges will be made.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StripeTestInfo; 