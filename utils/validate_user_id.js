import Model_User from "../model/user.js";

async function Validate_User(id) {
    const user_id = id
    
    const userId = await Model_User.findOne({user_id})

    console.log(userId);

    if (userId) {
        return userId.user_id
    } else {
        return false
    }
}

export default Validate_User;