import * as React from "react";
import styled from "styled-components";

import "./newsletter.css";

const StyledForm = styled.form`
  background-color: rgb(249, 250, 251);
  border-radius: 4px;
  margin: 1.15rem;
  width: 100%;

  @media (max-width: 768px) {
    margin: 2.25rem;
  }
`;

const NEWSLETTER_OPTIONS = {
  settings: {
    after_subscribe: {
      action: "message",
      success_message:
        "Success! Now check your email to confirm your subscription.",
      redirect_url: "",
    },
    analytics: {
      google: null,
      fathom: null,
      facebook: null,
      segment: null,
      pinterest: null,
      sparkloop: null,
      googletagmanager: null,
    },
    modal: {
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    powered_by: {
      show: true,
      url: "https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic",
    },
    recaptcha: { enabled: true },
    return_visitor: { action: "hide", custom_content: "" },
    slide_in: {
      display_in: "bottom_right",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    sticky_bar: {
      display_in: "top",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
  },
  version: "5",
};

const NewsLetterForm: React.FC = () => (
  <StyledForm
    action="https://app.convertkit.com/forms/6707899/subscriptions"
    className="seva-form formkit-form rad-shadow"
    style={{
      backgroundColor: 'transparent',
      border: 'none',
    }}
    method="post"
    data-sv-form="6707899"
    data-uid="1929cc2957"
    data-format="inline"
    data-version="5"
    data-options={JSON.stringify(NEWSLETTER_OPTIONS)}
    // min-width="400 500 600 700 800"
  >
    <div className="formkit-background bg-surface-3 rad-shadow"></div>
    <div data-style="minimal">
      <div
        className="formkit-header"
        data-element="header"
        style={{
          color: "rgb(77, 77, 77)",
          fontSize: "27px",
          fontWeight: "700",
        }}
      >
        <h3 className="heading">Never Miss an Update.</h3>
      </div>
      <div
        className="formkit-subheader"
        data-element="subheader"
        style={{
          color: "rgb(104, 104, 104)",
          fontSize: "18px",
        }}
      >
        <p className="text-2">Subscribe to get the latest content by email.</p>
      </div>
      <ul
        className="formkit-alert formkit-alert-error"
        data-element="errors"
        data-group="alert"
      ></ul>
      <div
        data-element="fields"
        data-stacked="false"
        className="seva-fields formkit-fields"
      >
        <div className="formkit-field">
          <input
            className="formkit-input"
            name="email_address"
            aria-label="Email Address"
            placeholder="Email Address"
            required
            type="email"
            style={{
              color: "rgb(0, 0, 0)",
              borderColor: "rgb(227, 227, 227)",
              borderRadius: "4px",
              fontWeight: "400",
            }}
          />
        </div>
        <button
          data-element="submit"
          className="formkit-submit formkit-submit bg-surface-4"
          style={{
            color: "rgb(255, 255, 255)",
            // backgroundColor: "rgb(0, 100, 0)",
            borderRadius: "4px",
            fontWeight: "700",
          }}
        >
          <div className="formkit-spinner">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="text-2">Subscribe</span>
        </button>
      </div>
      <div
        className="formkit-guarantee text-2"
        data-element="guarantee"
        style={{
          color: "rgb(77, 77, 77)",
          fontSize: "13px",
          fontWeight: "400",
        }}
      >
        We won't send you spam. Unsubscribe at any time.
      </div>
      <div className="formkit-powered-by-convertkit-container">
        <a
          href="https://convertkit.com/features/forms?utm_campaign=poweredby&amp;utm_content=form&amp;utm_medium=referral&amp;utm_source=dynamic"
          data-element="powered-by"
          className="formkit-powered-by-convertkit"
          data-variant="dark"
          target="_blank"
          rel="nofollow"
        >
          Built with ConvertKit
        </a>
      </div>
    </div>
  </StyledForm>
);

/**
 * Newsletter signup section on the homepage.
 * @returns
 */
const Newsletter: React.FC = () => {
  return (
    <section className="newsletter col flex justify-center">
      <NewsLetterForm />
    </section>
  );
};

export default Newsletter;
