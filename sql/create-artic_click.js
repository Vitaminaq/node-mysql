module.exports = `CREATE TABLE IF NOT EXISTS cfsw.artic_click (
    acId INT(12) NOT NULL AUTO_INCREMENT,
    articId INT(12) NOT NULL,
    name VARCHAR(6) NOT NULL,
    creatAt VARCHAR(6) NOT NULL,
    PRIMARY KEY (acId),
    INDEX index2 (acId ASC)
)`