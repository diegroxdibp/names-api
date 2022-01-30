import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';
import AuthRepository from '../repositories/auth.repository';

class AuthController {
	public async login (req: Request, res: Response): Promise<Response> {
		try {
			const { username, password } = req.body;
			const token = await AuthRepository.attemptLogin(username, password);

			return res.json({ token });
		} catch (err: any) {
			return res.status(401).json({
				message: 'Unauthorized',
				code: 401,
				error: err.message
			});
		}
	}

	public async signUp (req: Request, res: Response): Promise<Response> {
		try {
			const { email, username, name, password } = req.body;
			await AuthRepository.register(username, password, name, email);

			const token = await AuthRepository.attemptLogin(username, password);
			return res.json({ token });
		} catch (err: any) {
			return res.status(400).json({
				message: 'Bad request',
				code: 400,
				error: err.message
			});
		}
	}

	public async profile (req: Request, res: Response): Promise<Response> {
		const { decodedToken: { user_id } } = res.locals;

		const user = await UsersRepository.byId(user_id);
		const info = await UsersRepository.userInfo(user_id);

		return res.json({
			...user,
			info
		});
	}
}

export default new AuthController();
