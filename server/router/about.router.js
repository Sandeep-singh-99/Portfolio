import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { createAbout, deleteAbout, getAbout, updateAbout } from '../controller/about.controller.js';

const router = express.Router();

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
])

router.route("/create-about").post(uploadFields, createAbout)

router.route("/get-about").get(getAbout)

router.route("/delete-about/:id").delete(deleteAbout)

router.route("/update-about/:id").put(uploadFields, updateAbout) 

export default router;