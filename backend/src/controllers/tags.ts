import {
  createTag,
  deleteTag,
  getAllTags,
  getTag,
  searchTag,
  TagParam,
  updateTag
} from '@models/tags';
import { sendErrorResponse, sendSuccessResponse } from '@utilities/response';
import { Request, Response } from 'express';
export default class TagController {
  async index(req: Request, res: Response) {
    const tags = await getAllTags();
    sendSuccessResponse(res, tags, 200, 'All tags');
  }
  async search(req: Request, res: Response) {
    const qs = req.query.qs;
    if (!qs) {
      sendErrorResponse(res, 'Query is empty', 400, 'Query is empty');
    }
    const results = await searchTag(qs as string);
    sendSuccessResponse(res, results, 200, 'Your query string');
  }
  async show(req: Request, res: Response) {
    try {
      const tagId = Number(req.params.tagId);
      if (!tagId) {
        throw new Error('Invalid tag id');
      }
      const tag = await getTag(tagId);
      sendSuccessResponse(res, { tag }, 200, `Current post with id ${tagId}`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async store(req: Request, res: Response) {
    try {
      const tagParam: TagParam = req.body;
      const createdData = await createTag(tagParam);
      sendSuccessResponse(res, createdData, 200, `Tag created successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async update(req: Request, res: Response) {
    try {
      const tagId = Number(req.params.tagId);
      const tagParam: TagParam = req.body;
      if (!tagId) {
        throw new Error('Invalid tag id');
      }
      const updatedData = await updateTag(tagId, tagParam);
      sendSuccessResponse(res, updatedData, 200, `Tag updated successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const tagId = Number(req.params.tagId);
      if (!tagId) {
        throw new Error('Invalid post id');
      }
      const deletedTag = await deleteTag(tagId);
      sendSuccessResponse(res, deletedTag, 200, `Tag deleted successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
}
