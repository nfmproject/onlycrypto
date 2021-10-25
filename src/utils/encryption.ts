import * as crypto from "crypto";


type AlgoList = {
    [key: string]: {
        keyLength: number,
        ivLength: number,
    }
}

const algoList: AlgoList = {
    'blowfish': {
        keyLength: 32,
        ivLength: 8,
    },
    'aes-256-ctr': {
        keyLength: 32,
        ivLength: 16,
    },
    'des': {
        keyLength: 8,
        ivLength: 8,
    }
}


// File encryption using parameters and salt
const cryptFileWithSalt = (
    file: DataView,
    decrypt = false,
    {
      algo = "aes-256-ctr",
      key = crypto.randomBytes(16).toString("hex"),
      salt = crypto.randomBytes(8).toString("hex"),
    }
  ): Buffer => {
    if (!decrypt) {
      const cipher = crypto.createCipheriv(algo, key, salt);
      const crypted = Buffer.concat([cipher.update(file), cipher.final()]);
      return crypted;
    } else {
      const cipher = crypto.createDecipheriv(algo, key, salt);
      const decrypted = Buffer.concat([cipher.update(file), cipher.final()]);
      return decrypted;
    }
  };




