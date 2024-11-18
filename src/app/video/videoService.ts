import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/Response.Mapper";
import { VideoModelTypes, IFilterVideo } from "./videoTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import {
  createVideo,
  deleteVideo,
  getVideo,
  getVideoById,
  getVideoCount,
  updateVideo,
  updateVideoLikes,
  updateVideoViews,
} from "./videoRepository";

export const getVideoService = async ({
  search,
  page = 1,
  perPage = 10,
  categoryId,
  uploaderId,
}: IFilterVideo) => {
  const [videos, totalData] = await Promise.all([
    getVideo({ search, page, perPage, categoryId, uploaderId }),
    getVideoCount({ search, categoryId, uploaderId }),
  ]);

  // if (!videos.length) {
  //   return new ErrorApp(
  //     MESSAGES.ERROR.NOT_FOUND.VIDEO,
  //     404,
  //     MESSAGE_CODE.NOT_FOUND
  //   );
  // }

  const response = { data: videos, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getVideoByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const video = await getVideoById(id);
  if (!video) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.VIDEO,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  return video;
};

export const createVideoService = async ({
  title,
  description,
  thumbnailUrl,
  videoUrl,
  category,
  uploader,
}: VideoModelTypes) => {
  // const user = await getUserById(userId);
  // if (!user) {
  //   return new ErrorApp(
  //     MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT,
  //     404,
  //     MESSAGE_CODE.NOT_FOUND
  //   );
  // }

  const response = await createVideo({
    title,
    description,
    thumbnailUrl,
    videoUrl,
    category,
    uploader,
  });
  return response;
};

export const updateVideoService = async ({
  id,
  title,
  description,
  thumbnailUrl,
  category,
}: Partial<VideoModelTypes>) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const video = await getVideoById(id);
  if (!video) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.VIDEO,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  // const product = await getProductById(video.productId);
  // if (!product) {
  //   return new ErrorApp(
  //     MESSAGES.ERROR.NOT_FOUND.PRODUCT,
  //     404,
  //     MESSAGE_CODE.NOT_FOUND
  //   );
  // }

  const updateFields: Partial<VideoModelTypes> = {};

  if (title !== undefined) updateFields.title = title;
  if (description !== undefined) updateFields.description = description;
  if (thumbnailUrl !== undefined) updateFields.thumbnailUrl = thumbnailUrl;
  if (category !== undefined) updateFields.category = category;
  if (thumbnailUrl !== undefined) updateFields.thumbnailUrl = thumbnailUrl;

  const response = await updateVideo(id, updateFields);
  return response;
};

export const updateVideoViewsService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const video = await getVideoById(id);
  if (!video) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.VIDEO,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }
  // const product = await getProductById(video.productId);
  // if (!product) {
  //   return new ErrorApp(
  //     MESSAGES.ERROR.NOT_FOUND.PRODUCT,
  //     404,
  //     MESSAGE_CODE.NOT_FOUND
  //   );
  // }

  const response = await updateVideoViews(id);
  return response;
};  

export const updateVideoLikesService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const video = await getVideoById(id);
  if (!video) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.VIDEO,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  // const product = await getProductById(video.productId);
  // if (!product) {
  //   return new ErrorApp(
  //     MESSAGES.ERROR.NOT_FOUND.PRODUCT,
  //     404,
  //     MESSAGE_CODE.NOT_FOUND
  //   );
  // }

  const response = await updateVideoLikes(id);
  return response;
};

export const deleteVideoService = async (id: string) => {
  if (!id) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ID,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const video = await getVideoById(id);
  if (!video) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.VIDEO,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const response = await deleteVideo(id);
  return response;
};
