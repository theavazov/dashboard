import { Router } from "express";
const router = Router();
import controller from "../../controllers/news.controller.js";
router.get("/", controller.index);
router.post("/create", controller.store);
router.get("/create", controller.create);
router.get("/delete/:id", controller.delete);
router.post("/edit/:id", controller.update);
router.get("/edit/:id", controller.show);
export default router;
//# sourceMappingURL=news.route.js.map