import { Router } from 'express';

import { AuthenticationUserController } from '@modules/accounts/useCases/authenticationUser/AuthenticationUserController';

const authenticationUserController = new AuthenticationUserController();

const authenticateRoutes = Router();

authenticateRoutes.post('/', authenticationUserController.handle);

export { authenticateRoutes };
