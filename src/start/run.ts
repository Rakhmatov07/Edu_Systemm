import { Application } from "express";
import config from "config";

import { dataSource } from "../database/typeorm";

const port: number = config.get('PORT');

export const run = async(app: Application): Promise<void> => {
    try {
        await dataSource.initialize();
    
        app.listen(port, (): void => {
            console.log(`Server is listening on port: ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
};

