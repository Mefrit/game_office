const series = require("gulp"),
    watch = require("gulp-watch"),
    less = require("gulp-less"),
    path = require("path");

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

gulp.task("default", () => {
    // gulp.series(["less"]);
    watch("src/style/**/*.less", gulp.series(["less"]));
    // watch("src/script/**/*.ts", gulp.series(["tsc"]));
});
