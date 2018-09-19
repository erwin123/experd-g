var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllRole = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,RoleCode,Name,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Role', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllRoleByCriteria = function (Role, done) {
    var wh = db.whereCriteriaGenerator(Role);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,RoleCode,Name,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Role"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertRole = function (Role, done) {
    var values = [Role.Name, Role.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_RoleIn(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateRole = function (key, Role, done) {
    var values = [Role.Name, Role.CreatedBy, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Role SET Name=?,ModifiedDate=NOW(),ModifiedBy=? WHERE RoleCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteRole = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Role WHERE RoleCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}