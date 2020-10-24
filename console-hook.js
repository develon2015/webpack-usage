require('colors');
const child_process = require('child_process');
const _log = console.log;
const _info = console.info;
const _warn = console.warn;
const _error = console.error;

function stringify(obj) {
    switch (obj && obj.constructor) {
        case String: {
            return obj;
        }
        case Function: {
            return `Function: Function.name`;
        }
        case Error: {
            return obj.stack;
        }
    }
    try {
        return JSON.stringify(obj, undefined, 2);
    } catch (error) {
        return obj.toString();
    }
}

function consoleHook() {
    console.log = (...params) => {
        let color = 'brightGreen';
        _log('[V]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.info = (...params) => {
        let color = 'brightMagenta';
        _info('[I]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.warn = (...params) => {
        let color = 'yellow';
        _warn('[W]'[color], ...(params.map(it => stringify(it)[color])));
    };
    console.error = (...params) => {
        let color = 'brightRed';
        _error('[E]'[color], ...(params.map(it => stringify(it)[color])));
    };
    if (process.platform.match(/win/)) { // win32
        child_process.execSync('chcp 65001'); // 解决Windows下输出乱码问题
    }
}

void function test() {
    consoleHook();
    console.log('ABC', [1, 2, 3], new Error('测试颜色'));
    console.info('ABC', [1, 2, 3], new Error('测试颜色'));
    console.warn('ABC', [1, 2, 3], new Error('测试颜色'));
    console.error('ABC', [1, 2, 3], new Error('测试颜色'));
}
// ();

module.exports = {
    _log, _info, _error, _warn,
    consoleHook,
};
