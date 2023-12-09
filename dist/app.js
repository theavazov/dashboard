import express from "express";
import { config } from "dotenv";
import path from "path";
import session from "express-session";
import expressLayouts from "express-ejs-layouts";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import multer from "multer";
import fs from "fs";
config();
const prisma = new PrismaClient();
// ROUTES
import adminRoutes from "./routes/admin/index.js";
import apiRoutes from "./routes/api.js";
const app = express();
const port = process.env.PORT || 8080;
app.use(session({
    secret: "Secret",
}));
// HELPERS
app.locals.mediaLinkGenerator = (image) => {
    return `${process.env.BASE_URL}/admin/${image}`;
};
app.locals.mask = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
// SETUP
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "admin/partials/layout.ejs");
app.use("/admin/upload", express.static("upload"));
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "upload");
    },
    filename(req, file, callback) {
        const image = Date.now() + path.extname(file.originalname);
        req.session["image"] = image;
        callback(null, image);
    },
});
const upload = multer({ storage: storage });
app.use(async (req, res, next) => {
    const locale = await prisma.language.findFirst({ where: { default: true } });
    res.locals.locale = locale;
    next();
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.post("/file/upload", upload.single("file"), (req, res) => {
    try {
        if (!req.file.mimetype.startsWith("image/")) {
            res.status(422).json({
                error: "The uploaded file must be an image",
            });
        }
        let images = req.session["images"] ? req.session["images"] : [];
        images.push(req.file.path);
        req.session["images"] = images;
        res.send(req.file.path);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
app.delete("/file/delete", (req, res) => {
    try {
        let images = req.session["images"] ? req.session["images"] : [];
        let file = req.body.file;
        images.splice(images.indexOf(file), 1);
        req.session["images"] = images;
        fs.unlink(file, (err) => {
            if (err) {
                res.json({ message: err.message });
            }
        });
        res.json({ message: "success" });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
// app.use("/", clientRoutes);
app.get("/", (req, res) => {
    res.render("client/welcome", {
        title: "Welcome to Express with Typescript",
        layout: "client/layout",
    });
});
app.use((req, res) => {
    res.render("admin/pages/error", {
        title: "Error",
        layout: "client/layout",
    });
});
export default app;
//# sourceMappingURL=app.js.map