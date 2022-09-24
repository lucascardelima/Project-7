const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.createComment = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const commentID = crypto.randomUUID();
    const currentDate = new Date();

    request.input('commentID', sql.NVarChar, commentID)
    .input('postID', sql.NVarChar, req.body.postID)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('commentText', sql.NVarChar, req.body.commentText)
    .input('commentCreationDate', sql.DateTime, currentDate)
    .input('commentEditDate', sql.DateTime, currentDate)
    .execute('createComment').then(
        () => {
            res.status(200).json({
                success: 'Comment created successfully'
            })
        }
    ).catch (
        (error) => {
            res.status(500).json({
                error: error
            })
            sql.close();
        }
    )
}