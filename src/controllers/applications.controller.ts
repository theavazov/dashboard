import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const title = "Заявки с сайта";
const url = "applications";

class ApplicationsController {
  async index(req: Request, res: Response) {
    const array = await prisma.application.findMany();

    try {
      res.render(`admin/pages/${url}`, {
        title: title,
        pathname: `/${url}`,
        breadcrumb: {
          parent: "",
          url: "",
          current: title,
        },
        data: array,
      });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async store(req: Request, res: Response) {
    try {
      await prisma.application.create({ data: req.body });
      res.json({ message: "Successfully created!" });
    } catch (error) {
      res.json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await prisma.application.delete({ where: { id: Number(req.params.id) } });
      res.redirect(`/admin/${url}`);
    } catch (error) {
      res.json({ message: error.message });
    }
  }
}

export default new ApplicationsController();
