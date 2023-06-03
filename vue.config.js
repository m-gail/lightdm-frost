module.exports = {
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        secondary: {
            entry: 'src/secondary.js',
            template: 'public/secondary.html',
            filename: 'secondary.html'
        }
    },
    publicPath: "./",
    filenameHashing: false,
    productionSourceMap: false
}
