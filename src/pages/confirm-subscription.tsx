import * as React from 'react';

/** Components */
import Seo from '../components/seo';
import SubscriptionConfirmation from '../components/Confirmation';

const ConfirmationPage: React.FC = () => {
  return (
    <>
      <SubscriptionConfirmation />
    </>
  );
};

export default ConfirmationPage;

export const Head: React.FC = () => <Seo title="Newsletter subscription confirmed" />
