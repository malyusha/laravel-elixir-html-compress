/**
 * Created by:  malyusha 07.04.16
 * Email:       lovecoding@yandex.ru
 * Developer:   Igor Malyuk
 */

var p = require('path');
var gulp = require('gulp');
var _ = require('underscore');
var Elixir = require('laravel-elixir');
var htmlmin = require('gulp-htmlmin');

var config = Elixir.config;

/*
|--------------------------------------------------------------------------
| SVG sprites compilation task
|--------------------------------------------------------------------------
|
| This task compiles svg sprites into one.
|
*/

Elixir.extend('htmlCompress', function(src, output, options) {
    var paths;
    //Because laravel-elixir doesn't have property for framework path
    //We'll define it ourselves. You can also create elixir.json file
    //with storage folder property to get frameworkPath different
    var frameworkPath =  'storage/framework';
    options = options || {};

    config.html = {
        folder: p.join(frameworkPath, 'views'),
        outputFolder: p.join(frameworkPath, 'views'),
        compress: _.extend({
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            minifyJS: false
        }, options)
    };

    paths = prepGulpPaths(src, output);

    new Elixir.Task('htmlCompress', function() {
        this.log(paths.src, paths.output);

        var errorHandler = function(e) {
            new Elixir.Notification.error(e, 'Html compression failed');
            this.emit('end');
        };

        return gulp.src(paths.src.path)
            .pipe(htmlmin(config.html.compress))
            .on('error', errorHandler)
            .pipe(gulp.dest(paths.output.baseDir))
            .pipe(new Elixir.Notification('Html compressed successfully!'));
    });
});

/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, output) {
    return new Elixir.GulpPaths()
        .src(src || config.html.folder)
        .output(output || config.html.outputFolder);
};
