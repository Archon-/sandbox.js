function removeQuotes(string) {
    if (typeof string === 'string' || string instanceof String) {
        string = string.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '');
    }
    return string;
}

function getBreakpoint() {
    var style = null;
    if ( window.getComputedStyle && window.getComputedStyle(document.body, '::before') ) {
        style = window.getComputedStyle(document.body, '::before');
        style = style.content;
    }
    return JSON.parse( removeQuotes(style) );
}

function setSource() {
  var label = getBreakpoint();
  var image = document.getElementsByTagName('img');
  for (var i = 0; i < image.length; i++) {
    var source = image[i].getAttribute('data-' + label.current);
    image[i].src = source;
  }
}

document.addEventListener("DOMContentLoaded", setSource);
window.onresize = setSource;