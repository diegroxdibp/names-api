import { Request, Response } from 'express';
import LoggerRepository from '../repositories/logger.repository';
import AuthRepository from '../repositories/auth.repository';
import { Metadata } from '../models/metadata';

class AuthController {
	public async login (req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body;
			const token = await AuthRepository.attemptLogin(email, password);
			const metadata: Metadata = { method: req.method, url: req.url, headers: req.rawHeaders };
			await LoggerRepository.registerLogin(email, metadata);
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
			const { email, password } = req.body;
			const emailInUse = await AuthRepository.checkEmailInUse(email);

			if (emailInUse) {
				return res.status(409).json({
					message: 'Email already in use!',
					code: 409
				});
			}

			await AuthRepository.register(email, password);
			const token = await AuthRepository.attemptLogin(email, password);
			console.log(token);
			return res.json({ token });
		} catch (err: any) {
			return res.status(400).json({
				message: 'Bad request',
				code: 400,
				error: err.message
			});
		}
	}
}

export default new AuthController();
