import express from 'express';
import { UserController } from '../controllers/UserController';

export function setupUserRoutes(userController: UserController): express.Router {
  const router = express.Router();

  router.post('/users', userController.createUser.bind(userController));
  router.get('/users/:id', userController.getUser.bind(userController));
  router.put('/users/:id', userController.updateUser.bind(userController));
  router.post('/auth/login', userController.loginUser.bind(userController));
  router.post('/auth/logout', userController.logoutUser.bind(userController));

  return router;
}