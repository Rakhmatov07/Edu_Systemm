import express, { Application } from "express";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "../api/routes";
import { errorHandler } from "../api/middlewares/errorHandler";

export const modules = (app: Application): void => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(express.static(process.cwd() + "/public"));
    app.use(routes);
    app.use(errorHandler);

};