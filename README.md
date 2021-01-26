This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). Visit [their repository](https://github.com/facebookincubator/create-react-app) for more information and help.

### Remixing in Glitch

To make the auto-reload feature work:

* Disable the "Refresh App on Changes" checkbox in your user menu (top right).

### Changes made to the original boilerplate

Changes that were done to better integrate with Glitch:

* The `.env.development` file contains `DANGEROUSLY_DISABLE_HOST_CHECK=true` to fix the "Invalid host header" message that shows up, related to the development server.
* A custom `watch.json` file was added so that the server doesn't restart when you make changes.
* The `start` and `build` scripts in the `package.json` file were changed.

### Creating a production build

To create and serve a production version of your app:

* Run `npm run build` using the **Logs > Console**
* Set `NODE_ENV=production` in the `.env` file

Then Glitch will serve the production build version of your app!

If you need to develop again, just unset the `NODE_ENV` variable and wait a bit for the modules to be installed.

_💡 Idea:_ Maybe you can have two apps on Glitch, one for development and another for production, and use the "Export to GitHub" and "Import from GitHub" features to share the updates between the apps. 

_Optional:_ For faster boot times when your app goes to sleep and wakes up, you may rename the `devDependencies` key in your `package.json` file to `_devDependencies`, so those get ignored. They aren't needed, as in production static files inside your `build` are used. To see the contents of this folder, open the **Logs > Console** and run `ls build`.
