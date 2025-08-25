import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUser, postCreateUserPage, postDeleteUser, postUpdateUser } from 'controllers/user.controller'
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller'
import fileUploadMiddleware from 'src/middleware/multer'
import { getProductPage } from 'controllers/client/product.controller'
import { getAdminCreateProductPage, postAdminCreateProduct } from 'controllers/admin/product.controller'

const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/product/:id', getProductPage)

    // Admin routes
    router.get('/admin', getDashboardPage)
    router.get('/admin/user', getAdminUserPage)
    router.get('/admin/create-user', getCreateUserPage)
    router.post('/admin/handle-create-user', fileUploadMiddleware('avatar'), postCreateUserPage)
    router.post('/admin/delete-user/:id', postDeleteUser)
    router.get('/admin/view-user/:id', getViewUser)
    router.post('/admin/update-user', fileUploadMiddleware('avatar'), postUpdateUser)

    router.get('/admin/user/create', getAdminUserPage)

    router.get('/admin/product', getAdminProductPage)
    router.get('/admin/create-product', getAdminCreateProductPage)
    router.post('/admin/create-product', fileUploadMiddleware('image', 'images/product'), postAdminCreateProduct)

    router.get('/admin/order', getAdminOrderPage)

    app.use('/', router)
}

export default webRoutes


