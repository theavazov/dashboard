import { Router, Request, Response } from "express";
const router = Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const news = [
  {
    id: 1,
    title: "В Ташкентской области состоялся международный турнир “Jeep Sprint”",
    slug: "v-tashkentskoy-oblasti-sostoyalsya-mejdunarodniy-turnir-jeep-sprint",
    image:
      "https://media.istockphoto.com/id/1008382328/photo/historic-registan-square-in-samarkend-uzbekistan.jpg?s=612x612&w=0&k=20&c=T-sDam2ax64uSu609D_xC7dOh-byI1DtNgfjT90lOfo=",
    date: "",
  },
  {
    id: 2,
    title:
      "В Узбекистане запускается туристическая платформа «Tabarruk ziyorat»",
    slug: "v-uzbekistane-zapuskaetsya-turisticeskaya-platforma-tabarruk-ziyorat",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/8f/Provincia_de_Samarcanda_2.jpg",
    date: "",
  },
  {
    id: 3,
    title:
      "Министерство Культуры и туризма Узбекистана признано Лучшим Министерством туризма года",
    slug: "ministerstvo-kulturi-i-turizma-uzbekistana-priznano-lucshim-ministerstvom-turizma-goda",
    image:
      "https://tma.uz/wp-content/uploads/2022/09/photo_5269356755849166378_y-1024x576.jpg",
    date: "",
  },
];

router.get("/", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();

    res.render("client/pages/index", {
      customCss: null,
      layout: "client/layout",
      news: news,
      pathname: "/",
      locales: locales,
    });
  } catch (error) {
    res.render("client/pages/error", { title: "Error 500" });
  }
});

router.get("/about", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();

    res.render("client/pages/about", {
      customCss: null,
      layout: "client/layout",
      news: news,
      pathname: "about",
      locales: locales,
    });
  } catch (error) {
    res.render("client/pages/error", { title: "Error 500" });
  }
});

router.get("/tours", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();
    const tours = await prisma.tour.findMany({ include: { images: true } });

    res.render("client/pages/tours/index", {
      customCss: "client/css/tours.css",
      layout: "client/layout",
      news: news,
      pathname: "tours",
      locales: locales,
      tours: tours,
    });
  } catch (error) {
    res.render("client/pages/error", { title: "Error 500" });
  }
});

router.get("/tours/:slug", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();
    const tour = await prisma.tour.findFirst({
      where: { slug: req.params.slug },
      include: { images: true },
    });

    res.render("client/pages/tours/slug", {
      customCss: "client/css/tours.css",
      layout: "client/layout",
      pathname: "/tours/:slug",
      locales: locales,
      tour: tour,
    });
  } catch (error) {
    res.render("client/pages/error", {
      title: "Error 404",
      customCss: null,
      layout: "client/layout",
      error: error,
    });
  }
});

router.get("/news/:slug", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();
    // const tour = await prisma.tour.findFirst({
    //   where: { slug: req.params.slug },
    //   include: { images: true },
    // });

    res.render("client/pages/tours/slug", {
      customCss: "client/css/tours.css",
      layout: "client/layout",
      pathname: "/about",
      locales: locales,
      news: {},
    });
  } catch (error) {
    res.render("client/pages/error", {
      title: "Error 404",
      customCss: null,
      layout: "client/layout",
      error: error,
    });
  }
});

router.get("/contact", async (req: Request, res: Response) => {
  try {
    const locales = await prisma.language.findMany();

    res.render("client/pages/contact", {
      customCss: "client/css/contact.css",
      layout: "client/layout",
      pathname: "contact",
      locales: locales,
    });
  } catch (error) {
    res.render("client/pages/error", { title: "Error 500" });
  }
});

export default router;
