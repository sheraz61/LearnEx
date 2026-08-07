import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js'
import { createLayout, editLayout, getLayoutByType } from '../controllers/layout.controller.js'


const router = express.Router()

router.post('/create-layout',isAuthenticated,authorizeRoles('admin'),createLayout)
router.put('/edit-layout',isAuthenticated,authorizeRoles('admin'),editLayout)
router.get('/get-layout/:type',getLayoutByType)

export default router