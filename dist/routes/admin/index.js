import { Router } from "express";
const router = Router();
// ROUTES
import applicationsRoute from "./applications.route.js";
import settingsRoute from "./settings/index.js";
import newsRoute from "./news.route.js";
router.get("/", (req, res) => {
    res.redirect("/admin/applications");
});
router.use("/", settingsRoute);
router.use("/applications", applicationsRoute);
router.use("/news", newsRoute);
export default router;
//# sourceMappingURL=index.js.map