var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllChat = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,OwnerCode,DocumentType,TheText,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Chat', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllChatByCriteria = function (Chat, done) {
    var wh = db.whereCriteriaGenerator(Chat);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,OwnerCode,DocumentType,TheText,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Chat"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertChat = function (Chat, done) {
    var values = [Chat.OwnerCode, Chat.DocumentType, Chat.TheText, Chat.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ChatIn(?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateChat = function (key, Chat, done) {
    var values = [Chat.OwnerCode, Chat.DocumentType, Chat.TheText, Chat.CreatedBy,key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Chat SET OwnerCode=?, DocumentType=?,TheText=?,ModifiedDate=NOW(),ModifiedBy=? WHERE Id=? ', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteChat = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Chat WHERE Id=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}