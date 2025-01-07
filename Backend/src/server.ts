import dotenv from "dotenv";
dotenv.config();

import "./db/db";
import app from "./app";

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
