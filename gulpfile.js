var gulp = require('gulp');

var typedoc = require("gulp-typedoc");

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
var typescript = require('gulp-typescript');

/* Images */
var imagemin = require('gulp-imagemin');

var tsProject = typescript.createProject('tsconfig.json');

/* Typedoc gulp task */
gulp.task("typedoc", function() {
    return gulp
        .src(appDev + '**/*.ts')
        .pipe(typedoc({ 
            // TypeScript options (see typescript docs) 
            module: "commonjs", 
            target: "es5",
            includeDeclarations: true,
            experimentalDecorators: true,
            
            // Output options (see typedoc docs) 
            out: "./docs", 
            json: "output/to/file.json",
 
            // TypeDoc options (see typedoc docs) 
            name: "my-project", 
            ignoreCompilerErrors: false,
            version: true,
        }))
        //.pipe(sourcemaps.init())
        //.pipe(typescript(tsProject))
        //.pipe(sourcemaps.write())
        //.pipe(gulp.dest("./docs"));
    ;
});

gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-ts', 'build-css', 'typedoc']);