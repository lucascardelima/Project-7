const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

// Get the count of likes per postID. This is used to render the likes of posts
// in the feed.


exports.getLikes = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.execute('getLikes').then(
        (likes) => {
            res.status(200).send(likes.recordsets[0])
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
        (result) => {
            res.status(200).send(result.recordsets[0])
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
    .input('isLiked', sql.Bit, 1)
    .input('likeID', sql.NVarChar, likeID)
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

// If the request to dislike the post is sent 2 times or more, the API will
// send the response that the post was dislked successfully. 

exports.dislike = async (req, res, next) => {
    let pool = await sql.connect(dbconfig)
    let request = new sql.Request(pool);
    
    request.input('userID', sql.NVarChar, req.body.userID)
    .input('postID', sql.NVarChar, req.body.postID)
    .execute('postDislike').then(
        () => {
            res.status(200).json({
                success: 'Post disliked successfully'
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

