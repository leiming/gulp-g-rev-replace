"use strict";

var through = require('through2')
var Parser = require('./lib/parser')
var assign = require('./lib/Object.assign')
var gutil = require('gulp-util')

var PLUGIN_NAME = 'gulp-g-dev-replace'

module.exports = function index(options, userConfig) {

  // Todo : options format
  var tasks = options

  var config = {
    keepUnassigned: false,
    keepBlockTags: false,
    resolvePaths: false
  }

  return through.obj(function (file, encoding, done) {

    if (typeof userConfig === 'object') {
      assign(config, {templatePath: file.base}, file.options, userConfig);
    }

    var parser = new Parser(tasks, config, file)

    if (file.isNull()) {
      return done()
    }

    if (file.isBuffer()) {
      parser.write(file.contents)
      parser.end()

      var contents = new Buffer(0);
      parser.on('data', function (data) {
        contents = Buffer.concat([contents, data]);
      });
      parser.once('end', function () {
        file.contents = contents;

        this.push(file)
        gutil.log(
          gutil.colors.cyan('---------- Replace End! ----------'))
        return done()
      }.bind(this))
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(parser)
    }

  })

}