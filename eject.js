const path = require('path');
const fs = require('fs');
const { resolveModule } = require('./resolve-module');

const DIR_NDS = __dirname;
// const DIR_NDS_MODULES = path.resolve(DIR_NDS, 'node_modules');

let _project = '.';

/**
 * 弹出配置文件：babel.config.js，该模块解析并导出本地安装的babel相关模块的路径，不可移植，需要开发者自行弹出：
 * ```
 * ~/app $ nds --eject
 * ```
 */
function eject$babel_config_js() {
    const babel_config_js_export = {
        "loader": resolveModule('babel-loader'),
        "options": {
            "plugins": [
                resolveModule('@babel/plugin-proposal-class-properties'),
            ],
            "presets": [
                [
                    resolveModule('@babel/preset-env'),
                    {
                        "targets": {
                            "esmodules": true
                        }
                    }
                ],
                [
                    resolveModule('@babel/preset-typescript'),
                ],
            ]
        }
    };
    let code = `module.exports = ${JSON.stringify(babel_config_js_export, null, 4)};\n`;
    fs.writeFileSync(path.resolve(_project, 'nds-babel.js'), code);
}

/**
 * @deprecated
 */
function eject$babel_config_json() {
    const babel_config_json = {
        "plugins": [
            resolveModule('@babel/plugin-proposal-class-properties'),
        ],
        "presets": [
            [
                resolveModule('@babel/preset-env'),
                {
                    "targets": {
                        "esmodules": true
                    }
                }
            ],
            [
                resolveModule('@babel/preset-typescript'),
            ],
        ]
    };
    fs.writeFileSync(path.resolve(_project, 'babel.config.json'), JSON.stringify(babel_config_json, null, 2));
}

/**
 * @deprecated
 */
function eject$webpack_config_js() {
    const filename = 'webpack.config.js';
    const webpack_config_js = fs.readFileSync(path.resolve(__dirname, './public/webpack.config.js')).toString('utf-8');
    const replace = webpack_config_js.replace('`@BABEL_LOADER`', JSON.stringify(resolveModule('babel-loader')));
    fs.writeFileSync(path.resolve(_project, filename), replace);
}

/**
 * @deprecated
 */
function eject$tsconfig_json() {
    const filename = 'tsconfig.json';
    const tsconfig_json = fs.readFileSync(path.resolve(__dirname, './public/tsconfig.json.template')).toString('utf-8');
    fs.writeFileSync(path.resolve(_project, filename), tsconfig_json);
}

function eject(project = process.cwd()) {
    _project = project;
    console.info('弹出配置文件！');
    /* Warn: 不可移植的代码！*/ /*
    eject$babel_config_json();
    eject$webpack_config_js();
    eject$tsconfig_json(); */
    eject$babel_config_js();
}

module.exports = eject;
