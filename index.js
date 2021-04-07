class StringShortner {
  constructor({ uncompressed, asArray, compressed }) {
    this.uncompressed = uncompressed;
    this.asArray = asArray;
    this.compressed = compressed;
  }
  compress(asArray) {
    "use strict";
    asArray = this.asArray === true;

    var i,
      dictonary = {},
      uncompressed = this.uncompressed,
      c,
      wc,
      w = "",
      result = [],
      ASCII = "",
      dictSize = 256;

    for (i = 0; i < 256; i++) {
      dictonary[String.fromCharCode(i)] = i;
    }
    for (i = 0; i < uncompressed.length; i++) {
      c = uncompressed.charAt(i);
      wc = w + c;
      if (dictonary.hasOwnProperty(wc)) {
        w = wc;
      } else {
        result.push(dictonary[w]);
        ASCII += String.fromCharCode(dictonary[w]);
        dictonary[wc] = dictSize++;
        w = String(c);
      }
    }
    if (w != "") {
      result.push(dictonary[w]);
      ASCII += String.fromCharCode(dictonary[w]);
    }

    return asArray ? result : ASCII;
  }
  decompress() {
    "use strict";
    var i,
      tmp = [],
      dictionary = [],
      compressed = this.compressed,
      w,
      result,
      k,
      entry = "",
      dictSize = 256;
    for (i = 0; i < 256; i += 1) {
      dictionary[i] = String.fromCharCode(i);
    }
    if (compressed && typeof compressed === "string") {
      for (i = 0; i < compressed.length; i += 1) {
        tmp.push(compressed[i].charCodeAt(0));
      }
      compressed = tmp;
      tmp = null;
    }
    w = String.fromCharCode(compressed[0]);
    result = w;
    for (i = 1; i < compressed.length; i += 1) {
      k = compressed[i];
      if (dictionary[k]) {
        entry = dictionary[k];
      } else {
        if (k === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }

      result += entry;

      dictionary[dictSize++] = w + entry.charAt(0);

      w = entry;
    }
    return result;
  }
}

function onCompress() {
  var uncompressed = document.getElementById("string-input").value;
  var compressedText = document.getElementById("compressed-text");
  let stringShortner = new StringShortner({
    uncompressed: uncompressed,
    asArray: false,
  });
  let compressed = stringShortner.compress();
  compressedText.innerHTML = `<h6>Entered String:</h6> ${uncompressed}</br> <h6>Entered String Length:</h6>${uncompressed.length}</br><h6>Compressed String:</h6>${compressed}</br><h6>Compressed String Length:</h6>${compressed.length}`;
}

function onDecompress() {
  var compressed = document.getElementById("coded-string-input").value;
  var deCompressedText = document.getElementById("decompressed-text");
  let stringShortner = new StringShortner({ compressed: compressed });
  let uncompressed = stringShortner.decompress();
  deCompressedText.innerHTML = `<h6>Entered String:</h6> ${compressed}</br><h6>Decompressed String:</h6>${uncompressed}`;
}

var compressBtn = document.getElementById("compress");
var deCompressBtn = document.getElementById("decompress");
compressBtn.addEventListener("click", onCompress);
deCompressBtn.addEventListener("click", onDecompress);
