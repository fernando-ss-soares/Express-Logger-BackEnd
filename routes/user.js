import { Router } from "express";
import Model_User from "../model/user.js"
import findUser from "../utils/id_sequencial_user.js";

const router = Router();

router.post("/", async (req, res) => {
    
    const { user_name,
    user_lastname,
    user_id,
    user_cpf,
    user_endereco,
    user_email } = req.body
    
    if (!user_name || user_name == "") {
        return res.status(406).json({
            "message":"O campo product_name está inválido!"
        });
    }

    if (!user_lastname || user_lastname == "") {
        return res.status(406).json({
            "message":"O campo product_describe está inválido!"
        });
    }

    if (!user_cpf || user_cpf == "") {
        return res.status(406).json({
            "message":"O campo request_status está inválido!"
        });
    }

    if (!user_endereco || user_endereco == "") {
        return res.status(406).json({
            "message":"O campo request_email está inválido!"
        });
    }

    if (!user_email || user_email == "") {
        return res.status(406).json({
            "message":"O campo request_email está inválido!"
        });
    }
    
    const Payload_User = {
        user_name,
        user_lastname,
        user_id : await findUser(),
        user_cpf,
        user_endereco,
        user_email
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