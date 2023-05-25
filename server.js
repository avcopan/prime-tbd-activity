const express = require("express");
const pg = require("pg");

const DB_PASSWORD = process.env.DB_PASSWORD;

const PORT = process.env.PORT || 8000;
const app = express();

const pool = new pg.Pool({
  host: "db.bit.io",
  port: 5432,
  ssl: true,
  database: "Javierna182/tbd",
  user: "messages",
  password: DB_PASSWORD
});

app.use(express.static("public"))
app.use(express.json());

app.get("/ping", (req, res) => {
  console.log("ping");
  res.sendStatus(200);
});

app.get("/messages", (req, res) => {
  let query = 
   'SELECT * FROM "messages"\n' +  
   'ORDER BY "timestamp" DESC\n' +
   'LIMIT 10';

  console.log(query);

  pool.query(query)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    })
})

app.post('/messages', (req, res) => {
    let message = req.body;
    let query = `
     INSERT INTO "messages" ("title", "text", "timestamp")
     VALUES ($1, $2, $3); 
    `;

    pool.query(query, [message.title, message.text, message.timestamp])
    .then(() => {
        res.sendStatus(201)
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    })
})

app.listen(PORT, () => {});
