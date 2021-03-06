const gulp = require('gulp');
const ts = require('gulp-typescript');
const merge = require('merge2');
const del = require('del');
const webpack = require('gulp-webpack');
const gulpTslint = require('gulp-tslint');
const tslint = require('tslint');
var argv = require('yargs').argv;

const tsproj = ts.createProject('./tsconfig.json');

if (argv.production) {
    process.env.NODE_ENV = 'production';
}

const resources = [
    'src/qp.xslt'
];

gulp.task('compile', () => {
    let tsResult = gulp.src(['src/**/*.ts', 'typings/**/*.ts'])
        .pipe(tsproj());

    let move = gulp.src(resources);

    return merge([
        tsResult.dts.pipe(gulp.dest('./out/')),
        tsResult.js.pipe(gulp.dest('./out/')),
        move.pipe(gulp.dest('./out/'))
    ]);
});

gulp.task('clean', () => {
    return del(['lib', 'out', 'dist']);
});

gulp.task('release', ['clean', 'compile'], () => {
    let webpackfiles = gulp.src('./out/index.js')
                    .pipe(webpack(require('./webpack.release.config.js')));
    let typings = gulp.src('./out/*.d.ts');

    return merge([
        webpackfiles.pipe(gulp.dest('./dist')),
        typings.pipe(gulp.dest('./dist'))
    ]);
});

gulp.task('tslint', () => {
    var program = tslint.Linter.createProgram('tsconfig.json');
    return gulp.src([
        'src/**/*.ts'
    ])
    .pipe((gulpTslint({
        program,
        formatter: "verbose",
        rulesDirectory: "node_modules/tslint-microsoft-contrib"
    })))
    .pipe(gulpTslint.report());
});
