import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TranslationsController {
  async index(req: Request, res: Response) {}

  async show(req: Request, res: Response) {}

  async create(req: Request, res: Response) {}

  async store(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async delete(req: Request, res: Response) {}
}

export default new TranslationsController();
