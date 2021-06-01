// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts/helpers/loadCurrentItems.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadCurrentItems = void 0;

var _storage = require("../utils/storage");

const loadCurrentItems = (tag, container) => {
  const currentItems = (0, _storage.getFromLocal)(tag);
  const counterContainer = document.querySelector(container);
  let total = 0;

  if (!currentItems) {
    return counterContainer.innerHTML = total.toString();
  }

  if (tag === "cart") {
    let sum = 0;
    currentItems.forEach(element => {
      element.qtySize.forEach(item => {
        if (item.qty) sum += item.qty;
      });
    });
    total = sum;
    return counterContainer.textContent = total > 9 ? "9+" : total.toString();
  }

  if (tag === "favs") {
    const favsTotal = currentItems.length > 9 ? "9+" : currentItems.length;
    return counterContainer.textContent = favsTotal;
  }
};

exports.loadCurrentItems = loadCurrentItems;
},{"../utils/storage":"ts/utils/storage.ts"}],"ts/utils/settings.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.home = exports.favs = exports.cart = exports.allProducts = exports.userToken = exports.user = exports.BASE_URL = void 0;
const BASE_URL = `https://ark-backend.herokuapp.com`;
exports.BASE_URL = BASE_URL;
const user = "user";
exports.user = user;
const userToken = "userToken";
exports.userToken = userToken;
const allProducts = "allProducts";
exports.allProducts = allProducts;
const cart = "cart";
exports.cart = cart;
const favs = "favs";
exports.favs = favs;
const home = "home";
exports.home = home;
},{}],"ts/helpers/getLoggedInUser.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoggedInUser = void 0;

var _settings = require("../utils/settings");

var _storage = require("../utils/storage");

const getLoggedInUser = () => {
  const loggedUser = (0, _storage.getFromLocal)(_settings.user);
  return loggedUser;
};

exports.getLoggedInUser = getLoggedInUser;
},{"../utils/settings":"ts/utils/settings.ts","../utils/storage":"ts/utils/storage.ts"}],"ts/helpers/getRoundNumber.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoundNumber = void 0;

const getRoundNumber = price => {
  return Math.round(price);
};

exports.getRoundNumber = getRoundNumber;
},{}],"ts/helpers/getFavsIcon.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFavsIcon = void 0;

var _settings = require("../utils/settings");

var _storage = require("../utils/storage");

const getFavsIcon = product => {
  const currentFavs = (0, _storage.getFromLocal)(_settings.favs) ? (0, _storage.getFromLocal)(_settings.favs) : [];
  const hasFavs = currentFavs.find(fav => {
    return fav.id === product.id;
  });
  return hasFavs ? "fa-heart" : "fa-heart-o";
};

exports.getFavsIcon = getFavsIcon;
},{"../utils/settings":"ts/utils/settings.ts","../utils/storage":"ts/utils/storage.ts"}],"ts/components/card.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.card = void 0;

var _getLoggedInUser = require("../helpers/getLoggedInUser");

var _getRoundNumber = require("../helpers/getRoundNumber");

var _getFavsIcon = require("../helpers/getFavsIcon");

var _settings = require("../utils/settings");

const card = product => {
  const price = (0, _getRoundNumber.getRoundNumber)(product.price);
  const cssClass = (0, _getFavsIcon.getFavsIcon)(product);
  const user = (0, _getLoggedInUser.getLoggedInUser)();
  const edit = user && user.username === "admin" && location.pathname !== "/fav.html" ? ` <button type="button" class="btn btn-dark btn-sm edit-btn"><a href="/edit.html?id=${product.id}">Edit</a></button>` : "";
  const image = product.image_url ? product.image_url : product.image ? `${_settings.BASE_URL}${product.image}` : `https://res.cloudinary.com/djey7uz4e/image/upload/v1606132924/noImage_plcdvu.jpg`;
  return ` <div class="product-top">
  ${edit}
  <a href="/pdp.html?id=${product.id}">
  <img class="card-img-top img-fluid" src="${image}" alt="${product.alt_text}" loading="lazy">
    <div class="overlay btn-container d-flex justify-content-center align-items-center">
      <button type="button" class="content-btn btn btn-outline-primary">View</button>
    </div>
  </a>
</div>

<div class="product-bottom  pt-3">
  <a href="/pdp.html?id=${product.id}"><h3 class="card-title mb-0">${product.title}</h3></a>
  <div class="feature-info__price d-flex flex-row align-items-center justify-content-between">
    <h5 class=" card-text  mb-0">${price} NOK</h5>
    <i class="feature-icon fav fa ${cssClass}" data-id="${product.id}"></i>
  </div>
</div>`;
};

exports.card = card;
},{"../helpers/getLoggedInUser":"ts/helpers/getLoggedInUser.ts","../helpers/getRoundNumber":"ts/helpers/getRoundNumber.ts","../helpers/getFavsIcon":"ts/helpers/getFavsIcon.ts","../utils/settings":"ts/utils/settings.ts"}],"ts/components/productCard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productCard = void 0;

var _card = require("./card");

const productCard = product => {
  return ` <div class="product-card col-sm-6 col-md-3 mb-5 pb-5 pt-3">
              ${(0, _card.card)(product)}
    </div> `;
};

exports.productCard = productCard;
},{"./card":"ts/components/card.ts"}],"ts/helpers/displayProductCard.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayProductCard = void 0;

var _productCard = require("../components/productCard");

const displayProductCard = (products, container) => {
  products.map(product => container.innerHTML += (0, _productCard.productCard)(product));
};

exports.displayProductCard = displayProductCard;
},{"../components/productCard":"ts/components/productCard.ts"}],"ts/helpers/saveFavourites.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveFavourites = void 0;

var _loadCurrentItems = require("./loadCurrentItems");

var _settings = require("../utils/settings");

var _storage = require("../utils/storage");

const saveFavourites = () => {
  const favButtonsNode = document.querySelectorAll(".fav");
  favButtonsNode.forEach(favButton => {
    const handleSaveFavs = e => {
      const id = +e.target.attributes[1].value;
      const {
        classList
      } = e.target;
      classList.toggle("fa-heart-o");
      classList.toggle("fa-heart");
      const products = (0, _storage.getFromSessionStorage)(_settings.allProducts);
      let favsList = (0, _storage.getFromLocal)(_settings.favs);
      const newFav = products.find(item => id === item.id);

      if (!favsList) {
        favsList = [];
        favsList.push(newFav);
        (0, _storage.saveToFavsListStorage)(_settings.favs, favsList);
      } else {
        const inFavsListAlready = favsList.find(item => item.id === id);

        if (!inFavsListAlready) {
          favsList.push(newFav);
          (0, _storage.saveToFavsListStorage)(_settings.favs, favsList);
          return;
        }

        const filteredFavs = favsList.filter(item => +item.id !== +newFav.id);
        (0, _storage.saveToFavsListStorage)(_settings.favs, filteredFavs);
        return;
      }

      (0, _loadCurrentItems.loadCurrentItems)(_settings.favs, ".favs-icon span");
    };

    favButton.addEventListener("click", handleSaveFavs);
  });
};

exports.saveFavourites = saveFavourites;
},{"./loadCurrentItems":"ts/helpers/loadCurrentItems.ts","../utils/settings":"ts/utils/settings.ts","../utils/storage":"ts/utils/storage.ts"}],"ts/elements/renderAllProducts.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _displayProductCard = require("../helpers/displayProductCard");

var _saveFavourites = require("../helpers/saveFavourites");

const renderAllProducts = (products, msg, container) => {
  const element = document.querySelector(container);
  element.innerHTML = "";

  if (products.length === 0) {
    if (msg) {
      return element.innerHTML = `<div class="alert alert-info" role="alert">${msg}</div>`;
    }

    if (location.pathname === "/fav.html") {
      const msg = "Your favourite list is currently empty.";
      element.innerHTML = `<div class="alert alert-info" role="alert">${msg}</div>`;
    } else {
      return element.innerHTML = `<div class="alert alert-info" role="alert">No items available, please try again later.</div>`;
    }
  }

  (0, _displayProductCard.displayProductCard)(products, element);
  (0, _saveFavourites.saveFavourites)();
};

var _default = renderAllProducts;
exports.default = _default;
},{"../helpers/displayProductCard":"ts/helpers/displayProductCard.ts","../helpers/saveFavourites":"ts/helpers/saveFavourites.ts"}],"ts/elements/spinner.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinner = void 0;

const spinner = (container, css) => {
  const element = document.querySelector(container);
  const cssClass = css ? css : "";
  return element.innerHTML = `
    <div class="spinner-container  main-container ${cssClass} ">
      <div class="d-flex align-items-center justify-content-center">
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-secondary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
`;
};

exports.spinner = spinner;
},{}],"ts/utils/storage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveToFavsListStorage = exports.getFromLocal = exports.getFromSessionStorage = exports.saveToSessionStorage = exports.saveCartItemsToLocal = exports.saveToLocal = void 0;

var _loadCurrentItems = require("../helpers/loadCurrentItems");

var _renderAllProducts = _interopRequireDefault(require("../elements/renderAllProducts"));

var _spinner = require("../elements/spinner");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

exports.saveToLocal = saveToLocal;

const saveCartItemsToLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  (0, _loadCurrentItems.loadCurrentItems)(key, ".cart-icon span");
};

exports.saveCartItemsToLocal = saveCartItemsToLocal;

const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

exports.saveToSessionStorage = saveToSessionStorage;

const getFromSessionStorage = key => {
  const value = sessionStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};

exports.getFromSessionStorage = getFromSessionStorage;

const getFromLocal = key => {
  const value = localStorage.getItem(key);
  return value === null ? null : JSON.parse(value);
};

exports.getFromLocal = getFromLocal;

const saveToFavsListStorage = (tag, list) => {
  saveToLocal(tag, list);
  (0, _loadCurrentItems.loadCurrentItems)(tag, ".favs-icon span");

  if (location.pathname === "/fav.html") {
    (0, _spinner.spinner)(".fav-container");
    setTimeout(() => {
      (0, _renderAllProducts.default)(list, "", ".fav-container");
    }, 500);
  }
};

exports.saveToFavsListStorage = saveToFavsListStorage;
},{"../helpers/loadCurrentItems":"ts/helpers/loadCurrentItems.ts","../elements/renderAllProducts":"ts/elements/renderAllProducts.ts","../elements/spinner":"ts/elements/spinner.ts"}],"ts/ui/logout.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = void 0;

var _settings = require("../utils/settings");

var _renderNavbar = require("../elements/renderNavbar");

const logout = () => {
  const logoutBtn = document.querySelector(".logout");
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem(_settings.user);
    localStorage.removeItem(_settings.userToken);
    location.reload();
    (0, _renderNavbar.renderNavbar)();
  });
};

exports.logout = logout;
},{"../utils/settings":"ts/utils/settings.ts","../elements/renderNavbar":"ts/elements/renderNavbar.ts"}],"../node_modules/lodash-es/isObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var _default = isObject;
exports.default = _default;
},{}],"../node_modules/lodash-es/_freeGlobal.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
var _default = freeGlobal;
exports.default = _default;
},{}],"../node_modules/lodash-es/_root.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _freeGlobal = _interopRequireDefault(require("./_freeGlobal.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = _freeGlobal.default || freeSelf || Function('return this')();
var _default = root;
exports.default = _default;
},{"./_freeGlobal.js":"../node_modules/lodash-es/_freeGlobal.js"}],"../node_modules/lodash-es/now.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _root = _interopRequireDefault(require("./_root.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function () {
  return _root.default.Date.now();
};

var _default = now;
exports.default = _default;
},{"./_root.js":"../node_modules/lodash-es/_root.js"}],"../node_modules/lodash-es/_trimmedEndIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;
/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */

function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}

  return index;
}

var _default = trimmedEndIndex;
exports.default = _default;
},{}],"../node_modules/lodash-es/_baseTrim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _trimmedEndIndex = _interopRequireDefault(require("./_trimmedEndIndex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;
/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */

function baseTrim(string) {
  return string ? string.slice(0, (0, _trimmedEndIndex.default)(string) + 1).replace(reTrimStart, '') : string;
}

var _default = baseTrim;
exports.default = _default;
},{"./_trimmedEndIndex.js":"../node_modules/lodash-es/_trimmedEndIndex.js"}],"../node_modules/lodash-es/_Symbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _root = _interopRequireDefault(require("./_root.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Built-in value references. */
var Symbol = _root.default.Symbol;
var _default = Symbol;
exports.default = _default;
},{"./_root.js":"../node_modules/lodash-es/_root.js"}],"../node_modules/lodash-es/_getRawTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Symbol = _interopRequireDefault(require("./_Symbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used for built-in method references. */
var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = _Symbol.default ? _Symbol.default.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

var _default = getRawTag;
exports.default = _default;
},{"./_Symbol.js":"../node_modules/lodash-es/_Symbol.js"}],"../node_modules/lodash-es/_objectToString.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

var _default = objectToString;
exports.default = _default;
},{}],"../node_modules/lodash-es/_baseGetTag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Symbol = _interopRequireDefault(require("./_Symbol.js"));

var _getRawTag = _interopRequireDefault(require("./_getRawTag.js"));

var _objectToString = _interopRequireDefault(require("./_objectToString.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = _Symbol.default ? _Symbol.default.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? (0, _getRawTag.default)(value) : (0, _objectToString.default)(value);
}

var _default = baseGetTag;
exports.default = _default;
},{"./_Symbol.js":"../node_modules/lodash-es/_Symbol.js","./_getRawTag.js":"../node_modules/lodash-es/_getRawTag.js","./_objectToString.js":"../node_modules/lodash-es/_objectToString.js"}],"../node_modules/lodash-es/isObjectLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var _default = isObjectLike;
exports.default = _default;
},{}],"../node_modules/lodash-es/isSymbol.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseGetTag = _interopRequireDefault(require("./_baseGetTag.js"));

var _isObjectLike = _interopRequireDefault(require("./isObjectLike.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || (0, _isObjectLike.default)(value) && (0, _baseGetTag.default)(value) == symbolTag;
}

var _default = isSymbol;
exports.default = _default;
},{"./_baseGetTag.js":"../node_modules/lodash-es/_baseGetTag.js","./isObjectLike.js":"../node_modules/lodash-es/isObjectLike.js"}],"../node_modules/lodash-es/toNumber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _baseTrim = _interopRequireDefault(require("./_baseTrim.js"));

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _isSymbol = _interopRequireDefault(require("./isSymbol.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;
/** Used to detect bad signed hexadecimal string values. */

var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */

var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */

var reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */

var freeParseInt = parseInt;
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */

function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }

  if ((0, _isSymbol.default)(value)) {
    return NAN;
  }

  if ((0, _isObject.default)(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = (0, _isObject.default)(other) ? other + '' : other;
  }

  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }

  value = (0, _baseTrim.default)(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}

var _default = toNumber;
exports.default = _default;
},{"./_baseTrim.js":"../node_modules/lodash-es/_baseTrim.js","./isObject.js":"../node_modules/lodash-es/isObject.js","./isSymbol.js":"../node_modules/lodash-es/isSymbol.js"}],"../node_modules/lodash-es/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isObject = _interopRequireDefault(require("./isObject.js"));

var _now = _interopRequireDefault(require("./now.js"));

var _toNumber = _interopRequireDefault(require("./toNumber.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeMax = Math.max,
    nativeMin = Math.min;
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */

function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }

  wait = (0, _toNumber.default)(wait) || 0;

  if ((0, _isObject.default)(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax((0, _toNumber.default)(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    var time = (0, _now.default)();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge((0, _now.default)());
  }

  function debounced() {
    var time = (0, _now.default)(),
        isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }

    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var _default = debounce;
exports.default = _default;
},{"./isObject.js":"../node_modules/lodash-es/isObject.js","./now.js":"../node_modules/lodash-es/now.js","./toNumber.js":"../node_modules/lodash-es/toNumber.js"}],"ts/ui/renderSearch.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSearch = void 0;

var _settings = require("../utils/settings");

var _storage = require("../utils/storage");

var _renderAllProducts = _interopRequireDefault(require("../elements/renderAllProducts"));

var _debounce = _interopRequireDefault(require("lodash-es/debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getSearchTerm = (products, searchTerm) => {
  if (!products) return;
  const filteredSearch = products.filter(product => {
    return product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
  });

  if (filteredSearch.length > 0) {
    (0, _renderAllProducts.default)(filteredSearch, "Shop is currently empty", ".shop-container");
  } else {
    const msg = `Sorry, we currently don't have ${searchTerm}`;
    (0, _renderAllProducts.default)([], msg, ".shop-container");
  }
};

const renderSearch = () => {
  const products = (0, _storage.getFromSessionStorage)(_settings.allProducts);
  const searchInput = document.querySelector("#search");
  const searchIcon = document.querySelector(".search-icon");
  searchInput.addEventListener("input", e => {
    const searchTerm = e.target.value.trim().toLowerCase();
    const debouncedSearch = (0, _debounce.default)(getSearchTerm, 1000);
    debouncedSearch(products, searchTerm);

    const handleSearch = () => {
      const debouncedSearch = (0, _debounce.default)(getSearchTerm, 1000);
      debouncedSearch(products, searchTerm);
    };

    searchIcon.addEventListener("click", handleSearch);
  });
};

exports.renderSearch = renderSearch;
},{"../utils/settings":"ts/utils/settings.ts","../utils/storage":"ts/utils/storage.ts","../elements/renderAllProducts":"ts/elements/renderAllProducts.ts","lodash-es/debounce":"../node_modules/lodash-es/debounce.js"}],"ts/helpers/showMessage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showMessage = void 0;

const showMessage = (cssClass, msg, element) => {
  const msgContainer = document.querySelector(element);
  return msgContainer.innerHTML = `<div class="alert alert-${cssClass}" role="alert">${msg}</div>`;
};

exports.showMessage = showMessage;
},{}],"ts/helpers/removeMessage.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeMessage = void 0;

const removeMessage = tag => {
  const element = document.querySelector(tag);
  element.innerHTML = "";
};

exports.removeMessage = removeMessage;
},{}],"ts/helpers/fetcData.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fectData = void 0;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

const fectData = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
  try {
    const response = options ? yield fetch(url, options) : yield fetch(url);

    if (!response.ok) {
      throw {
        status: response.status,
        statusText: response.statusText
      };
    }

    return yield response.json();
  } catch (error) {
    console.error(error.statusText);
    return error.statusText;
  }
});

exports.fectData = fectData;
},{}],"ts/ui/login.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = void 0;

var _settings = require("../utils/settings");

var _storage = require("../utils/storage");

var _showMessage = require("../helpers/showMessage");

var _removeMessage = require("../helpers/removeMessage");

var _renderNavbar = require("../elements/renderNavbar");

var _fetcData = require("../helpers/fetcData");

const login = () => {
  const loginBtn = document.querySelector(".loginBtn");

  const handleLogin = e => {
    e.preventDefault();
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue.length < 2) {
      username.classList.add("is-invalid");
    } else {
      username.classList.remove("is-invalid");
      username.classList.add("is-valid");
    }

    if (passwordValue.length < 8) {
      password.classList.add("is-invalid");
    } else {
      password.classList.remove("is-invalid");
      password.classList.add("is-valid");
    }

    if (usernameValue.length > 2 && passwordValue.length > 7) {
      const authUser = (username, password) => {
        (0, _removeMessage.removeMessage)(".message-container");
        const URL = `${_settings.BASE_URL}/auth/local`;
        const usernameValue = username.value.trim();
        const passwordValue = password.value.trim();
        const data = {
          identifier: usernameValue,
          password: passwordValue
        };
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };
        const formSpinner = document.querySelector(".form-group-spinner");
        const formGroupGontainer = document.querySelector(".form-group-container");
        formSpinner.classList.add("hide-spinner");
        formGroupGontainer.classList.add("hide-form");
        (0, _fetcData.fectData)(URL, options).then(userData => {
          if (!userData || typeof userData === "string") {
            const msg = "Invalid username or password";
            (0, _showMessage.showMessage)("danger", msg, ".message-container");
            formSpinner.classList.remove("hide-spinner");
            formGroupGontainer.classList.remove("hide-form");
            username.classList.add("is-invalid");
            password.classList.add("is-invalid");
            document.querySelector(".feedback-password").innerHTML = "";
            document.querySelector(".feedback-username").innerHTML = "";
            return;
          }

          (0, _storage.saveToLocal)(_settings.user, userData.user);
          (0, _storage.saveToLocal)(_settings.userToken, userData.jwt);
          const modal = document.querySelector(".modal");
          modal.classList.remove("show");
          modal.classList.add("hide");
          location.reload();
          (0, _renderNavbar.renderNavbar)();
        });
      };

      authUser(username, password);
    }
  };

  loginBtn.addEventListener("click", handleLogin);
};

exports.login = login;
},{"../utils/settings":"ts/utils/settings.ts","../utils/storage":"ts/utils/storage.ts","../helpers/showMessage":"ts/helpers/showMessage.ts","../helpers/removeMessage":"ts/helpers/removeMessage.ts","../elements/renderNavbar":"ts/elements/renderNavbar.ts","../helpers/fetcData":"ts/helpers/fetcData.ts"}],"ts/helpers/emailValidator.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmail = void 0;

const validateEmail = email => {
  const reqex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reqex.test(email);
};

exports.validateEmail = validateEmail;
},{}],"ts/helpers/isValidImageUrl.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImageUrlValid = void 0;

const isImageUrlValid = url => {
  const regEx = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
  return regEx.test(url);
};

exports.isImageUrlValid = isImageUrlValid;
},{}],"ts/helpers/validateFields.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeValidationStyle = exports.validateFields = void 0;

var _showMessage = require("./showMessage");

var _removeMessage = require("./removeMessage");

var _isValidImageUrl = require("./isValidImageUrl");

const validateFields = element => {
  (0, _removeMessage.removeMessage)("#msg");
  const inputs = document.querySelectorAll(element);
  const inputsArr = [...inputs];
  let isValid = true;

  for (let i = 0; i < inputsArr.length; i++) {
    if (inputsArr[i].value.length === 0) {
      inputsArr[i].classList.add("is-invalid");
      isValid = false;
    } else if (inputsArr[i].type === "url" && inputsArr[i].value.length > 0 && !(0, _isValidImageUrl.isImageUrlValid)(inputsArr[i].value)) {
      document.querySelector(".img-feedback").innerHTML = "Invalid url";
      inputsArr[i].classList.add("is-invalid");
      isValid = false;
    } else if (inputsArr[i].name === "price" && isNaN(+inputsArr[i].value)) {
      document.querySelector(".price-feedback").innerHTML = "Price must a digit";
      inputsArr[i].classList.add("is-invalid");
      isValid = false;
    } else {
      inputsArr[i].classList.remove("is-invalid");
      inputsArr[i].classList.add("is-valid");
    }
  }

  if (isValid === false) {
    const msg = "Check for missing values or incorrect values";
    (0, _showMessage.showMessage)("danger", msg, "#msg");
    return;
  }

  return isValid;
};

exports.validateFields = validateFields;

const removeValidationStyle = element => {
  const inputs = document.querySelectorAll(element);
  const inputsArr = [...inputs];

  for (let i = 0; i < inputsArr.length; i++) {
    inputsArr[i].classList.remove("is-invalid");
    inputsArr[i].classList.remove("is-valid");
  }
};

exports.removeValidationStyle = removeValidationStyle;
},{"./showMessage":"ts/helpers/showMessage.ts","./removeMessage":"ts/helpers/removeMessage.ts","./isValidImageUrl":"ts/helpers/isValidImageUrl.ts"}],"ts/helpers/registerValidation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmailIput = exports.validateUserAndPasswordInput = void 0;

var _emailValidator = require("./emailValidator");

const validateUserAndPasswordInput = (fieldValue, field, n) => {
  if (fieldValue.length < n) {
    field.classList.add("is-invalid");
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
};

exports.validateUserAndPasswordInput = validateUserAndPasswordInput;

const validateEmailIput = (fieldValue, field) => {
  if (!(0, _emailValidator.validateEmail)(fieldValue)) {
    field.classList.add("is-invalid");
  } else {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
  }
};

exports.validateEmailIput = validateEmailIput;
},{"./emailValidator":"ts/helpers/emailValidator.ts"}],"ts/ui/register.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var _settings = require("../utils/settings");

var _showMessage = require("../helpers/showMessage");

var _removeMessage = require("../helpers/removeMessage");

var _emailValidator = require("../helpers/emailValidator");

var _fetcData = require("../helpers/fetcData");

var _validateFields = require("../helpers/validateFields");

var _registerValidation = require("../helpers/registerValidation");

const register = () => {
  const registerBtn = document.querySelector(".registerBtn");

  const handleLogin = e => {
    e.preventDefault();
    const registerForm = document.querySelector(".register-form");
    const formSpinner = registerForm.querySelector(".form-group-spinner");
    const formGroupGontainer = registerForm.querySelector(".form-group-container");
    const username = document.querySelector("#registerUsername");
    const password = document.querySelector("#registerPassword");
    const email = document.querySelector("#registerEmail");
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    const emailValue = email.value.trim();
    (0, _registerValidation.validateUserAndPasswordInput)(usernameValue, username, 2);
    (0, _registerValidation.validateEmailIput)(emailValue, email);
    (0, _registerValidation.validateUserAndPasswordInput)(passwordValue, password, 8);
    if (usernameValue.length < 2 || passwordValue.length < 8 || !(0, _emailValidator.validateEmail)(emailValue)) return;

    const registerNewUser = user => {
      (0, _removeMessage.removeMessage)(".register-form .message-container");
      const URL = `${_settings.BASE_URL}/auth/local/register`;
      const data = {
        username: user.usernameValue,
        email: user.emailValue,
        password: user.passwordValue
      };
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      formSpinner.classList.add("hide-spinner");
      formGroupGontainer.classList.add("hide-form");
      (0, _fetcData.fectData)(URL, options).then(userData => {
        if (!userData || typeof userData === "string") {
          const msg = "username or email already exist";
          (0, _showMessage.showMessage)("danger", msg, ".register-form .message-container");
          formSpinner.classList.remove("hide-spinner");
          formGroupGontainer.classList.remove("hide-form");
          username.classList.add("is-invalid");
          email.classList.add("is-invalid");
          registerForm.querySelector(".feedback-username").innerHTML = "";
          registerForm.querySelector(".feedback-email").innerHTML = "";
          registerForm.querySelector(".feedback-password").innerHTML = "";
          return;
        }

        formSpinner.classList.remove("hide-spinner");
        formGroupGontainer.classList.remove("hide-form");
        (0, _validateFields.removeValidationStyle)(".register-form .form-control");
        registerForm.reset();
        const msg = `You have now created an account with the username: "${userData.user.username}" and email:"${userData.user.email}". You can now login.`;
        (0, _showMessage.showMessage)("success", msg, ".register-form .message-container");
      });
    };

    const newUser = {
      usernameValue,
      emailValue,
      passwordValue
    };
    registerNewUser(newUser);
  };

  registerBtn.addEventListener("click", handleLogin);
};

exports.register = register;
},{"../utils/settings":"ts/utils/settings.ts","../helpers/showMessage":"ts/helpers/showMessage.ts","../helpers/removeMessage":"ts/helpers/removeMessage.ts","../helpers/emailValidator":"ts/helpers/emailValidator.ts","../helpers/fetcData":"ts/helpers/fetcData.ts","../helpers/validateFields":"ts/helpers/validateFields.ts","../helpers/registerValidation":"ts/helpers/registerValidation.ts"}],"ts/ui/showNavbarBgOnScroll.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showNavbarBgOnScroll = void 0;

const addNavbarBG = () => {
  const navbarHome = document.querySelector(".home");
  const navbarContainer = document.querySelector(".container-fluid-navbar");

  if (location.pathname === "/" || location.pathname === "/index.html") {
    if (window.scrollY > 15) {
      navbarHome.classList.add("custom-bg");
      return navbarHome.style.boxShadow = "rgba(7, 7, 7, 0.8) 2px 2px 13px 0px";
    }

    navbarHome.classList.remove("custom-bg");
    return navbarHome.style.boxShadow = "";
  }

  if (navbarContainer) {
    if (window.scrollY > 15) {
      navbarContainer.style.boxShadow = "rgba(198, 212, 219, 0.86) 2px 2px 13px 0px";
      return navbarContainer.style.backgroundColor = "#edf6f9";
    }

    navbarContainer.style.boxShadow = "";
    navbarContainer.style.backgroundColor = "transparent";
  }
};

const showNavbarBgOnScroll = () => {
  if (window.scrollY > 15) {
    addNavbarBG();
  }

  const getWindowScrollY = () => {
    addNavbarBG();
  };

  window.addEventListener("scroll", getWindowScrollY);
};

exports.showNavbarBgOnScroll = showNavbarBgOnScroll;
},{}],"ts/elements/renderNavbar.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderNavbar = void 0;

var _settings = require("../utils/settings");

var _logout = require("../ui/logout");

var _renderSearch = require("../ui/renderSearch");

var _loadCurrentItems = require("../helpers/loadCurrentItems");

var _login = require("../ui/login");

var _register = require("../ui/register");

var _showNavbarBgOnScroll = require("../ui/showNavbarBgOnScroll");

var _getLoggedInUser = require("../helpers/getLoggedInUser");

const renderNavbar = () => {
  (0, _showNavbarBgOnScroll.showNavbarBgOnScroll)();
  const innerNav = document.querySelector(".custom-nav");
  const user = (0, _getLoggedInUser.getLoggedInUser)();
  const {
    pathname
  } = location;
  let authLink = `
    <li class="nav-item">
     <a class="nav-link" href="#" data-toggle="modal" data-target="#login">
      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
      </svg>
     </a>
    </li>
    `;

  if (user) {
    if (user.username === "admin") {
      authLink = `
        <li class="nav-item ${pathname === "/add.html" ? "active" : ""}">
          <a class="nav-link" href="./add.html">Add</a>
        </li>
        <li class="nav-item">
          <a  class="nav-link logout" href="#"py-2 px-2">Logout</a>
        </li>
        <li class="nav-item">
        <a  class="nav-link custom-greeting" href="#" py-2 px-2">Hi ${user.username}</a>
        </li>
        `;
    } else {
      authLink = `
        <li class="nav-item">
          <a  class="nav-link logout" href="#"py-2 px-2">Logout</a>
        </li>
        <li class="nav-item">
        <a  class="nav-link custom-greeting" href="#" py-2 px-2">Hi ${user.username}</a>
        </li>
        `;
    }

    window.addEventListener("DOMContentLoaded", event => {
      (0, _logout.logout)();
    });
  }

  window.addEventListener("DOMContentLoaded", event => {
    (0, _register.register)();
    (0, _login.login)();
    (0, _loadCurrentItems.loadCurrentItems)(_settings.cart, ".cart-icon span");
    (0, _loadCurrentItems.loadCurrentItems)(_settings.favs, ".favs-icon span");
  });
  let searchbar = "";

  if (pathname === "/shop.html") {
    searchbar = `
      <li class="nav-item search-box mx-0 pb-4 pb-lg-0 w-75">
        <div class="search ">
          <input class="form-control" type="search"  id="search" placeholder="Search" aria-label="Search">
            <svg class="search-icon" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
            <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
            </svg>
        </div>
      </li>`;
    document.addEventListener("DOMContentLoaded", () => {
      (0, _renderSearch.renderSearch)();
    });
  }

  (0, _showNavbarBgOnScroll.showNavbarBgOnScroll)();
  return innerNav.innerHTML = `
      <div class="collapse navbar-collapse inner-navbar flex-grow-1 justify-content-md-between pt-5 pt-lg-0" id="navbarSupportedContent">
      <ul class="navbar-nav nav-center justify-content-center mr-auto align-items-baseline">
        <li class="nav-item ${pathname === "/" || pathname === "/index.html" ? "active" : ""}">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item  ${pathname === "/shop.html" ? "active" : ""}">
          <a class="nav-link" href="./shop.html">Shop</a>
        </li>
       ${authLink}
      </ul>
    </div>
    <div class="collapse navbar-collapse inner-navbar flex-grow-1 justify-content-md-between pb-5 pb-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav nav-left mr-auto mx-lg-0 ml-lg-auto flex-column flex-lg-row justify-content-between align-items-center">
        ${searchbar}
          <div class="d-flex flex-md-row">
          <li class="nav-item favs-icon px-2 px-lg-0">
          <a class="nav-link icon" href="./fav.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg><span class="counter">0</span></a>
          </li>
          <li class="nav-item cart-icon px-2 px-lg-0">
          <a class="nav-link icon"  href="./cart.html"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"/>
        </svg><span class="counter">0</span></a>
          </li>
          </div>
        </ul>
     </div>
      `;
};

exports.renderNavbar = renderNavbar;
},{"../utils/settings":"ts/utils/settings.ts","../ui/logout":"ts/ui/logout.ts","../ui/renderSearch":"ts/ui/renderSearch.ts","../helpers/loadCurrentItems":"ts/helpers/loadCurrentItems.ts","../ui/login":"ts/ui/login.ts","../ui/register":"ts/ui/register.ts","../ui/showNavbarBgOnScroll":"ts/ui/showNavbarBgOnScroll.ts","../helpers/getLoggedInUser":"ts/helpers/getLoggedInUser.ts"}],"ts/category.ts":[function(require,module,exports) {
"use strict";

var _storage = require("./utils/storage");

var _settings = require("./utils/settings");

var _renderAllProducts = _interopRequireDefault(require("./elements/renderAllProducts"));

var _renderNavbar = require("./elements/renderNavbar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _renderNavbar.renderNavbar)();
const queryString = window.location.search;
const urlParam = new URLSearchParams(queryString);
const category = urlParam.get("category");
const title = document.querySelector(".header");

if (typeof category === "string") {
  title.innerHTML = category;
  document.title = category;
  const breadcrumb = document.querySelector(".breadcrumb");
  breadcrumb.innerHTML += `<li class="breadcrumb-item active" aria-current="page">${category}</li>`;
}

const currentProducts = (0, _storage.getFromSessionStorage)(_settings.allProducts);
const categoryToDisplay = currentProducts.filter(product => {
  if (category) {
    return product.category.toLowerCase() === category.toLowerCase();
  }
});
(0, _renderAllProducts.default)(categoryToDisplay, "No categories available currently", ".category-container");
},{"./utils/storage":"ts/utils/storage.ts","./utils/settings":"ts/utils/settings.ts","./elements/renderAllProducts":"ts/elements/renderAllProducts.ts","./elements/renderNavbar":"ts/elements/renderNavbar.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54537" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ts/category.ts"], null)
//# sourceMappingURL=/category.5959c14c.js.map