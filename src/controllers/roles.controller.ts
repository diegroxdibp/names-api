import { Request, Response } from 'express';
import RolesRepository from '../repositories/roles.repository';

class RolesController {
	public async makeAdminById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		console.log('PARAMS -->', user_id);
		const response = await RolesRepository.byIdAdmin(Number(user_id));
		if (!response) {
			return res.status(404).json({
				code: 404,
				message: 'User not found'
			});
		}
		return res.json(`Role from user of ID ${user_id} has been set as admin!`);
	}

	public async makeUserById (req: Request, res: Response): Promise<Response> {
		const user_id = req.params.id;
		console.log('PARAMS -->', user_id);
		const response = await RolesRepository.byIdUser(Number(user_id));
		if (!response) {
			return res.status(404).json({
				code: 404,
				message: 'User not found'
			});
		}
		return res.json(`Role from user of ID ${user_id} has been set as user!`);
	}
}

export default new RolesController();
