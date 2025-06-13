import express from 'express';
import { createIntro, deleteIntro, getIntro, updateIntro } from '../controller/intro.controller.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 }
])

router.route("/create-intro").post(uploadFields, createIntro)

router.route("/get-intro").get(getIntro)

router.route("/delete-intro/:id").delete(deleteIntro)

router.route("/update-intro/:id").put(uploadFields, updateIntro) 


export default router;