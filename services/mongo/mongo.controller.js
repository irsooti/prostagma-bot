const service = require('./mongo.service')();

module.exports = (host, db) => {
    let connect = (bool) =>
        service.connect(host, db, bool);

    return {
        connect: connect,
        addUser: service.addUser
    }
}