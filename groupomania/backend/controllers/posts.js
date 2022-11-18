const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.createPost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const postID = crypto.randomUUID();
    const url = req.protocol + '://' + req.get('host');
    const currentDate = new Date();
    
    request.input('postID', sql.NVarChar, postID)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('postTitle', sql.NVarChar, req.body.postTitle)
    .input('postCreationDate', sql.DateTime, currentDate)
    .input('postEditDate', sql.DateTime, currentDate)
    .input('postText', sql.NVarChar, req.body.postText)
    .input('postCategory', sql.NVarChar, req.body.postCategory)
    .input('imageUrl', sql.NVarChar, 'test')
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

exports.updatePost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    let currentDate = new Date();

    request.input('postText', sql.NVarChar, req.body.postText)
    .input('postID', sql.NVarChar, req.body.postID)
    .input('postTitle', sql.NVarChar, req.body.postTitle)
    .input('postCategory', sql.NVarChar, req.body.postCategory)
    .input('userID', sql.NVarChar, req.body.userID)
    .input('postEditDate', sql.DateTime, currentDate)
    .execute('updatePost').then(
        () => {
            res.status(200).json({
                success: 'Post updated successfully'
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

exports.deletePost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
        
    request.input('postID', sql.NVarChar, req.body.postID)
    .input('userID', sql.NVarChar, req.body.userID)
    .execute('deletePost').then(
        () => {
            res.status(200).json({
                success: 'Post deleted successfully'
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

exports.getPosts = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('postCategory', sql.NVarChar, req.body.postCategory)
    .input('userID', sql.NVarChar, req.body.userID)
    .execute('getPosts').then(
        (posts) => {
            res.status(200).send(posts.recordsets[0])
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

exports.getPost = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('postID', sql.NVarChar, req.body.postID)
    .execute('getPost').then(
        (posts) => {
            res.status(200).send(posts.recordsets[0])
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



