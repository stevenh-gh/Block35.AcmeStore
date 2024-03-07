const pg = require("pg");
const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/acme_store");

// client - a node pg client ✅
// createTables method - drops and creates the tables for your application
// createProduct - creates a product in the database and returns the created record
// createUser - creates a user in the database and returns the created record. The password of the user should be hashed using bcrypt.
// fetchUsers - returns an array of users in the database
// fetchProducts - returns an array of products in the database
// fetchFavorites - returns an array favorites for a user
// createFavorite - creates a favorite in the database and returns the created record
// destroyFavorite - deletes a favorite in the database

async function createTable()
{
	const sql = `
		drop table if exists favorite;
		drop table if exists "user";
		drop table if exists product;

		create table "user"(
			id uuid primary key,
			username varchar(255) not null unique,
			password varchar(255) not null
		);

		create table product(
			id uuid primary key,
			name varchar(255) not null
		);

		create table favorite(
			id uuid primary key,
			product_id uuid references product(id) not null,
			user_id uuid references "user"(id) not null,
			constraint unique_user_product unique (user_id, product_id)
		);
	`;
	await client.query(sql);
}

module.exports = {
	client,
	createTable,
};
