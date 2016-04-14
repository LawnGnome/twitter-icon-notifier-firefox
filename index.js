var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var pageWorker = require("sdk/page-worker");

var background = pageWorker.Page({
  contentURL: "./icon.html",
});

pageMod.PageMod({
  include: "*.twitter.com",
  contentScriptFile: "./content.js",
  onAttach: function (worker) {
    background.port.on("icon", function (data) {
      worker.port.emit("icon", data);
    });

    worker.port.on("count", function (count) {
      background.port.emit("count", count);
    });
  },
});
