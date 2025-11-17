import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/admin/user.service";

const isEmailExist = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { username: email }
    });
    return !!user;
}

const registerNewUser = async (fullName: string, email: string, password: string) => {
    const hashedPassword = await hashPassword(password);

    const userRole = await prisma.role.findUnique({ where: { name: "USER" } })

    await prisma.user.create({
        data: {
            fullName,
            username: email,
            password: hashedPassword,
            roleId: userRole.id,
            accountType: ACCOUNT_TYPE.SYSTEM
        }
    })
}

export { isEmailExist, registerNewUser }