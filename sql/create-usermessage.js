module.exports = `CREATE TABLE IF NOT EXISTS cfsw.usermessage (
    uid INT(12) NOT NULL AUTO_INCREMENT,
    username VARCHAR(6) NOT NULL,
    nickname VARCHAR(12) NOT NULL,
    sex VARCHAR(3) NOT NULL,
    headimg VARCHAR(45) NOT NULL,
    password VARCHAR(45) NOT NULL,
    age INT(5) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    updateAt VARCHAR(20),
    PRIMARY KEY (uid),
    INDEX index2 (uid ASC)
)`;
