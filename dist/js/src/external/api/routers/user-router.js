"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const console_1 = require("console");
const express_1 = __importStar(require("express"));
const user_controller_1 = require("../../../operation/controllers/user-controller");
const unit_of_work_1 = require("../../data-sources/unit-of-work");
const db_connect_1 = require("../../data-sources/postgresql/db-connect");
exports.userRouter = (0, express_1.Router)();
const unitOfWork = new unit_of_work_1.UnitOfWork(db_connect_1.AppDataSource);
exports.userRouter.use(express_1.default.json());
exports.userRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['User']
           #swagger.description = 'Endpoint to get the specific user.' */
    const user = yield user_controller_1.UserController.getUserById(req.params.id, unitOfWork.userRepository);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(500).send({ message: "Error fetching data. " + console_1.error });
    }
}));
exports.userRouter.post('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*  #swagger.tags = ['User']
           #swagger.description = 'Endpoint to get the specific user.' */
    const user = yield user_controller_1.UserController.excluirUser(req.params.id, unitOfWork.userRepository);
    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(500).send({ message: "Error fetching data. " + console_1.error });
    }
}));
exports.userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield unitOfWork.start();
        if (!req.body) {
            res.status(500).send();
        }
        const newUser = req.body;
        const user = yield user_controller_1.UserController.createUser(newUser, unitOfWork.userRepository);
        yield unitOfWork.complete();
        res.status(200).json(user);
    }
    catch (error) {
        yield unitOfWork.rollback();
        res.status(500).send({ message: "Error creating data. " + error });
    }
}));
