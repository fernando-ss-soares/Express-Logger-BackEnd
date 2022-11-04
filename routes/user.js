import { Router } from "express";
import Model_User from "../model/user.js"
import findUser from "../utils/id_sequencial_user.js";

const router = Router();

router.get("/", async (req, res) => {
    const { user_email, 
        user_password } = req.query

    if (!user_email || user_email == "") {
        return res.status(406).json({
            "message":"O campo user_email está inválido!"
        });
    }

    if (!user_password || user_password == "") {
        return res.status(406).json({
            "message":"O campo user_password está inválido!"
        });
    }

    const Payload_User = {
        user_email,
        user_password
    }

    try {
        const Response_Payload_User = await Model_User.findOne(Payload_User);

        if (Response_Payload_User == null) {
            return res.status(409).json({
                "message":"Usuário ou senha inválido"
            })
        }

        return res.status(200).json(Response_Payload_User);
    } catch (error) {
        return res.status(500).json(error);
    }
})

router.post("/", async (req, res) => {
    
    const { user_name,
    user_lastname,
    user_id,
    user_cpf,
    user_address,
    user_email,
    user_password } = req.body
    
    if (!user_name || user_name == "") {
        return res.status(406).json({
            "message":"O campo user_name está inválido!"
        });
    }

    if (!user_lastname || user_lastname == "") {
        return res.status(406).json({
            "message":"O campo user_lastname está inválido!"
        });
    }

    if (!user_cpf || user_cpf == "") {
        return res.status(406).json({
            "message":"O campo user_cpf está inválido!"
        });
    }

    if (!user_address || user_address == "") {
        return res.status(406).json({
            "message":"O campo user_endereco está inválido!"
        });
    }

    if (!user_email || user_email == "") {
        return res.status(406).json({
            "message":"O campo user_email está inválido!"
        });
    }

    if (!user_password || user_password == "") {
        return res.status(406).json({
            "message":"O campo user_password está inválido!"
        });
    }
    
    const Payload_User = {
        user_name,
        user_lastname,
        user_id : await findUser(),
        user_cpf,
        user_address,
        user_email,
        user_password
    }

    try {
        
        const Response_Verify_User_CPF = await Model_User.findOne({user_cpf: Payload_User.user_cpf});

        const Response_Verify_User_Email = await Model_User.findOne({user_email: Payload_User.user_email});

        if (Response_Verify_User_CPF) {
            return res.status(409).json({
                "message":"Não foi possível realizar o cadastro do usuário. Motivo: CPF já cadastrado"
            })
        }

        if (Response_Verify_User_Email) {
            return res.status(409).json({
                "message":"Não foi possível realizar o cadastro do usuário. Motivo: E-mail já cadastrado"
            })
        }

        const Response_Payload_User = await Model_User.create(Payload_User);
        return res.status(200).json(Response_Payload_User);
    } catch (error) {
        return res.status(500).json(error);
    }

})

export default router;