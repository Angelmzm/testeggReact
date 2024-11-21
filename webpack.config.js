const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Define a entrada do aplicativo, onde o Webpack começa a construir o gráfico de dependências
  entry: './src/index.js', // Substitua pelo caminho do seu arquivo de entrada principal

  // Define onde os arquivos de saída serão colocados após a compilação
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // O nome do arquivo compilado
  },

  // Configuração dos módulos para manipular diferentes tipos de arquivos
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // Regra para imagens
        use: [
          {
            loader: 'file-loader', // Usa o file-loader para imagens
            options: {
              name: '[name].[hash].[ext]', // Gera um nome de arquivo único baseado no hash
              outputPath: 'assets/imagens/', // Pasta onde as imagens serão colocadas
            },
          },
        ],
      },
    ],
  },
  

  // Plugins para adicionar funcionalidades adicionais ao Webpack
  plugins: [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'), // Garanta que ele aponte para o arquivo correto
      }),
  ],

  // Definições de ambiente de desenvolvimento
  devtool: 'source-map', // Para facilitar a depuração, se necessário
  devServer: {
    static: path.join(__dirname, 'dist'), // Usando 'static' em vez de 'contentBase' no Webpack 5
    compress: true,
    port: 9000,
    open: true, // Abrir o navegador automaticamente
    historyApiFallback: true, // Redireciona todas as requisições para index.html
  },
};
