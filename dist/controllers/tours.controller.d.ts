import { Request, Response } from "express";
declare class ToursController {
    create(req: Request, res: Response): Promise<void>;
    createPage(req: Request, res: Response): Promise<void>;
    read(req: Request, res: Response): Promise<void>;
    readSingle(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: ToursController;
export default _default;
