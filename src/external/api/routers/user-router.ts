import { error } from "console";
import express, { Router } from "express";
import { userController } from "../../../operation/controllers/user-controller";
import { UnitOfWork } from "../../data-sources/unit-of-work";
import { AppDataSource } from "../../data-sources/postgresql/db-connect";

export const userRouter = Router();

const unitOfWork = new UnitOfWork(AppDataSource);
userRouter.use(express.json());

userRouter.get('/:id', async (req, res) => {
    /*  #swagger.tags = ['User']
           #swagger.description = 'Endpoint to get the specific user.' */
    const user = await userController.getUserById(req.params.id, unitOfWork.userRepository);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(500).send({ message: "Error fetching data. " + error })
    }
});

userRouter.post('/', async (req, res) => {
    /*  #swagger.tags = ['User']
           #swagger.description = 'Endpoint to add a user.' */

    /*  #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#/components/schemas/user"
                }  
            }
        }
    } 
*/
    try {
        await unitOfWork.start();
        if (!req.body) {
            res.status(500).send();
        }
        const newUser = req.body;
        const user = await userController.createUser(newUser, unitOfWork.userRepository);
        await unitOfWork.complete();
        res.status(200).json(user);
    } catch (error) {
        await unitOfWork.rollback();
        res.status(500).send({ message: "Error creating data. " + error })
    }
});