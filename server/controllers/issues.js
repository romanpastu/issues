
IssuesJson = require("../issues.json")

const getAllIssues = (req, res) => {
    let arrayToCheck;
    if (req.query.q) arrayToCheck = req.query.q.split(",");
    const filteredJson = IssuesJson.map(({ id, name, cover_image, description }) => ({ id, name, cover_image, description }))
    let filteredJsonKeyword;
    if (arrayToCheck && arrayToCheck.length > 0) {
        filteredJsonKeyword = filteredJson.filter(({ name, description }) =>
            arrayToCheck.some(subStr => name.includes(subStr) || description.includes(subStr)))
    }
    if (filteredJsonKeyword) {
        res.status(200).json(filteredJsonKeyword)
    } else {
        res.status(200).json(filteredJson)
    }
}

const getIssue = (req, res) => {
    let id = req.params.id
    console.log(req.params.id)
    const filteredIssue = IssuesJson.filter(i => i.id == id)[0]
    if (filteredIssue) {
        
        res.status(200).json({id: filteredIssue.id, name: filteredIssue.name ,cover_image: filteredIssue.cover_image, description: filteredIssue.description})
    } else {
        res.status(400).json({ error: "not found error" })
    }
}

module.exports = {
    getAllIssues, getIssue
}