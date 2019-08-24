# Quantified Shelf

Quantified Shelf is a Node.js application, using the Express framework, that keeps track of Foods, Meals, and associated information for any health-minded techie. Consider it the pantry for your quantified self...
```
The quantified self refers both to the cultural phenomenon of self-tracking with technology and to a community of users and makers of self-tracking tools who share an interest in “self-knowledge through numbers.”
```

## Installation

Quantified Shelf uses the [Node Package Manager](http://npmjs.com) to manage dependencies. The instructions to run the application locally are below.

```bash
git clone git@github.com:BrennanAyers/quantified_shelf.git
cd quantified_shelf
npm install
```
This will install all required packages, including `dotenv`, which manages private information for individual users (Database Username/Password, API Keys). Since Quantified Shelf uses a Postgres database, we need to add `DB_USER` and `DB_PASS` to our `.env` file, like below:
```bash
touch .env
echo "DB_USER=YOUR_POSTGRES_USERNAME_HERE" >> .env
echo "DB_PASS=YOUR_POSTGRES_PASSWORD_HERE" >> .env
```
This will now allow us to initialize our database and put initial information in. We use the `sequelize` package to manage our Object-Relational Mapping.
```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed
```

## Usage
To start the local server and perform requests on your own database, we use the basic Node server process.
```bash
npm start
```
After this, you can make HTTP requests to your localhost using an application like Postman, or directly with cURL if that's your cup of tea.

## Endpoints
### Foods
- `GET /api/v1/foods`
will return all Food resources in the database as a comma separated list of Objects inside of an Array with a 200 status code response.
- `GET /api/v1/foods/:id`
will return a single Food resource in the database matching an (integer) ID as a single Object with a 200 status code response.
- `POST /api/v1/foods`
- `body: {name: NAME_STRING, calories: CALORIES_INTEGER}` will create a single Food resource in the database using the information provided in the Body. Both Name and Calories are required, and the response will be the newly created Food resource with a 201 status code.
- `PATCH /api/v1/foods/:id`
- `body: {name: NAME_STRING, calories: CALORIES_INTEGER}` will update a single Food resource in the database matching an (integer) ID, using the information provided in the Body. Any combination of Name and Calories can be updated at one time, and the response will be the updated Food resource with a 200 status code.
- `DELETE /api/foods/:id`
will remove a Food resource in the database matching an (integer) ID and a No Content response with a 204 status code.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
