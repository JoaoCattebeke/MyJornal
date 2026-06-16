import { Router } from 'express';
import { userController } from '../controllers/userController.js';
//import { validate } from '../middlewares/validate.js';
//import { createUserSchema } from '../schemas/userSchema.js';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.post(
  '/',
  //validate(createUserSchema),
  userController.create
);

router.put(
  '/:id',
  //validate(updateUserSchema),
  userController.update
);
router.delete('/:id', userController.remove);

export default router;