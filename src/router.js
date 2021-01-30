import Router from "koa-router";
import * as authControllers from "./controllers/auth";
import * as orderControllers from "./controllers/orders";
import * as foodControllers from "./controllers/foods";

const router = new Router();

router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

router.put("/users/update", authControllers.update); 
router.delete("/users/delete", authControllers.remove); 

router.post('/orders', orderControllers.placeOrder); 

router.get('/foods', foodControllers.getAll); 
router.post('/foods', foodControllers.create); 

router.get("/health", (ctx) => {
  ctx.response.ok("Server is up and running");
});

export default router;
