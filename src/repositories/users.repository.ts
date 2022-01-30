import { queryBuilder } from '../core/database';
import { User } from '../models/user';
import { UserInfo } from '../models/user-info';

export default class UsersRepository {
	public static async byId (id: number): Promise<User> {
		return queryBuilder
			.select()
			.from('users')
			.where('id', '=', id)
			.first();
	}

	public static async userInfo (userId: number): Promise<UserInfo> {
		const sql = `
            SELECT
                posts,
                IF (
                    post IS NULL,
                    'You have no posts',
                    post
                ) AS post,
                followers,
                following
            FROM (
                SELECT COUNT(*) AS posts FROM posts WHERE created_by = :user_id
            ) AS BC
            LEFT JOIN (
                SELECT created_by, post
                FROM posts
                WHERE created_by = :user_id
                ORDER BY created_at DESC
                LIMIT 1
            ) AS P ON P.created_by = :user_id
            JOIN (
                SELECT COUNT(*) AS followers FROM follows WHERE id_user = :user_id
            ) AS F1
            JOIN (
                SELECT COUNT(*) AS following FROM follows WHERE id_follow = :user_id
            ) AS F2
        `;

		const res = await queryBuilder.raw(sql, { user_id: userId });
		return res[0][0];
	}

	public static async getPublicProfiles (userId: number, search?: string, page?: number): Promise<User[]> {
		return queryBuilder
			.select('id', 'name', 'username', 'gravatar_hash', 'created_at')
			.from('users')
			.where('id', '<>', userId);
	}

	public static async follow (userId: number, fid: number): Promise<number> {
		const [followId] = await queryBuilder.insert({
			id_user: fid,
			id_follow: userId
		}).into('follows');

		return followId;
	}

	public static async unfollow (userId: number, fid: number): Promise<void> {
		return queryBuilder('follows')
			.where('id_follow', '=', userId)
			.andWhere('id_user', '=', fid)
			.del();
	}
}
