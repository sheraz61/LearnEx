import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js'
import { getNotifications, updateNotification } from '../controllers/notification.controller.js'


const router = express.Router()


router.get('/get-all-notification', isAuthenticated,authorizeRoles('admin'),getNotifications)
router.get('/update-notification/:id', isAuthenticated,authorizeRoles('admin'),updateNotification)

export default router 