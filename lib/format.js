"use strict";

/**
 * Get 'src' in <script> tag
 * @type {RegExp}
 */
var scriptRegexp =   /[ \f\t\v]*<script\s+[^>]*?src="((?!https?:)([^"]+\.js)(\?[^"]+)?)"[^>]*?>[\s\S]*?<\/script>[ \f\t\v]*/ig

/**
 * Get 'href' in <link> tag
 * @type {RegExp}
 */
var linkEegexp = /[ \f\t\v]*<link\s+[^>]*?href="(?!https?:)([^"]+\.css)"[^>]*?>[ \f\t\v]*/ig

/**
 * Get arguments to {Array} of [string] by Regexp [regexp]
 * @param string
 * @param regexp
 * @returns {Array}
 */
exports.regexpMatchAll = function regexpMatchAll(string, regexp) {
  var matches = []
  string.replace(regexp, function () {
    matches.push(Array.prototype.slice.call(arguments))
  })
  return matches
}

/**
 * return {Array} with the item which consists of 'src' and 'target'
 * @param scripts
 * @returns {Array}
 */
function formatData(scripts) {
  var result = []
  scripts.map(function (script) {
    result.push({target: script[0], src: script[2] || script[1], params: script[3]})
  })
  return result
}

/**
 * Get format data in <script> content
 * @param content
 * @returns {Array}
 */
exports.getScript = function getScript(content) {
  return formatData(exports.regexpMatchAll(content, scriptRegexp))
}

/**
 * Get format data in <link> content
 * @param content
 * @returns {Array}
 */
exports.getLink = function getLink(content) {
  return formatData(exports.regexpMatchAll(content, linkEegexp))
}
