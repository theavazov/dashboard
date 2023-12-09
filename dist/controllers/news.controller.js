import { PrismaClient } from "@prisma/client";
import { filterFormDataByKey } from "../helpers.js";
import slugify from "slugify";
const prisma = new PrismaClient();
const title = "Новости";
const url = "news";
class NewsController {
    async index(req, res) {
        const array = await prisma.article.findMany({
            orderBy: { createdAt: "desc" },
            include: { images: true },
        });
        try {
            res.render(`admin/pages/${url}/index`, {
                title: title,
                pathname: `/${url}`,
                breadcrumb: {
                    parent: "",
                    url: "",
                    current: title,
                },
                data: array,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async show(req, res) { }
    async create(req, res) {
        try {
            req.session["images"] = [];
            const locales = await prisma.language.findMany({
                orderBy: { createdAt: "desc" },
            });
            res.render(`admin/pages/${url}/create`, {
                title: title,
                pathname: `/${url}`,
                breadcrumb: { parent: title, url: `/admin/${url}`, current: "Создать" },
                locales: locales,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async store(req, res) {
        try {
            const locale = await prisma.language.findFirst({
                where: { default: false },
            });
            const titles = filterFormDataByKey(req.body, "title");
            const bodies = filterFormDataByKey(req.body, "body");
            const article = await prisma.article.create({
                data: {
                    title: titles,
                    body: bodies,
                    slug: slugify(titles[locale.code], {
                        lower: true,
                        remove: /[/[*+~.()'"!:@]/g,
                    }),
                },
            });
            let images = req.session["images"];
            if (images) {
                images.forEach(async (path) => {
                    let imgobj = {};
                    imgobj.image = path;
                    imgobj.tourId = article.id;
                    await prisma.articleImage.create({ data: imgobj });
                });
            }
            res.redirect(`/admin/${url}`);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async update(req, res) { }
    async delete(req, res) { }
}
export default new NewsController();
//# sourceMappingURL=news.controller.js.map