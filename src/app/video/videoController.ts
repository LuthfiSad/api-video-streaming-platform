import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import { createVideoService, deleteVideoService, getVideoByIdService, getVideoService, updateVideoService } from "./videoService";
import { MESSAGE_CODE } from "../../utils/MessageCode";

export const getVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search, categoryId, uploaderId } = req.query;

  const videos = await getVideoService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    categoryId: categoryId ? categoryId as string : undefined,
    uploaderId: uploaderId ? uploaderId as string : undefined
  });

  if (videos instanceof ErrorApp) {
    next(videos);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VIDEO.GET, videos.data, videos.meta);
};

export const getVideoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const video = await getVideoByIdService(id);

  if (video instanceof ErrorApp) {
    next(video);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VIDEO.GET, video);
};

export const getVideosByProfileController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, perPage, search } = req.query;

  const videos = await getVideoService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    uploaderId: req.params.uploaderId,
  });

  if (videos instanceof ErrorApp) {
    next(videos);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VIDEO.GET, videos.data, videos.meta);
};

export const createVideoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const videoData = req.body; // Dapatkan data video dari request body

  const video = await createVideoService(videoData);

  if (video instanceof ErrorApp) {
    next(video);
    return;
  }

  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.VIDEO);
};

export const updateVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const videoData = { ...req.body, id }; // Gabungkan data video dengan id

  const video = await updateVideoService(videoData);

  if (video instanceof ErrorApp) {
    next(video);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VIDEO.UPDATE, video);
};

export const deleteVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const video = await deleteVideoService(id);
  if (video instanceof ErrorApp) {
    next(video);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.VIDEO.DELETE);
};
