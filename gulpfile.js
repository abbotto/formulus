const gulp = require("gulp");
const sh = require("shelljs");

gulp.task("compile", () => {
	sh.exec("node task/style.compile.js");
});

gulp.task("dev", ["compile"], function () {
	gulp.watch(["./src/**/*.scss", "./src/**/*.html"], ["compile"]);
});
