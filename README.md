<p align="center">
  <img src="https://img0.etsystatic.com/187/0/15439563/il_340x270.1246801852_acfh.jpg" alt="Quantified Self logo"/>
</p>

# Quantified Self Express Backend

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

## Getting Started

1) Clone the repo

```
git clone https://github.com/nico24687/express-qs.git
```

2) Navigate to the express-qs directory

```
cd express-qs
```

3) Install the dependencies

```
npm install
```

4) Create the required databases

```
psql CREATE DATABASE quantified_self; CREATE DATABASE quantified_self_test;
```


5) Build the database

```
knex migrate:latest knex migrate:latest --env test
```

6) Seed the database

```
knex seed:run
```

7) Spin up the server

```
npm start
```

### Food Enpoints

GET /api/v1/foods - returns all foods currently in the database

GET /api/v1/foods/:id - returns the food object with the specific :id you've passed in or 404 if the food is not found

POST /api/v1/foods - allows creating a new food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }
If food is successfully created, the food item will be returned. If the food is not successfully created, a 400 status code will be returned. Both name and calories are required fields.

PATCH /api/v1/foods/:id - allows one to update an existing food with the parameters:
{ food: { name: "Name of food here", calories: "Calories here"} }
If food is successfully updated (name and calories are required fields), the food item will be returned. If the food is not successfully updated, a 400 status code will be returned.

DELETE /api/v1/foods/:id - will delete the food with the id passed in. If the food can't be found, a 404 will be returned.

### Meal Endpoints

GET /api/v1/meals - returns all the meals in the database along with their associated foods

GET /api/v1/meals/:meal_id/foods - returns all the foods associated with the meal with an id specified by :meal_id or a 404 if the meal is not found

POST /api/v1/meals/:meal_id/foods/:id - adds the food with :id to the meal with :meal_id
This creates a new record in the MealFoods table to establish the relationship between this food and meal. If the meal/food cannot be found, a 404 will be returned.

DELETE /api/v1/meals/:meal_id/foods/:id


## Contributing

We always welcome contributions from the community. Contributions can be made by pull request workflow. For best practices around this please see [GitHub documentation - Creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

We ask that you provide the following in a pull request


## Versioning

Version 1.0

## Authors

* **Nico Lewis** [contact](https://github.com/nico24687)
* **Young Jung** [contact](https://github.com/seoulstice)


## License

This project is licensed under the MIT License 

1. A clear description of your pull request in the description
   with the main points covered.
2. All tests should pass.
3. Tests should cover any additional functionality. And bugs should demonstrate a failing and passing test after changes have been made. Run `npm run test-cov` to visit an html respresentation of the current code coverage
4. New pull requests with additional features should include appropriate documentation in the `README.md`

## Built With

* [Express](https://expressjs.com/) 
* [knexJS](http://knexjs.org/) 
* [Node.js](https://nodejs.org/en/) 

