const CustomApiError = require('./customErrorApi')
const {StatusCodes} = require('http-status-codes')
class BadRequest extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.BAD_REQUEST
    }
}
module.exports = BadRequest