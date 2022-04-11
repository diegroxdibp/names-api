import { Request, Response } from "express";
import FullnameRepository from "../repositories/fullname.repository";
import FirstnameRepository from "../repositories/firstname.repository";

class FullnameController {
  public async allFullnames(req: Request, res: Response): Promise<Response> {
    const fullnames = await FullnameRepository.allFullnames();
    if (!fullnames) {
      return res.status(404).json({
        code: 404,
        message: "No names found!",
      });
    }
    return res.json(fullnames);
  }

  public async getFullname(req: Request, res: Response): Promise<Response> {
    const fullname = req.params.fullname;
    const name = await FullnameRepository.getFullname(fullname);
    if (!name) {
      return res.status(404).json({
        code: 404,
        message: "No name found!",
      });
    }
    return res.json(name);
  }

  public async getFullnameById(req: Request, res: Response): Promise<Response> {
    const fullname_id = req.params.fullname_id;
    const name = await FullnameRepository.getFullnameById(Number(fullname_id));
    if (!name) {
      return res.status(404).json({
        code: 404,
        message: "No name found!",
      });
    }
    return res.json(name);
  }

  public async randomFullname(req: Request, res: Response): Promise<Response> {
    const fullname = await FullnameRepository.randomFullname();
    if (!fullname) {
      return res.status(404).json({
        code: 404,
        message: "No name found!",
      });
    }
    return res.json(fullname);
  }

  public async addFullname(req: Request, res: Response): Promise<Response> {
    const fullname = req.body.fullname;
    const name = await FullnameRepository.addFullname(fullname);
    if (name) {
      return res.status(409).json({
        code: 409,
        message: "Conflict! Already registered!",
      });
    } else {
      const response = await FullnameRepository.addFullname(fullname);
      return res.json(`Name ${fullname} has been added!`);
    }
  }
}

export default new FullnameController();
