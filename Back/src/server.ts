import "reflect-metadata";
import express from "express"
import { AppDataSource } from "./database/data-source";

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
 
const app = express();

app.listen(666, () => {
    console.log("Service is running!");
})