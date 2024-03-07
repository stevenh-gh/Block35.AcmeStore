const express = require("express");
const { client, createTable } = require("./db");
const app = express();

// GET /api/users - returns array of users
// GET /api/products - returns an array of products
// GET /api/users/:id/favorites - returns an array of favorites for a user
// POST /api/users/:id/favorites - payload: a product_id
// - returns the created favorite with a status code of 201
// DELETE /api/users/:userId/favorites/:id - deletes a favorite for a user, returns nothing with a status code of 204

const init = async () =>
{
	console.log("connecting to db");
	await client.connect();
	console.log("connected to db");

	console.log("creating table");
	await createTable();
	console.log("created table");

	const PORT = 3000;
	app.listen(PORT, () =>
	{
		console.log(`listening on port ${PORT}`);
	});
};

init();
