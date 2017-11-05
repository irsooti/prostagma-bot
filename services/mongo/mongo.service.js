const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = () => {
    /**
     * Host and db to connect to mongodb server
     * @param {*} host 
     * @param {*} db 
     * @param {*} bool 
     */
    const UserSchema = new Schema({
        telegram_id: String,
        username: String,
        first_name: String,
    });

    const UserModel = mongoose.model('user', UserSchema);


    let connect = (host, db, bool) => {
        bool = bool || true;
        mongoose.connect(`mongodb://${host}/${db}`, { useMongoClient: bool });
        mongoose.Promise = global.Promise;

        return mongoose;
    }


    let addUser = (telegramId, telegramUser, first_name, fn, errHandler) => {

        let query = { telegram_id: telegramId };
        let insert = { telegram_id: telegramId, username: telegramUser, first_name: first_name };
        let options = { upsert: true, new: true };

        UserModel.findOneAndUpdate(query, insert, options, function (err, doc) {
            if (err) errHandler(err);
            else fn(`Grazie per esserti registrato ${first_name}`);
        });
    }

    return {
        connect: connect,
        addUser: addUser
    }

}
