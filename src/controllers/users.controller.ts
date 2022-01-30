import { Request, Response } from 'express';
import UsersRepository from '../repositories/users.repository';

class UsersController {
	public async getAll (req: Request, res: Response): Promise<Response> {
		const { user_id } = res.locals.decodedToken;
		const profiles = await UsersRepository.getPublicProfiles(user_id);

		return res.json({ profiles });
	}

	public async getUser (req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const user = await UsersRepository.byId(Number(id));

		if (!user) {
			return res.status(404).json({
				code: 404,
				message: 'User not found'
			});
		}

		const info = await UsersRepository.userInfo(Number(id));

		return res.json({ ...user, info });
	}

	public async follow (req: Request, res: Response): Promise<Response> {
		const { user_id } = res.locals.decodedToken;
		const { id } = req.params;

		try {
			await UsersRepository.follow(user_id, Number(id));
			return res.status(201).json();
		} catch (err: any) {
			return res.status(400).json({
				code: 400,
				message: 'Bad request',
				error: err.message
			});
		}
	}

	public async unfollow (req: Request, res: Response): Promise<Response> {
		const { user_id } = res.locals.decodedToken;
		const { id } = req.params;

		try {
			await UsersRepository.unfollow(user_id, Number(id));
			return res.status(204).json();
		} catch (err: any) {
			return res.status(400).json({
				code: 400,
				message: 'Bad request',
				error: err.message
			});
		}
	}
}

export default new UsersController();
