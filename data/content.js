// In the content script, all we need to do is look for the new items bar to
// change, send a message to the background page to draw the new shortcut icon,
// and then update the shortcut icon in the document.
(function () {
  var check = function (records, observer) {
    var count = 0;
    var newTweets = document.querySelector(".new-tweets-bar");

    if (newTweets) {
      count = +newTweets.getAttribute("data-item-count");
      observer.observe(newTweets, {attributes: true});
    }

    self.port.emit("count", count);
  };

  var observer = new MutationObserver(check);
  observer.observe(document.body, {subtree: true, childList: true});

  self.port.on("icon", function (data) {
    var icon = document.querySelector("head link[rel='shortcut icon']");

    icon.setAttribute("href", data);
    icon.setAttribute("type", "image/png");
  });
})();
