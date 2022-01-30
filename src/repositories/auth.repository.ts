import { createHash } from 'crypto';
import { User } from '../models/user';
import { queryBuilder } from '../core/database';
import { sign } from 'jsonwebtoken';

export default class AuthRepository {
	public static async attemptLogin (username: string, password: string): Promise<string> {
		password = createHash('sha256').update(password).digest('hex');

		const user: User = await queryBuilder
			.select()
			.from('users')
			.where('username', '=', username)
			.andWhere('password', '=', password)
			.first();

		if (user) {
			const token = sign({
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 31),
				username: user.username,
				email: user.email,
				user_id: user.id
			}, 'MyVerySecretKeyForSigningToken');

			return token;
		}

		throw new Error('Bad credentials');
	}

	public static async register (username: string, password: string, name: string, email: string): Promise<number> {
		password = createHash('sha256').update(password).digest('hex');
		const gravatar = createHash('md5').update(email).digest('hex');

		const [userId] = await queryBuilder.insert({
			username,
			email,
			password,
			name,
			gravatar_hash: gravatar
		}).into('users');

		if (!userId || userId <= 0) {
			throw new Error('Problem registering user');
		}

		return userId;
	}
}
