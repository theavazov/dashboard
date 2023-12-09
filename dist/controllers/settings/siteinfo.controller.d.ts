import { Request, Response } from "express";
declare class SiteinfoController {
    index(req: Request, res: Response): Promise<void>;
    show(req: Request, res: Response): Promise<void>;
    create(req: Request, res: Response): Promise<void>;
    store(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: SiteinfoController;
export default _default;
