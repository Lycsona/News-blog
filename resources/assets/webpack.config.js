const webpack = require('webpack');
const resolve = require('path').resolve;
const join = require('path').join;
const isProd = (process.env.NODE_ENV === 'production');

const noParsedDeps = [
    'moment/min/moment.min.js',
    'immutable/dist/immutable.min.js',
];

const globals = {
    _: 'lodash',
    moment: 'moment',
    React: 'react',
    ReactDOM: 'react-dom',
    ReactBS: 'react-bootstrap'
};

/*
 * Paths configurations
 */
const context = resolve(__dirname, 'app');
const outputPath = resolve(__dirname, '..', '..', 'public', 'app');

/*
 * Add Promise polyfill if it is not defined
 * as it is required for css-loader
 */
if (!global.Promise) {
    require('es6-promise').polyfill();
}

/*
 * Export webpack configurations
 */
const config = module.exports = {
    context: context,

    entry: {
        bundle: './index'
    },

    output: {
        path: outputPath,
        publicPath: '/app',
        filename: '/scripts/' + (isProd ? '[name].[hash].js' : '[name].js'),
        chunkFilename: '/scripts/' + ('chunk.[chunkhash].js'),
    },

    module: {
        noParse: [/\.min$/, /\.min\.js$/],
        preLoaders: [
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: context,
                eslint: {
                    failOnError: true
                }
            },
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [
                    /node_modules/,
                    /rpc/,
                    /vendor/
                ],
                loader: 'babel-loader',
                query: {
                    optional: ['runtime'],
                    stage: 0,
                },
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [
                    'url-loader?limit=8192&name=/images/[name]-[hash:6].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
                ],
            },
        ],
    },

    resolve: {
        alias: {
            app: context,
            images: join(context, 'images'),
        },
        extensions: ['', '.js', '.jsx'],
    },

    plugins: [

        // disable dynamic requires - everything you need should be required explicitly
        new webpack.ContextReplacementPlugin(/.*$/, /a^/),

        // expose global libraries
        new webpack.ProvidePlugin(globals),

        // define global variables
        new webpack.DefinePlugin({
            __DEV__: !isProd ? 'true' : 'false',

            'process.env': {
                NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
            },
        })
    ],
};

/*
 * Add some production oriented configs
 */
if (isProd) {
    config.plugins.push(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.NoErrorsPlugin(),
        function () {
            // Exit the process on failure and report a status of 1
            this.plugin('done', function (stats) {
                // Exit on fail
                if (stats.compilation.errors && stats.compilation.errors.length) {
                    stats.compilation.errors.forEach(function (error) {
                        if (error.module) {
                            console.error('Error in resource ', error.module.resource, '\n', error.message, '\n');
                        } else {
                            var errorMessage = error.message || error;
                            console.error('Error found ', errorMessage);
                        }
                    });

                    process.exit(1);
                }
            });
        }
    );
} else {
    config.devtool = 'source-map';
    config.debug = true;
}


/*
 * Run through deps and extract the first part of the path,
 * as that is what you use to require the actual node modules
 * in your code. Then use the complete path to point to the correct
 * file and make sure webpack does not try to parse it
 */
const nodeModules = resolve(__dirname, 'node_modules');

noParsedDeps.forEach(function collectAliases(dep) {
    const path = resolve(nodeModules, dep);

    config.resolve.alias[dep.split('/')[0] + '$'] = path;
    config.module.noParse.push(path);
});

/*
 * This is necessary for jest preprocessor: look at jest.preprocessor.js
 */
config.__globals = globals;
config.__aliases = config.resolve.alias;
