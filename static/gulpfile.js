const series = require("gulp"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    path = require("path"),
    ts = require("gulp-typescript");

const gulp = require("gulp");

gulp.task("less", function () {
    return gulp
        .src("./src/style/**/*.less")
        .pipe(
            less({
                paths: [path.join(__dirname, "includes")],
            })
        )
        .pipe(gulp.dest("./public/css"));
});

const tsProject = ts.createProject('tsconfig.json');

gulp.task("tsc", function() {
    return gulp.src("./src/script/**/*.ts")
        .pipe(tsProject())
        .js.pipe(gulp.dest("public/scripts"));
});

gulp.task("default", gulp.series(["less", "tsc"]));

gulp.task("watch", () => {
    watch("src/style/**/*.less", gulp.series(["less"]));
    watch("src/script/**/*.ts", gulp.series(["tsc"]));
});
