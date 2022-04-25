import crypto from 'crypto'
import Buffer from 'buffer'

const key = 'blogify'
const algorithm = 'AES-256-CBC';
var secretKey = crypto.createHash('sha512').update(key, 'utf-8').digest('hex').substr(0, 32);
var iv = crypto.createHash('sha512').update(key, 'utf-8').digest('hex').substr(0, 16);

const buildHash = (data) => {
  return crypto.createHash('md5').update(data).digest("hex");
}

const encrypt = (text) => {
  let stringData = text
  if (typeof text == 'object'){
    stringData = JSON.stringify(text)
  }

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(stringData), cipher.final()]);

    return encrypted.toString('hex')
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv, 'hex');

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash, 'hex')), decipher.final()]);
console.log( decrpyted.toString());
    return JSON.parse(decrpyted.toString());
};


export default {
    encrypt,
    decrypt,
    buildHash    
};