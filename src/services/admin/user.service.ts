import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from 'bcrypt'

const hashPassword = async (plainText: string, saltRounds: number = 10) => {
    return await bcrypt.hash(plainText, saltRounds)
}

const handleCreateUser = async (fullName: string, email: string, address: string, phone: string, avatar: string, role: string) => {
    const defaultPassword = await hashPassword('123456');

    await prisma.user.create({
        data: {
            fullName,
            username: email,
            address,
            password: defaultPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            avatar,
            phone,
            roleId: +role
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

const updateUserById = async (id: string, fullName: string, phone: string, role: string, address: string, avatar: string,) => {
    const updatedUser = await prisma.user.update({
        where: { id: +id },
        data: {
            fullName,
            phone,
            roleId: +role,
            address,
            ...(avatar != undefined && { avatar })
        }
    })

    return updatedUser
}

export { getAllRoles, getAllUsers, handleCreateUser, handleDeleteUser, handleGetUserById, updateUserById, hashPassword };
