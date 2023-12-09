import { Router } from "express";

const router = Router();

import { languagesController } from "../../../controllers/settings/index.js";

router.get("/", languagesController.index);

router.post("/create", languagesController.store);

router.get("/create", languagesController.create);

router.get("/delete/:id", languagesController.delete);

router.post("/edit/:id", languagesController.update);

router.get("/edit/:id", languagesController.show);

export default router;
