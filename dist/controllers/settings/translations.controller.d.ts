import { Request, Response } from "express";
declare class TranslationsController {
    index(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    store(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: TranslationsController;
export default _default;
