var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getAllExecution = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,DocumentCode,Description,Filename,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,Step,Complete,ProjectCode FROM Execution', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllExecutionByCriteria = function (Execution, done) {
    var wh = db.whereCriteriaGenerator(Execution);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,DocumentCode,Description,Filename,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,Step,Complete,ProjectCode FROM Execution"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertExecution = function (Execution, done) {
    var values = [Execution.Description, Execution.Filename,Execution.CreatedBy, Execution.UserCode, Execution.Step, Execution.Complete, Execution.ProjectCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ExecutionIn(?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateExecution = function (key, Execution, done) {
    var values = [Execution.Description, Execution.Filename,Execution.CreatedBy, Execution.UserCode, Execution.Step, Execution.Complete, Execution.ProjectCode, key]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Execution SET Description=?,Filename=?,ModifiedDate=NOW(),ModifiedBy=?,UserCode=?,Step=?,Complete=?,ProjectCode=? WHERE DocumentCode=?', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteExecution = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Execution WHERE DocumentCode=? ', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}