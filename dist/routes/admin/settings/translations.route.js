import { Router } from "express";
const router = Router();
import { translationsController } from "../../../controllers/settings/index.js";
router.get("/", translationsController.index);
router.post("/create", translationsController.store);
router.get("/create", translationsController.create);
router.get("/delete/:id", translationsController.delete);
router.post("/edit/:id", translationsController.update);
router.get("/edit/:id", translationsController.show);
export default router;
//# sourceMappingURL=translations.route.js.map