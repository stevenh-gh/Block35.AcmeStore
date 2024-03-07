const express = require("express");
const {
	client,
	createTable,
	createProduct,
	createUser,
	fetchUsers,
	fetchProducts,
	createFavorite,
	fetchFavorites,
	destroyFavorite,
} = require("./db");
const app = express();

// GET /api/users - returns array of users ✅
// GET /api/products - returns an array of products ✅
// GET /api/users/:id/favorites - returns an array of favorites for a user ✅
// POST /api/users/:id/favorites - payload: a product_id ✅
// - returns the created favorite with a status code of 201 ✅
// DELETE /api/users/:userId/favorites/:id - deletes a favorite for a user, returns nothing with a status code of 204 ✅

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/users", async (req, res, next) =>
{
	try
	{
		res.send(await fetchUsers());
	}
	catch (err)
	{
		next(err);
	}
});

app.get("/api/products", async (req, res, next) =>
{
	try
	{
		res.send(await fetchProducts());
	}
	catch (err)
	{
		next(err);
	}
});

app.get("/api/users/:id/favorites", async (req, res, next) =>
{
	try
	{
		res.send(await fetchFavorites(req.params.id));
	}
	catch (err)
	{
		next(err);
	}
});

// POST /api/users/:id/favorites - payload: a product_id
// - returns the created favorite with a status code of 201
app.post("/api/users/:id/favorites", async (req, res, next) =>
{
	try
	{
		res.status(201).send(await createFavorite(req.params.id, req.body.product_id));
	}
	catch (err)
	{
		next(err);
	}
});

// DELETE /api/users/:userId/favorites/:id - deletes a favorite for a user, returns nothing with a status code of 204
app.delete("/api/users/:userId/favorites/:id", async (req, res, next) =>
{
	try
	{
		await destroyFavorite(req.params.id);
		res.sendStatus(204);
	}
	catch (err)
	{
		next(err);
	}
});

const init = async () =>
{
	console.log("connecting to db");
	await client.connect();
	console.log("connected to db");

	console.log("creating table");
	await createTable();
	console.log("created table");

	console.log("seeding db");
	const p = await createProduct("testname");
	const u = await createUser("steven", "mypassword");
	const f = await createFavorite(u.id, p.id);
	console.log(f.id);
	console.log("seeded db");

	const PORT = 3000;
	app.listen(PORT, () =>
	{
		console.log(`listening on port ${PORT}`);
	});
};

init();
