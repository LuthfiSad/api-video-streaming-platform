import Joi from "joi";
import { MESSAGES } from "../../utils/Messages";

export const videoSchema = Joi.object({
  title: Joi.string().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.TITLE,
      "string.base": MESSAGES.ERROR.INVALID.TITLE
  }),
  description: Joi.string().messages({
      "string.base": MESSAGES.ERROR.INVALID.DESCRIPTION
  }),
  thumbnailUrl: Joi.string().uri().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.THUMBNAIL_URL,
      "string.uri": MESSAGES.ERROR.INVALID.THUMBNAIL_URL
  }),
  videoUrl: Joi.string().uri().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.VIDEO_URL,
      "string.uri": MESSAGES.ERROR.INVALID.VIDEO_URL
  }),
  category: Joi.string().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.CATEGORY,
      "string.base": MESSAGES.ERROR.INVALID.CATEGORY
  }),
  uploader: Joi.string().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.UPLOADER,
      "string.base": MESSAGES.ERROR.INVALID.UPLOADER
  }),
  views: Joi.number().integer().min(0).required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.VIEWS,
      "number.base": MESSAGES.ERROR.INVALID.VIEWS,
      "number.min": MESSAGES.ERROR.INVALID.VIEWS_MIN
  }),
  likes: Joi.number().integer().min(0).required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.LIKES,
      "number.base": MESSAGES.ERROR.INVALID.LIKES,
      "number.min": MESSAGES.ERROR.INVALID.LIKES_MIN
  }),
  uploadDate: Joi.date().required().messages({
      "any.required": MESSAGES.ERROR.REQUIRED.UPLOAD_DATE,
      "date.base": MESSAGES.ERROR.INVALID.UPLOAD_DATE
  })
});
