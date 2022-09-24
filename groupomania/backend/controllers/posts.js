const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.createPost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig)
    let request = new sql.Request(pool);
    const postID = crypto.randomUUID();
    const url = req.protocol + '://' + req.get('host');
    const currentDate = new Date();

    request.input('postID', sql.NVarChar, userID)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('postTitle', sql.NVarChar, req.body.postTitle)
    .input('postCreationDate', sql.DateTime, currentDate)
    .input('postEditDate', sql.DateTime, currentDate)
    .input('postText', sql.NVarChar, req.body.postText)
    .input('postCategory', sql.NVarChar, req.body.postCategory)
    .input('imageUrl', sql.NVarChar, url + '/images/' + req.file.filename)
    .execute('createPost').then(
        () => {
            res.status(200).json({
                success: 'Post Created successfully'
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

