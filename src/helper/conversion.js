const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key =  Buffer.from([  137, 118,  46, 230,  96, 109, 177,  28,  129,  72,  88, 223,  81,  23, 160,  91,  214, 197, 204,  78,  99, 168,  49,  56,   80, 109,  76, 143,  50,  63, 132, 141]); 
const buffer = Buffer.from([  22,  77,  89,  31,  10, 174,  95, 188, 205,  84, 249,  82, 101,  48,  48, 136]);
const decipher = crypto.createDecipheriv(algorithm, key, buffer);
const cipher = crypto.createCipheriv(algorithm, key, buffer);


function obfuscateString(str) {
  let encrypted = cipher.update(str, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function deobfuscateString(str) {
  let deopfuscated = decipher.update(str, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {obfuscateString: obfuscateString, deobfuscateString: deobfuscateString};