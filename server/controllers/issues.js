
import IssuesJson from "../issues.json"

const getAllIssues = () => {
    console.log("getallissues")
}

const getIssue = (id) => {
    console.log("getissue" + id || "")
}

module.exports = {
    getAllIssues, getIssue
}