const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.userPhoto = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    const userImageUrl = req.file.filename;

    request.input('userID', sql.NVarChar, req.body.userID)
    .input('imageUrl', sql.NVarChar, userImageUrl)
    .execute('userPhoto').then(
        () => {
            res.status(200).json({
              imageUrl: userImageUrl,
              message: 'Photo Update Successfully'
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
              error: error
            })
        }
        
    )
}

exports.postPhoto = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    const postImageUrl = req.file.filename;

    request.input('postID', sql.NVarChar, req.body.postID)
    .input('imageUrl', sql.NVarChar, postImageUrl)
    .execute('updatePhoto').then(
        () => {
            res.status(200).json({
              message: 'Photo Update Successfully'
            })
        }
    ).catch(
        (error) => {
            res.status(500).json({
              error: error
            })
        }
        
    )
}