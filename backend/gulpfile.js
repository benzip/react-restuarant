var gulp = require("gulp");
var watch = require("gulp-watch");
var spawn = require("child_process").spawn,
  node;
gulp.task("server", function() {
  if (node) node.kill();
  node = spawn("node", ["bin/www"], { stdio: "inherit" });
  node.on("close", function(code) {
    if (code === 8) {
      gulp.log("Error detected, waiting for changes...");
    }
  });
});

gulp.task("watch_api", function() {
  watch(["./routes/*.js"], function() {
    gulp.run(["server"]);
  });
});

gulp.task("default", ["server", "watch_api"]);

process.on("exit", function() {
  if (node) node.kill();
});
