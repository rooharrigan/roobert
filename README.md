# To run from docker
Make sure you have docker running on your maching
`docker run -p 3000:3000 rooharrigan/api-testing:part0`
The first port in the command can be anything you like: `4000:3000`, etc. That's where Docker will run your app locally.
The second port is the one exposed in the container.
This doesn't work with the db service in the .yml, and there's a bunch of random half-implemented typeorm and non-orm stuff, so there's no database.
ToDo: Literally everything.

# To run locally
git clone this repo and CD into it
install ngrok and run `ngrok http 3000`
run `npm start`
Verify the app running on `localhost:3000`
postman to `ngrok.whatever.io/routes` with appropriate params to see the post routes
