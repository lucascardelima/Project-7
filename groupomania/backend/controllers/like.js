const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');


exports.like = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const likeID = crypto.randomUUID();

    request.input('userID', sql.NVarChar, req.body.userID)
    .input('postID', sql.NVarChar, req.body.postID)
    .input('isLiked', sql.NVarChar, 1)
    .input('likeID', sql.Bit, likeID)
    .execute('postLike').then(
        () => {
            res.status(200).json({
                success: 'Post liked successfully'
            })
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

exports.deslike = async (req, res, next) => {
    let pool = await sql.connect(dbconfig)
    let request = new sql.Request(pool);
    
    request.input('userID', sql.NVarChar, req.body.userID)
    .input('postID', sql.NVarChar, req.body.postID)
    .execute('dislike').then(
        () => {
            res.status(200).json({
                success: 'Post dislked successfully'
            })
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