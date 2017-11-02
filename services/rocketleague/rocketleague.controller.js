const service = require('./rocketleague.service')();

module.exports = () => {

    let showUser = (fn) => (user) => {
        console.log(user);
        fn(user.signatureUrl, { caption: user.displayName });
    }

    return {
        connect: service.connect,
        showUser: (user, fn, connect) => service.getPlayer(user, showUser(fn), connect)
    }
}