'use strict';

const { getUnion } = require('../control/wechat');

const routers = (router) => {
    /**
     * 获取union
     */
    router.post('/union', getUnion);
    return router;
}

module.exports = routers;
