import express from "express";
const { Router } = express;
import { getInfo } from "../controllers/info.controller.js";
const routes = Router();

/* ----- ----- */
routes.get('/', getInfo);

export default routes;