import { Request, Response } from "express"
import { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleGetUserById, updateUserById } from "services/user.service"

const getHomePage = async (req: Request, res: Response) => {
    // Get users
    const users = await getAllUsers();
    return res.render("home", {
        users
    })
}

const getCreateUserPage = async (req: Request, res: Response) => {
    const roles = await getAllRoles();

    return res.render("admin/user/create.ejs", { roles })
}

const postCreateUserPage = async (req: Request, res: Response) => {
    const { fullName, username, phone, role, address } = req.body
    const file = req.file;
    const avatar = file?.filename ?? null

    // handle create user
    await handleCreateUser(fullName, username, address, phone, avatar)

    return res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    await handleDeleteUser(id)
    return res.redirect("/")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params
    // Get user by id
    const user = await handleGetUserById(id)
    return res.render('view-user', {
        id: id,
        user: user
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, email, address, fullName } = req.body
    // Update user by id
    await updateUserById(id, email, address, fullName)
    return res.redirect("/")
}

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser }