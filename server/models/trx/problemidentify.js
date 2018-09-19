var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProblemIdentify = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,DocumentCode,Filename,Description,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,Complete,ProjectCode, Commit FROM ProblemIdentify', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProblemIdentifyByCriteria = function (ProblemIdentify, done) {
    var wh = db.whereCriteriaGenerator(ProblemIdentify);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,DocumentCode,Filename,Description,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,Complete,ProjectCode, Commit FROM ProblemIdentify"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProblemIdentify = function (ProblemIdentify, done) {
    var values = [ProblemIdentify.Filename,ProblemIdentify.Description, ProblemIdentify.CreatedBy,ProblemIdentify.UserCode,ProblemIdentify.Complete,ProblemIdentify.ProjectCode, ProblemIdentify.Commit]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ProblemIdentifyIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProblemIdentify = function (key, ProblemIdentify, done) {
    var values = [ProblemIdentify.Filename, ProblemIdentify.Description, ProblemIdentify.CreatedBy,ProblemIdentify.UserCode, ProblemIdentify.Complete, ProblemIdentify.ProjectCode,ProblemIdentify.Commit, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE ProblemIdentify SET Filename=?,Description=?,ModifiedDate=NOW(),ModifiedBy=?,UserCode=?,Complete=?,ProjectCode=?,Commit=? WHERE DocumentCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProblemIdentify = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM ProblemIdentify WHERE DocumentCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}