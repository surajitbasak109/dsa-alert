import { createPlatform, deletePlatform, getAllPlatforms, getPlatform, PlatformParam, updatePlatform } from '@models/platforms';
import { sendErrorResponse, sendSuccessResponse } from '@utilities/response';
import { Request, Response } from 'express';
export default class PlatformController {
  async index(req: Request, res: Response) {
    const platforms = await getAllPlatforms();
    sendSuccessResponse(res, platforms, 200, "All platforms");
  }
  async show(req: Request, res: Response) {
    try {
      const platformId = Number(req.params.platformId);
      if (!platformId) {
        throw new Error('Invalid platform id');
      }
      const platform = await getPlatform(platformId);
      sendSuccessResponse(
        res,
        { platform },
        200,
        `Current post with id ${platformId}`
      );
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async store(req: Request, res: Response) {
    try {
      const platformParam: PlatformParam = req.body;
      const createdData = await createPlatform(platformParam);
      sendSuccessResponse(res, createdData, 200, `Platform created successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async update(req: Request, res: Response) {
    try {
      const platformId = Number(req.params.platformId);
      const platformParam: PlatformParam = req.body;
      if (!platformId) {
        throw new Error('Invalid tag id');
      }
      const updatedData = await updatePlatform(platformId, platformParam);
      sendSuccessResponse(res, updatedData, 200, `Platform updated successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const platformId = Number(req.params.platformId);
      if (!platformId) {
        throw new Error('Invalid Platform id');
      }
      const deletedTag = await deletePlatform(platformId);
      sendSuccessResponse(res, deletedTag, 200, `Platform deleted successfully.`);
    } catch (error) {
      sendErrorResponse(res, error?.toString(), 500, 'Server error');
    }
  }
}
