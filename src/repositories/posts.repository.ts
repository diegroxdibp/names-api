import { queryBuilder } from '../core/database';
import { Post } from '../models/post';

export default class PostsRepository {
	public static async getPublicPosts (search?: string, page?: number): Promise<Post[]> {
		return queryBuilder
			.select('posts.id', 'name', 'username', 'gravatar_hash', 'post', 'posts.created_at')
			.from('posts')
			.leftOuterJoin('users', 'users.id', 'posts.created_by')
			.orderBy('posts.created_at', 'desc');
	}

	public static async byId (postId: number): Promise<Post> {
		return queryBuilder
			.select('posts.id', 'name', 'username', 'gravatar_hash', 'post', 'posts.created_at')
			.from('posts')
			.leftOuterJoin('users', 'users.id', 'posts.created_by')
			.where('posts.id', '=', postId)
			.first();
	}

	public static async create (text: string, userId: number): Promise<number> {
		if (text.length > 160) {
			throw new Error('Max post length is 160');
		}

		const [postId] = await queryBuilder.insert({
			created_by: userId,
			post: text
		}).into('posts');

		if (!postId || postId <= 0) {
			throw new Error('Error creating post');
		}

		return postId;
	}

	public static async friendsPosts (userId: number, page?: number): Promise<Post[]> {
		const [posts] = await queryBuilder.raw(`
            SELECT posts.id, name, username, gravatar_hash, post, posts.created_at
            FROM posts
            JOIN (
                SELECT users.* FROM users
                LEFT JOIN (
                    SELECT id_user FROM follows WHERE id_follow = :user_id
                ) AS follows ON id_user = id
                WHERE id_user = id OR id = :user_id
            ) AS users ON created_by = users.id
            ORDER BY posts.created_at DESC
        `, { user_id: userId });

		return posts;
	}
}
