# Deployment


## About Deployments 
Deploys are run via [Jenkins](http://jenkins.beta.cat).
* All commits to the `develop` branch are automatically built via Jenkins and pushed to http://website.beta.cat
* All commits to the `master` branch are automatically built via Jenkins and pushed to http://website-staging.beta.cat

 
## Error Tracking
We use [Sentry](https://getsentry.com) for error tracking. Since production JS is minified, we need to manually
upload the source maps to Sentry. This done via the `sendSourceMapsToSentry.js` script which pulls the source maps out of the `dist` folder and uploads them to Sentry.

The npm script `release` should be run for all releases but only _once_ per release and only on the `master` branch.
This action:
- Bumps the version number in `package.json`
- Builds the application
- Uploads the source maps to Sentry
- Makes a tag commit with the newest version
- Pushes the commit to Github


