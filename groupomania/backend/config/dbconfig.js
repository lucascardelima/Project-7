const dotenv = require('dotenv').config();

const config = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        trustedconnection: true,
        enableArithAbort: true,
        instancename: process.env.INSTANCE_NAME,
        trustServerCertificate: true
    },
    port: process.env.DB_PORT
};

module.exports = {
    config: config
};