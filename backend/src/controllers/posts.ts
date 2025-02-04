import {
  createPost,
  deletePost,
  getPost,
  PostParam,
  updatePost,
  getAllPosts
} from '@models/posts';
import { sendErrorResponse, sendSuccessResponse } from '@utilities/response';
import { Request, Response } from 'express';
export default class PostController {
  async index(req: Request, res: Response) {
    let page = parseInt(req.query.page as string) || 1;
    const { posts, pagination } = await getAllPosts(page);
    // Validate page number
    if (isNaN(page) || page < 1) {
      page = 1;
    }
    sendSuccessResponse(res, { posts, pagination }, 200, 'All posts');
  }
  async show(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      if (!postId) {
        throw new Error('Invalid post id');
      }
      const post = await getPost(postId);
      sendSuccessResponse(res, post, 200, `Current post with id ${postId}`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async store(req: Request, res: Response) {
    try {
      const { tags, ...postParam }: PostParam & { tags: number[] } = req.body;
      postParam.description = postParam.description.trim();
      const createdData = await createPost(postParam, tags);
      const post = await getPost(createdData.id);
      sendSuccessResponse(res, post, 200, `Post created successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async update(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      const { tags, ...postParam }: PostParam & { tags: number[] } = req.body;
      if (!postId) {
        throw new Error('Invalid post id');
      }
      const updatedData = await updatePost(postId, postParam, tags);
      const post = await getPost(updatedData.id);
      sendSuccessResponse(res, post, 200, `Post updated successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const postId = Number(req.params.postId);
      if (!postId) {
        throw new Error('Invalid post id');
      }
      const deletedPost = await deletePost(postId);
      sendSuccessResponse(res, deletedPost, 200, `Post deleted successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
}
