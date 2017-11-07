const service = require('./rocketleague.service')();

module.exports = (token) => {

    let showUser = (fn) => (user) => {
        console.log(user);
        fn(user.signatureUrl, { caption: user.displayName });
    }

    return {
        showUser: (user, fn) => service.getPlayer(user, showUser(fn), service.connect(token))
    }
}