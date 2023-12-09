import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const router = Router();
const routes = [
    {
        id: 1,
        url: `${process.env.BASE_URL}/api/news`,
    },
];
router.get("/", (req, res) => {
    res.render("client/api", {
        title: "API root",
        layout: "client/layout",
        path: "/api",
        json: JSON.stringify(routes, null, 4),
    });
});
// ARTICLES
router.get("/news", async (req, res) => {
    try {
        const news = await prisma.article.findMany({ include: { images: true } });
        res.render("client/api", {
            title: "News List",
            layout: "client/layout",
            path: "/api/news",
            json: JSON.stringify(news, null, 4),
        });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
export default router;
//# sourceMappingURL=api.js.map