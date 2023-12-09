import { Router } from "express";

const router = Router();

import { siteinfoController } from "../../../controllers/settings/index.js";

router.get("/", siteinfoController.index);

router.post("/create", siteinfoController.store);

router.get("/create", siteinfoController.create);

router.get("/delete/:id", siteinfoController.delete);

router.post("/edit/:id", siteinfoController.update);

router.get("/edit/:id", siteinfoController.show);

export default router;
