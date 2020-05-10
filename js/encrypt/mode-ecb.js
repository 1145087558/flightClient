/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/**
 * Electronic Codebook block mode.
 */
CryptoJS.mode.ECB = (function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();

    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });

    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });

    return ECB;
}());

function encrypt(word) {
	//密钥--应和后台java解密或是前台js解密的密钥保持一致（16进制）         
	var key = CryptoJS.enc.Utf8.parse("1111wwww2222uuuu");
	//偏移量         
	var srcs = CryptoJS.enc.Utf8.parse(word);
	//算法         
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	//替换--防止值为“1”的情况         
	var reg = new RegExp('/', "g");
	return encrypted.toString().replace(reg, "#");
}

function decrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("1111wwww2222uuuu");
	var decrypt = CryptoJS.AES.decrypt(word, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
