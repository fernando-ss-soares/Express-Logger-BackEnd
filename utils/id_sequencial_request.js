import Model_Request from "../model/request.js"

async function findRequest() {
    
    const id = await Model_Request.find().sort({ _id: -1 })
    let id_request, prefix = "P0000", total = id.length

    total++

    id_request = prefix.concat(String(total))

    return id_request
}

export default findRequest