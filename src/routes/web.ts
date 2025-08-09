import express, { Express } from 'express'
import { getCreateUserPage, getHomePage, getViewUser, postCreateUserPage, postDeleteUser } from 'controllers/user.controller'

const router = express.Router()

const webRoutes = (app: Express) => {
    router.get('/', getHomePage)
    router.get('/create-user', getCreateUserPage)
    router.post('/handle-create-user', postCreateUserPage)
    router.post('/handle-delete-user/:id', postDeleteUser)
    router.get('/handle-view-user/:id', getViewUser)

    app.use('/', router)
}

export default webRoutes


