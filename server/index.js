const express = require("express");
const { client } = require("./db");
const app = express();

const init = async () =>
{
	console.log("connecting to db");
	await client.connect();
	console.log("connected to db");

	const PORT = 3000;
	app.listen(PORT, () =>
	{
		console.log(`listening on port ${PORT}`);
	});
};

init();
