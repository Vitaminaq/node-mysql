module.exports = `CREATE TABLE cfsw.comment_click (
    ccId INT(12) NOT NULL AUTO_INCREMENT,
    commentId INT(12) NOT NULL,
    articId INT(12) NOT NULL,
    uid INT(12) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    PRIMARY KEY (ccId),
    INDEX index2 (ccId ASC)
);`