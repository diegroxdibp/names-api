import { queryBuilder } from "../core/database";

export default class CommentsRepository {
  public static async getAllComments(): Promise<any> {
    return queryBuilder.select("*").from("comments");
  }
  public static async getCommentById(comment_id: number): Promise<any> {
    return queryBuilder
      .select("*")
      .from("comments")
      .where("comment_id", "=", comment_id)
      .first();
  }
  public static async addComment(
    author: string,
    comment: string,
    images_url: string | null
  ): Promise<any> {
    return queryBuilder
      .insert({ author, comment, images_url })
      .into("comments");
  }

  public static async removeComment(comment_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("comments")
      .where("comment_id", "=", comment_id);
  }
}
