import mongoose from "mongoose";

const Users = mongoose.model('Users', {
    user_name: String,
    user_lastname: String,
    user_cpf: String,
    user_id: String,
    user_email: String,
    user_password: String,
    user_address: String,
    user_admin: Boolean
})

export default Users