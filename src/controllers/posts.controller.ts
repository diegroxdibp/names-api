import { Request, Response } from 'express';
import PostsRepository from '../repositories/posts.repository';

class PostsController {
	public async getAll (req: Request, res: Response): Promise<Response> {
		const posts = await PostsRepository.getPublicPosts();
		return res.json({ posts });
	}

	public async create (req: Request, res: Response): Promise<Response> {
		const { text } = req.body;
		const { decodedToken: { user_id } } = res.locals;

		try {
			const postId = await PostsRepository.create(text, user_id);
			const post = await PostsRepository.byId(postId);
			return res.status(201).json(post);
		} catch (err: any) {
			return res.status(400).json({
				code: 400,
				message: err.message
			});
		}
	}

	public async friendsPosts (req: Request, res: Response): Promise<Response> {
		const { decodedToken: { user_id } } = res.locals;
		const posts = await PostsRepository.friendsPosts(user_id);
		return res.json({ posts });
	}
}

export default new PostsController();
