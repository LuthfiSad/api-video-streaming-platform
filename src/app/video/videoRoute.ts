import { Router } from "express";
import { deleteVideoController, getVideoByIdController, getVideoController, updateVideoController, createVideoController, getVideosByProfileController } from "./videoController";
import { CatchWrapper } from "../../utils/CatchWrapper";
import { VerifyToken } from "../../middleware/verifyToken";
import { VerifyAdmin } from "../../middleware/verifyAdmin";

const route = Router()

// route.post("/", VerifyToken, CatchWrapper(upload.single("image")), validateRequest(createVideoSchema, imageSchema), CatchWrapper(createVideoController))
route.get("/", VerifyAdmin, CatchWrapper(getVideoController))
route.get("/profile/", VerifyToken, CatchWrapper(getVideosByProfileController))
route.get("/:id", VerifyToken, CatchWrapper(getVideoByIdController))
route.post("/", VerifyToken, CatchWrapper(createVideoController))
route.put("/:id", VerifyToken, updateVideoController)
route.delete("/:id", VerifyToken, CatchWrapper(deleteVideoController))

export default route