import { PrismaClient } from "@prisma/client";
import { filterFormDataByKey } from "../helpers.js";
import slugify from "slugify";
const prisma = new PrismaClient();
const title = "Туры";
const url = "tours";
class ToursController {
    async create(req, res) {
        try {
            const locale = await prisma.language.findFirst({
                where: { default: false },
            });
            let names = filterFormDataByKey(req.body, "name");
            let descs = filterFormDataByKey(req.body, "desc");
            const tour = await prisma.tour.create({
                data: {
                    name: names,
                    price: Number(req.body.price),
                    extra_price: Number(req.body.extra_price),
                    days: Number(req.body.days),
                    slug: slugify(names[locale.code], {
                        lower: true,
                        remove: /[/[*+~.()'"!:@]/g,
                    }),
                    description: descs,
                },
            });
            let images = req.session["images"];
            if (images) {
                images.forEach(async (path) => {
                    let imgobj = {};
                    imgobj.image = path;
                    imgobj.tourId = tour.id;
                    await prisma.tourImage.create({ data: imgobj });
                });
            }
            res.redirect(`/admin/${url}`);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async createPage(req, res) {
        try {
            req.session["images"] = [];
            const locales = await prisma.language.findMany();
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
    async read(req, res) {
        const array = await prisma.tour.findMany({
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
    async readSingle(req, res) {
        try {
            req.session["images"] = [];
            const locales = await prisma.language.findMany();
            const object = await prisma.tour.findUnique({
                where: { id: Number(req.params.id) },
                include: { images: true },
            });
            res.render(`admin/pages/${url}/edit`, {
                title: title,
                pathname: `/${url}`,
                breadcrumb: {
                    parent: title,
                    url: `/admin/${url}`,
                    current: "Изменить",
                },
                object: object,
                locales: locales,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const locale = await prisma.language.findFirst({
                where: { default: false },
            });
            let names = filterFormDataByKey(req.body, "name");
            let descs = filterFormDataByKey(req.body, "desc");
            const tour = await prisma.tour.update({
                where: { id: Number(req.params.id) },
                data: {
                    name: names,
                    price: Number(req.body.price),
                    extra_price: Number(req.body.extra_price),
                    days: Number(req.body.days),
                    slug: slugify(names[locale.code], {
                        lower: true,
                        remove: /[/[*+~.()'"!:@]/g,
                    }),
                    description: descs,
                },
            });
            let images = req.session["images"];
            if (images) {
                images.forEach(async (path) => {
                    let imgobj = {};
                    imgobj.image = path;
                    imgobj.tourId = tour.id;
                    await prisma.tourImage.create({ data: imgobj });
                });
            }
            res.redirect(`/admin/${url}`);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            await prisma.tour.delete({
                where: { id: Number(req.params.id) },
                include: { images: true },
            });
            res.redirect(`/admin/${url}`);
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
}
export default new ToursController();
//# sourceMappingURL=tours.controller.js.map