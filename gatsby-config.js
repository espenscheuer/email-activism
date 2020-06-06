
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`,
});

const {
	NODE_ENV,
	URL: NETLIFY_SITE_URL = 'https://www.mmuw.xyz',
	DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
	CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;
const firebasePrefix = isNetlifyProduction ? 'PROD' : 'DEV';

module.exports = {
  siteMetadata: {
    title: `Emails For Change`,
    description: `Making it easier to email those in positions of power and advocate for change.`,
    author: `@espenscheuer`,
    siteUrl,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
			resolve: 'gatsby-plugin-firebase',
			options: {
				credentials: {
					apiKey: process.env[`${firebasePrefix}_FIREBASE_API_KEY`],
					authDomain: process.env[`${firebasePrefix}_FIREBASE_AUTH_DOMAIN`],
					databaseURL: process.env[`${firebasePrefix}_FIREBASE_DATABASE_URL`],
					projectId: process.env[`${firebasePrefix}_FIREBASE_PROJECT_ID`],
					storageBucket:
						process.env[`${firebasePrefix}_FIREBASE_STORAGE_BUCKET`],
					messagingSenderId:
						process.env[`${firebasePrefix}_FIREBASE_MESSAGING_SENDER_ID`],
					appId: process.env[`${firebasePrefix}_FIREBASE_APP_ID`],
				},
			},
		},
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`, // This path is relative to the root of the site.
        icon: `src/images/thumbnail.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
