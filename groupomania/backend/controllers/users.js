const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();


exports.login = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('email', req.body.email)
    .execute('loginUser').then(
        (result) => {
            const user = result.recordset[0];

            if (typeof(user) === 'undefined') {
                return res.status(401).json({
                    error: 'User not found',
                    value: 'email'
                });
                
            } else {
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                      
                        if (!valid) {
                            return res.status(401).json({
                                error: 'Password incorrect',
                                value: 'password'
                            });
                        } else {
                            const token = jwt.sign(
                                { userID: user.userID },
                                process.env.SECRET_KEY,
                                { expiresIn: '24h' }
                            );
                            res.status(200).json({
                                message: 'Login successfully',
                                userID: user.userID,
                                token: token,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                preference: user.preference,
                                email: user.email
                            });
                        }
                    }
                ).catch(
                    (error) => {
                        res.status(500).json({
                            error: error
                        });
                    }
                );  
            }
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};


exports.getUsers = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    pool.request().query('SELECT a.userID, a.firstName, a.lastName, a.dateOfBirth, a.email, b.password FROM Users a LEFT JOIN UserCredentials b on a.userID = b.userID').then(
        (users) => {
            res.status(200).send(users.recordsets[0]);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
}; 

exports.getUser = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);

    request.input('userID', sql.NVarChar, req.body.userID)
    .execute('getUser').then(
        (user) => {
            res.status(200).send(user.recordsets[0])
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

exports.signup = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const userID = crypto.randomUUID();
    const currentDate = new Date();

    bcrypt.genSalt(10).then(
        (salt) => {
            bcrypt.hash(req.body.password, salt).then(
                (hash) => {
                    console.log(hash);
                    console.log(req.body.preference.toString());
                    request.input('userID', sql.NVarChar, userID)
                    .input('firstName', sql.NVarChar, req.body.firstName)
                    .input('lastName', sql.NVarChar, req.body.lastName)
                    .input('dateOfBirth', sql.DateTime, new Date(req.body.dateOfBirth))
                    .input('email', sql.NVarChar, req.body.email)
                    .input('password', sql.NVarChar(60), hash)
                    .input('currentDate', sql.DateTime, currentDate)
                    .input('preference', sql.NVarChar, req.body.preference.toString())
                    .execute('insertUser').then(
                        () => {
                            res.status(200).json({
                                success: 'User created successfully'
                            })
                        }
                    ).catch (
                        (error) => {
                            res.status(500).json({
                                error: error,
                                message: 'SQL Server Error'
                            })
                            sql.close();
                        }
                    )
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error,
                        message: 'Bcrypt Error'
                    })
                }
            )          
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error,
                message: 'Salt Error'
            })
        }
    )   
};

exports.updateUser = async (req, res, next) => {
    let pool = await sql.connect(dbconfig);
    let request = new sql.Request(pool);
    const currentDate = new Date();

    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            
            request.input('userID', sql.NVarChar, req.body.userID)
            .input('firstName', sql.NVarChar, req.body.firstName)
            .input('lastName', sql.NVarChar, req.body.lastName)
            .input('dateOfBirth', sql.DateTime, new Date(req.body.dateOfBirth))
            .input('email', sql.NVarChar, req.body.email)
            .input('password', sql.NVarChar(60), hash)
            .input('currentDate', sql.DateTime, currentDate)
            .input('preference', sql.NVarChar, req.body.preference)
            .execute('updateUser').then(
                () => {
                    res.status(200).json({
                        success: 'User Updated Successfully'
                    })
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    })
                    sql.close();
                }
            );
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

    
    




