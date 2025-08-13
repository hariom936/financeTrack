import "reflect-metadata";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import config from "../src/config/config";
import express from "express";
import { useExpressServer } from "routing-controllers";
import morgan from 'morgan';
import path from "path";
import AppDataSource from "../src/config/dbconfig";
import databaseConstant from "./constant/databaseConstant";
import dotenv from 'dotenv'
// import uploads from "./utils/uploads";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

console.log(process.env.NODE_ENV, "process.env.NODE_ENV")
async function start() {
  try {
    await AppDataSource.initialize();
    console.log("Postgres database connected successfully");

    const app = express(); // Create an express app
    const port = config.port;

    // Set security HTTP headers
    app.use(
      helmet({
        xssFilter: true,
        xPoweredBy: true,
        contentSecurityPolicy: {
          directives: config.contentSecurityDirectives,
        },
      })
    );

    // // Parse JSON request body
    // app.use(express.json({ limit:databaseConstant.JSON_PAYLOAD_LIMIT }));
    
    // // Parse text request body
    // app.use(express.text());

    // // Parse req cookies
    // app.use(cookieParser());

    // // Parse urlencoded request body
    // app.use(express.urlencoded({ extended: true }));

    // // Request body compression
    // app.use(compression());

    // Enable CORS
    app.use(cors(config.corsOptions));
    console.log(__dirname, "__dirname")
    app.use('/images', express.static(path.join(__dirname, '../appData/img')));

    // // Logging
    // app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

    // parse json request body
    app.use(express.json({ limit:databaseConstant.JSON_PAYLOAD_LIMIT }));
    // parse text request body
    app.use(express.text());
    // parse req cookies
    app.use(cookieParser());
    // parse urlencoded request body
    app.use(express.urlencoded({ extended: true }));
    // request body compression
    app.use(compression());
    // enable cors
   // app.use(cors(config.corsOptions));
    app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));

    // Set up controllers


    // const  upload =await  uploads.single('image'); 
    // console.log(upload, "upload")
  
    useExpressServer(app, {
      controllers: [path.join(__dirname, '/controllers/v*/*Controller.[tj]s'),
      ],


    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

start();
