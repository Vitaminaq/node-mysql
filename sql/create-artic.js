module.exports = `CREATE TABLE IF NOT EXISTS cfsw.artic (
    articId INT(12) NOT NULL AUTO_INCREMENT,
    uid INT(12) NOT NULL,
    title VARCHAR(100) NOT NULL,
    msg VARCHAR(6000) NOT NULL,
    viewnum INT(12) NOT NULL,
    clicknum INT(12) NOT NULL,
    commentnum INT(12) NOT NULL,
    creatAt VARCHAR(20) NOT NULL,
    updateAt VARCHAR(20),
    PRIMARY KEY (articId),
    INDEX index2 (articId ASC)
)`;
