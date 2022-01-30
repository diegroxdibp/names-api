import { Request, Response } from 'express';
import { name, description, version } from '../../package.json';

class AppController {
	public async welcome (req: Request, res: Response): Promise<Response> {
		return res.json({
			name, description, version
		});
	}
}

export default new AppController();
