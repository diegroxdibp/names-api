import { queryBuilder } from '../core/database';

export default class RolesRepository {
	public static async byIdAdmin (user_id: number): Promise<number> {
		return queryBuilder
			.where('user_id', '=', user_id)
			.update({ role: 'admin' })
			.from('userTable');
	}

	public static async byIdUser (user_id: number): Promise<number> {
		return queryBuilder
			.where('user_id', '=', user_id)
			.update({ role: 'user' })
			.from('userTable');
	}
}
