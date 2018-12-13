module.exports = `CREATE TABLE cfsw.comment (
    commentId INT(12) NOT NULL AUTO_INCREMENT,
    articId INT(12) NOT NULL,
    uid INT(12) NOT NULL,
    msg VARCHAR(300) NOT NULL,
    clicknum INT(12) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    PRIMARY KEY (commentId),
    INDEX index2 (commentId ASC)
)`
