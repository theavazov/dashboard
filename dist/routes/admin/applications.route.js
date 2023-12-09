import { Router } from "express";
const router = Router();
import controller from "../../controllers/applications.controller.js";
router.get("/", controller.index);
router.post("/create", controller.store);
router.get("/delete/:id", controller.delete);
export default router;
//# sourceMappingURL=applications.route.js.map