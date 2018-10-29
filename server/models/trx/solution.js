var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});
var dateFormat = require('dateformat');

exports.getAllSolution = function (done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('SELECT Id,DocumentCode,Solution,Target,Deadline,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,ProjectCode, Complete, ActionOrder FROM Solution', function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.getAllSolutionByCriteria = function (Solution, done) {
    var wh = db.whereCriteriaGenerator(Solution);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query("SELECT Id,DocumentCode,Solution,Target,Deadline,CreatedDate,CreatedBy,ModifiedDate,ModifiedBy,UserCode,ProjectCode, Complete, ActionOrder FROM Solution"+wh, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}

exports.insertSolution = function (Solution, done) {
    Solution.Deadline = dateFormat(Solution.Deadline, "yyyy-mm-dd h:MM:ss");
    var values = [Solution.Solution, Solution.Target,Solution.Deadline,Solution.CreatedBy, Solution.UserCode,Solution.ProjectCode, Solution.Complete, Solution.ActionOrder]
    
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_SolutionIn(?,?,?,?,?,?,?,?)', values, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result[0])
        })
    })
}

exports.updateSolution = function (key, Solution, done) {
    Solution.Deadline = dateFormat(Solution.Deadline, "yyyy-mm-dd h:MM:ss");
    var values = [Solution.Solution, Solution.Target,Solution.Deadline,Solution.CreatedBy,Solution.UserCode,Solution.ProjectCode, Solution.Complete,Solution.ActionOrder,key]
    console.log(Solution);
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('UPDATE Solution SET Solution=?,Target=?,Deadline=?,ModifiedDate=NOW(),ModifiedBy=?,UserCode=?,ProjectCode=?, Complete=?, ActionOrder=? WHERE DocumentCode=?', values, function (err, result) {
            
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}

exports.deleteSolution = function (key, done) {
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('DELETE FROM Solution WHERE DocumentCode=?', key, function (err, result) {
            connection.release();
            if (err) return done(err)
            done(null, result)
        })
    })
}