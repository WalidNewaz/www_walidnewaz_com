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
      trackingIds: [] as string[],
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
        exclude: [],
        delayOnRouteUpdate: 0,
      },
    },
  };

  const ids: (string | undefined)[] = [];

  switch (env) {
    case 'staging':
    case 'production':
      ids.push(process.env.GA_TRACKING_ID, 'AW-CONVERSION_ID', 'DC-FLOODIGHT_ID');
      break;
    case 'development':
      ids.push('GA-TRACKING_ID', 'AW-CONVERSION_ID', 'DC-FLOODIGHT_ID');
      break;
    default:
      break;
  }

  base.options.trackingIds = ids.filter(Boolean) as string[];

  return base;
};
