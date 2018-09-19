var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProjectUser = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,ProjectCode,UserCode FROM ProjectUser', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProjectUserByCriteria = function (ProjectUser, done) {
    var wh = db.whereCriteriaGenerator(ProjectUser);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,ProjectCode,UserCode FROM ProjectUser"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProjectUser = function (ProjectUser, done) {
    var values = [ProjectUser.ProjectCode, ProjectUser.UserCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('INSERT INTO ProjectUser (ProjectCode, UserCode) VALUES (?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProjectUser = function (key, ProjectUser, done) {
    var values = [ProjectUser.ProjectCode, ProjectUser.UserCode, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE ProjectUser SET UserCode=?,ProjectCode=? WHERE Id=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProjectUser = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM ProjectUser WHERE Id=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}