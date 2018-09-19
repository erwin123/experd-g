var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllUser = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,UserCode,Username,Name,RoleCode,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,BranchCode,CompanyCode,Email FROM User', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllUserByCriteria = function (User, done) {
    var wh = db.whereCriteriaGenerator(User);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,UserCode,Username,Name,RoleCode,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,BranchCode,CompanyCode,Email FROM User"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertUser = function (User, done) {
    var values = [User.Name, User.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_UserIn(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateUser = function (key, User, done) {
    var values = [User.Username,User.Name,User.RoleCode,User.CreatedBy,User.BranchCode, User.CompanyCode,User.CoachCode, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE User SET Username=?,Name=?,RoleCode=?,ModifiedDate=NOW(),ModifiedBy=?,BranchCode=?,CompanyCode=? WHERE UserCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteUser = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM User WHERE UserCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}