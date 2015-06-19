"use strict";

var Format = require('./format')
var util = require('util')
var path = require('path')

/**
 * Define all information to replace
 * @param config
 * @param file
 * @param match
 * @constructor
 */
var Block = function (config, file, match) {
  this.replacement = match[0];
  this.linefeed = match[1];
  this.indent = match[2];
  this.beginTag = match[3];
  this.taskName = match[4];
  this.originalContent = match[5];
  this.endTag = match[6];

  this.replacements = [];
  this.config = config;
  this.template = null;
  this.file = file;
}

/**
 * Return string which is used to replacement by replacements and config
 * @returns {String}
 */
Block.prototype.build = function () {
  var result = this.replacement

  // execute custom config
  if (this.config) {
    if (this.config.keepUnassigned) {
      return this.replacement
    }

    if (!this.config.keepBlockTags) {
      result = result.replace(this.beginTag + this.linefeed, "")
      result = result.replace(this.endTag + this.linefeed, "")
    }
  }

  if (Array.isArray(this.replacements)) {
    this.replacements.map(function (replacement) {
      result = result.replace(replacement.src, replacement.replace)
    })
    return result
  }

  return this.replacement
}

/**
 * Setup replacements {Array} by extension
 * @param replacements
 * @param ext
 */
Block.prototype.setReplacements = function (replacements, ext) {
  this.ext = ext
  this.config.prefix = this.config.prefix || 's0.qhimg.com'
  if (Array.isArray(replacements)) {
    replacements.map(function (replacement) {
      var relativePath = path.relative(this.config.htmlBasePath, this.config.jsBasePath)
      var targetPath = path.relative(relativePath, replacement.src)
      var targetName = path.join(path.dirname(targetPath), path.basename(targetPath, '.' + ext))
      targetName = targetName.replace('/', ';')
      replacement.replace = 'http://' + path.join(this.config.prefix, this.config.namespace, targetName, this.config.version + '.' + ext)
    }.bind(this))
  }

  this.replacements = replacements
}

/**
 * Get the replacement string by compile the task
 * @param tasks
 * @returns {string}
 */
Block.prototype.compile = function (tasks) {

  var task = tasks[this.taskName]

  if (task && this.taskName == 'js') {
    this.setReplacements(Format.getScript(this.originalContent), 'js')
  }

  if (task && this.taskName == 'css') {
    this.setReplacements(Format.getLink(this.originalContent), 'css')
  }

  return this.build()
}

module.exports = Block