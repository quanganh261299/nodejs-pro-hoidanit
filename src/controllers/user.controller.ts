import { Request, Response } from "express"
import { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleGetUserById, updateUserById } from "services/admin/user.service"
import { getProducts } from "services/client/item.service"

const getHomePage = async (req: Request, res: Response) => {
    const products = await getProducts();

    return res.render("client/home/show.ejs", { products })
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
    await handleCreateUser(fullName, username, address, phone, avatar, role)

    return res.redirect("/admin/user")
}

const postDeleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    await handleDeleteUser(id)
    return res.redirect("/admin/user")
}

const getViewUser = async (req: Request, res: Response) => {
    const { id } = req.params
    // Get user by id
    const user = await handleGetUserById(id)
    const roles = await getAllRoles();
    return res.render('admin/user/detail.ejs', {
        id: id,
        user: user,
        roles
    })
}

const postUpdateUser = async (req: Request, res: Response) => {
    const { id, fullName, phone, role, address } = req.body
    const file = req.file;
    const avatar = file?.filename ?? undefined

    // Update user by id
    await updateUserById(id, fullName, phone, role, address, avatar)
    return res.redirect("/admin/user")
}

export { getHomePage, getCreateUserPage, postCreateUserPage, postDeleteUser, getViewUser, postUpdateUser }