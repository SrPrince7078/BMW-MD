const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05oVVFEeTQvc3Jsb2lJbmk1THJaWlpKNUp0eFRHWHBrWEd6cTI5OGJYZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0UwNHowR3hKWGtoVjFTOWQ1UmMxOUJBb2R0QTFJTnhmZ2wyclBuQ0hnYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSlRiV3p2U0FlcEQxYUxFMkpRNEZEZWhLbitpSGkzOFB0VFY0ZjRwUzA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUUEplRUxjWUpSTXVvZC8wakpsQk44azh0WUw2R1BrQkJBZlZTNDUvcmpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFLUUxUbHJRY1lyU1hNWmZ4YmZORUVjTTBITG81WkxZS2JPcVFsZm91bDA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImN2NHVLNWloM2tNVVN6b3l1TVExV3oxQXFtVzdvNXVPb3NVWjNnSTB0ejQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0kxSlhQM3pvQ3VQQXU5aVBhQVJEYWlPT0hJamIrYjZaNCtEeUhxWXpGVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXFkVUFGcW8zdG1mWnRtSjZOcEtWbjFubHF5eUUvREZLU21jZmFXM1RGUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtVTE1sM1NpSjY4YkJ6clZKQ2dKMXN5bXpzUWc4MjBGeWJUWXZ3M2FtVmxUUUVvQiszWXVWSHlEdzVkMHpHU0dlak5oekRuWXZUVnlpR202YVBFbWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQwLCJhZHZTZWNyZXRLZXkiOiJFQ1lLNVg0ay81VnF1OXVHZXBtSWFpTUFBbk5TYTlUVnJGdWE0dkdUYTB3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJvUUFaamdXMVRmcXV6S0NJTXI3VGJnIiwicGhvbmVJZCI6ImNhNTBjYjU1LTBjMTUtNGNhMC04YTE0LWM2MmYwODhjZDNjOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4MXZhdWZIVUxXdFVJMUxRLys0SS9QRXVHbjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZCtaZStkbEd3Z2g2TzdQb2J3RkFmd3pObkhJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlFTTldDNFRFIiwibWUiOnsiaWQiOiI5MjMyNTg1MzE5NzA6NjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ011d3M3SUNFUGlNOGJVR0dBMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilc1ZUNZM1VmbU80Rko3UUlLeFYxV2lZNlE2SnpJdDZRbUNxWklHYXBkeWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkkvRkdzaDlSODFPVjdtTHVvcE95b1VBanllV2tpMS91b0hyMTMrM1VJYXFQSFNDTUdyMjVOYTg2MGIvS1BjRGRXS0ZreVkwK0UweUZoR211NnhPNUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0VlliMDA1dy8xSVZrdWZvN0lBV2RpZUZjRktlNGJGZ0xIMzBRVzdiVlREV1dxQ2p2VWxyWVZUVVNrVjNzVCtSTDFERWJ1VDBHRzAxbk9saVdOeXBpQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzI1ODUzMTk3MDo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWdVhnbU4xSDVqdUJTZTBDQ3NWZFZvbU9rT2ljeUxla0pncW1TQm1xWGNwIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNjE0ODUzfQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
