const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

// Get the count of likes per postID. This is used to render the likes of posts
// in the feed.


exports.getLikes = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.execute('getLikes').then(
        () => {
            res.status(200).json({
                success: 'Likes downloaded successfully'
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

// Get the likes of a specific user for an specific postID. This is used to
// check is the user has already checked the post or not.

exports.checkUserLike = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('userID', sql.NVarChar, req.body.userID)
    .input('postID', sql.NVarChar, req.body.postID)
    .execute('checkUserLike').then(
        () => {
            res.status(200).json({
                success: 'User likes retrieved successfully'
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

// Save the record to the PostLikes DB with the userID, postID and a boolean
// to confirm if the post was liked or not.

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

// Deleted the record that associates the userID with the postID
// what would dislike a post.

exports.dislike = async (req, res, next) => {
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

