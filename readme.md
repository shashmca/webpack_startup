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
Create a new file ```webpack.config.js``` on root directory.

```
const path = require('path');
module.exports = {
  entry: {
    app: 'src/index.js'
  },
  output: {
    filename: 'bundle.js'
    path: path.resolve(__dirname, 'dist')
  }
}
```

**Webpack in Action**
