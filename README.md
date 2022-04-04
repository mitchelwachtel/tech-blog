# Tech Blog

## Mitchel Wachtel - mitchel.wachtel@gmail.com

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### Description

This is a full stack application using the MySQL database, node, express, and handlebars to generate HTML. This app allows users to have authenticated logins to post blogs and comment on others' blogs. Users are only able to edit and delete their own blog posts and comments. Users will have a different experience right from the homepage if not logged in. Right on the homepage, users will get more information about each blog post (date created and username of the writer) if logged in.

---

### Table of contents

- [Installation](#installation)
- [Technology](#technology)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

---

### Installation

To install the dependencies necessary to run use the application, the user should run the following command first:

`npm i`

---

### Technology

Technologies used: MySQL, node.js, npm, Express.js, Heroku (Jaws_db), Handlebars.js, dependencies: 'sequelize', 'mysql2', 'bcrypt', 'connect-session-sequelize', 'dotenv', 'express', 'express-handlebars', 'express-session', and VS Code.

---

### Usage

The application can be found *[here](https://boiling-ravine-98433.herokuapp.com/)* deployed on Heroku. To run on your own server, first installing dependencies. Then schema should be created via MySQL shell using `source db/schema.sql;`. The database should be seeded using `node seeds/seed.js` after exited the mysql shell in the terminal. Then the server should be started using `npm start`. You can then view the page locally at http://localhost:3001.

This app is live on Heroku: https://boiling-ravine-98433.herokuapp.com/ 

![Homepage before user is logged in](./assets/images/b4login.png)

![Login screen](./assets/images/login.png)

![Homepage after user is logged in](./assets/images/afterlogin.png)

![New Blog Post](./assets/images/newPost.png)

![Homepage while logged in](./assets/images/homepage.png)

![New comment is posted, can be edited by user](./assets/images/comment.png)

---

---

---

### License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Read more about the MIT License _[here](https://opensource.org/licenses/MIT)_.

---

### Contributing

Please contact mitchel.wachtel@gmail.com if you have any desire to contribute to this project.

---

### Tests

No tests are currently set up for this application.

---

### Questions

If you have any questions, please send me an email at mitchel.wachtel@gmail.com and I'll be quick to get back to you! You can also open an issue on GitHub. Find me on GitHub at https://github.com/mitchelwachtel if you are interested in any of my other work.
