module.exports = `CREATE TABLE IF NOT EXISTS wxbs.usermessage (
    uid INT(12) NOT NULL AUTO_INCREMENT,
    username VARCHAR(6) NOT NULL,
    nickname VARCHAR(12) NOT NULL,
    avatarUrl VARCHAR(120) NOT NULL,
    latitude VARCHAR(45) NOT NULL,
    longitude VARCHAR(45) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    openid varchar(30) NOT NULL,
    session_key varchar(30) NOT NULL,
    PRIMARY KEY (uid),
    INDEX index2 (uid ASC)
)`;
