import { Request, Response } from 'express';
import { name, description, version, author } from '../../package.json';

class AppController {
	public async welcome (req: Request, res: Response): Promise<Response> {
		return res.json({
			name, description, version, author
		});
	}
}

export default new AppController();
