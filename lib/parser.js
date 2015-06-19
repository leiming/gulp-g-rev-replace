"use strict";

var util = require('util')
var Transform = require('stream').Transform
var Block = require('./block')
var Format = require('./format')

/**
 * 1 - newline
 * 2 - indentation
 * 3 - begin tag
 * 4 - task name
 * 5 - original content
 * 6 - end tag
 *
 * @type {RegExp}
 */
var regexp = /(\n?)([ \t]*)(<!--\s*build:(\w+(?:-\w+)*)\s*-->)\n?([\s\S]*?)\n?(<!--\s*endbuild\s*-->)\n?/ig;

function Parser(tasks, config, file) {

  Transform.call(this)

  this.tasks = tasks
  this.file = file
  this.config = config
}
util.inherits(Parser, Transform)

/**
 * Implement the _transform interface in Transform
 * @param file
 * @param encoding
 * @param done
 * @private
 */
Parser.prototype._transform = function (file, encoding, done) {

  var content = file.toString('utf8')
  var matches = Format.regexpMatchAll(content, regexp)

  matches.forEach(function (match) {
    var block = new Block(this.config, this.file, match)
    content = content.replace(block.replacement, block.compile(this.tasks))
  }.bind(this))

  this.push(content)

  done()
}

module.exports = Parser