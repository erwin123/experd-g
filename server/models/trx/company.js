var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllCompany = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,CompanyCode,Name,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Company', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllCompanyByCriteria = function (Company, done) {
    var wh = db.whereCriteriaGenerator(Company);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,CompanyCode,Name,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy FROM Company"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertCompany = function (Company, done) {
    var values = [Company.Name, Company.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_CompanyIn(?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateCompany = function (key, Company, done) {
    var values = [Company.Name, Company.CreatedBy, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Company SET Name=?,ModifiedDate=NOW(),ModifiedBy=? WHERE CompanyCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteCompany = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Company WHERE DocumentCode=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}