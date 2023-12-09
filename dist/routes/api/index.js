import { Router } from "express";
const router = Router();
const routes = [`${process.env.BASE_URL}/api`, `${process.env.BASE_URL}/api`];
router.get("/", (req, res) => res.json(routes));
export default router;
//# sourceMappingURL=index.js.map