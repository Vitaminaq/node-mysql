/**
 * 公司信息表，用于记录注册公司的
 * id 公司编码
 * name 公司名称
 * uid 创建者uid
 */
module.exports = `CREATE TABLE IF NOT EXISTS wxbs.company (
    id INT(12) NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    uid INT(12) NOT NULL,
    PRIMARY KEY (id),
    INDEX index2 (id ASC)
)`;
