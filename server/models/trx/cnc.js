var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllCnc = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,ProjectCode,UserCode,CoachCode FROM Cnc', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllCncByCriteria = function (Cnc, done) {
    var wh = db.whereCriteriaGenerator(Cnc);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,ProjectCode,UserCode,CoachCode FROM Cnc"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertCnc = function (Cnc, done) {
    var values = [Cnc.Name, Cnc.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO Cnc (ProjectCode,UserCode,CoachCode) VALUES (?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateCnc = function (key, Cnc, done) {
    var values = [Cnc.ProjectCode, Cnc.UserCode,Cnc.CoachCode, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Cnc SET ProjectCode=?,UserCode=?,CoachCode=? WHERE Id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteCnc = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Cnc WHERE Id=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}