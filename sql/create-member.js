/**
 * 员工信息表，用于记录员工在公司的基本信息
 * id 记录id
 * cid 公司编号
 * uid 成员id
 * type 用户身份 1老板 2 员工
 */
module.exports = `CREATE TABLE IF NOT EXISTS wxbs.member (
    id INT(12) NOT NULL AUTO_INCREMENT,
    cid INT(12),
    uid INT(12) NOT NULL,
    type INT(30) NOT NULL,
    PRIMARY KEY (id),
    foreign key (cid) references company(id) on delete cascade on update cascade,
    foreign key (uid) references usermessage(uid) on delete cascade on update cascade,
    INDEX index2 (id ASC)
)`;
