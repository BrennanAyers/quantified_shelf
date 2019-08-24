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


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
