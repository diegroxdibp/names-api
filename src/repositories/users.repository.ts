import { queryBuilder } from '../core/database';
import { User } from '../models/user';
export default class UsersRepository {
	public static async getAllUsers (): Promise<User> {
		return queryBuilder
			.select('*')
			.from('userTable');
	}

	public static async byId (user_id: number): Promise<User> {
		return queryBuilder
			.select()
			.from('userTable')
			.where('user_id', '=', user_id)
			.first();
	}

	public static async byEmail (email: string): Promise<User> {
		return queryBuilder
			.select()
			.from('userTable')
			.where('email', '=', email)
			.first();
	}

	public static async deleteById (user_id: number): Promise<any> {
		return queryBuilder
			.delete()
			.from('userTable')
			.where('user_id', '=', user_id);
	}

	public static async deleteByEmail (email: string): Promise<void> {
		return queryBuilder('userTable')
			.where('email', '=', email)
			.del();
	}
}
