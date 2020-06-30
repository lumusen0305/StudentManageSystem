
export function isEmail(rule, value, callback) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value) {
        return callback(new Error('請輸入手機號'));
    }
    if(pattern.test(value)){
        return callback()
    }
    return callback(new Error('輸入Email有誤'))
}

export function isPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error('請輸入手機號'));
    }
    var pattern = /^1[34578]\d{9}$/
    if(pattern.test(value)){
        return callback()
    }
    return callback(new Error('輸入手機號有誤'))
}

