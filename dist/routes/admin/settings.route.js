import { Router } from "express";
const router = Router();
router.get("/siteinfo", controller.siteinfoREAD);
router.get("/languages", controller.languagesREAD);
router.post("/languages/create", controller.languagesCREATE);
router.get("/languages/create", controller.languagesCREATEpage);
router.get("/languages/edit/:id", controller.languagesUPDATEpage);
router.get("/languages/delete/:id", controller.languagesDELETE);
export default router;
//# sourceMappingURL=settings.route.js.map