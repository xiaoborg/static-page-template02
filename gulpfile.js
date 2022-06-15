//import all plugings
const gulp = require('gulp');
// const babel = require("gulp-babel");
const { series } = require('gulp')
const yargs = require('yargs')
const browserSync = require('browser-sync').create()
const fs = require('fs')
const yaml = require('js-yaml')
const sass = require('gulp-sass')(require('sass'));
//压缩js
const uglify = require('gulp-uglify')
//支持if
const gulpif = require('gulp-if')
//自动完成 css 属性浏览器前缀
const autoprefixer = require('gulp-autoprefixer')
//让错误信息友好显示
const sourcemaps = require('gulp-sourcemaps')
//让css支持js插件
const postcss = require('gulp-postcss')
//保持输出的js文件不变
const named = require('vinyl-named')
const webpackStream = require('webpack-stream')
const webpack2 = require('webpack')
//css import
const postcssImport = require('postcss-import') 
//把css媒体查询自动合并
const cssMqpacker = require('css-mqpacker') 
//css压缩
const cssnano = require('cssnano') 
// 合并html
const fileinclude = require('gulp-file-include') 
const cssmin = require('gulp-cssmin')
const beautify = require('gulp-beautify')
const rename = require('gulp-rename')
const del = require('del')
const header = require('gulp-header');
const moment = require('moment')
const childProcess = require('child_process')
const replace = require('gulp-replace')


const gulpConfig = require('./gulp-config')
const udpateTime = moment().format("YYYY/MM/DD HH:mm:ss")

showConsole('*', 'StartTime', udpateTime)


// 把html文件放入dist
function pages() {
  return gulp.src(gulpConfig.htmlPath)
    .pipe(fileinclude())
    .pipe(beautify.html({ indent_size: 2 }))
    .pipe(gulp.dest(gulpConfig.dist))
}

// 启动本地服务器和浏览器
function server(done) {
  browserSync.init({
    server: "./dist",
    port: 3003
  }, done)
}

//scss
function css() {
  return gulp.src(gulpConfig.cssPath)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ["last 2 versions","ie >= 9","ios >= 7"] }))
    .pipe(header('/*' + udpateTime + '*/ \n'))
    .pipe(gulp.dest(gulpConfig.dist))
    .pipe(browserSync.reload({ stream: true }))

}

// Copy images to the "dist" folder
function images() {
  return gulp.src(gulpConfig.imgPath)
    .pipe(gulp.dest('dist' + '/assets/img'))
}

async function cleanDist() {
  del.sync(['dist'])
}

// watch
function watch() {
  gulp.watch(gulpConfig.htmlWatchPath).on('all', gulp.series(pages, browserSync.reload))
  gulp.watch(gulpConfig.cssWatchPath).on('all', gulp.series(css, browserSync.reload))
}

function showConsole(_symbol, dsc, val) {
  var logSymsbol = ''
  for (let i = 0; i < 20; i++) {
    logSymsbol = logSymsbol + _symbol
  }
  console.log(logSymsbol)
  console.log(dsc + ':' + val)
  console.log(logSymsbol)
}

exports.pages = series(pages)
exports.images = series(images)
exports.css = series(css)
exports.server = series(server)
exports.cleanDist = series(cleanDist)
exports.default = series(images, css, pages, server, watch)
exports.build = series(cleanDist, images, css, pages)