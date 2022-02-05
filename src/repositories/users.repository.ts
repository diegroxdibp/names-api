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

	public static async getPublicProfiles (user_id: number, search?: string, page?: number): Promise<User[]> {
		return queryBuilder
			.select('id', 'name', 'username', 'gravatar_hash', 'created_at')
			.from('users')
			.where('id', '<>', user_id);
	}

	public static async follow (user_id: number, fid: number): Promise<number> {
		const [followId] = await queryBuilder.insert({
			id_user: fid,
			id_follow: user_id
		}).into('follows');

		return followId;
	}
}
