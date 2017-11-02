var rls = require('rls-api');

module.exports = () => {
    let connect = (token) =>
        new rls.Client({ token: token });

    let getPlayer = (user, fn, client) => {
        client.getPlayer(user, rls.platforms.STEAM, function (status, data) {
            if (status === 200) {
                fn(data)
            }
        });
    }

    return {
        connect: connect,
        getPlayer: getPlayer
    }

}