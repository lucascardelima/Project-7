const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.getComments = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('postID', sql.NVarChar, req.body.postID)
    .execute('getComments').then(
        (comments) => {
            res.status(200).json({
                comments: comments
            })
        }
    ).catch(
        res.status(500).json({
            error: error
        })
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

exports.updateComment = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    let currentDate = new Date();

    request.input('commentText', sql.NVarChar, req.body.commentText)
    .input('commentID', sql.NVarChar, req.body.commentID)
    .input('postID', sql.NVarChar, req.body.postID)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('commentEditDate', sql.DateTime, currentDate)
    .execute('updateComment').then(
        () => {
            res.status(200).json({
                success: 'Comment updated successfully'
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

exports.deleteComment = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    
    request.input('postID', sql.NVarChar, req.body.postID)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('commentID', sql.NVarChar, req.body.commentID)
    .execute('deleteComment').then(
        () => {
            res.status(200).json({
                success: 'Comment deleted successfully'
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