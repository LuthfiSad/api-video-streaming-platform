import { Router } from "express";
import { deleteVideoController, getVideoByIdController, getVideoController, updateVideoController, createVideoController, getVideosByProfileController, updateLikesVideoController, updateViewsVideoController } from "./videoController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { validateRequest } from "../../middleware/validateRequest";
import { videoRequestSchema } from "./videoRequest";
// import { VerifyToken } from "../../middleware/verifyToken";
// import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createVideoSchema, imageSchema), CatchWrapper(createVideoController))
route.get("/", CatchWrapper(getVideoController))
route.get("/profile/", CatchWrapper(getVideosByProfileController))
route.get("/:id", CatchWrapper(getVideoByIdController))
route.post("/", validateRequest(videoRequestSchema), CatchWrapper(createVideoController))
route.put("/:id", updateVideoController)
route.delete("/:id", CatchWrapper(deleteVideoController))
route.put("/like/:id", CatchWrapper(updateLikesVideoController))
route.put("/view/:id", CatchWrapper(updateViewsVideoController))

export default route