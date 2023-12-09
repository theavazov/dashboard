import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "Языки";
const url = "languages";

class LanguagesController {
  async index(req: Request, res: Response) {
    const languages = await prisma.language.findMany({
      orderBy: { createdAt: "desc" },
    });

    const defaultLanguage = languages.filter((lang) => lang.default === true);

    try {
      res.render(`admin/pages/settings/${url}/index`, {
        title: title,
        pathname: `/${url}`,
        breadcrumb: {
          parent: "",
          url: "",
          current: title,
        },
        data: languages,
        defaultLang: defaultLanguage[0],
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const languages = await prisma.language.findMany();
      const defaultLanguage = languages.filter((lang) => lang.default === true);

      const object = await prisma.language.findUnique({
        where: { id: Number(req.params.id) },
      });

      res.render(`admin/pages/settings/${url}/edit`, {
        title: title,
        pathname: `/${url}`,
        breadcrumb: {
          parent: title,
          url: `/admin/${url}`,
          current: "Изменить",
        },
        object: object,
        data: languages,
        defaultLang: defaultLanguage[0],
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const languages = await prisma.language.findMany();

      res.render(`admin/pages/settings/${url}/create`, {
        title: title,
        pathname: `/${url}`,
        breadcrumb: {
          parent: "",
          url: "",
          current: title,
        },
        data: languages,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const languages = await prisma.language.findMany();
      const { name, code, active, defaultLang } = req.body;

      const isDefault = defaultLang === "on" ? true : false;
      const isActive = active === "on" ? true : false;

      await prisma.language.create({
        data: {
          name: name,
          code: code,
          status: isActive,
          default: languages.length > 0 ? isDefault : true,
        },
      });

      res.redirect(`/admin/${url}`);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, code, active, defaultLang } = req.body;

      const isDefault = defaultLang === "on" ? true : false;
      const isActive = active === "on" ? true : false;

      // await prisma.language.updateMany({
      //   where: {
      //     default: true,
      //     AND: {
      //       default: false,
      //     },
      //   },
      //   data: {
      //     default: false,
      //   },
      // });

      await prisma.language.update({
        where: { id: Number(req.params.id) },
        data: {
          name: name,
          code: code,
          status: isActive,
          default: isDefault,
        },
      });

      res.redirect(`/admin/${url}`);
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prisma.language.delete({
        where: { id: Number(req.params.id) },
      });
      res.redirect(`/admin/${url}`);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

export default new LanguagesController();
