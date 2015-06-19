# gulp-g-rev-replace
A [gulp](http://gulpjs.com/) plugin to rewrite occurences 
of filenames which have been renamed by QStatic.

## Table of Contents

- [Install](#usage)
- [Usage](#usage)
- [Example](#example)

## Install

Install with [npm](https://npmjs.org/package/gulp-g-rev-replace)

```
npm install --save-dev gulp-g-rev-replace
```

## Usage

The following example will parse the build blocks in the HTML, 
replace them and pass those files through. Assets inside the 
build blocks will be concatenated and passed through in a stream as well.

```js
var gulp = require('gulp')
var rev_replace = require('gulp-g-rev-replace')

var version = "0_0_4"
var namespace = 'default'
var base = 'src/web_inf/front/'

// [../bundle.js] will be replaced to [http://s0.qhimg.com/default/bundle/0_0_4.js]

gulp.task('rev-replace', function () {
  return gulp.src(base + 'tpls/index.html')
    .pipe(rev_replace({
      js: {},
      css: {}
    }, {
      keepBlockTags: false,
      jsBasePath: base + 'reboot',
      htmlBasePath: base + 'tpls',
      namespace: namespace,
      version: version
    }))
    .pipe(gulp.dest(base + 'online/'))
})
```

## Example

Blocks are expressed as:

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Test</title>
  <!-- build:css -->
  <link rel="stylesheet" href="../reboot/bar.css"/>
  <!-- endbuild -->
</head>
<body>
<script src="http://libs.useso.com/js/jquery/1.9.1/jquery.min.js"></script>
<!-- build:js -->
<script src="../reboot/harry.js"></script>
<script src="../reboot/bar/foo.js?aaa=123&bbb=ccc"></script>
<script src="../reboot/bar/jam.js?aaa=123&bbb=ccc"></script>
<!-- endbuild -->
</body>
</html>
```

Blocks are expressed as:

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title>Test</title>
    <link rel="stylesheet" href="http://s0.qhimg.com/default/bar/0_0_4.css"/>
  </head>
<body>
<script src="http://libs.useso.com/js/jquery/1.9.1/jquery.min.js"></script>
<script src="http://s0.qhimg.com/default/harry/0_0_4.js"></script>
<script src="http://s0.qhimg.com/default/bar;foo/0_0_4.js?aaa=123&bbb=ccc"></script>
<script src="http://s0.qhimg.com/default/bar;jam/0_0_4.js?aaa=123&bbb=ccc"></script>
</body>
</html>
```

## Acknowledgments

* This gulp plugin refers to [gulp-html-replace](https://github.com/VFK/gulp-html-replace) 
which is written by Vladimir Kucherenko ([@VFK](https://github.com/VFK)) 

## License

MIT © [Leiming](http://leiming.me)