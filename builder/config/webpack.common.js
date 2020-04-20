const path = require('path');

const rootDir = path.join(__dirname, "../")

const dirs = {
    ASSESTS: path.join(__dirname, "../../dist"),
    SRC: rootDir + 'src',
}
const MODULE_PATHS = [
    dirs.SRC,
    rootDir + 'node_modules',
]

const entries = [
    dirs.SRC + "/index.js",
    dirs.SRC + "/scss/builder.scss",
    dirs.SRC + "/scss/main.scss"
];

module.exports = {
    resolve : { modules: MODULE_PATHS },
    context: process.cwd(),
    node: { __filename: true },
    entry: entries,
    output: {
        path: dirs.ASSESTS,
        filename: 'js/engine.build.js',
      },
    plugins: [],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
        {
            test: /\.(css|sass|scss)$/,
            use: [  
                {
                    loader: 'file-loader',
                    options: {
                        name: 'css/[name].css',
                    }
                },
                {
                    loader: 'extract-loader'
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        // loads font icons for Bootstrap css
        {
            test: /\.woff(2?)(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/font-woff"
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=application/octet-stream"
        },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url?limit=10000&mimetype=image/svg+xml"
        },
        { test: /\.json$/, loader: "json" }
        ]
    },
}