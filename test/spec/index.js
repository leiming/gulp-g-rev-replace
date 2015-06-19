"use strict";
/* global describe, it, expect */

var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var rev_replace = require('../../index')

function getFile(filePath) {
  return new gutil.File({
    path:     filePath,
    cwd:      __dirname,
    base:     path.dirname(filePath),
    contents: fs.readFileSync(filePath)
  });
}

function getFixture(filePath) {
  return getFile(path.join('test', 'fixtures', filePath))
}

function getExpected(filePath) {
  return getFile(path.join('test', 'expected', filePath))
}

function compare(name, expectedName, done) {
  var stream = rev_replace();

  stream.on('data', function(newFile) {
    if (path.basename(newFile.path) === name) {
      expect(String(getExpected(expectedName).contents)).toEqual(String(newFile.contents))
    }
  });

  stream.on('end', function() {
    done();
  });

  stream.write(getFixture(name))

  stream.end()
}

describe('hello', function(){
  it('good', function () {
    expect('bar').toBe('bar')
  })
})

