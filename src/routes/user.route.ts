import { Router } from "express";
import controlleurs from "../controllers/user.controller";

const routeUser = Router()

// Route du CRUD
// get
routeUser.get("/",controlleurs.getallUsers)
routeUser.get("/:id")

//create
routeUser.post("/",controlleurs.createUsers)
// modifier
routeUser.put("/:id",controlleurs.modifyUser)
// supprimer
routeUser.delete("/")


export default routeUser