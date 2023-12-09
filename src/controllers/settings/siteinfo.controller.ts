import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "Общие данные";
const url = "siteinfo";

class SiteinfoController {
  async index(req: Request, res: Response) {
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
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async show(req: Request, res: Response) {}

  async create(req: Request, res: Response) {}

  async store(req: Request, res: Response) {
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
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new SiteinfoController();
