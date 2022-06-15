import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { EventController } from "./controllers/EventController";

const routes = Router();

routes.post("/users", new CreateUserController().handle);

routes.post("/events", new EventController().create);
routes.get("/events", new EventController().getAll);
routes.get("/events/:id", new EventController().get);
routes.delete("/events/:id", new EventController().delete);
routes.put("/events/:id", new EventController().update);

export { routes };