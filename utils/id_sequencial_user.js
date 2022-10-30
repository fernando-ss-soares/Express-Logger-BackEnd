import Model_Request from "../model/user.js"

async function findUser() {
    
    const id = await Model_Request.find().sort({ _id: -1 })
    let id_user, prefix = "U0000", total = id.length

    total++

    id_user = prefix.concat(String(total))

    return id_user
}

export default findUser