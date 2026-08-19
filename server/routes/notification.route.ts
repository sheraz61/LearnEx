import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js'
import { getNotifications, updateNotification } from '../controllers/notification.controller.js'


const router = express.Router()


router.get('/get-all-notifications', isAuthenticated,authorizeRoles('admin'),getNotifications)
router.put('/update-notification/:id', isAuthenticated,authorizeRoles('admin'),updateNotification)

export default router 