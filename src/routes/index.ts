import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import PostsController from '../controllers/posts.controller';
import UsersController from '../controllers/users.controller';
import AppController from '../controllers/app.controller';

const router = Router();

router.get('/', AppController.welcome);

// Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);
router.get('/api/auth/profile', AuthController.profile);

// Posts
router.get('/api/posts', PostsController.getAll);
router.post('/api/posts', PostsController.create);
router.get('/api/posts/friends', PostsController.friendsPosts);

// Users
router.get('/api/users', UsersController.getAll);
router.get('/api/users/:id', UsersController.getUser);
router.get('/api/users/:id/follow', UsersController.follow);
router.get('/api/users/:id/unfollow', UsersController.unfollow);

export default router;
