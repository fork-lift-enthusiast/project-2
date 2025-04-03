import "dotenv/config";
import express from "express";
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import logger from "morgan";
import session from "express-session";
import db from "./db/connection.js";
import router from "./routers/index.js";

const app = express();

const PORT = process.env.PORT ? process.env.PORT : "3000";

//middleware

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));
app.set("view engine", "ejs");
app.use(
    session({
      secret: process.env.SECRET_PASSWORD,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );

app.use("/", router)

  db.on("connected", () => {
    console.clear();
    console.log(`Connected to MongoDB ${db.name}.`);
    app.listen(PORT, () => {
      console.log(`The express app is ready on port ${PORT}!`);
    });
  });