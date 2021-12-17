import User from "../models/user";

export const register = async(req, res) => {
    console.log(req.body);
    const { nombre, email, password } = req.body;
    // validacion
    if (!nombre) return res.status(400).send("se requiere un nombre");
    if (!password || !/^(?=.*\d).{4,8}$/)
        return res
            .status(400)
            .send("Por favor ingresa una Clave debe tener entre 4 y 8 dígitos e incluir al menos un dígito numérico");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Este email ya Existe");
    // register
    const user = new User(req.body);
    try {
        await user.save();
        console.log("Usuario Creado", user);
        return res.json({ ok: true });
    } catch (err) {
        console.log("Error en creacion de Usuario", err);
        return res.status(400).send("Intentar nuevamente.");
    }
};