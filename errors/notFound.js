const CustomApiError = require('./customErrorApi')
const {StatusCodes} = require('http-status-codes')
class NotFound extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.NOT_FOUND
    }
}
module.exports = NotFound