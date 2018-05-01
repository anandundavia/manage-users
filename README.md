# Manage Users
From a fully functional production application to a minimal prototype, what is the one feature that is common amongst all of the apps you will ever write? <br>Yeah.<br> <b>Signing up and Logging in the users.</b><br>
`manage-users` does one thing of managing your user-base (SignUp and LogIn) and it does it beautifully while giving you the full control.


## Features
* Out of the box signup and login routes
* In-Built mongo repository implementation
* Can use other repository implementations
* Configurable user and repository schema



## Installing

```
npm install manage-users
```

## Usage

Most basic usage:
```
const express = require('express');
const app = express();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const { config, routes } = require('manage-users');


app.use(express.json()); // Required!
    
// Cookie Parser and sessions are required for session management
app.use(cookieParser());
app.use(expressSession({
    secret: 'my cat',
    resave: false,
    saveUninitialized: true,
}));

// Make sure to initialize passport.
// It is used for log in
config.passport.initialize();
config.passport.session();

app.post('/login', routes.login());
app.post('/signup', routes.signup());

app.listen(3000, () => {
    console.log('listening');
})

```
It by default, 
The body to signup the user will be:
```
{
	"username" : "some_user_name",
	"password" : "123456",
	"confirm": "123456"
}
```

It will create user entry in MongoDB running on localhost on PORT 27017
It will use default database as `user_management` and user collection as `users`

To change the configurations about user and repository, use `config` object which is exported from `manage-users`.

MAKE SURE you change the configuration before you mount the routes to work as expected

### User Configuration
To change user configuration, use `userSchemaBuilder` from `config`

```
config.userSchemaBuilder()
    .setUniqueKeyName('email') // that means req.body.email will have the unique key
    .isUniqueKeyEmail('true') // the unique key is email and thus it will expect an email
    .setPasswordKeyName('input_password') // req.body.input_password will have password
    .setPasswordMinLength(10) // Minimum length should be 10
    .setConfirmPasswordKeyName('confirm_password') 
    .build(); // DO NOT FORGET TO BUILD THE SCHEMA ONCE CONFIGURED!
``` 

The request body that will match would now be:
```
{
	"email" : "someone@gmail.com",
	"input_password" : "1234567890",
	"confirm_password": "1234567890"
}
```

Here is the full example:

```
const express = require('express');
const app = express();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const { config, routes } = require('manage-users');


app.use(express.json());

// Cookie Parser and sessions are required for session management
app.use(cookieParser());
app.use(expressSession({
    secret: 'my cat',
    resave: false,
    saveUninitialized: true,
}));

// Make sure to initialize passport.
// It is used for log in
config.passport.initialize();
config.passport.session();

config.userSchemaBuilder()
    .setUniqueKeyName('email')
    .isUniqueKeyEmail('true')
    .setPasswordKeyName('input_password')
    .setPasswordMinLength(10)
    .setConfirmPasswordKeyName('confirm_password')
    .build();

app.post('/login', routes.login());
app.post('/signup', routes.signup());

app.listen(3000, () => {
    console.log('listening');
})
```

### Repository Configuration
To change user configuration, use `repositorySchemaBuilder` from `config`

```
config.repositorySchemaBuilder()
    .setRepository('mongo') // Any random name of repository. Explained further
    .setUri('mongodb://198.168.1.1:27017/my_db') // URI
    .setDatabaseName('my_db') // Database name
    .setCollectionName('my_users') // Collection or table name
    .build(); // DO NOT FORGET TO BUILD THE SCHEMA ONCE CONFIGURED!
```

Here is the complete example:

```
const express = require('express');
const app = express();
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');

const { config, routes } = require('manage-users');


app.use(express.json());

// Cookie Parser and sessions are required for session management
app.use(cookieParser());
app.use(expressSession({
    secret: 'my cat',
    resave: false,
    saveUninitialized: true,
}));

// Make sure to initialize passport.
// It is used for log in
config.passport.initialize();
config.passport.session();

config.userSchemaBuilder()
    .setUniqueKeyName('email')
    .isUniqueKeyEmail('true')
    .setPasswordKeyName('input_password')
    .setPasswordMinLength(10)
    .setConfirmPasswordKeyName('confirm_password')
    .build();

config.repositorySchemaBuilder()
    .setRepository('mongo')
    .setUri('mongodb://198.168.1.1:27017/my_db')
    .setDatabaseName('my_db')    
    .setCollectionName('my_users')
    .build();

app.post('/login', routes.login());
app.post('/signup', routes.signup());

app.listen(3000, () => {
    console.log('listening');
})

```

## Using Custom Repository
`manage-users` comes with default mongo repository out of the box.
But you can plug in your custom repository implementation as well

To use the custom implementation of the repository, use `repositoryBuilder` from `config`
```
config.repositoryBuilder()
    .setRepositoryImplementation(implementation)
    .build('my_custom_repo');
```

The `implementation` must expose 6 methods:
connect, exists, create, find, update, disconnect 

For example, here is `repo.js`

```
// Holds the reference to the client. Used to close the connections,
let client = null;

// Holds the current connection to repository
let db = null;

// WARNING: System might behave unexpectedly if the confis from `repositorySchemaBuilder` 
// and this file do not match
// For example, if you are setting `.setCollectionName('my_users') `
// Then, you should use the same collection in this file as well
// ( schema is returned from `build` method. You might want to use that)

const connect = () => new Promise((resolve, reject) => {
    // Logic to connect to the database and save the connection reference in client variable 
});

const disconnect = () => new Promise((resolve, reject) => {
    // Logic to disconnect
});

const exists = key => new Promise(async (resolve, reject) => {
    // Logic to find whether the object with key exists in 
    // database or not
    // Key is the unique you set for the user configuration
    // by default it is 'username'

    // The promise must resolve in either true ( if exists ) or false
});


const create = object => new Promise(async (resolve, reject) => {
    // Logic to add the object passed in the user collection
    // This method will be used at time of sign up
});


const find = ({ key }) => new Promise(async (resolve, reject) => {
    // Logic to find the object. The object must have one parameter which is key
    // The key passed will be matched against the user collection.
    // It is used while loggin in the user. 
    // For example, 
    // query = {
    //     key: 'someone@gmail.com'
    // };
    // find(query)
    // And user with that email will be returned

    // The promise must resolve to user object
});


const update = (key, updates) => new Promise(async (resolve, reject) => {
    // Logic to find and update the object.
    // Match the user collection against key
    // And if a user is found,
    // patch the updates
    // This is only used to update time of logged_in_at in meta
});

module.exports = {
    connect, exists, create, find, update, disconnect,
};
```

Once you have the file,

```
const implementation = require('./repo.js');

// Wrap around try catch to see if there are any validation
// errors while registering your own implementation
try {
config.repositoryBuilder()
    .setRepositoryImplementation(implementation)
    .build('my_custom_repo');

config.repositorySchemaBuilder()
    .setRepository('my_custom_repo') // Same as the name you passed!
    .setUri('mongodb://198.168.1.1:27017/my_db')
    .setDatabaseName('my_db')    
    .setCollectionName('my_users')
    .build();
} catch(e) {
    console.error(e)
}


    
```

## Contributing

Pull Requests are welcome! 


## Authors

* **Anand Undavia** - [Anand Undavia](https://github.com/anandundavia/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
