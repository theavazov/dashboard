import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const title = "Общие данные";
const url = "siteinfo";
class SiteinfoController {
    async index(req, res) {
        try {
            const siteinfo = await prisma.siteinfo.upsert({
                where: {
                    id: 1,
                },
                update: {},
                create: {
                    title: "",
                },
            });
            res.render("admin/pages/settings/siteinfo", {
                title: title,
                pathname: `/${url}`,
                breadcrumb: {
                    parent: "",
                    url: "",
                    current: title,
                },
                siteinfo: siteinfo,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async show(req, res) { }
    async create(req, res) { }
    async store(req, res) {
        try {
            const {} = req.body;
            const siteinfo = await prisma.siteinfo.upsert({
                where: {
                    id: 1,
                },
                update: {
                    title: "",
                },
                create: {
                    title: "",
                },
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async update(req, res) { }
    async delete(req, res) { }
}
export default new SiteinfoController();
//# sourceMappingURL=siteinfo.controller.js.map