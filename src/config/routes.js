import express from 'express';
import { login, me, jwtMdw } from '../api/modules/auth';

const router = express.Router({ mergeParams: true });

// modules
router.post('/api/login', login);
router.get('/api/me', jwtMdw, me);

// resources
router.use('/api/user', require('../api/resources/user').default);

export default router;
