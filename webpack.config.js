const path = require('path');

module.exports = {
    entry: {
        extension_bundle: './src/Test.ts', // Entrada principal para o bundle.js
        // content_script: './src/Script.ts', // Entrada para script.js
    },
    output: {
        filename: '[name].js', // Usar o nome do ponto de entrada como nome do arquivo de saída
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: "development",
    cache: {
        type: 'filesystem',
    }
};
