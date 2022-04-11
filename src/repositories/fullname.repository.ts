import { queryBuilder } from "../core/database";
export default class FullnameRepository {
  public static async allFullnames(): Promise<any> {
    return queryBuilder.select("*").from("fullname_jap");
  }

  public static async randomFullname(): Promise<any> {
    return queryBuilder
      .select("fullname")
      .from("fullname_jap")
      .orderByRaw("RAND()")
      .first();
  }

  public static async getFullname(fullname: string): Promise<any> {
    return queryBuilder
      .select("*")
      .from("fullname_jap")
      .where("fullname", "=", fullname)
      .first();
  }

  public static async getFullnameById(fullname_id: number): Promise<any> {
    return queryBuilder
      .select("*")
      .from("fullname_jap")
      .where("fullname_id", "=", fullname_id)
      .first();
  }

  public static async addFullname(fullname: string): Promise<any> {
    return queryBuilder
      .insert({ fullname })
      .into("fullname_jap")
      .whereNot({ fullname });
  }

  public static async deleteFullname(fullname_id: number): Promise<any> {
    return queryBuilder
      .delete()
      .from("fullname_jap")
      .where("fullname_id", "=", fullname_id);
  }
}
