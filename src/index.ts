import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../public/swagger.json";
import app from "./server";
import { routes } from "./external/api/routers";
import 'reflect-metadata';
import { AppDataSource } from "./external/data-sources/postgresql/db-connect";


const port = 8000;


AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        app.use('/', routes);

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
        app.listen(port, () => {
            console.log(`Server is listening on port: ${port}`)
        });
    })

    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });