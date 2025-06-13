import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { createSkill, deleteSkill, getSkills, updateSkill } from '../controller/skill.controller.js';

const router = express.Router();

const uploadFields = upload.fields([
    { name: 'image', maxCount: 1 },
])

router.route("/create-skill").post(uploadFields, createSkill)

router.route("/get-skills").get(getSkills)

router.route("/delete-skill/:id").delete(deleteSkill)

router.route("/update-skill/:id").put(uploadFields, updateSkill)


export default router;