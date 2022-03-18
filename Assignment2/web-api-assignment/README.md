## Spells REST API

---

A REST API where you can register a new spell into the resources in order to store your inventive spells and be creative, sharing it with everyone that has access to them. Perhaps even use them for your D&D games as this is highly based upon the fifth edition D&D.

---

The application is operational at the URL [https://spells-api-1dv527.herokuapp.com/api](https://spells-api-1dv527.herokuapp.com/api)

---

Documentation of the resource URI can be found [here](https://gitlab.lnu.se/1dv527/student/sj223gb/web-api-assignment/-/blob/master/sebastian_jonsson_API_Documentation.txt)

---

### Run locally:

You need Node.js and NPM(Package manager) as well as a MongoDB database setup and a connection string.

Following .env variables are required:

- MONGODB_CONNECTION = Your-Connection-String
- PORT = 5001 - The port it will run on.
- JWT_KEY = Your-Secret-Key
- JWT_TIME = '1h'
- API_VERSION = 'v0'

---

You need to follow these steps:

1. Clone the repository.
2. Add a ".env" file and add the information above into it.
3. Run "npm install" in the root.
4. Run "node populate.js".
5. OPTIONAL command which may make your testing experience better. "npm install nodemon"
6. Then write "npme run start:dev"

---

### Testing

Prerequisite:

- Postman installed.

You will need to import the collection and all of the environment variables into the program before you run the tests. Make certain the correct environment variables are set for the right tests and it should run smoothly.

The tests are in order and are intended to be initiated from top to bottom and are set to test the production URL.

Disclaimer: Postman testing environment appears faulty on occasion where the environment variables are not set despite them being instructed to.

You may need to erase a user/spell/hook after creating one should the environment variable not set as specified in the tests and re-run the POST for user/spell/hook.
(May be a local postman issue.)
