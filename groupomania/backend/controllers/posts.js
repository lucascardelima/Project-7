const sql = require('mssql');
const dbconfig = require('../config/dbconfig').config;
const crypto = require('crypto');

exports.createPost = async (req.res.next) => {
    let pool = await sql.connect(dbconfig)
}

