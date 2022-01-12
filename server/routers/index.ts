import { Router } from "express";
import { getDataFromEsp32AndPost } from "../controller/getDataFromEsp32";

// Router instance
const routers = Router();

// All routes
routers.post("/esp23", getDataFromEsp32AndPost);


export default routers;