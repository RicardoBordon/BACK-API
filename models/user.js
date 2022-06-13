import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

//Modelo Creación de Usuarios
const userSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     unique: true,
    //     index: {unique: true}
    // },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique: true},
    },
    password: {
        type: String,
        required: true, 
    },
    // profileimag: {
    //     type: String,
    // }
});

//Hash de contraseña 
userSchema.pre("save", async function (next) {
    const user = this;

    if(!user.isModified("password")) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Falló el hash de contraseña");
    }
});

//Comprobar contraseña Hasheada
userSchema.methods.comparePassword = async function(clientPassword){
    return await bcryptjs.compare(clientPassword, this.password);
}

export const User = mongoose.model("User", userSchema);
