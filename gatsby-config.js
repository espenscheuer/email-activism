module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
            apiKey: "AIzaSyCmKU0aKI0FVWWK9Anfs7i-Q-e2nESnA60",
            authDomain: "email-activism.firebaseapp.com",
            databaseURL: "https://email-activism.firebaseio.com",
            projectId: "email-activism",
            storageBucket: "email-activism.appspot.com",
            messagingSenderId: "214796221770",
            appId: "1:214796221770:web:1af130f00dc0d4c5bb15b3",
            measurementId: "G-2H7KXQKCH6"
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
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
