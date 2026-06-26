import * as React from "react";

import * as styles from "./newsletter.module.css";

const CONVERTKIT_FORM_ID = "6707899";
const CONVERTKIT_FORM_UID = "1929cc2957";

const CONVERTKIT_POWERED_BY_URL =
  "https://convertkit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic";

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
      url: CONVERTKIT_POWERED_BY_URL,
    },
    recaptcha: {
      enabled: false,
    },
    return_visitor: {
      action: "hide",
      custom_content: "",
    },
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
} as const;

type ClassNameValue = string | false | null | undefined;

function joinClassNames(...classNames: ClassNameValue[]): string {
  return classNames.filter(Boolean).join(" ");
}

const NewsletterForm: React.FC = () => {
  return (
    <form
      action={`https://app.convertkit.com/forms/${CONVERTKIT_FORM_ID}/subscriptions`}
      className={joinClassNames(
        styles.form,
        "seva-form",
        "formkit-form",
        "rad-shadow",
      )}
      method="post"
      data-sv-form={CONVERTKIT_FORM_ID}
      data-uid={CONVERTKIT_FORM_UID}
      data-format="inline"
      data-version="5"
      data-options={JSON.stringify(NEWSLETTER_OPTIONS)}
    >
      <div
        className={joinClassNames(
          styles.background,
          "formkit-background",
          "bg-surface-3",
          "rad-shadow",
        )}
        aria-hidden="true"
      />

      <div className={styles.content} data-style="minimal">
        <header
          className={joinClassNames(styles.header, "formkit-header")}
          data-element="header"
        >
          <h3 id="newsletter-heading" className={styles.heading}>
            Never Miss an Update.
          </h3>
        </header>

        <div
          className={joinClassNames(styles.subheader, "formkit-subheader")}
          data-element="subheader"
        >
          <p className={styles.description}>
            Subscribe to get the latest content by email.
          </p>
        </div>

        <ul
          className={joinClassNames(
            styles.alert,
            "formkit-alert",
            "formkit-alert-error",
          )}
          data-element="errors"
          data-group="alert"
          aria-live="polite"
          aria-atomic="true"
        />

        <div
          className={joinClassNames(
            styles.fields,
            "seva-fields",
            "formkit-fields",
          )}
          data-element="fields"
          data-stacked="false"
        >
          <div
            className={joinClassNames(styles.field, "formkit-field")}
          >
            <label className={styles.visuallyHidden} htmlFor="newsletter-email">
              Email address
            </label>

            <input
              id="newsletter-email"
              className={joinClassNames(styles.input, "formkit-input")}
              name="email_address"
              aria-label="Email address"
              placeholder="Email address"
              autoComplete="email"
              required
              type="email"
            />
          </div>

          <button
            type="submit"
            data-element="submit"
            className={joinClassNames(
              styles.submit,
              "formkit-submit",
              "bg-surface-4",
            )}
          >
            <span
              className={joinClassNames(styles.spinner, "formkit-spinner")}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>

            <span className={styles.submitLabel}>Subscribe</span>
          </button>
        </div>

        <div
          className={joinClassNames(
            styles.guarantee,
            "formkit-guarantee",
          )}
          data-element="guarantee"
        >
          We won&apos;t send you spam. Unsubscribe at any time.
        </div>

        <div
          className={joinClassNames(
            styles.poweredByContainer,
            "formkit-powered-by-convertkit-container",
          )}
        >
          <a
            href={CONVERTKIT_POWERED_BY_URL}
            data-element="powered-by"
            className={joinClassNames(
              styles.poweredBy,
              "formkit-powered-by-convertkit",
            )}
            data-variant="dark"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            Built with ConvertKit
          </a>
        </div>
      </div>
    </form>
  );
};

/**
 * Newsletter signup section on the homepage.
 */
const Newsletter: React.FC = () => {
  return (
    <section
      className={joinClassNames(
        styles.newsletter,
        "col",
        "flex",
        "justify-center",
      )}
      aria-labelledby="newsletter-heading"
    >
      <NewsletterForm />
    </section>
  );
};

export default Newsletter;