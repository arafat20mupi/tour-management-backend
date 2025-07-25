import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";

import bcryptjs from "bcryptjs"
import { User } from "../modules/user/user.model";

const seedSuparAdmin = async () => {
    try {
        const isSuparAdmin = await User.findOne({ email: envVars.SUPAR_ADMIN_EMAIL })

        if (isSuparAdmin) {
            console.log("separ admin already exits");
            return
        }
        const hasedPassword = await bcryptjs.hash(envVars.SUPAR_ADMIN_PASSWORD, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVars.SUPAR_ADMIN_EMAIL
        }

        const payload: IUser = {
            name: "Supar Admin",
            role: Role.SUPER_ADMIN,
            email: envVars.SUPAR_ADMIN_EMAIL,
            password: hasedPassword,
            isVerified: true,
            auths: [authProvider]
        }

        const suparAdmin = await User.create(payload)

        console.log(suparAdmin, "supar admin")

    } catch (error) {
        console.log(error);
    }
};

export default seedSuparAdmin;