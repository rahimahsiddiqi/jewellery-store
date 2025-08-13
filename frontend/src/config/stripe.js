import { loadStripe } from '@stripe/stripe-js';

// Stripe publishable key from environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RvEjOFts6RlPrf5nED783bZeznfnabEQGzpR2awFXiteYQN1YnyurUaG8wCZRdciTvJNoP1fh5xMM2YTRBSOLge00fBItpacB');

export default stripePromise; 