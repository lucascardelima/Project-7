const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.viewPost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const viewID = crypto.randomUUID();

    request.input('userID', sql.NVarChar, req.body.data.userID)
    .input('postID', sql.NVarChar, req.body.data.postID)
    .input('viewID', sql.NVarChar, viewID)
    .execute('postView').then(
        (result) => {
            res.status(200).send(result.recordset[0])
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
            sql.close();
        }
    )
}

exports.getViews = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('postID', sql.NVarChar, req.body.data.postID)
    .execute('getViews').then(
        (result) => {
            res.status(200).send(result.recordsets)
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            })
            sql.close();
        }
    )
}