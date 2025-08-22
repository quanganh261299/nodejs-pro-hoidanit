import getConnection from "config/database"
import { PrismaClient } from "@prisma/client";
import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";

const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string) => {
    await prisma.user.create({
        data: {
            fullName,
            username: email,
            address,
            password: '123456',
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar,
            phone
        }
    })
}

const getAllUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

const getAllRoles = async () => {
    const roles = await prisma.role.findMany()
    return roles
}


const handleDeleteUser = async (id: string) => {
    await prisma.user.delete({ where: { id: +id } })
}

const handleGetUserById = async (id: string) => {
    const user = prisma.user.findUnique({
        where: { id: +id }
    })

    return user
}

const updateUserById = async (id: string, email: string, address: string, fullName: string) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName,
            username: email,
            address,
            password: '',
            accountType: ''
        }
    })

    return updatedUser
}

export { handleCreateUser, handleDeleteUser, getAllUsers, handleGetUserById, updateUserById, getAllRoles }