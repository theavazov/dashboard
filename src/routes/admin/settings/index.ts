import { Router } from "express";

const router = Router();

import languagesRoute from "./languages.route.js";
import siteinfoRoute from "./siteinfo.route.js";

router.use("/languages", languagesRoute);

router.use("/siteinfo", siteinfoRoute);

export default router;
