import PostController from '@controllers/posts';
import TagController from '@controllers/tags';
import { validateData } from '@middlewares/validation-middleware';
import express, { Request, Response } from 'express';
import { postSchema } from '@schemas/postSchema';
import { tagSchema } from '@schemas/tagSchema';
import PlatformController from '@controllers/platforms';
import { platformSchema } from '@schemas/platformSchema';
const apiRouter = express.Router();

apiRouter.get('/', (req: Request, res: Response): void => {
  res.json({
    message: "You're using api route"
  });
});

const postController = new PostController();
apiRouter.get('/posts', postController.index);
apiRouter.post('/posts', validateData(postSchema), postController.store);
apiRouter.put('/posts/:postId', validateData(postSchema), postController.update);
apiRouter.get('/posts/:postId', postController.show);
apiRouter.delete('/posts/:postId', postController.delete);

const tagController = new TagController();
apiRouter.get('/tags', tagController.index);
apiRouter.get('/tags/search', tagController.search);
apiRouter.post('/tags', validateData(tagSchema), tagController.store);
apiRouter.put('/tags/:tagId', validateData(tagSchema), tagController.update);
apiRouter.get('/tags/:tagId', tagController.show);
apiRouter.delete('/tags/:tagId', tagController.delete);

const platformController = new PlatformController();
apiRouter.get('/platforms', platformController.index);
apiRouter.post('/platforms', validateData(platformSchema), platformController.store);
apiRouter.put('/platforms/:platformId', validateData(platformSchema), platformController.update);
apiRouter.get('/platforms/:platformId', platformController.show);
apiRouter.delete('/platforms/:platformId', platformController.delete);

export default apiRouter;
