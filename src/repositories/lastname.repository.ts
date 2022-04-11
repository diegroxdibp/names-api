import { queryBuilder } from "../core/database";
export default class LastnameRepository {
  public static async allLastnames(): Promise<any> {
    return queryBuilder.select("*").from("lastname_jap");
  }

  public static async randomLastname(): Promise<any> {
    return queryBuilder
      .select("lastname")
      .from("lastname_jap")
      .orderByRaw("RAND()")
      .first();
  }

  public static async getLastname(lastname: string): Promise<any> {
    return queryBuilder
      .select("*")
      .from("lastname_jap")
      .where("lastname", "=", lastname)
      .first();
  }

  public static async getLastnameById(lastname_id: number): Promise<any> {
    return queryBuilder
      .select("*")
      .from("lastname_jap")
      .where("lastname_id", "=", lastname_id)
      .first();
  }

  public static async addLastname(lastname: string): Promise<any> {
    return queryBuilder
      .insert({ lastname: lastname })
      .into("lastname_jap")
      .whereNot({ lastname: lastname });
  }

  public static async deleteById(lastname_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("lastname_jap")
      .where("lastname_id", "=", lastname_id);
  }
}
