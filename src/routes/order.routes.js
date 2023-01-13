import express from "express";
import { getOrder, postOrder } from "../controllers/order.controller.js";
const { Router } = express;
import { checkAuth } from "../middlewares/auth.middleware.js";

const routes = Router();

/* ---------  ------------- */
routes.get('/', checkAuth , getOrder );
routes.post('/', checkAuth , postOrder );

export default routes;