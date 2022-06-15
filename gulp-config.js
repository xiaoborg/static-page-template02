module.exports = {
  dist: 'dist',
  cssPath: [
    './src/scss/**/index.scss',
    '!./src/scss/**.scss'
  ],
  htmlPath: [
    'src/**.html',
    'src/pages/**/index.html'
  ],
  htmlWatchPath: [
    './src/*.html',
    './src/pages/**/*.html'
  ],
  imgPath: "src/assets/img/**/*",
  cssWatchPath: [
    './src/scss/**/*.scss'
  ]
}