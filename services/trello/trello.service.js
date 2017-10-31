var fs = require("fs");
var path = require("path");
var Trello = require("node-trello");
var t = new Trello(process.env.TRELLO_TOKEN, process.env.TRELLO_SECRET);

module.exports = () => {
    let cardId = "cUpAEylJ";


    let postCard = (idList) => (name, desc) => {
        if (name.length > 3)
        return t.post('/1/cards/', { name: name, desc: desc, idList: idList }, (err, data) => {
            if (err) console.log(err);
            console.log(data);
        });
    }
    return {
        postCard: postCard
    }
}