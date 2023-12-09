import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import languagesController from "./languages.controller.js";
import siteinfoController from "./siteinfo.controller.js";
import translationsController from "./translations.controller.js";
class SettingsController {
    async siteinfoREAD(req, res) {
        try {
            res.render("admin/pages/settings/siteinfo", {
                breadcrumb: {
                    parent: "",
                    url: "",
                    current: "Общие данные",
                },
                siteinfo: {
                    title: "",
                    description: "",
                },
                title: "Общие данные",
                pathname: "",
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async languagesREAD(req, res) {
        try {
            const langs = await prisma.language.findMany();
            res.render("admin/pages/settings/languages/index", {
                breadcrumb: {
                    parent: "",
                    url: "",
                    current: "Языки",
                },
                siteinfo: {
                    title: "",
                    description: "",
                },
                title: "Языки",
                pathname: "",
                data: langs,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async languagesCREATE(req, res) {
        try {
            await prisma.language.create({ data: req.body });
            res.redirect("/admin/languages");
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async languagesCREATEpage(req, res) {
        try {
            res.render("admin/pages/settings/languages/create", {
                breadcrumb: {
                    parent: "Языки",
                    url: "/admin/languages",
                    current: "Новый язык",
                },
                title: "Новый язык",
                pathname: "",
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async languagesUPDATEpage(req, res) {
        try {
            const language = await prisma.language.findUnique({
                where: { id: Number(req.params.id) },
            });
            res.render("admin/pages/settings/languages/edit", {
                breadcrumb: {
                    parent: "Языки",
                    url: "/admin/languages",
                    current: "Изменить",
                },
                title: "Изменить",
                pathname: "",
                lang: language,
            });
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
    async languagesDELETE(req, res) {
        try {
            await prisma.language.delete({ where: { id: Number(req.params.id) } });
            res.redirect("/admin/languages");
        }
        catch (error) {
            res.json({ message: error.message });
        }
    }
}
export { languagesController, siteinfoController, translationsController };
//# sourceMappingURL=index.js.map