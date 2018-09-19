var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllProject = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,ProjectCode,Name,Start,End,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,CompanyCode FROM Project', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllProjectByCriteria = function (Project, done) {
    var wh = db.whereCriteriaGenerator(Project);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,ProjectCode,Name,Start,End,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,CompanyCode FROM Project"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertProject = function (Project, done) {
    var values = [Project.Name, Project.CreatedBy]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ProjectIn(?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateProject = function (key, Project, done) {
    var values = [Project.Name, Project.Start,Project.End,Project.CreatedBy,Project.CompanyCode, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Project SET Name=?,Start=?,End=?,ModifiedDate=NOW(),ModifiedBy=?,CompanyCode=? WHERE ProjectCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteProject = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Project WHERE ProjectCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}