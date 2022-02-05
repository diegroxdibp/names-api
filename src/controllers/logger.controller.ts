import { Request, Response } from 'express';
import LoggerRepository from '../repositories/logger.repository';

class LoggerController {
	public async loginLogs (req: Request, res: Response): Promise<Response> {
		const log = await LoggerRepository.retrieveLoginLogs();

		return res.json(log);
	}
}

export default new LoggerController();
