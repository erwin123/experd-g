var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllPush = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT UserCode, PushData, IsActive FROM PushNotif', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllPushByCriteria = function (Push, done) {
    var wh = db.whereCriteriaGenerator(Push);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT UserCode, PushData, IsActive FROM PushNotif"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertPush = function (Push,userCode, done) {
    var values = [userCode, JSON.stringify(Push), 1];
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO PushNotif VALUES (?, ?, 1)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updatePush = function (key, Push, done) {
    var values = [Push.PushData, Push.IsActive,key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE PushNotif SET PushData=?, IsActive=? WHERE UserCode=? ', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deletePush = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM PushNotif WHERE UserCode=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}