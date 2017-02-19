"use strict";

const sh = require("shelljs");
const fs = require("fs");
const finder = require("glob-concat");

const tmpCSS = "tmp/formulus.tmp.scss";
const inputSCSS = "src/formulus.scss";
const outputCSS = "dist/formulus.min.css";
const postCSS = "chmod +x node_modules/postcss/lib/postcss.js && node node_modules/postcss/lib/postcss.js";
const nodeSASS = "chmod +x node_modules/node-sass/bin/node-sass && node_modules/node-sass/bin/node-sass";

sh.exec("mkdir ./dist/");
sh.exec("mkdir ./dist/fonts/");
sh.exec("mkdir ./tmp/");
sh.exec("touch " + tmpCSS);
sh.exec("touch " + outputCSS);
// sh.exec("node_modules/stylefmt/bin/cli.js " + inputSCSS + " " + tmpCSS);
// sh.exec("node_modules/stylelint/bin/stylelint.js src/**/*.scss");
sh.exec("node task/font.copy.js");

sh.exec("cp " + inputSCSS + " " + tmpCSS);
sh.exec(nodeSASS + " -q --output-style compressed --include-path scss " + inputSCSS + " > " + tmpCSS);
sh.exec(postCSS + " --use autoprefixer -b 'last 5 versions' < " + tmpCSS);
sh.exec("cp " + tmpCSS + " " + outputCSS);