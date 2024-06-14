import * as React from 'react';
import styled from 'styled-components';

import './newsletter.css';

const StyledNewspaperSection = styled.section`
  div {
    display: inline-flex;
    justify-content: space-between;
    align-content: center;
    background-color: #f4f4f4;
    min-height: 4.5rem;
  }

  div > p {
    font-family: var(--font-heading);
    margin: 5px;
    text-align: center;
    padding-left: 35px;
    font-size: 30px;
  }

  iframe[data-w-type='trigger'] {
    height: 105px;
  }
`;

const NewsLetterForm = () => (
  <>
    <script src='https://f.convertkit.com/ckjs/ck.5.js'></script>
    <form
      action='https://app.convertkit.com/forms/6707899/subscriptions'
      className='seva-form formkit-form'
      method='post'
      data-sv-form='6707899'
      data-uid='1929cc2957'
      data-format='inline'
      data-version='5'
      data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"fathom":null,"facebook":null,"segment":null,"pinterest":null,"sparkloop":null,"googletagmanager":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"},"recaptcha":{"enabled":true},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
      min-width='400 500 600 700 800'
      style={{
        backgroundColor: 'rgb(249, 250, 251)',
        borderRadius: '4px',
      }}
    >
      <div className='formkit-background' style={{ opacity: '0.2' }}></div>
      <div data-style='minimal'>
        <div
          className='formkit-header'
          data-element='header'
          style={{
            color: 'rgb(77, 77, 77)',
            fontSize: '27px',
            fontWeight: '700',
          }}
        >
          <h2>Never Miss an Update.</h2>
        </div>
        <div
          className='formkit-subheader'
          data-element='subheader'
          style={{
            color: 'rgb(104, 104, 104)',
            fontSize: '18px',
          }}
        >
          <p>Subscribe to get the latest content by email.</p>
        </div>
        <ul
          className='formkit-alert formkit-alert-error'
          data-element='errors'
          data-group='alert'
        ></ul>
        <div
          data-element='fields'
          data-stacked='false'
          className='seva-fields formkit-fields'
        >
          <div className='formkit-field'>
            <input
              className='formkit-input'
              name='email_address'
              aria-label='Email Address'
              placeholder='Email Address'
              required
              type='email'
              style={{
                color: 'rgb(0, 0, 0)',
                borderColor: 'rgb(227, 227, 227)',
                borderRadius: '4px',
                fontWeight: '400',
              }}
            />
          </div>
          <button
            data-element='submit'
            className='formkit-submit formkit-submit'
            style={{
              color: 'rgb(255, 255, 255)',
              backgroundColor: 'rgb(0, 100, 0)',
              borderRadius: '4px',
              fontWeight: '700',
            }}
          >
            <div className='formkit-spinner'>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <span className=''>Subscribe</span>
          </button>
        </div>
        <div
          className='formkit-guarantee'
          data-element='guarantee'
          style={{
            color: 'rgb(77, 77, 77)',
            fontSize: '13px',
            fontWeight: '400',
          }}
        >
          We won't send you spam. Unsubscribe at any time.
        </div>
        <div className='formkit-powered-by-convertkit-container'>
          <a
            href='https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic'
            data-element='powered-by'
            className='formkit-powered-by-convertkit'
            data-variant='dark'
            target='_blank'
            rel='nofollow'
          >
            Built with ConvertKit
          </a>
        </div>
      </div>
    </form>
  </>
);

/**
 * Newsletter signup section on the homepage.
 * @returns
 */
const Newsletter: React.FC = () => {
  return (
    <NewsLetterForm />
    // <StyledNewspaperSection>
    //   <div>
    //     <p>Never Miss a New Post.</p>
    //     <div>
    //       <iframe
    //         data-w-token='bfcc24aa21ef34249119'
    //         data-w-type='pop-in'
    //         frameBorder='0'
    //         scrolling='yes'
    //         src='https://07w6k.mjt.lu/wgt/07w6k/z9g/form?c=e9ed7cf1'
    //         width='100%'
    //         style={{ height: 0 }}
    //       ></iframe>
    //       <iframe
    //         data-w-token='bfcc24aa21ef34249119'
    //         data-w-type='trigger'
    //         frameBorder='0'
    //         scrolling='no'
    //         src='https://07w6k.mjt.lu/wgt/07w6k/z9g/trigger?c=590ebb63'
    //         width='100%'
    //         style={{ height: '60px', width: '150px' }}
    //       ></iframe>
    //     </div>
    //   </div>
    // </StyledNewspaperSection>
  );
};

export default Newsletter;
