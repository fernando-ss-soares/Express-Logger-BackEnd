import mongoose from "mongoose";

const Requests = mongoose.model('Requests', {
    product_name: String,
    product_describe: String,
    request_id: String,
    request_status: String,
    request_email: String
})

export default Requests