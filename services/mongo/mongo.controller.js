const service = require('./mongo.service')();

module.exports = () => {
    return {
        connect: service.connect,
        addUser: service.addUser
    }
}