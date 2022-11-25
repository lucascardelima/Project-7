const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.getComments = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('postID', sql.NVarChar, req.body.data.postID)
    .execute('getComments').then(
        (comments) => {
            res.status(200).send(comments.recordsets)
        }
    ).catch(
        (error) => {
            res.status(500).json({
              error: error
            })
        }
        
    )
}

exports.createComment = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const commentID = crypto.randomUUID();
    const currentDate = new Date();

    request.input('commentID', sql.NVarChar, commentID)
    .input('postID', sql.NVarChar, req.body.data.postID)
    .input('userID', sql.NVarChar, req.body.data.userID)
    .input('commentText', sql.NVarChar, req.body.data.commentText)
    .input('commentCreationDate', sql.DateTime, currentDate)
    .input('commentEditDate', sql.DateTime, currentDate)
    .execute('createComment').then(
        (response) => {
            res.status(200).send(response.recordsets)
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

exports.deleteComment = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    
    request.input('userID', sql.NVarChar, req.body.data.userID)
    .input('commentID', sql.NVarChar, req.body.data.commentID)
    .input('postID', sql.NVarChar, req.body.data.postID)
    .execute('deleteComment').then(
        (response) => {
          res.status(200).send(response)
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