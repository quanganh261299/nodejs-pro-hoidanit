import { hashPassword } from "services/user.service";
import { prisma } from "config/client"
import { ACCOUNT_TYPE } from "config/constant";

const initDatabase = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const adminRole = await prisma.role.findFirst({
        where: { name: "ADMIN" }
    })

    if (countRole === 0) {
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description: "Admin thì full quyền"
                },
                {
                    name: "USER",
                    description: "User thông thường"
                }
            ]
        })
    }

    if (countUser === 0) {
        const defaultPassword = await hashPassword('123456');
        await prisma.user.createMany({
            data: [
                {
                    fullName: 'hoidanit',
                    username: "hoiddanit@gmail.com",
                    password: defaultPassword,
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                },
                {
                    fullName: 'hoidanit',
                    username: "admin@gmail.com",
                    password: await hashPassword("123456"),
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    roleId: adminRole.id
                }
            ]
        })
    }

    if (countRole !== 0 && countUser !== 0) {
        console.log(">> Already init data ...")
    }
}

export default initDatabase