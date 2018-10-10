var br = require('../models/trx/branch');
var ch = require('../models/trx/chat');
var cm = require('../models/trx/company');
var ex = require('../models/trx/execution');
var pi = require('../models/trx/problemidentify');
var pj = require('../models/trx/project');
var rl = require('../models/trx/role');
var sl = require('../models/trx/solution');
var us = require('../models/trx/user');
var pu = require('../models/trx/projectuser');
var cn = require('../models/trx/cnc');
var rpt = require('../models/trx/report');

var push = require('../models/trx/pushnotif');

const config = require('../../server/config');
var express = require('express');
var router = express.Router();

//region branch
router.get('/br', function (req, res, next) {
    br.getAllBranch(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/br/cr/', function (req, res, next) {
    if (req.body) {
        br.getAllBranchByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/br/', function (req, res, next) {
    br.insertBranch(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/br/:key', function (req, res, next) {
    br.updateBranch(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/br/:key', function (req, res, next) {
    br.deleteBranch(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region chat
router.get('/ch', function (req, res, next) {
    ch.getAllChat(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/ch/cr/', function (req, res, next) {
    if (req.body) {
        ch.getAllChatByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/ch/', function (req, res, next) {
    ch.insertChat(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/ch/:key', function (req, res, next) {
    ch.updateChat(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/ch/:key', function (req, res, next) {
    ch.deleteChat(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region company
router.get('/cm', function (req, res, next) {
    cm.getAllCompany(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/cm/cr/', function (req, res, next) {
    if (req.body) {
        cm.getAllCompanyByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/cm/', function (req, res, next) {
    cm.insertCompany(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/cm/:key', function (req, res, next) {
    cm.updateCompany(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/cm/:key', function (req, res, next) {
    cm.deleteCompany(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region execution
router.get('/ex', function (req, res, next) {
    ex.getAllExecution(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/ex/cr/', function (req, res, next) {
    if (req.body) {
        ex.getAllExecutionByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/ex/', function (req, res, next) {
    ex.insertExecution(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/ex/:key', function (req, res, next) {
    ex.updateExecution(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/ex/:key', function (req, res, next) {
    ex.deleteExecution(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/ex/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let file = req.files.exfile;
    const uuidv1 = require('uuid/v1');
    let ftype = file.mimetype.split('/')[1];
    file.name = uuidv1() + "." + ftype;

    let storage = config.photoDoc;

    file.mv(storage + file.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": file.name });
    });
});

//region problemidentify
router.get('/pi', function (req, res, npit) {
    pi.getAllProblemIdentify(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/pi/cr/', function (req, res, npit) {
    if (req.body) {
        pi.getAllProblemIdentifyByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/pi/', function (req, res, npit) {
    pi.insertProblemIdentify(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/pi/:key', function (req, res, npit) {
    pi.updateProblemIdentify(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/pi/:key', function (req, res, npit) {
    pi.deleteProblemIdentify(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/pi/upload', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let file = req.files.pifile;
    const uuidv1 = require('uuid/v1');
    let ftype = file.mimetype.split('/')[1];
    file.name = uuidv1() + "." + ftype;

    let storage = config.pdf;

    file.mv(storage + file.name, function (err) {
        if (err)
            return res.status(500).send(err);
        res.status(200).send({ "filename": file.name });
    });
});


//region project
router.get('/pj', function (req, res, npjt) {
    pj.getAllProject(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/pj/cr/', function (req, res, npjt) {
    if (req.body) {
        pj.getAllProjectByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/pj/', function (req, res, npjt) {
    pj.insertProject(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/pj/:key', function (req, res, npjt) {
    pj.updateProject(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/pj/:key', function (req, res, npjt) {
    pj.deleteProject(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region role
router.get('/rl', function (req, res, nrlt) {
    rl.getAllRole(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/rl/cr/', function (req, res, nrlt) {
    if (req.body) {
        rl.getAllRoleByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/rl/', function (req, res, nrlt) {
    rl.insertRole(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/rl/:key', function (req, res, nrlt) {
    rl.updateRole(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/rl/:key', function (req, res, nrlt) {
    rl.deleteRole(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region solution
router.get('/sl', function (req, res, nslt) {
    sl.getAllSolution(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/sl/cr/', function (req, res, nslt) {
    if (req.body) {
        sl.getAllSolutionByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/sl/', function (req, res, nslt) {
    sl.insertSolution(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/sl/:key', function (req, res, nslt) {
    sl.updateSolution(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/sl/:key', function (req, res, nslt) {
    sl.deleteSolution(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region user
router.get('/us', function (req, res, nust) {
    us.getAllUser(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/us/cr/', function (req, res, nust) {
    if (req.body) {
        us.getAllUserByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/us/', function (req, res, nust) {
    us.insertUser(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/us/:key', function (req, res, nust) {
    us.updateUser(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/us/:key', function (req, res, nust) {
    us.deleteUser(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region cnc
router.get('/cn', function (req, res, ncnt) {
    cn.getAllCnc(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/cn/cr/', function (req, res, ncnt) {
    if (req.body) {
        cn.getAllCncByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/cn/', function (req, res, ncnt) {
    cn.insertCnc(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/cn/:key', function (req, res, ncnt) {
    cn.updateCnc(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/cn/:key', function (req, res, ncnt) {
    cn.deleteCnc(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

//region projectuser
router.get('/pu', function (req, res, nput) {
    pu.getAllProjectUser(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/pu/cr/', function (req, res, nput) {
    if (req.body) {
        pu.getAllProjectUserByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/pu/', function (req, res, nput) {
    pu.insertProjectUser(req.body, function (err, resultInsert) {
        if (err) { res.json(err); }
        else { res.json(resultInsert); }
    });
});

router.put('/pu/:key', function (req, res, nput) {
    pu.updateProjectUser(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/pu/:key', function (req, res, nput) {
    pu.deleteProjectUser(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/mailer/', function (req, res, next) {
    if (req.body) {
        var messagemail = req.body;
        var email = require("emailjs");
        var server = email.server.connect({
            user: "erwin.ant@experd.com",
            password: "Gondar@001",
            host: "smtp.gmail.com",
            ssl: true,
            tls: false
        });

        // send the message and get a callback with an error or details of the message that was sent
        server.send({
            text: messagemail.MessageBody,
            from: messagemail.MessageFrom,
            to: messagemail.MessageTo,
            subject: messagemail.MessageSubject,
            cc: messagemail.MessageCc,
            attachment:
                [
                    { data: messagemail.MessageBody, alternative: true }
                ]
        }, function (err, message) {
            console.log(err || message);
            if (err) { res.json(err); }
            else { res.json(message); }
        });

    }
});


//region push
router.get('/push', function (req, res, nrlt) {
    push.getAllPush(function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.post('/push/cr/', function (req, res, nrlt) {
    if (req.body) {
        push.getAllPushByCriteria(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows); }
        });
    }
});

router.post('/pushsubscribe/:usercode', function (req, res, nrlt) {
    push.deletePush(req.params.usercode, function (err, resultInsert) {
        if (err) { res.json(err); }
        else {
            push.insertPush(req.body, req.params.usercode, function (err, resultInsert) {
                if (err) { res.json(err); }
                else { res.json(resultInsert); }
            });
        }
    });

});

router.post('/pushnotif/:usercode', function (req, res, nrlt) {
    const webpush = require('web-push');
    const vapidKeys = {
        "publicKey": "BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo",
        "privateKey": "PkVHOUKgY29NM7myQXXoGbp_bH_9j-cxW5cO-fGcSsA"
    };
    webpush.setVapidDetails(
        'mailto:erwin.ant@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );
    push.getAllPushByCriteria({ UserCode: req.params.usercode }, function (err, rows) {
        if (err) { res.json(err); }
        else {
            let USER_SUBSCRIPTIONS = [];
            USER_SUBSCRIPTIONS = rows.map(a => JSON.parse(a.PushData));
            //USER_SUBSCRIPTIONS.push(JSON.parse(rows[0].PushData));

            const notificationPayload = {
                "notification": {
                    "title": "Experd Guide - Notification",
                    "body": req.body.message,
                    "icon": config.asset + "icons/icon-72x72.png",
                    "vibrate": [100, 50, 100],
                    "data": {
                        "dateOfArrival": Date.now(),
                        "primaryKey": 1
                    },
                    "actions": [{
                        "action": config.baseurl,
                        "title": "Go to the site"
                    }]
                }
            };

            Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
                sub, JSON.stringify(notificationPayload))))
                .then(() => res.status(200).json({ message: req.body.message }))
                .catch(err => {
                    console.error("Error sending notification, reason: ", err);
                    res.sendStatus(500);
                });
        }
    });

});

router.put('/push/:key', function (req, res, nrlt) {
    push.updatePush(req.params.key, req.body, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.delete('/push/:key', function (req, res, nrlt) {
    push.deletePush(req.params.key, function (err, rows) {
        if (err) { res.json(err); }
        else { res.json(rows); }
    });
});

router.get('/pinger', function (req, res, nrlt) {
    res.json(1);
});


router.post('/rpt/', function (req, res, nrlt) {
    if (req.body) {
        rpt.getReportProgress(req.body, function (err, rows) {
            if (err) { res.json(err); }
            else { res.json(rows[0]); }
        });
    }
});

module.exports = router;