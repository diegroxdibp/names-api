import { NextFunction, Request, Response } from 'express';

export default class AuthorizationMiddleware {
	public static async adminOnly (req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		const role = res.locals.decodedToken.role;
		console.log(res.locals.decodedToken);
		console.log(role);
		if (role !== 'admin') return res.status(403).send('Admins only!');
		return next();
	}
}
