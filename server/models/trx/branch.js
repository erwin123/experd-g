var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllBranch = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,BranchCode,Name,Address,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Branch', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllBranchByCriteria = function (Branch, done) {
    var wh = db.whereCriteriaGenerator(Branch);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,BranchCode,Name,Address,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Branch"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertBranch = function (Branch, done) {
    var values = [Branch.Name, Branch.Address, Branch.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_BranchIn(?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateBranch = function (key, Branch, done) {
    var values = [Branch.Name, Branch.Address, Branch.CreatedBy, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Branch SET   Name=?,  Address=?,  ModifiedDate=NOW(),  ModifiedBy=?, WHERE BranchCode=? ', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteBranch = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Branch WHERE BranchCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}