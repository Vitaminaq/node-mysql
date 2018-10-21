const isEmpty = function (obj) {
    let count = 0;
    for (const key in obj) {
        if (!obj[key]) count ++;
        if (count > 1) break;
    }
    return !!count;
}

module.exports = isEmpty;
