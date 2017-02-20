module.exports = {
    entry: "./src/index.js",
    output: {
        path: "./dist",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};
