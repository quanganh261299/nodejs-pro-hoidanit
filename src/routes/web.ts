import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUser, postCreateUserPage, postDeleteUser, postUpdateUser } from 'controllers/user.controller'
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller'
import fileUploadMiddleware from 'src/middleware/multer'

const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)

    router.post('/handle-delete-user/:id', postDeleteUser)
    router.get('/handle-view-user/:id', getViewUser)
    router.post('/handle-update-user', postUpdateUser)

    // Admin routes
    router.get('/admin', getDashboardPage)
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUserPage)

    router.get('/admin/user/create', getAdminUserPage)
    router.get('/admin/product', getAdminProductPage)
    router.get('/admin/order', getAdminOrderPage)

    app.use('/', router)
}

export default webRoutes


