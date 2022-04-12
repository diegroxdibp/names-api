import { Request, Response } from "express";
import CommentsRepository from "../repositories/comments.repository";
import fs from "fs";
interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

class CommentsController {
  public async getAllComments(req: Request, res: Response): Promise<Response> {
    const response = await CommentsRepository.getAllComments();
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "No comments found!",
      });
    }
    return res.json(response);
  }

  public async getCommentByID(req: Request, res: Response): Promise<Response> {
    const comment_id = req.params.comment_id;
    const response = await CommentsRepository.getCommentById(
      Number(comment_id)
    );
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: `Could not find comment with ID ${comment_id}!`,
      });
    }
    return res.json(response);
  }

  public async addComment(req: Request, res: Response): Promise<Response> {
    let { author, comment } = req.body;
    let images_url = null;
    if (req.files) {
      const images = (req.files as File[]).map((file) => file.path);
      images_url = JSON.stringify(images);
      console.log("files", images);
    }

    // if (req.file) {
    //   imageBase64 = req.file.buffer.toString("base64");
    // }
    const response = await CommentsRepository.addComment(
      author,
      comment,
      images_url
    );
    if (!response) {
      return res.status(404).json({
        code: 404,
        message: "Could not add comment!",
      });
    }
    return res.json(`Successfully added comment!`);
  }

  public async removeComment(req: Request, res: Response): Promise<Response> {
    const comment_id = req.params.comment_id;
    const comment = await CommentsRepository.getCommentById(Number(comment_id));
    await CommentsRepository.removeComment(Number(comment_id));
    if (!comment) {
      return res.status(404).json({
        code: 404,
        message: `Could not find comment with ID ${comment_id}!`,
      });
    }

    const path = comment.images_url[0];
    fs.unlinkSync(path);
    return res.json(`Comment with ID ${comment_id} was removed!`);
  }
}

export default new CommentsController();
