module.exports = {
    outputDir: path.resolve(__dirname,'../'),
    devServer: {
        proxy: 'http://localhost:3000'
    }
}