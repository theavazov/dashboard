import { Router } from "express";
const router = Router();
import controller from "../../controllers/tours.controller.js";
router.get("/", controller.read);
router.post("/create", controller.create);
router.get("/create", controller.createPage);
router.get("/delete/:id", controller.delete);
router.post("/edit/:id", controller.update);
router.get("/edit/:id", controller.readSingle);
export default router;
//# sourceMappingURL=tours.route.js.map