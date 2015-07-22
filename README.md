# gulp-g-rev-replace
A [gulp](http://gulpjs.com/) plugin to rewrite occurences 
of filenames which have been renamed by QStatic.

> #### :warning: This plugin **MUST** be used in conjunction with *gulp-g-deploy* which is only published in qihoo private npm server.

## Table of Contents

- [Install](#usage)
- [Usage](#usage)
- [Example](#example)

![demo image](http://p9.qhimg.com/d/inn/6fc2716a/05918667-6FA6-4EE1-A50E-A08041AEFC3B.png)

## Install

Install with [npm](https://npmjs.org/package/gulp-g-rev-replace):

```bash
npm install --save-dev gulp-g-deploy // private npm server
npm install --save-dev gulp-g-rev-replace
```

## Usage

The following example will parse the build blocks in the HTML, 
replace them and pass those files through. Assets inside the 
build blocks will be concatenated and passed through in a stream as well.

```js
var defaultParams = {
  namespace: 'default',
  key: 'YOUR_PADDWORD',
  version: 'rev_replace_0_0_2',
  path: '/' + dirs.dist,
  extensions: ['js', 'css', 'map']
}

gulp.task('deploy', function () {
  return gulp.src(dirs.dist + '/' + inputFile + '.html')
    .pipe(deploy(defaultParams))
    .pipe(revReplace(['js', 'css'], {
      keepBlockTags: false
    }))
    .pipe(gulp.dest(dirs.online))
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
    <link rel="stylesheet" href="http://s0.qhimg.com/default/bar/rev_replace_0_0_2.css"/>
  </head>
<body>
<script src="http://libs.useso.com/js/jquery/1.9.1/jquery.min.js"></script>
<script src="http://s0.qhimg.com/default/harry/rev_replace_0_0_2.js"></script>
<script src="http://s0.qhimg.com/default/bar;foo/rev_replace_0_0_2.js?aaa=123&bbb=ccc"></script>
<script src="http://s0.qhimg.com/default/bar;jam/rev_replace_0_0_2.js?aaa=123&bbb=ccc"></script>
</body>
</html>
```

## Acknowledgments

* This gulp plugin refers to [gulp-html-replace](https://github.com/VFK/gulp-html-replace) 
which is written by Vladimir Kucherenko ([@VFK](https://github.com/VFK)) 

## License

MIT © [Leiming](http://leiming.me)