module.exports = `CREATE TABLE cfsw.comment (
    commentId INT(12) NOT NULL AUTO_INCREMENT,
    articId INT(12) NOT NULL,
    nickname VARCHAR(12) NOT NULL,
    msg VARCHAR(300) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    PRIMARY KEY (commentId),
    INDEX index2 (commentId ASC)
)`
