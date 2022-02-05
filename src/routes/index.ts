import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import UsersController from '../controllers/users.controller';
import AppController from '../controllers/app.controller';
import AuthorizationMiddleware from '../security/authorization.middleware';
import LoggerController from '../controllers/logger.controller';

const router = Router();

router.get('/', AppController.welcome);

// Auth
router.post('/api/auth/login', AuthController.login);
router.post('/api/auth/register', AuthController.signUp);

// Logs
router.get('/api/logs/login', LoggerController.loginLogs);

// Users
router.get('/api/users', UsersController.getAll);
router.get('/api/users/:id', UsersController.getUserById);
router.get('/api/logs', AuthorizationMiddleware.adminOnly, UsersController.getUserById);
// router.get('/api/users/:email', UsersController.getUserByEmail);
router.delete('/api/users/:id/delete', AuthorizationMiddleware.adminOnly, UsersController.deletetUserById);
// router.delete('/api/users/:email/delete', UsersController.deleteUserByEmail);

export default router;
