'use strict';

const { getUnion, savePosition, getAllMessage } = require('../control/wechat');
const decodeToken = require('../common/token');

const routers = (router) => {
    /**
     * 获取union
     */
    router.post('/union', getUnion);
    /**
     * 更新地理位置
     */
    router.post('/update/position', decodeToken, savePosition);
    router.get('/all/info', decodeToken, getAllMessage);
    return router;
}

module.exports = routers;
