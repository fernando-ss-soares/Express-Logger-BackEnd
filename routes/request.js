import { Router } from "express";
import Model_Request from "../model/request.js"
import findRequest from "../utils/id_sequencial_request.js";
import Validate_User from "../utils/validate_user_id.js";

const router = Router();

router.post("/", async (req, res) => {
    
    const { product_name, product_describe, request_id, request_status, request_address, request_email, user_id } = req.body
    
    if (!product_name || product_name == "") {
        return res.status(406).json({
            "message":"O campo product_name está inválido!"
        });
    }

    if (!product_describe || product_describe == "") {
        return res.status(406).json({
            "message":"O campo product_describe está inválido!"
        });
    }

    if (!request_status || request_status == "") {
        return res.status(406).json({
            "message":"O campo request_status está inválido!"
        });
    }

    if (!request_email || request_email == "") {
        return res.status(406).json({
            "message":"O campo request_email está inválido!"
        });
    }

    if (!request_address || request_address == "") {
        return res.status(406).json({
            "message":"O campo request_address está inválido!"
        });
    }

    if (!user_id || user_id == "") {
        return res.status(406).json({
            "message":"O campo user_id está inválido!"
        });
    }
    
    const Payload_Request = {
        product_name, 
        product_describe, 
        request_id : await findRequest(),
        request_status,
        request_address, 
        request_email,
        user_id : await Validate_User(user_id)
    }

    try {

        if (Payload_Request.user_id == false) {
            return res.status(409).json({
                "message":"Não foi possível realizar o cadastro do pedido. Motivo: Usuário não encontrado"
            })
        }

        const Response_Payload = await Model_Request.create(Payload_Request)
        return res.status(200).json(Response_Payload);
    } catch (error) {
        return res.status(500).json(error);
    }

})

export default router;