# food-app-backend

Food-app-backend is a backend for the food-app-front.

## Food-app Features

- User authorization (native, google, facebook) using [Passport.js](http://www.passportjs.org/) and [Firebase](https://firebase.google.com/)
- Saving recipes using your own data or provided by [Edamam API](https://developer.edamam.com/)
- Browsing recipes powered by [Edamam API](https://developer.edamam.com/)

## Routes

- /recipes/user Gets recipes by userId _Post_
- /recipes/ Post new recipe _Post_
- /recipes/edamam Get edamam recipes _Post_

- /login Logs in user _Post_
