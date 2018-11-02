module.exports = `CREATE TABLE IF NOT EXISTS cfsw.artic (
    articId INT(12) NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(12) NOT NULL,
    title VARCHAR(12) NOT NULL,
    msg VARCHAR(6000) NOT NULL,
    viewnum INT(12) NOT NULL,
    clicknum INT(12) NOT NULL,
    commentnum INT(12) NOT NULL,
    creatAt TIMESTAMP NOT NULL,
    updateAt TIMESTAMP,
    PRIMARY KEY (articId),
    INDEX index2 (articId ASC)
)`;
