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
check out the app running on `localhost:3000`
postman to `ngrok.whatever.io/track` with appropriate params (get the link from ngrok) to see the post routes

# Docker stuff you probably want
1. Pull the 5.5 image onto your local machine (mysql5.5)
`docker pull mysql/mysql-server:5.5`
2. Deploy the container with user/password:
`docker run --name=mutiny -u root -e MYSQL_ROOT_PASSWORD=root -d mysql/mysql-server:5.5`