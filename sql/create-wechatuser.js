/**
 * uid 用户id
 * username 用户姓名
 * nickname 用户昵称
 * avatarUrl 用户头像
 * latitude 所在经度
 * longitude 所在纬度
 * creatAt 创建时间
 * openid
 * session_key
 */
module.exports = `CREATE TABLE IF NOT EXISTS wxbs.usermessage (
    uid INT(12) NOT NULL AUTO_INCREMENT,
    cid INT(12) NOT NULL,
    username VARCHAR(6) NOT NULL,
    nickname VARCHAR(120) NOT NULL,
    avatarUrl VARCHAR(155) NOT NULL,
    latitude VARCHAR(45) NOT NULL,
    longitude VARCHAR(45) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    openid VARCHAR(30) NOT NULL,
    session_key VARCHAR(30) NOT NULL,
    PRIMARY KEY (uid),
    INDEX index2 (uid ASC)
)`;
