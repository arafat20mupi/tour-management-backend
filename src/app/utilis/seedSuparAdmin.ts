import { envVars } from "../config/env";
import { IAuthProvider, IUser, UserRole } from "../modules/user/user.interface";
import User from "../modules/user/user.schema";
import bcryptjs from "bcryptjs"

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
            role: UserRole.SUPER_ADMIN,
            email: envVars.SUPAR_ADMIN_EMAIL,
            password: hasedPassword,
            isVarified: true,
            auth: [authProvider]
        }

        const suparAdmin = await User.create(payload)

        console.log(suparAdmin, "supar admin")

    } catch (error) {
        console.log(error);
    }
};

export default seedSuparAdmin;