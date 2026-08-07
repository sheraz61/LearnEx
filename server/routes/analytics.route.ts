import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js'
import { getCoursesAnalytics, getOrderAnalytics, getUsersAnalytics } from '../controllers/analytics.controller.js'

const router = express.Router()

router.get('/get-users-analytics',isAuthenticated,authorizeRoles('admin'),getUsersAnalytics)
router.get('/get-courses-analytics',isAuthenticated,authorizeRoles('admin'),getCoursesAnalytics)
router.get('/get-orders-analytics',isAuthenticated,authorizeRoles('admin'),getOrderAnalytics)

export default router