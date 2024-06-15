import * as dotenv from 'dotenv';
dotenv.config();
const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

/**
 * Returns the gtag configuration for the given environment.
 * @param env
 * @returns
 */
export const getGtagForEnv = (env: string) => {
  const base = {
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      // You can add multiple tracking ids and a pageview event will be fired for all of them.
      trackingIds: [
        // 'GA-TRACKING_ID', // Google Analytics / GA
        // 'AW-CONVERSION_ID', // Google Ads / Adwords / AW
        // 'DC-FLOODIGHT_ID', // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
      ] as string[],
      // This object gets passed directly to the gtag config command
      // This config will be shared across all trackingIds
      gtagConfig: {
        optimize_id: 'OPT_CONTAINER_ID',
        anonymize_ip: true,
        cookie_expires: 0,
      },
      // This object is used for configuration specific to this plugin
      pluginConfig: {
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [
          // '/preview/**',
          // '/do-not-track/me/too/'
        ],
        // Defaults to https://www.googletagmanager.com
        // origin: `https://${process.env.REMOTE_HOST}/`,
        // Delays processing pageview events on route update (in milliseconds)
        delayOnRouteUpdate: 0,
      },
    },
  };
  switch (env) {
    case 'staging':
    case 'production':
      base.options.trackingIds.push(
        GA_TRACKING_ID as string,
        'AW-CONVERSION_ID',
        'DC-FLOODIGHT_ID',
      );
      return base;
    case 'development':
      base.options.trackingIds.push(
        'GA-TRACKING_ID',
        'AW-CONVERSION_ID',
        'DC-FLOODIGHT_ID',
      );
      return base;
    default:
      return base;
  }
};
