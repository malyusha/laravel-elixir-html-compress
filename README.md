# laravel-elixir-html-compress
Compress laravel html views

##Install
`npm install laravel-elixir-html-compress --save-dev`

##Usage
```javascript
var Elixir = require('laravel-elixir');
require('laravel-elixir-html-compress');
...

elixir(function(mix) {
  mix.htmlCompress(src, output, options);
});
```

###Options
Plugin uses `gulp-htmlmin` to minify html. So checkout their [docs](https://github.com/kangax/html-minifier).
Default options are:

* `collapseWhitespace: true`
* `removeAttributeQuotes: true`
* `removeComments: true`
* `minifyJS: false`
