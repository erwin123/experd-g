var db = require('../../connection/dbconnection');
db.connect(db.trx,(done)=>{});

exports.getReportProgress = function (Param, done) {
    var values = [Param.ProjectCode, Param.CoachCode]
    db.get(db.trx, function (err, connection) {
        if (err) return done('Database problem')
        connection.query('CALL sp_ReportProgress(?,?)', values, function (err, rows) {
            connection.release();
            if (err) return done(err)
            done(null, rows)
        })
    })
}