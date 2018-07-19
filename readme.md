**Webpack Setup**

This tutorial is devided into 3 parts:
1. Creating & configuting Package.json 
2. Webpack configuration
3. Webpack in action

**Creating & configuting Package.json**
To create package.json, run following command on root directory.

```npm init```

(It will ask for few inputs, just enter as you wish. Press enter if don't want to skip any step)

In package.json, refer **scripts** section. Test command is already in place. we need to add a new script to run webpack

```"build": "webpack"```

We'll run webpack, once setup is completed, using following command:

```npm run build```

**Webpack configuration**
Create 2 folders on root directory as follows:
1. src
2. dist

create `index.js` inside src folder and add some javascript here. e.g.

```alert("Hello world!!!")```

Create a new file ```webpack.config.js``` on root directory.

```
const path = require('path');
module.exports = {
  mode: "development",
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

Now run npm command (as mentioned above):

```npm run build```

Here you get `bundle.js` inside dist folder.

Let's create index.html on root and add bundle.js in it.

Open index.html in browser and you get your code running through webpack

What if we need a server? webpack-dev-server helps you here. To install it, run

```npm i webpack-dev-server```

Now to run dev server, we need to ammend npm script in package.json

```"build": "webpack --watch | webpack-dev-server"```  (Watching changes & running dev server)

**Webpack in Action**

Let's again run npm script: ```npm run build``` Here you get your server instance running on **localhost:8080** (can be changed through configuration)

**Loaders**
Webpack can handle any type of assets e.g. scripts, styles, fonts, images etc... These assets are handled using loaders. Few loaders are as follows:
1. eslint-loader and babel loader - For JS files
2. css-loader, style-loader and sass-loader - For css & scss files
3. file-loader - for images
4. raw-loader - for text files, json files

To simply install all loaders (which we'll use during demo), let's add dev dependencies in package.json

```
"devDependencies": {
    "@babel/cli": "^7.0.0-beta.54",
    "@babel/core": "^7.0.0-beta.54",
    "@babel/preset-env": "^7.0.0-beta.54",
    "babel-core": "^7.0.0-bridge.0",
    "babel-eslint": "^8.2.6",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "css-loader": "^1.0.0",
    "eslint": "^5.1.0",
    "eslint-loader": "^2.0.0",
    "file-loader": "^1.1.11",
    "jshint": "^2.9.5",
    "node-sass": "^4.9.2",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "webpack": "^4.2.0",
    "webpack-cli": "^3.1.0",
    "webpack-concat-plugin": "^3.0.0"
  }
  ```

Now run following command to install above mentioned packages:

```npm install```

We are done with package installation, Now let's use these.

Add following code in webpack.config.js file after output section:

```
module: {
    rules: [{
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the eslint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "eslint-loader",
          options: {
            formatter: require("eslint/lib/formatters/stylish"),
            camelcase: true,
            emitErrors: false,
            failOnHint: false
          }
        }]
      },
      {
        test: /\.js$/, // include .js files
        enforce: "pre", // preload the jshint loader
        exclude: [/node_modules/, './src/js/vendor'], // exclude any and all files in the node_modules folder
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=src/css/fonts/[name].[ext]'
      }
    ]
  }
};
```

Webpack is now ready to load SASS, JS, CSS and fonts. Let's see how it works.

Create following files inside src/styles:
1. index.css 
2. component.scss 

**index.css**

```@import './component.scss';```

**component.scss**

```
.container {
  width: 100%;
  height: 200px;
  border: 1px solid #000;
  .heading {
    color: #ff0;
    font-size: 50px;
  }
}
```

**index.html**
```
<body>
    <div class="container">
        <h1 class="heading">Hello Team</h1>
    </div>
    <script src="dist/bundle.js"></script>
</body>
```

**index.js**
import './style/index.css'