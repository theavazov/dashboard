import { Request, Response } from "express";
declare class ApplicationsController {
    index(req: Request, res: Response): Promise<void>;
    store(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}
declare const _default: ApplicationsController;
export default _default;
