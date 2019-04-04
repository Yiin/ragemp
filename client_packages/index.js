/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 88);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var getOwnPropertyDescriptor = __webpack_require__(18).f;
var hide = __webpack_require__(19);
var redefine = __webpack_require__(25);
var setGlobal = __webpack_require__(38);
var copyConstructorProperties = __webpack_require__(93);
var isForced = __webpack_require__(65);

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      hide(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.NAMED_TAG = "named";
exports.NAME_TAG = "name";
exports.UNMANAGED_TAG = "unmanaged";
exports.OPTIONAL_TAG = "optional";
exports.INJECT_TAG = "inject";
exports.MULTI_INJECT_TAG = "multi_inject";
exports.TAGGED = "inversify:tagged";
exports.TAGGED_PROP = "inversify:tagged_props";
exports.PARAM_TYPES = "inversify:paramtypes";
exports.DESIGN_PARAM_TYPES = "design:paramtypes";
exports.POST_CONSTRUCT = "post_construct";


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window == 'object' && window && window.Math == Math ? window
  : typeof self == 'object' && self && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DUPLICATED_INJECTABLE_DECORATOR = "Cannot apply @injectable decorator multiple times.";
exports.DUPLICATED_METADATA = "Metadata key was used more than once in a parameter:";
exports.NULL_ARGUMENT = "NULL argument";
exports.KEY_NOT_FOUND = "Key Not Found";
exports.AMBIGUOUS_MATCH = "Ambiguous match found for serviceIdentifier:";
exports.CANNOT_UNBIND = "Could not unbind serviceIdentifier:";
exports.NOT_REGISTERED = "No matching bindings found for serviceIdentifier:";
exports.MISSING_INJECTABLE_ANNOTATION = "Missing required @injectable annotation in:";
exports.MISSING_INJECT_ANNOTATION = "Missing required @inject or @multiInject annotation in:";
exports.UNDEFINED_INJECT_ANNOTATION = function (name) {
    return "@inject called with undefined this could mean that the class " + name + " has " +
        "a circular dependency problem. You can use a LazyServiceIdentifer to  " +
        "overcome this limitation.";
};
exports.CIRCULAR_DEPENDENCY = "Circular dependency found:";
exports.NOT_IMPLEMENTED = "Sorry, this feature is not fully implemented yet.";
exports.INVALID_BINDING_TYPE = "Invalid binding type:";
exports.NO_MORE_SNAPSHOTS_AVAILABLE = "No snapshot available to restore.";
exports.INVALID_MIDDLEWARE_RETURN = "Invalid return type in middleware. Middleware must return!";
exports.INVALID_FUNCTION_BINDING = "Value provided to function binding must be a function!";
exports.INVALID_TO_SELF_VALUE = "The toSelf function can only be applied when a constructor is " +
    "used as service identifier";
exports.INVALID_DECORATOR_OPERATION = "The @inject @multiInject @tagged and @named decorators " +
    "must be applied to the parameters of a class constructor or a class property.";
exports.ARGUMENTS_LENGTH_MISMATCH = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "The number of constructor arguments in the derived class " +
        (values[0] + " must be >= than the number of constructor arguments of its base class.");
};
exports.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT = "Invalid Container constructor argument. Container options " +
    "must be an object.";
exports.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE = "Invalid Container option. Default scope must " +
    "be a string ('singleton' or 'transient').";
exports.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE = "Invalid Container option. Auto bind injectable must " +
    "be a boolean";
exports.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK = "Invalid Container option. Skip base check must " +
    "be a boolean";
exports.MULTIPLE_POST_CONSTRUCT_METHODS = "Cannot apply @postConstruct decorator multiple times in the same class";
exports.POST_CONSTRUCT_ERROR = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "@postConstruct error in class " + values[0] + ": " + values[1];
};
exports.CIRCULAR_DEPENDENCY_IN_FACTORY = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return "It looks like there is a circular dependency " +
        ("in one of the '" + values[0] + "' bindings. Please investigate bindings with") +
        ("service identifier '" + values[1] + "'.");
};
exports.STACK_OVERFLOW = "Maximum call stack size exceeded";


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var Metadata = (function () {
    function Metadata(key, value) {
        this.key = key;
        this.value = value;
    }
    Metadata.prototype.toString = function () {
        if (this.key === METADATA_KEY.NAMED_TAG) {
            return "named: " + this.value.toString() + " ";
        }
        else {
            return "tagged: { key:" + this.key.toString() + ", value: " + this.value + " }";
        }
    };
    return Metadata;
}());
exports.Metadata = Metadata;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(58);
var anObject = __webpack_require__(0);
var toPrimitive = __webpack_require__(37);
var nativeDefineProperty = Object.defineProperty;

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(115);
var WeakMap = __webpack_require__(126);
var shared = __webpack_require__(21)('metadata');
var store = shared.store || (shared.store = new WeakMap());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};

var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};

var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};

var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};

var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};

var toMetadataKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};

module.exports = {
  store: store,
  getMap: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  toKey: toMetadataKey
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(21)('wks');
var uid = __webpack_require__(41);
var Symbol = __webpack_require__(3).Symbol;
var NATIVE_SYMBOL = __webpack_require__(117);

module.exports = function (name) {
  return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name]
    || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingScopeEnum = {
    Request: "Request",
    Singleton: "Singleton",
    Transient: "Transient"
};
exports.BindingScopeEnum = BindingScopeEnum;
var BindingTypeEnum = {
    ConstantValue: "ConstantValue",
    Constructor: "Constructor",
    DynamicValue: "DynamicValue",
    Factory: "Factory",
    Function: "Function",
    Instance: "Instance",
    Invalid: "Invalid",
    Provider: "Provider"
};
exports.BindingTypeEnum = BindingTypeEnum;
var TargetTypeEnum = {
    ClassProperty: "ClassProperty",
    ConstructorArgument: "ConstructorArgument",
    Variable: "Variable"
};
exports.TargetTypeEnum = TargetTypeEnum;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(6);
var toObject = __webpack_require__(66);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(67);
var ObjectPrototype = Object.prototype;

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
var METADATA_KEY = __webpack_require__(2);
function tagParameter(annotationTarget, propertyName, parameterIndex, metadata) {
    var metadataKey = METADATA_KEY.TAGGED;
    _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex);
}
exports.tagParameter = tagParameter;
function tagProperty(annotationTarget, propertyName, metadata) {
    var metadataKey = METADATA_KEY.TAGGED_PROP;
    _tagParameterOrProperty(metadataKey, annotationTarget.constructor, propertyName, metadata);
}
exports.tagProperty = tagProperty;
function _tagParameterOrProperty(metadataKey, annotationTarget, propertyName, metadata, parameterIndex) {
    var paramsOrPropertiesMetadata = {};
    var isParameterDecorator = (typeof parameterIndex === "number");
    var key = (parameterIndex !== undefined && isParameterDecorator) ? parameterIndex.toString() : propertyName;
    if (isParameterDecorator && propertyName !== undefined) {
        throw new Error(ERROR_MSGS.INVALID_DECORATOR_OPERATION);
    }
    if (Reflect.hasOwnMetadata(metadataKey, annotationTarget)) {
        paramsOrPropertiesMetadata = Reflect.getMetadata(metadataKey, annotationTarget);
    }
    var paramOrPropertyMetadata = paramsOrPropertiesMetadata[key];
    if (!Array.isArray(paramOrPropertyMetadata)) {
        paramOrPropertyMetadata = [];
    }
    else {
        for (var _i = 0, paramOrPropertyMetadata_1 = paramOrPropertyMetadata; _i < paramOrPropertyMetadata_1.length; _i++) {
            var m = paramOrPropertyMetadata_1[_i];
            if (m.key === metadata.key) {
                throw new Error(ERROR_MSGS.DUPLICATED_METADATA + " " + m.key.toString());
            }
        }
    }
    paramOrPropertyMetadata.push(metadata);
    paramsOrPropertiesMetadata[key] = paramOrPropertyMetadata;
    Reflect.defineMetadata(metadataKey, paramsOrPropertiesMetadata, annotationTarget);
}
function _decorate(decorators, target) {
    Reflect.decorate(decorators, target);
}
function _param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); };
}
function decorate(decorator, target, parameterIndex) {
    if (typeof parameterIndex === "number") {
        _decorate([_param(parameterIndex, decorator)], target);
    }
    else if (typeof parameterIndex === "string") {
        Reflect.decorate([decorator], target, parameterIndex);
    }
    else {
        _decorate([decorator], target);
    }
}
exports.decorate = decorate;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: register, unregister, call, callServer, callClient, callBrowsers, callBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unregister", function() { return unregister; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "call", function() { return call; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callServer", function() { return callServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callClient", function() { return callClient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callBrowsers", function() { return callBrowsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "callBrowser", function() { return callBrowser; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/util.ts");

const environment = _util__WEBPACK_IMPORTED_MODULE_0__["getEnvironment"]();
if (!environment) throw 'Unknown RAGE environment';
const ERR_NOT_FOUND = 'PROCEDURE_NOT_FOUND';
const IDENTIFIER = '__rpc:id';
const PROCESS_EVENT = '__rpc:process';
const BROWSER_REGISTER = '__rpc:browserRegister';
const BROWSER_UNREGISTER = '__rpc:browserUnregister';
const glob = environment === "cef" ? window : global;

if (!glob[PROCESS_EVENT]) {
  glob.__rpcListeners = {};
  glob.__rpcPending = {};

  glob[PROCESS_EVENT] = (player, rawData) => {
    if (environment !== "server") rawData = player;
    const data = _util__WEBPACK_IMPORTED_MODULE_0__["parseData"](rawData);

    if (data.req) {
      // someone is trying to remotely call a procedure
      const info = {
        id: data.id,
        environment: data.fenv || data.env
      };
      if (environment === "server") info.player = player;
      const part = {
        ret: 1,
        id: data.id,
        env: environment
      };
      let ret;

      switch (environment) {
        case "server":
          ret = ev => info.player.call(PROCESS_EVENT, [_util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](ev)]);

          break;

        case "client":
          {
            if (data.env === "server") {
              ret = ev => mp.events.callRemote(PROCESS_EVENT, _util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](ev));
            } else if (data.env === "cef") {
              const browser = data.b && glob.__rpcBrowsers[data.b];
              info.browser = browser;

              ret = ev => browser && _util__WEBPACK_IMPORTED_MODULE_0__["isBrowserValid"](browser) && passEventToBrowser(browser, ev, true);
            }

            break;
          }

        case "cef":
          {
            ret = ev => mp.trigger(PROCESS_EVENT, _util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](ev));
          }
      }

      if (ret) callProcedure(data.name, data.args, info).then(res => ret({ ...part,
        res
      })).catch(err => ret({ ...part,
        err
      }));
    } else if (data.ret) {
      // a previously called remote procedure has returned
      const info = glob.__rpcPending[data.id];
      if (environment === "server" && info.player !== player) return;

      if (info) {
        info.resolve(data.err ? _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"](data.err) : _util__WEBPACK_IMPORTED_MODULE_0__["promiseResolve"](data.res));
        delete glob.__rpcPending[data.id];
      }
    }
  };

  if (environment !== "cef") {
    mp.events.add(PROCESS_EVENT, glob[PROCESS_EVENT]);

    if (environment === "client") {
      // set up internal pass-through events
      register('__rpc:callServer', ([name, args], info) => _callServer(name, args, {
        fenv: info.environment
      }));
      register('__rpc:callBrowsers', ([name, args], info) => _callBrowsers(null, name, args, {
        fenv: info.environment
      })); // set up browser identifiers

      glob.__rpcBrowsers = {};

      const initBrowser = browser => {
        const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
        Object.keys(glob.__rpcBrowsers).forEach(key => {
          const b = glob.__rpcBrowsers[key];
          if (!b || !_util__WEBPACK_IMPORTED_MODULE_0__["isBrowserValid"](b) || b === browser) delete glob.__rpcBrowsers[key];
        });
        glob.__rpcBrowsers[id] = browser;
        browser.execute(`if(typeof window['${IDENTIFIER}'] === 'undefined'){ window['${IDENTIFIER}'] = Promise.resolve('${id}'); }else{ window['${IDENTIFIER}:resolve']('${id}'); }`);
      };

      mp.browsers.forEach(initBrowser);
      mp.events.add('browserCreated', initBrowser); // set up browser registration map

      glob.__rpcBrowserProcedures = {};
      mp.events.add(BROWSER_REGISTER, data => {
        const [browserId, name] = JSON.parse(data);
        glob.__rpcBrowserProcedures[name] = browserId;
      });
      mp.events.add(BROWSER_UNREGISTER, data => {
        const [browserId, name] = JSON.parse(data);
        if (glob.__rpcBrowserProcedures[name] === browserId) delete glob.__rpcBrowserProcedures[name];
      });
    }
  } else {
    if (typeof glob[IDENTIFIER] === 'undefined') {
      glob[IDENTIFIER] = new Promise(resolve => {
        glob[IDENTIFIER + ':resolve'] = resolve;
      });
    }
  }
}

function passEventToBrowser(browser, data, ignoreNotFound) {
  const raw = _util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](data);
  browser.execute(`var process = window["${PROCESS_EVENT}"]; if(process){ process(${JSON.stringify(raw)}); }else{ ${ignoreNotFound ? '' : `mp.trigger("${PROCESS_EVENT}", '{"ret":1,"id":"${data.id}","err":"${ERR_NOT_FOUND}","env":"cef"}');`} }`);
}

function callProcedure(name, args, info) {
  const listener = glob.__rpcListeners[name];
  if (!listener) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"](ERR_NOT_FOUND);
  return _util__WEBPACK_IMPORTED_MODULE_0__["promiseResolve"](listener(args, info));
}
/**
 * Register a procedure.
 * @param {string} name - The name of the procedure.
 * @param {function} cb - The procedure's callback. The return value will be sent back to the caller.
 */


function register(name, cb) {
  if (arguments.length !== 2) throw 'register expects 2 arguments: "name" and "cb"';
  if (environment === "cef") glob[IDENTIFIER].then(id => mp.trigger(BROWSER_REGISTER, JSON.stringify([id, name])));
  glob.__rpcListeners[name] = cb;
}
/**
 * Unregister a procedure.
 * @param {string} name - The name of the procedure.
 */

function unregister(name) {
  if (arguments.length !== 1) throw 'unregister expects 1 argument: "name"';
  if (environment === "cef") glob[IDENTIFIER].then(id => mp.trigger(BROWSER_UNREGISTER, JSON.stringify([id, name])));
  glob.__rpcListeners[name] = undefined;
}
/**
 * Calls a local procedure. Only procedures registered in the same context will be resolved.
 *
 * Can be called from any environment.
 *
 * @param name - The name of the locally registered procedure.
 * @param args - Any parameters for the procedure.
 * @returns The result from the procedure.
 */

function call(name, args) {
  if (arguments.length !== 1 && arguments.length !== 2) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('call expects 1 or 2 arguments: "name" and optional "args"');
  return callProcedure(name, args, {
    environment
  });
}

function _callServer(name, args, extraData = {}) {
  switch (environment) {
    case "server":
      {
        return call(name, args);
      }

    case "client":
      {
        const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
        return new Promise(resolve => {
          glob.__rpcPending[id] = {
            resolve
          };
          const event = {
            req: 1,
            id,
            name,
            env: environment,
            args,
            ...extraData
          };
          mp.events.callRemote(PROCESS_EVENT, _util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](event));
        });
      }

    case "cef":
      {
        return callClient('__rpc:callServer', [name, args]);
      }
  }
}
/**
 * Calls a remote procedure registered on the server.
 *
 * Can be called from any environment.
 *
 * @param name - The name of the registered procedure.
 * @param args - Any parameters for the procedure.
 * @returns The result from the procedure.
 */


function callServer(name, args) {
  if (arguments.length !== 1 && arguments.length !== 2) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callServer expects 1 or 2 arguments: "name" and optional "args"');
  return _callServer(name, args, {});
}
/**
 * Calls a remote procedure registered on the client.
 *
 * Can be called from any environment.
 *
 * @param player - The player to call the procedure on.
 * @param name - The name of the registered procedure.
 * @param args - Any parameters for the procedure.
 * @returns The result from the procedure.
 */

function callClient(player, name, args) {
  switch (environment) {
    case "client":
      {
        args = name;
        name = player;
        if (arguments.length !== 1 && arguments.length !== 2 || typeof name !== "string") return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callClient from the client expects 1 or 2 arguments: "name" and optional "args"');
        return call(name, args);
      }

    case "server":
      {
        if (arguments.length !== 2 && arguments.length !== 3 || typeof player !== "object") return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"');
        const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
        return new Promise(resolve => {
          glob.__rpcPending[id] = {
            resolve,
            player
          };
          const event = {
            req: 1,
            id,
            name,
            env: environment,
            args
          };
          player.call(PROCESS_EVENT, [_util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](event)]);
        });
      }

    case "cef":
      {
        args = name;
        name = player;
        if (arguments.length !== 1 && arguments.length !== 2 || typeof name !== "string") return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callClient from the browser expects 1 or 2 arguments: "name" and optional "args"');
        const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
        return glob[IDENTIFIER].then(browserId => {
          return new Promise(resolve => {
            glob.__rpcPending[id] = {
              resolve
            };
            const event = {
              b: browserId,
              req: 1,
              id,
              name,
              env: environment,
              args
            };
            mp.trigger(PROCESS_EVENT, _util__WEBPACK_IMPORTED_MODULE_0__["stringifyData"](event));
          });
        });
      }
  }
}

function _callBrowser(id, browser, name, args, extraData = {}) {
  return new Promise(resolve => {
    glob.__rpcPending[id] = {
      resolve
    };
    passEventToBrowser(browser, {
      req: 1,
      id,
      name,
      env: environment,
      args,
      ...extraData
    }, false);
  });
}

function _callBrowsers(player, name, args, extraData = {}) {
  switch (environment) {
    case "client":
      const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
      const browserId = glob.__rpcBrowserProcedures[name];
      if (!browserId) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"](ERR_NOT_FOUND);
      const browser = glob.__rpcBrowsers[browserId];
      if (!browser || !_util__WEBPACK_IMPORTED_MODULE_0__["isBrowserValid"](browser)) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"](ERR_NOT_FOUND);
      return _callBrowser(id, browser, name, args, extraData);

    case "server":
      return callClient(player, '__rpc:callBrowsers', [name, args]);

    case "cef":
      return callClient('__rpc:callBrowsers', [name, args]);
  }
}
/**
 * Calls a remote procedure registered in any browser context.
 *
 * Can be called from any environment.
 *
 * @param player - The player to call the procedure on.
 * @param name - The name of the registered procedure.
 * @param args - Any parameters for the procedure.
 * @returns The result from the procedure.
 */


function callBrowsers(player, name, args) {
  switch (environment) {
    case "client":
    case "cef":
      if (arguments.length !== 1 && arguments.length !== 2) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callBrowsers from the client or browser expects 1 or 2 arguments: "name" and optional "args"');
      return _callBrowsers(null, player, name, {});

    case "server":
      if (arguments.length !== 2 && arguments.length !== 3) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"');
      return _callBrowsers(player, name, args, {});
  }
}
/**
 * Calls a remote procedure registered in a specific browser instance.
 *
 * Client-side environment only.
 *
 * @param browser - The browser instance.
 * @param name - The name of the registered procedure.
 * @param args - Any parameters for the procedure.
 * @returns The result from the procedure.
 */

function callBrowser(browser, name, args) {
  if (environment !== 'client') return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callBrowser can only be used in the client environment');
  if (arguments.length !== 2 && arguments.length !== 3) return _util__WEBPACK_IMPORTED_MODULE_0__["promiseReject"]('callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"');
  const id = _util__WEBPACK_IMPORTED_MODULE_0__["uid"]();
  return _callBrowser(id, browser, name, args, {});
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: uid, getEnvironment, stringifyData, parseData, promiseResolve, promiseReject, isBrowserValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uid", function() { return uid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEnvironment", function() { return getEnvironment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringifyData", function() { return stringifyData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseData", function() { return parseData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseResolve", function() { return promiseResolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "promiseReject", function() { return promiseReject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowserValid", function() { return isBrowserValid; });
var MpTypes;

(function (MpTypes) {
  MpTypes["Blip"] = "b";
  MpTypes["Checkpoint"] = "cp";
  MpTypes["Colshape"] = "c";
  MpTypes["Label"] = "l";
  MpTypes["Marker"] = "m";
  MpTypes["Object"] = "o";
  MpTypes["Pickup"] = "p";
  MpTypes["Player"] = "pl";
  MpTypes["Vehicle"] = "v";
})(MpTypes || (MpTypes = {}));

function isObjectMpType(obj, type) {
  const client = getEnvironment() === 'client';

  if (obj && typeof obj === 'object' && typeof obj.id !== 'undefined') {
    const test = (type, collection, mpType) => client ? obj.type === type && collection.at(obj.id) === obj : obj instanceof mpType;

    switch (type) {
      case MpTypes.Blip:
        return test('blip', mp.blips, mp.Blip);

      case MpTypes.Checkpoint:
        return test('checkpoint', mp.checkpoints, mp.Checkpoint);

      case MpTypes.Colshape:
        return test('colshape', mp.colshapes, mp.Colshape);

      case MpTypes.Label:
        return test('textlabel', mp.labels, mp.TextLabel);

      case MpTypes.Marker:
        return test('marker', mp.markers, mp.Marker);

      case MpTypes.Object:
        return test('object', mp.objects, mp.Object);

      case MpTypes.Pickup:
        return test('pickup', mp.pickups, mp.Pickup);

      case MpTypes.Player:
        return test('player', mp.players, mp.Player);

      case MpTypes.Vehicle:
        return test('vehicle', mp.vehicles, mp.Vehicle);
    }
  }

  return false;
}

function uid() {
  const first = Math.random() * 46656 | 0;
  const second = Math.random() * 46656 | 0;
  const firstPart = ('000' + first.toString(36)).slice(-3);
  const secondPart = ('000' + second.toString(36)).slice(-3);
  return firstPart + secondPart;
}
function getEnvironment() {
  if (mp.joaat) return 'server';else if (mp.game && mp.game.joaat) return 'client';else if (mp.trigger) return 'cef';
}
function stringifyData(data) {
  const env = getEnvironment();
  return JSON.stringify(data, (_, value) => {
    if (env === 'client' || env === 'server' && value && typeof value === 'object') {
      let type;
      if (isObjectMpType(value, MpTypes.Blip)) type = MpTypes.Blip;else if (isObjectMpType(value, MpTypes.Checkpoint)) type = MpTypes.Checkpoint;else if (isObjectMpType(value, MpTypes.Colshape)) type = MpTypes.Colshape;else if (isObjectMpType(value, MpTypes.Marker)) type = MpTypes.Marker;else if (isObjectMpType(value, MpTypes.Object)) type = MpTypes.Object;else if (isObjectMpType(value, MpTypes.Pickup)) type = MpTypes.Pickup;else if (isObjectMpType(value, MpTypes.Player)) type = MpTypes.Player;else if (isObjectMpType(value, MpTypes.Vehicle)) type = MpTypes.Vehicle;
      if (type) return {
        __t: type,
        i: value.remoteId || value.id
      };
    }

    return value;
  });
}
function parseData(data) {
  const env = getEnvironment();
  return JSON.parse(data, (_, value) => {
    if ((env === 'client' || env === 'server') && value && typeof value === 'object' && typeof value['__t'] === 'string' && typeof value.i === 'number' && Object.keys(value).length === 2) {
      const id = value.i;
      const type = value['__t'];
      let collection;

      switch (type) {
        case MpTypes.Blip:
          collection = mp.blips;
          break;

        case MpTypes.Checkpoint:
          collection = mp.checkpoints;
          break;

        case MpTypes.Colshape:
          collection = mp.colshapes;
          break;

        case MpTypes.Label:
          collection = mp.labels;
          break;

        case MpTypes.Marker:
          collection = mp.markers;
          break;

        case MpTypes.Object:
          collection = mp.objects;
          break;

        case MpTypes.Pickup:
          collection = mp.pickups;
          break;

        case MpTypes.Player:
          collection = mp.players;
          break;

        case MpTypes.Vehicle:
          collection = mp.vehicles;
          break;
      }

      if (collection) return collection[env === 'client' ? 'atRemoteId' : 'at'](id);
    }

    return value;
  });
}
function promiseResolve(result) {
  return new Promise(resolve => setTimeout(() => resolve(result), 0));
}
function promiseReject(error) {
  return new Promise((_, reject) => setTimeout(() => reject(error), 0));
}
function isBrowserValid(browser) {
  try {
    browser.url;
  } catch (e) {
    return false;
  }

  return true;
}

/***/ })

/******/ });
});
//# sourceMappingURL=rage-rpc.min.js.map


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var idCounter = 0;
function id() {
    return idCounter++;
}
exports.id = id;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var propertyIsEnumerableModule = __webpack_require__(92);
var createPropertyDescriptor = __webpack_require__(24);
var toIndexedObject = __webpack_require__(35);
var toPrimitive = __webpack_require__(37);
var has = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(58);
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(10);
var createPropertyDescriptor = __webpack_require__(24);

module.exports = __webpack_require__(9) ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(33);
const sentry_1 = __webpack_require__(31);
const container = new inversify_1.Container();
// Create new DI container
exports.containerPromises = [];
exports.bind = () => target => {
    exports.containerPromises.push(new Promise((resolve, reject) => {
        try {
            container.bind(target).to(target)
                .inSingletonScope()
                .onActivation((ctx, service) => {
                resolve();
                return service;
            });
        }
        catch (e) {
            reject();
            sentry_1.captureException(e);
        }
    }));
};
exports.default = container;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var setGlobal = __webpack_require__(38);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.0.0',
  mode: __webpack_require__(39) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
function getServiceIdentifierAsString(serviceIdentifier) {
    if (typeof serviceIdentifier === "function") {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier.name;
    }
    else if (typeof serviceIdentifier === "symbol") {
        return serviceIdentifier.toString();
    }
    else {
        var _serviceIdentifier = serviceIdentifier;
        return _serviceIdentifier;
    }
}
exports.getServiceIdentifierAsString = getServiceIdentifierAsString;
function listRegisteredBindingsForServiceIdentifier(container, serviceIdentifier, getBindings) {
    var registeredBindingsList = "";
    var registeredBindings = getBindings(container, serviceIdentifier);
    if (registeredBindings.length !== 0) {
        registeredBindingsList = "\nRegistered bindings:";
        registeredBindings.forEach(function (binding) {
            var name = "Object";
            if (binding.implementationType !== null) {
                name = getFunctionName(binding.implementationType);
            }
            registeredBindingsList = registeredBindingsList + "\n " + name;
            if (binding.constraint.metaData) {
                registeredBindingsList = registeredBindingsList + " - " + binding.constraint.metaData;
            }
        });
    }
    return registeredBindingsList;
}
exports.listRegisteredBindingsForServiceIdentifier = listRegisteredBindingsForServiceIdentifier;
function alreadyDependencyChain(request, serviceIdentifier) {
    if (request.parentRequest === null) {
        return false;
    }
    else if (request.parentRequest.serviceIdentifier === serviceIdentifier) {
        return true;
    }
    else {
        return alreadyDependencyChain(request.parentRequest, serviceIdentifier);
    }
}
function dependencyChainToString(request) {
    function _createStringArr(req, result) {
        if (result === void 0) { result = []; }
        var serviceIdentifier = getServiceIdentifierAsString(req.serviceIdentifier);
        result.push(serviceIdentifier);
        if (req.parentRequest !== null) {
            return _createStringArr(req.parentRequest, result);
        }
        return result;
    }
    var stringArr = _createStringArr(request);
    return stringArr.reverse().join(" --> ");
}
function circularDependencyToException(request) {
    request.childRequests.forEach(function (childRequest) {
        if (alreadyDependencyChain(childRequest, childRequest.serviceIdentifier)) {
            var services = dependencyChainToString(childRequest);
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY + " " + services);
        }
        else {
            circularDependencyToException(childRequest);
        }
    });
}
exports.circularDependencyToException = circularDependencyToException;
function listMetadataForTarget(serviceIdentifierString, target) {
    if (target.isTagged() || target.isNamed()) {
        var m_1 = "";
        var namedTag = target.getNamedTag();
        var otherTags = target.getCustomTags();
        if (namedTag !== null) {
            m_1 += namedTag.toString() + "\n";
        }
        if (otherTags !== null) {
            otherTags.forEach(function (tag) {
                m_1 += tag.toString() + "\n";
            });
        }
        return " " + serviceIdentifierString + "\n " + serviceIdentifierString + " - " + m_1;
    }
    else {
        return " " + serviceIdentifierString;
    }
}
exports.listMetadataForTarget = listMetadataForTarget;
function getFunctionName(v) {
    if (v.name) {
        return v.name;
    }
    else {
        var name_1 = v.toString();
        var match = name_1.match(/^function\s*([^\s(]+)/);
        return match ? match[1] : "Anonymous function: " + name_1;
    }
}
exports.getFunctionName = getFunctionName;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(19);
var has = __webpack_require__(6);
var setGlobal = __webpack_require__(38);
var nativeFunctionToString = __webpack_require__(60);
var InternalStateModule = __webpack_require__(26);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

__webpack_require__(21)('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else hide(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(61);
var isObject = __webpack_require__(4);
var hide = __webpack_require__(19);
var objectHas = __webpack_require__(6);
var sharedKey = __webpack_require__(40);
var hiddenKeys = __webpack_require__(27);
var WeakMap = __webpack_require__(3).WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    hide(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var METADATA = __webpack_require__(41)('meta');
var FREEZING = __webpack_require__(70);
var isObject = __webpack_require__(4);
var has = __webpack_require__(6);
var defineProperty = __webpack_require__(10).f;
var id = 0;

var isExtensible = Object.isExtensible || function () {
  return true;
};

var setMetadata = function (it) {
  defineProperty(it, METADATA, { value: {
    objectID: 'O' + ++id, // object ID
    weakData: {}          // weak collections IDs
  } });
};

var fastKey = function (it, create) {
  // return a primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMetadata(it);
  // return object ID
  } return it[METADATA].objectID;
};

var getWeakData = function (it, create) {
  if (!has(it, METADATA)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMetadata(it);
  // return the store of weak collections IDs
  } return it[METADATA].weakData;
};

// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
  return it;
};

var meta = module.exports = {
  REQUIRED: false,
  fastKey: fastKey,
  getWeakData: getWeakData,
  onFreeze: onFreeze
};

__webpack_require__(27)[METADATA] = true;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(0);
var isArrayIteratorMethod = __webpack_require__(116);
var toLength = __webpack_require__(42);
var bind = __webpack_require__(47);
var getIteratorMethod = __webpack_require__(118);
var callWithSafeIterationClosing = __webpack_require__(120);
var BREAK = {};

var exports = module.exports = function (iterable, fn, that, ENTRIES, ITERATOR) {
  var boundFunction = bind(fn, that, ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, step;

  if (ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result === BREAK) return BREAK;
      } return;
    }
    iterator = iterFn.call(iterable);
  }

  while (!(step = iterator.next()).done) {
    if (callWithSafeIterationClosing(iterator, boundFunction, step.value, ENTRIES) === BREAK) return BREAK;
  }
};

exports.BREAK = BREAK;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rage_rpc_1 = __webpack_require__(16);
const constants_1 = __webpack_require__(32);
exports.captureException = e => {
    rage_rpc_1.callServer(constants_1.SharedConstants.Sentry.RPC.CAPTURE_EXCEPTION, {
        name: e.name,
        message: e.message,
        stack: e.stack,
    });
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sentry_1 = __webpack_require__(140);
const auth_1 = __webpack_require__(142);
const character_creation_1 = __webpack_require__(145);
const user_1 = __webpack_require__(147);
var SharedConstants;
(function (SharedConstants) {
    SharedConstants.Sentry = sentry_1.SentryConstants;
    SharedConstants.Auth = auth_1.AuthConstants;
    SharedConstants.CharacterCreation = character_creation_1.CharacterCreationConstants;
    SharedConstants.User = user_1.UserConstants;
})(SharedConstants = exports.SharedConstants || (exports.SharedConstants = {}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var keys = __webpack_require__(2);
exports.METADATA_KEY = keys;
var container_1 = __webpack_require__(151);
exports.Container = container_1.Container;
var literal_types_1 = __webpack_require__(13);
exports.BindingScopeEnum = literal_types_1.BindingScopeEnum;
exports.BindingTypeEnum = literal_types_1.BindingTypeEnum;
exports.TargetTypeEnum = literal_types_1.TargetTypeEnum;
var container_module_1 = __webpack_require__(167);
exports.AsyncContainerModule = container_module_1.AsyncContainerModule;
exports.ContainerModule = container_module_1.ContainerModule;
var injectable_1 = __webpack_require__(168);
exports.injectable = injectable_1.injectable;
var tagged_1 = __webpack_require__(169);
exports.tagged = tagged_1.tagged;
var named_1 = __webpack_require__(170);
exports.named = named_1.named;
var inject_1 = __webpack_require__(76);
exports.inject = inject_1.inject;
exports.LazyServiceIdentifer = inject_1.LazyServiceIdentifer;
var optional_1 = __webpack_require__(171);
exports.optional = optional_1.optional;
var unmanaged_1 = __webpack_require__(172);
exports.unmanaged = unmanaged_1.unmanaged;
var multi_inject_1 = __webpack_require__(173);
exports.multiInject = multi_inject_1.multiInject;
var target_name_1 = __webpack_require__(174);
exports.targetName = target_name_1.targetName;
var post_construct_1 = __webpack_require__(175);
exports.postConstruct = post_construct_1.postConstruct;
var metadata_reader_1 = __webpack_require__(74);
exports.MetadataReader = metadata_reader_1.MetadataReader;
var id_1 = __webpack_require__(17);
exports.id = id_1.id;
var decorator_utils_1 = __webpack_require__(15);
exports.decorate = decorator_utils_1.decorate;
var constraint_helpers_1 = __webpack_require__(79);
exports.traverseAncerstors = constraint_helpers_1.traverseAncerstors;
exports.taggedConstraint = constraint_helpers_1.taggedConstraint;
exports.namedConstraint = constraint_helpers_1.namedConstraint;
exports.typeConstraint = constraint_helpers_1.typeConstraint;
var serialization_1 = __webpack_require__(22);
exports.getServiceIdentifierAsString = serialization_1.getServiceIdentifierAsString;
var binding_utils_1 = __webpack_require__(176);
exports.multiBindToService = binding_utils_1.multiBindToService;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class UIManager {
    constructor() {
        this.browsers = Object.create(null);
    }
    show(name) {
        this.hide(name);
        try {
            const indexFile = `package://UserInterface/${name}/index.html`;
            this.browsers[name] = mp.browsers.new(indexFile);
        }
        catch (e) {
            mp.gui.chat.push(`UI '${name}' doesn't exist.`);
        }
    }
    hide(name) {
        if (this.browsers[name]) {
            this.browsers[name].destroy();
        }
        delete this.browsers[name];
    }
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(56);
var requireObjectCoercible = __webpack_require__(57);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),
/* 36 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var hide = __webpack_require__(19);

module.exports = function (key, value) {
  try {
    hide(global, key, value);
  } catch (e) {
    global[key] = value;
  } return value;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(21)('keys');
var uid = __webpack_require__(41);

module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 41 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + postfix).toString(36));
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(64);
var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(0);
var defineProperties = __webpack_require__(99);
var enumBugKeys = __webpack_require__(43);
var html = __webpack_require__(101);
var documentCreateElement = __webpack_require__(59);
var IE_PROTO = __webpack_require__(40)('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () { /* empty */ };

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : defineProperties(result, Properties);
};

__webpack_require__(27)[IE_PROTO] = true;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var validateSetPrototypeOfArguments = __webpack_require__(71);

module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () { // eslint-disable-line
  var correctSetter = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    correctSetter = test instanceof Array;
  } catch (e) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    validateSetPrototypeOfArguments(O, proto);
    if (correctSetter) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var isForced = __webpack_require__(65);
var $export = __webpack_require__(1);
var redefine = __webpack_require__(25);
var InternalMetadataModule = __webpack_require__(28);
var iterate = __webpack_require__(29);
var anInstance = __webpack_require__(48);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(7);
var checkCorrectnessOfIteration = __webpack_require__(121);
var setToStringTag = __webpack_require__(49);
var inheritIfRequired = __webpack_require__(122);

module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY,
      KEY == 'add' ? function add(a) {
        nativeMethod.call(this, a === 0 ? 0 : a);
        return this;
      } : KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : nativeMethod.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : nativeMethod.call(this, a === 0 ? 0 : a);
      } : function set(a, b) {
        nativeMethod.call(this, a === 0 ? 0 : a, b);
        return this;
      }
    );
  };

  // eslint-disable-next-line max-len
  if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule.REQUIRED = true;
  } else if (isForced(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (target, iterable) {
        anInstance(target, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), target, Constructor);
        if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

    // weak collections should not contains .clear method
    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;
  $export({ global: true, forced: Constructor != NativeConstructor }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);

  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

  return Constructor;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(23);

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  } return it;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(10).f;
var has = __webpack_require__(6);
var TO_STRING_TAG = __webpack_require__(12)('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(25);

module.exports = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);
  return target;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_when_syntax_1 = __webpack_require__(52);
var BindingOnSyntax = (function () {
    function BindingOnSyntax(binding) {
        this._binding = binding;
    }
    BindingOnSyntax.prototype.onActivation = function (handler) {
        this._binding.onActivation = handler;
        return new binding_when_syntax_1.BindingWhenSyntax(this._binding);
    };
    return BindingOnSyntax;
}());
exports.BindingOnSyntax = BindingOnSyntax;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(51);
var constraint_helpers_1 = __webpack_require__(79);
var BindingWhenSyntax = (function () {
    function BindingWhenSyntax(binding) {
        this._binding = binding;
    }
    BindingWhenSyntax.prototype.when = function (constraint) {
        this._binding.constraint = constraint;
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetNamed = function (name) {
        this._binding.constraint = constraint_helpers_1.namedConstraint(name);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetIsDefault = function () {
        this._binding.constraint = function (request) {
            var targetIsDefault = (request.target !== null) &&
                (!request.target.isNamed()) &&
                (!request.target.isTagged());
            return targetIsDefault;
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenTargetTagged = function (tag, value) {
        this._binding.constraint = constraint_helpers_1.taggedConstraint(tag)(value);
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenInjectedInto = function (parent) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.typeConstraint(parent)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.namedConstraint(name)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenParentTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.taggedConstraint(tag)(value)(request.parentRequest);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.typeConstraint(ancestor));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorNamed = function (name) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.namedConstraint(name));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint_helpers_1.taggedConstraint(tag)(value));
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    BindingWhenSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        this._binding.constraint = function (request) {
            return !constraint_helpers_1.traverseAncerstors(request, constraint);
        };
        return new binding_on_syntax_1.BindingOnSyntax(this._binding);
    };
    return BindingWhenSyntax;
}());
exports.BindingWhenSyntax = BindingWhenSyntax;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(54);
__webpack_require__(54);
__webpack_require__(54);
const rage_rpc_1 = __webpack_require__(16);
exports.log = (...args) => {
    rage_rpc_1.callServer('log', args);
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ui_1 = __importDefault(__webpack_require__(34));
mp.events.add('ui', name => {
    ui_1.default.show(name);
});
mp.events.add('ped.create', model => {
    const { position, dimension, } = mp.players.local;
    const ped = mp.peds.new(mp.game.joaat(model), position, mp.players.local.getHeading(), () => {
        mp.gui.chat.push(`PED with id ${ped.id} was streamed in`);
    }, dimension);
    mp.gui.chat.push(`Created PED with id ${ped.id}`);
});
mp.events.add('ped.remove', (idToRemove) => {
    const ped = mp.peds.toArray().find(({ id }) => id === +idToRemove);
    if (ped) {
        ped.destroy();
    }
    mp.gui.chat.push(`Removed ped with id ${idToRemove}... probably`);
});
mp.keys.bind(0x71, false, () => {
    const shouldShow = !mp.gui.cursor.visible;
    mp.gui.cursor.show(shouldShow, shouldShow);
});


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = __importDefault(__webpack_require__(20));
const sentry_1 = __webpack_require__(31);
exports.handleEvent = (eventName) => (target, propertyKey) => {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        try {
            const service = container_1.default.get(target.constructor);
            mp.events.add(eventName, (...args) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield service[propertyKey](...args);
                }
                catch (e) {
                    sentry_1.captureException(e);
                }
            }));
        }
        catch (e) {
            sentry_1.captureException(e);
        }
    }), 0);
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var fails = __webpack_require__(7);
var classof = __webpack_require__(36);
var split = ''.split;

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9) && !__webpack_require__(7)(function () {
  return Object.defineProperty(__webpack_require__(59)('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var exist = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return exist ? document.createElement(it) : {};
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21)('native-function-to-string', Function.toString);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var nativeFunctionToString = __webpack_require__(60);
var WeakMap = __webpack_require__(3).WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyNamesModule = __webpack_require__(94);
var getOwnPropertySymbolsModule = __webpack_require__(97);
var anObject = __webpack_require__(0);
var Reflect = __webpack_require__(3).Reflect;

// all object keys, includes non-enumerable and symbols
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var toIndexedObject = __webpack_require__(35);
var arrayIndexOf = __webpack_require__(95)(false);
var hiddenKeys = __webpack_require__(27);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 64 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(7);
var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(57);

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7)(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(69);
var global = __webpack_require__(3);

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7)(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var anObject = __webpack_require__(0);

module.exports = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) {
    throw TypeError("Can't set " + String(proto) + ' as a prototype');
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var defineProperty = __webpack_require__(10).f;
var create = __webpack_require__(44);
var redefineAll = __webpack_require__(50);
var bind = __webpack_require__(47);
var anInstance = __webpack_require__(48);
var iterate = __webpack_require__(29);
var defineIterator = __webpack_require__(123);
var setSpecies = __webpack_require__(125);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(28).fastKey;
var InternalStateModule = __webpack_require__(26);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        index: create(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!DESCRIPTORS) that.size = 0;
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index;
      // change existing entry
      if (entry) {
        entry.value = value;
      // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (DESCRIPTORS) state.size++;
        else that.size++;
        // add to index
        if (index !== 'F') state.index[index] = entry;
      } return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that);
      // fast case
      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index];
      // frozen object case
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }
        state.first = state.last = undefined;
        if (DESCRIPTORS) state.size = 0;
        else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (DESCRIPTORS) state.size--;
          else that.size--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        var state = getInternalState(this);
        var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS) defineProperty(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last;
      // revert to the last existing entry
      while (entry && entry.removed) entry = entry.previous;
      // get next entry
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return { value: undefined, done: true };
      }
      // return step by kind
      if (kind == 'keys') return { value: entry.key, done: false };
      if (kind == 'values') return { value: entry.value, done: false };
      return { value: [entry.key, entry.value], done: false };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(CONSTRUCTOR_NAME);
  }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__(14);
var hide = __webpack_require__(19);
var has = __webpack_require__(6);
var IS_PURE = __webpack_require__(39);
var ITERATOR = __webpack_require__(12)('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var MetadataReader = (function () {
    function MetadataReader() {
    }
    MetadataReader.prototype.getConstructorMetadata = function (constructorFunc) {
        var compilerGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.PARAM_TYPES, constructorFunc);
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED, constructorFunc);
        return {
            compilerGeneratedMetadata: compilerGeneratedMetadata,
            userGeneratedMetadata: userGeneratedMetadata || {}
        };
    };
    MetadataReader.prototype.getPropertiesMetadata = function (constructorFunc) {
        var userGeneratedMetadata = Reflect.getMetadata(METADATA_KEY.TAGGED_PROP, constructorFunc) || [];
        return userGeneratedMetadata;
    };
    return MetadataReader;
}());
exports.MetadataReader = MetadataReader;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
function isStackOverflowExeption(error) {
    return (error instanceof RangeError ||
        error.message === ERROR_MSGS.STACK_OVERFLOW);
}
exports.isStackOverflowExeption = isStackOverflowExeption;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(5);
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
var LazyServiceIdentifer = (function () {
    function LazyServiceIdentifer(cb) {
        this._cb = cb;
    }
    LazyServiceIdentifer.prototype.unwrap = function () {
        return this._cb();
    };
    return LazyServiceIdentifer;
}());
exports.LazyServiceIdentifer = LazyServiceIdentifer;
function inject(serviceIdentifier) {
    return function (target, targetKey, index) {
        if (serviceIdentifier === undefined) {
            throw new Error(error_msgs_1.UNDEFINED_INJECT_ANNOTATION(target.name));
        }
        var metadata = new metadata_1.Metadata(METADATA_KEY.INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.inject = inject;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var id_1 = __webpack_require__(17);
var metadata_1 = __webpack_require__(8);
var queryable_string_1 = __webpack_require__(158);
var Target = (function () {
    function Target(type, name, serviceIdentifier, namedOrTagged) {
        this.id = id_1.id();
        this.type = type;
        this.serviceIdentifier = serviceIdentifier;
        this.name = new queryable_string_1.QueryableString(name || "");
        this.metadata = new Array();
        var metadataItem = null;
        if (typeof namedOrTagged === "string") {
            metadataItem = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, namedOrTagged);
        }
        else if (namedOrTagged instanceof metadata_1.Metadata) {
            metadataItem = namedOrTagged;
        }
        if (metadataItem !== null) {
            this.metadata.push(metadataItem);
        }
    }
    Target.prototype.hasTag = function (key) {
        for (var _i = 0, _a = this.metadata; _i < _a.length; _i++) {
            var m = _a[_i];
            if (m.key === key) {
                return true;
            }
        }
        return false;
    };
    Target.prototype.isArray = function () {
        return this.hasTag(METADATA_KEY.MULTI_INJECT_TAG);
    };
    Target.prototype.matchesArray = function (name) {
        return this.matchesTag(METADATA_KEY.MULTI_INJECT_TAG)(name);
    };
    Target.prototype.isNamed = function () {
        return this.hasTag(METADATA_KEY.NAMED_TAG);
    };
    Target.prototype.isTagged = function () {
        return this.metadata.some(function (m) {
            return (m.key !== METADATA_KEY.INJECT_TAG) &&
                (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                (m.key !== METADATA_KEY.NAME_TAG) &&
                (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                (m.key !== METADATA_KEY.NAMED_TAG);
        });
    };
    Target.prototype.isOptional = function () {
        return this.matchesTag(METADATA_KEY.OPTIONAL_TAG)(true);
    };
    Target.prototype.getNamedTag = function () {
        if (this.isNamed()) {
            return this.metadata.filter(function (m) { return m.key === METADATA_KEY.NAMED_TAG; })[0];
        }
        return null;
    };
    Target.prototype.getCustomTags = function () {
        if (this.isTagged()) {
            return this.metadata.filter(function (m) {
                return (m.key !== METADATA_KEY.INJECT_TAG) &&
                    (m.key !== METADATA_KEY.MULTI_INJECT_TAG) &&
                    (m.key !== METADATA_KEY.NAME_TAG) &&
                    (m.key !== METADATA_KEY.UNMANAGED_TAG) &&
                    (m.key !== METADATA_KEY.NAMED_TAG);
            });
        }
        return null;
    };
    Target.prototype.matchesNamedTag = function (name) {
        return this.matchesTag(METADATA_KEY.NAMED_TAG)(name);
    };
    Target.prototype.matchesTag = function (key) {
        var _this = this;
        return function (value) {
            for (var _i = 0, _a = _this.metadata; _i < _a.length; _i++) {
                var m = _a[_i];
                if (m.key === key && m.value === value) {
                    return true;
                }
            }
            return false;
        };
    };
    return Target;
}());
exports.Target = Target;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_on_syntax_1 = __webpack_require__(51);
var binding_when_syntax_1 = __webpack_require__(52);
var BindingWhenOnSyntax = (function () {
    function BindingWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
    }
    BindingWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingWhenOnSyntax;
}());
exports.BindingWhenOnSyntax = BindingWhenOnSyntax;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var traverseAncerstors = function (request, constraint) {
    var parent = request.parentRequest;
    if (parent !== null) {
        return constraint(parent) ? true : traverseAncerstors(parent, constraint);
    }
    else {
        return false;
    }
};
exports.traverseAncerstors = traverseAncerstors;
var taggedConstraint = function (key) { return function (value) {
    var constraint = function (request) {
        return request !== null && request.target !== null && request.target.matchesTag(key)(value);
    };
    constraint.metaData = new metadata_1.Metadata(key, value);
    return constraint;
}; };
exports.taggedConstraint = taggedConstraint;
var namedConstraint = taggedConstraint(METADATA_KEY.NAMED_TAG);
exports.namedConstraint = namedConstraint;
var typeConstraint = function (type) { return function (request) {
    var binding = null;
    if (request !== null) {
        binding = request.bindings[0];
        if (typeof type === "string") {
            var serviceIdentifier = binding.serviceIdentifier;
            return serviceIdentifier === type;
        }
        else {
            var constructor = request.bindings[0].implementationType;
            return type === constructor;
        }
    }
    return false;
}; };
exports.typeConstraint = typeConstraint;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(178);
const rpc_1 = __webpack_require__(179);
var AuthConstants;
(function (AuthConstants) {
    AuthConstants.Events = events_1.AuthEvents;
    AuthConstants.RPC = rpc_1.AuthRPC;
})(AuthConstants = exports.AuthConstants || (exports.AuthConstants = {}));


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Should be used to temporary listen for the event.
 */
function hookEvent(event, getListener) {
    const unhook = () => {
        mp.events.remove(event, listener);
    };
    const listener = getListener(unhook);
    mp.events.add(event, listener);
}
exports.hookEvent = hookEvent;
;


/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const CamerasManagerInfo = {
    gameplayCamera: null,
    activeCamera: null,
    interpCamera: null,
    interpActive: false,
    _events: new Map(),
    cameras: new Map(),
};

mp.events.add('render', () => {
    if (CamerasManagerInfo.interpCamera && CamerasManager.doesExist(CamerasManagerInfo.interpCamera) && !CamerasManagerInfo.activeCamera.isInterpolating()) {

        CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.activeCamera);

        CamerasManagerInfo.interpCamera.setActive(false);
        CamerasManagerInfo.interpCamera.destroy();
        CamerasManagerInfo.interpCamera = null;
    }
});

const cameraSerialize = (camera) => {
    camera.setActiveCamera = (toggle) => {
        CamerasManager.setActiveCamera(camera, toggle);
    };

    camera.setActiveCameraWithInterp = (position, rotation, duration, easeLocation, easeRotation) => {
        CamerasManager.setActiveCameraWithInterp(camera, position, rotation, duration, easeLocation, easeRotation);
    };
};

class CamerasManager {

    static on(eventName, eventFunction) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);

            if (!event.has(eventFunction)) {
                event.add(eventFunction);
            }
        } else {
            CamerasManagerInfo._events.set(eventName, new Set([eventFunction]));
        }
    }

    static fireEvent(eventName, ...args) {
        if (CamerasManagerInfo._events.has(eventName)) {
            const event = CamerasManagerInfo._events.get(eventName);

            event.forEach(eventFunction => {
                eventFunction(...args);
            });
        }
    }

    static getCamera(name) {

        const camera = CamerasManagerInfo.cameras.get(name);

        if (typeof camera.setActiveCamera !== 'function') {
            cameraSerialize(camera);
        }

        return camera;
    }

    static setCamera(name, camera) {
        CamerasManagerInfo.cameras.set(name, camera);
    }

    static hasCamera(name) {
        return CamerasManagerInfo.cameras.has(name);
    }

    static destroyCamera(camera) {
        if (this.doesExist(camera)) {
            if (camera === this.activeCamera) {
                this.activeCamera.setActive(false);
            }
            camera.destroy();
        }
    }

    static createCamera(name, type, position, rotation, fov) {
        const cam = mp.cameras.new(type, position, rotation, fov);
        cameraSerialize(cam);
        CamerasManagerInfo.cameras.set(name, cam);
        return cam;
    }

    static setActiveCamera(activeCamera, toggle) {
        if (!toggle) {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera = null;
                activeCamera.setActive(false);
                mp.game.cam.renderScriptCams(false, false, 0, false, false);
            }

            if (this.doesExist(CamerasManagerInfo.interpCamera)) {
                CamerasManagerInfo.interpCamera.setActive(false);
                CamerasManagerInfo.interpCamera.destroy();
                CamerasManagerInfo.interpCamera = null;
            }

        } else {
            if (this.doesExist(CamerasManagerInfo.activeCamera)) {
                CamerasManagerInfo.activeCamera.setActive(false);
            }
            CamerasManagerInfo.activeCamera = activeCamera;
            activeCamera.setActive(true);
            mp.game.cam.renderScriptCams(true, false, 0, false, false);
        }
    }

    static setActiveCameraWithInterp(activeCamera, position, rotation, duration, easeLocation, easeRotation) {

        if (this.doesExist(CamerasManagerInfo.activeCamera)) {
            CamerasManagerInfo.activeCamera.setActive(false);
        }

        if (this.doesExist(CamerasManagerInfo.interpCamera)) {
            CamerasManager.fireEvent('stopInterp', CamerasManagerInfo.interpCamera);

            CamerasManagerInfo.interpCamera.setActive(false);
            CamerasManagerInfo.interpCamera.destroy();
            CamerasManagerInfo.interpCamera = null;
        }
        const interpCamera = mp.cameras.new('default', activeCamera.getCoord(), activeCamera.getRot(2), activeCamera.getFov());
        activeCamera.setCoord(position.x, position.y, position.z);
        activeCamera.setRot(rotation.x, rotation.y, rotation.z, 2);
        activeCamera.stopPointing();

        CamerasManagerInfo.activeCamera = activeCamera;
        CamerasManagerInfo.interpCamera = interpCamera;
        activeCamera.setActiveWithInterp(interpCamera.handle, duration, easeLocation, easeRotation);
        mp.game.cam.renderScriptCams(true, false, 0, false, false);

        CamerasManager.fireEvent('startInterp', CamerasManagerInfo.interpCamera);
    }

    static doesExist(camera) {
        return mp.cameras.exists(camera) && camera.doesExist();
    }

    static get activeCamera() {
        return CamerasManagerInfo.activeCamera;
    }

    static get gameplayCam() {
        if (!CamerasManagerInfo.gameplayCamera) {
            CamerasManagerInfo.gameplayCamera = mp.cameras.new("gameplay");
        }
        return CamerasManagerInfo.gameplayCamera;
    }
}

const proxyHandler = {
    get: (target, name, receiver) => typeof CamerasManager[name] !== 'undefined' ? CamerasManager[name] : CamerasManagerInfo.cameras.get(name)
};

/* harmony default export */ __webpack_exports__["default"] = (new Proxy({}, proxyHandler));


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class PlayerManager {
    constructor() {
        this.player = mp.players.local;
        this.updateCharacterAppearance = (appearance) => {
            const { gender, father, mother, resemblance, skinTone, features, headOverlays, hair, hairColor, hairHighlightColor, eyeColor, beardColor, eyebrowColor, blushColor, lipstickColor, chestHairColor, } = appearance;
            const model = mp.game.joaat(`mp_${gender ? 'f' : 'm'}_freemode_01`);
            if (this.player.model !== model) {
                this.player.model = model;
                this.player.setComponentVariation(3, 15, 0, 2);
                this.player.setComponentVariation(4, gender ? 15 : 61, gender ? 3 : 0, 2);
                this.player.setComponentVariation(6, gender ? 35 : 34, 0, 2);
                this.player.setComponentVariation(8, 15, 0, 2);
                this.player.setComponentVariation(11, gender ? 5 : 15, 0, 2);
            }
            Object.values(features).forEach((value, featureIndex) => {
                this.player.setFaceFeature(featureIndex, value);
            });
            this.player.setHeadBlendData(
            // shape
            mother, father, 0, 
            // skin
            mother, father, 0, 
            // mixes
            resemblance, skinTone, 0.0, false);
            Object.values(headOverlays).forEach(({ value, opacity }, overlayId) => {
                if (+overlayId === 1) {
                    mp.gui.chat.push(`${value}:${opacity}`);
                }
                this.player.setHeadOverlay(overlayId, value, opacity, ({
                    1: beardColor,
                    2: eyebrowColor,
                    5: blushColor,
                    8: lipstickColor,
                    10: chestHairColor,
                })[overlayId] || 0, 0);
            });
            this.player.setComponentVariation(2, hair, 0, 2);
            this.player.setHairColor(hairColor, hairHighlightColor);
            this.player.setEyeColor(eyeColor);
        };
    }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rage_rpc_1 = __webpack_require__(16);
const container_1 = __importDefault(__webpack_require__(20));
const sentry_1 = __webpack_require__(31);
exports.handleRPC = eventName => (target, propertyKey) => {
    setTimeout(() => {
        const service = container_1.default.get(target.constructor);
        try {
            rage_rpc_1.register(eventName, (...args) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield service[propertyKey](...args);
                }
                catch (e) {
                    sentry_1.captureException(e);
                }
            }));
        }
        catch (e) {
            sentry_1.captureException(e);
        }
    }, 0);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = __webpack_require__(181);
var CharacterSelectionConstants;
(function (CharacterSelectionConstants) {
    CharacterSelectionConstants.RPC = rpc_1.CharacterSelectionRPC;
})(CharacterSelectionConstants = exports.CharacterSelectionConstants || (exports.CharacterSelectionConstants = {}));
;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = __webpack_require__(182);
const events_1 = __webpack_require__(183);
var CharacterCreationConstants;
(function (CharacterCreationConstants) {
    CharacterCreationConstants.RPC = rpc_1.CharacterCreationRPC;
    CharacterCreationConstants.Events = events_1.CharacterCreationEvents;
})(CharacterCreationConstants = exports.CharacterCreationConstants || (exports.CharacterCreationConstants = {}));


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bones_1 = __webpack_require__(184);
const keys_1 = __webpack_require__(185);
const events_1 = __webpack_require__(186);
var GameConstants;
(function (GameConstants) {
    GameConstants.Bones = bones_1.Bones;
    GameConstants.VK = keys_1.VK;
    GameConstants.Events = events_1.GameEvents;
})(GameConstants = exports.GameConstants || (exports.GameConstants = {}));


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(89);
const rage_rpc_1 = __webpack_require__(16);
__webpack_require__(31); // error tracking
__webpack_require__(149);
__webpack_require__(150);
const constants_1 = __webpack_require__(32);
const container_1 = __webpack_require__(20);
mp.events.add(constants_1.SharedConstants.Auth.Events.PLAYER_READY_FOR_AUTHENTICATION, () => {
    mp.gui.chat.push('Ready for authentication');
});
const init = () => __awaiter(this, void 0, void 0, function* () {
    yield Promise.resolve().then(() => __importStar(__webpack_require__(53)));
    yield Promise.resolve().then(() => __importStar(__webpack_require__(177)));
    yield Promise.resolve().then(() => __importStar(__webpack_require__(180)));
    yield Promise.resolve().then(() => __importStar(__webpack_require__(187)));
    yield Promise.all(container_1.containerPromises);
    rage_rpc_1.callServer('playerInitiated');
});
init();


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(90);

__webpack_require__(114);
__webpack_require__(131);
__webpack_require__(132);
__webpack_require__(133);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(91);
__webpack_require__(98);
__webpack_require__(103);
__webpack_require__(104);
__webpack_require__(105);
__webpack_require__(106);
__webpack_require__(107);
__webpack_require__(108);
__webpack_require__(109);
__webpack_require__(110);
__webpack_require__(111);
__webpack_require__(112);
__webpack_require__(113);

module.exports = __webpack_require__(69).Reflect;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(23);
var anObject = __webpack_require__(0);
var nativeApply = (__webpack_require__(3).Reflect || {}).apply;
var functionApply = Function.apply;

// MS Edge argumentsList argument is optional
var OPTIONAL_ARGUMENTS_LIST = !__webpack_require__(7)(function () {
  nativeApply(function () { /* empty */ });
});

// `Reflect.apply` method
// https://tc39.github.io/ecma262/#sec-reflect.apply
__webpack_require__(1)({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    aFunction(target);
    anObject(argumentsList);
    return nativeApply
      ? nativeApply(target, thisArgument, argumentsList)
      : functionApply.call(target, thisArgument, argumentsList);
  }
});


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = nativeGetOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = nativeGetOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(6);
var ownKeys = __webpack_require__(62);
var getOwnPropertyDescriptorModule = __webpack_require__(18);
var definePropertyModule = __webpack_require__(10);

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var internalObjectKeys = __webpack_require__(63);
var hiddenKeys = __webpack_require__(43).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(35);
var toLength = __webpack_require__(42);
var toAbsoluteIndex = __webpack_require__(96);

// `Array.prototype.{ indexOf, includes }` methods implementation
// false -> Array#indexOf
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof
// true  -> Array#includes
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(64);
var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var create = __webpack_require__(44);
var aFunction = __webpack_require__(23);
var anObject = __webpack_require__(0);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(7);
var bind = __webpack_require__(102);
var nativeConstruct = (__webpack_require__(3).Reflect || {}).construct;

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

__webpack_require__(1)({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9);
var definePropertyModule = __webpack_require__(10);
var anObject = __webpack_require__(0);
var objectKeys = __webpack_require__(100);

module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var i = 0;
  var key;
  while (length > i) definePropertyModule.f(O, key = keys[i++], Properties[key]);
  return O;
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var internalObjectKeys = __webpack_require__(63);
var enumBugKeys = __webpack_require__(43);

module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(3).document;

module.exports = document && document.documentElement;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(23);
var isObject = __webpack_require__(4);
var arraySlice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(10);
var anObject = __webpack_require__(0);
var toPrimitive = __webpack_require__(37);
var DESCRIPTORS = __webpack_require__(9);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
var ERROR_INSTEAD_OF_FALSE = __webpack_require__(7)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 });
});

// `Reflect.defineProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.defineproperty
__webpack_require__(1)({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      definePropertyModule.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyDescriptor = __webpack_require__(18).f;
var anObject = __webpack_require__(0);

// `Reflect.deleteProperty` method
// https://tc39.github.io/ecma262/#sec-reflect.deleteproperty
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyDescriptorModule = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(14);
var has = __webpack_require__(6);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(0);

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get === undefined
      ? undefined
      : descriptor.get.call(receiver);
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

__webpack_require__(1)({ target: 'Reflect', stat: true }, { get: get });


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var getOwnPropertyDescriptorModule = __webpack_require__(18);
var anObject = __webpack_require__(0);
var DESCRIPTORS = __webpack_require__(9);

// `Reflect.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
__webpack_require__(1)({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var objectGetPrototypeOf = __webpack_require__(14);
var anObject = __webpack_require__(0);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(67);

// `Reflect.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
__webpack_require__(1)({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(target) {
    return objectGetPrototypeOf(anObject(target));
  }
});


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// `Reflect.has` method
// https://tc39.github.io/ecma262/#sec-reflect.has
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(0);
var objectIsExtensible = Object.isExtensible;

// `Reflect.isExtensible` method
// https://tc39.github.io/ecma262/#sec-reflect.isextensible
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return objectIsExtensible ? objectIsExtensible(target) : true;
  }
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// `Reflect.ownKeys` method
// https://tc39.github.io/ecma262/#sec-reflect.ownkeys
__webpack_require__(1)({ target: 'Reflect', stat: true }, { ownKeys: __webpack_require__(62) });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(68);
var anObject = __webpack_require__(0);
var FREEZING = __webpack_require__(70);

// `Reflect.preventExtensions` method
// https://tc39.github.io/ecma262/#sec-reflect.preventextensions
__webpack_require__(1)({ target: 'Reflect', stat: true, sham: !FREEZING }, {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
      if (objectPreventExtensions) objectPreventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var definePropertyModule = __webpack_require__(10);
var getOwnPropertyDescriptorModule = __webpack_require__(18);
var getPrototypeOf = __webpack_require__(14);
var has = __webpack_require__(6);
var createPropertyDescriptor = __webpack_require__(24);
var anObject = __webpack_require__(0);
var isObject = __webpack_require__(4);

// `Reflect.set` method
// https://tc39.github.io/ecma262/#sec-reflect.set
function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey);
  var existingDescriptor, prototype;
  if (!ownDescriptor) {
    if (isObject(prototype = getPrototypeOf(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor(0);
  }
  if (has(ownDescriptor, 'value')) {
    if (ownDescriptor.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      definePropertyModule.f(receiver, propertyKey, existingDescriptor);
    } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));
    return true;
  }
  return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
}

__webpack_require__(1)({ target: 'Reflect', stat: true }, { set: set });


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var objectSetPrototypeOf = __webpack_require__(45);
var validateSetPrototypeOfArguments = __webpack_require__(71);

// `Reflect.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-reflect.setprototypeof
if (objectSetPrototypeOf) __webpack_require__(1)({ target: 'Reflect', stat: true }, {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    validateSetPrototypeOfArguments(target, proto);
    try {
      objectSetPrototypeOf(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.defineMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
    var targetKey = arguments.length < 4 ? undefined : toMetadataKey(arguments[3]);
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), targetKey);
  }
});


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Map` constructor
// https://tc39.github.io/ecma262/#sec-map-objects
module.exports = __webpack_require__(46)('Map', function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(72), true);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(30);
var ITERATOR = __webpack_require__(12)('iterator');
var ArrayPrototype = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// Chrome 38 Symbol has incorrect toString conversion
module.exports = !__webpack_require__(7)(function () {
  // eslint-disable-next-line no-undef
  String(Symbol());
});


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(119);
var ITERATOR = __webpack_require__(12)('iterator');
var Iterators = __webpack_require__(30);

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var classofRaw = __webpack_require__(36);
var TO_STRING_TAG = __webpack_require__(12)('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(0);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw e;
  }
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(12)('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (e) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(45);

module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(1);
var createIteratorConstructor = __webpack_require__(124);
var getPrototypeOf = __webpack_require__(14);
var setPrototypeOf = __webpack_require__(45);
var setToStringTag = __webpack_require__(49);
var hide = __webpack_require__(19);
var redefine = __webpack_require__(25);
var IS_PURE = __webpack_require__(39);
var ITERATOR = __webpack_require__(12)('iterator');
var Iterators = __webpack_require__(30);
var IteratorsCore = __webpack_require__(73);
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          hide(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    hide(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__(73).IteratorPrototype;
var create = __webpack_require__(44);
var createPropertyDescriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(49);
var Iterators = __webpack_require__(30);

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(68);
var definePropertyModule = __webpack_require__(10);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(12)('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var C = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;
  if (DESCRIPTORS && C && !C[SPECIES]) defineProperty(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(3);
var redefineAll = __webpack_require__(50);
var InternalMetadataModule = __webpack_require__(28);
var weak = __webpack_require__(127);
var isObject = __webpack_require__(4);
var enforceIternalState = __webpack_require__(26).enforce;
var NATIVE_WEAK_MAP = __webpack_require__(61);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

// `WeakMap` constructor
// https://tc39.github.io/ecma262/#sec-weakmap-constructor
var $WeakMap = module.exports = __webpack_require__(46)('WeakMap', wrapper, weak, true, true);

// IE11 WeakMap frozen keys fix
// We can't use feature detection because it crash some old IE builds
// https://github.com/zloirock/core-js/issues/485
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalWeakMap = weak.getConstructor(wrapper, 'WeakMap', true);
  InternalMetadataModule.REQUIRED = true;
  var WeakMapPrototype = $WeakMap.prototype;
  var nativeDelete = WeakMapPrototype['delete'];
  var nativeHas = WeakMapPrototype.has;
  var nativeGet = WeakMapPrototype.get;
  var nativeSet = WeakMapPrototype.set;
  redefineAll(WeakMapPrototype, {
    'delete': function (key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeDelete.call(this, key) || state.frozen['delete'](key);
      } return nativeDelete.call(this, key);
    },
    has: function has(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) || state.frozen.has(key);
      } return nativeHas.call(this, key);
    },
    get: function get(key) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
      } return nativeGet.call(this, key);
    },
    set: function set(key, value) {
      if (isObject(key) && !isExtensible(key)) {
        var state = enforceIternalState(this);
        if (!state.frozen) state.frozen = new InternalWeakMap();
        nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
      } else nativeSet.call(this, key, value);
      return this;
    }
  });
}


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(50);
var getWeakData = __webpack_require__(28).getWeakData;
var anObject = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(48);
var iterate = __webpack_require__(29);
var createArrayMethod = __webpack_require__(128);
var $has = __webpack_require__(6);
var InternalStateModule = __webpack_require__(26);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (store) {
  return store.frozen || (store.frozen = new UncaughtFrozenStore());
};

var UncaughtFrozenStore = function () {
  this.entries = [];
};

var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.entries, function (it) {
    return it[0] === key;
  });
};

UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.entries.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.entries, function (it) {
      return it[0] === key;
    });
    if (~index) this.entries.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: undefined
      });
      if (iterable != undefined) iterate(iterable, that[ADDER], that, IS_MAP);
    });

    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var data = getWeakData(anObject(key), true);
      if (data === true) uncaughtFrozenStore(state).set(key, value);
      else data[state.id] = value;
      return that;
    };

    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state)['delete'](key);
        return data && $has(data, state.id) && delete data[state.id];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        var state = getInternalState(this);
        if (!isObject(key)) return false;
        var data = getWeakData(key);
        if (data === true) return uncaughtFrozenStore(state).has(key);
        return data && $has(data, state.id);
      }
    });

    redefineAll(C.prototype, IS_MAP ? {
      // 23.3.3.3 WeakMap.prototype.get(key)
      get: function get(key) {
        var state = getInternalState(this);
        if (isObject(key)) {
          var data = getWeakData(key);
          if (data === true) return uncaughtFrozenStore(state).get(key);
          return data ? data[state.id] : undefined;
        }
      },
      // 23.3.3.5 WeakMap.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key, value);
      }
    } : {
      // 23.4.3.1 WeakSet.prototype.add(value)
      add: function add(value) {
        return define(this, value, true);
      }
    });

    return C;
  }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(47);
var IndexedObject = __webpack_require__(56);
var toObject = __webpack_require__(66);
var toLength = __webpack_require__(42);
var arraySpeciesCreate = __webpack_require__(129);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
// 0 -> Array#forEach
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
// 1 -> Array#map
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// 2 -> Array#filter
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// 3 -> Array#some
// https://tc39.github.io/ecma262/#sec-array.prototype.some
// 4 -> Array#every
// https://tc39.github.io/ecma262/#sec-array.prototype.every
// 5 -> Array#find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
// 6 -> Array#findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
module.exports = function (TYPE, specificCreate) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = specificCreate || arraySpeciesCreate;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: target.push(value);       // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(130);
var SPECIES = __webpack_require__(12)('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(36);

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var toMetadataKey = ReflectMetadataModule.toKey;
var getOrCreateMetadataMap = ReflectMetadataModule.getMap;
var store = ReflectMetadataModule.store;

// `Reflect.deleteMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  }
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var getPrototypeOf = __webpack_require__(14);
var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

// `Reflect.getMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(134);
var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var getPrototypeOf = __webpack_require__(14);
var iterate = __webpack_require__(29);
var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

var from = function (iter) {
  var result = [];
  iterate(iter, result.push, result);
  return result;
};

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

// `Reflect.getMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryMetadataKeys(anObject(target), targetKey);
  }
});


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects
module.exports = __webpack_require__(46)('Set', function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, __webpack_require__(72));


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var ordinaryGetOwnMetadata = ReflectMetadataModule.get;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var ordinaryOwnMetadataKeys = ReflectMetadataModule.keys;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.getOwnMetadataKeys` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    var targetKey = arguments.length < 2 ? undefined : toMetadataKey(arguments[1]);
    return ordinaryOwnMetadataKeys(anObject(target), targetKey);
  }
});


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var getPrototypeOf = __webpack_require__(14);
var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

// `Reflect.hasMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var ordinaryHasOwnMetadata = ReflectMetadataModule.has;
var toMetadataKey = ReflectMetadataModule.toKey;

// `Reflect.hasOwnMetadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetadataKey(arguments[2]);
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), targetKey);
  }
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var ReflectMetadataModule = __webpack_require__(11);
var anObject = __webpack_require__(0);
var toMetadataKey = ReflectMetadataModule.toKey;
var ordinaryDefineOwnMetadata = ReflectMetadataModule.set;

// `Reflect.metadata` method
// https://github.com/rbuckton/reflect-metadata
__webpack_require__(1)({ target: 'Reflect', stat: true }, {
  metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, key) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetadataKey(key));
    };
  }
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = __webpack_require__(141);
var SentryConstants;
(function (SentryConstants) {
    SentryConstants.RPC = rpc_1.SentryRPC;
})(SentryConstants = exports.SentryConstants || (exports.SentryConstants = {}));


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SentryRPC;
(function (SentryRPC) {
    SentryRPC["CAPTURE_EXCEPTION"] = "captureException";
})(SentryRPC = exports.SentryRPC || (exports.SentryRPC = {}));
;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(143);
const rpc_1 = __webpack_require__(144);
var AuthConstants;
(function (AuthConstants) {
    AuthConstants.Events = events_1.AuthEvents;
    AuthConstants.RPC = rpc_1.AuthRPC;
})(AuthConstants = exports.AuthConstants || (exports.AuthConstants = {}));


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthEvents;
(function (AuthEvents) {
    AuthEvents["PLAYER_READY_FOR_AUTHENTICATION"] = "playerReadyForAuthentication";
})(AuthEvents = exports.AuthEvents || (exports.AuthEvents = {}));
;


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthRPC;
(function (AuthRPC) {
    AuthRPC["SUBMIT_REGISTRATION_FORM"] = "submitRegistrationForm";
    AuthRPC["SUBMIT_LOGIN_FORM"] = "submitLoginForm";
    AuthRPC["SUBMIT_AUTH_TOKEN"] = "submitAuthToken";
})(AuthRPC = exports.AuthRPC || (exports.AuthRPC = {}));
;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = __webpack_require__(146);
var CharacterCreationConstants;
(function (CharacterCreationConstants) {
    CharacterCreationConstants.RPC = rpc_1.CharacterCreationRPC;
})(CharacterCreationConstants = exports.CharacterCreationConstants || (exports.CharacterCreationConstants = {}));


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CharacterCreationRPC;
(function (CharacterCreationRPC) {
    CharacterCreationRPC["CREATE_CHARACTER"] = "createCharacter";
})(CharacterCreationRPC = exports.CharacterCreationRPC || (exports.CharacterCreationRPC = {}));
;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const rpc_1 = __webpack_require__(148);
var UserConstants;
(function (UserConstants) {
    UserConstants.RPC = rpc_1.UserRPC;
})(UserConstants = exports.UserConstants || (exports.UserConstants = {}));


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserRPC;
(function (UserRPC) {
    UserRPC["GET_CHARACTERS"] = "getCharacters";
    UserRPC["GET_CHARACTER"] = "getCharacter";
})(UserRPC = exports.UserRPC || (exports.UserRPC = {}));
;


/***/ }),
/* 149 */
/***/ (function(module, exports) {

!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r,t){"undefined"!=typeof self&&self,e.exports=function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=1)}([function(e,r,t){"use strict";var n;function o(e,r){const t="client"===i();if(e&&"object"==typeof e&&void 0!==e.id){const o=(r,n,o)=>t?e.type===r&&n.at(e.id)===e:e instanceof o;switch(r){case n.Blip:return o("blip",mp.blips,mp.Blip);case n.Checkpoint:return o("checkpoint",mp.checkpoints,mp.Checkpoint);case n.Colshape:return o("colshape",mp.colshapes,mp.Colshape);case n.Label:return o("textlabel",mp.labels,mp.TextLabel);case n.Marker:return o("marker",mp.markers,mp.Marker);case n.Object:return o("object",mp.objects,mp.Object);case n.Pickup:return o("pickup",mp.pickups,mp.Pickup);case n.Player:return o("player",mp.players,mp.Player);case n.Vehicle:return o("vehicle",mp.vehicles,mp.Vehicle)}}return!1}function c(){const e=46656*Math.random()|0,r=46656*Math.random()|0;return("000"+e.toString(36)).slice(-3)+("000"+r.toString(36)).slice(-3)}function i(){return mp.joaat?"server":mp.game&&mp.game.joaat?"client":mp.trigger?"cef":void 0}function s(e){const r=i();return JSON.stringify(e,(e,t)=>{if("client"===r||"server"===r&&t&&"object"==typeof t){let e;if(o(t,n.Blip)?e=n.Blip:o(t,n.Checkpoint)?e=n.Checkpoint:o(t,n.Colshape)?e=n.Colshape:o(t,n.Marker)?e=n.Marker:o(t,n.Object)?e=n.Object:o(t,n.Pickup)?e=n.Pickup:o(t,n.Player)?e=n.Player:o(t,n.Vehicle)&&(e=n.Vehicle),e)return{__t:e,i:t.remoteId||t.id}}return t})}function a(e){const r=i();return JSON.parse(e,(e,t)=>{if(("client"===r||"server"===r)&&t&&"object"==typeof t&&"string"==typeof t.__t&&"number"==typeof t.i&&2===Object.keys(t).length){const e=t.i;let o;switch(t.__t){case n.Blip:o=mp.blips;break;case n.Checkpoint:o=mp.checkpoints;break;case n.Colshape:o=mp.colshapes;break;case n.Label:o=mp.labels;break;case n.Marker:o=mp.markers;break;case n.Object:o=mp.objects;break;case n.Pickup:o=mp.pickups;break;case n.Player:o=mp.players;break;case n.Vehicle:o=mp.vehicles}if(o)return o["client"===r?"atRemoteId":"at"](e)}return t})}function l(e){return new Promise(r=>setTimeout(()=>r(e),0))}function u(e){return new Promise((r,t)=>setTimeout(()=>t(e),0))}function p(e){try{e.url}catch(e){return!1}return!0}t.d(r,"g",function(){return c}),t.d(r,"a",function(){return i}),t.d(r,"f",function(){return s}),t.d(r,"c",function(){return a}),t.d(r,"e",function(){return l}),t.d(r,"d",function(){return u}),t.d(r,"b",function(){return p}),function(e){e.Blip="b",e.Checkpoint="cp",e.Colshape="c",e.Label="l",e.Marker="m",e.Object="o",e.Pickup="p",e.Player="pl",e.Vehicle="v"}(n||(n={}))},function(e,r,t){"use strict";t.r(r),function(e){t.d(r,"register",function(){return f}),t.d(r,"unregister",function(){return m}),t.d(r,"call",function(){return g}),t.d(r,"callServer",function(){return h}),t.d(r,"callClient",function(){return b}),t.d(r,"callBrowsers",function(){return y}),t.d(r,"callBrowser",function(){return P});var n=t(0);const o=n.a();if(!o)throw"Unknown RAGE environment";const c="PROCEDURE_NOT_FOUND",i="__rpc:id",s="__rpc:process",a="__rpc:browserRegister",l="__rpc:browserUnregister",u="cef"===o?window:e;if(!u[s])if(u.__rpcListeners={},u.__rpcPending={},u[s]=((e,r)=>{"server"!==o&&(r=e);const t=n.c(r);if(t.req){const r={id:t.id,environment:t.fenv||t.env};"server"===o&&(r.player=e);const c={ret:1,id:t.id,env:o};let i;switch(o){case"server":i=(e=>r.player.call(s,[n.f(e)]));break;case"client":if("server"===t.env)i=(e=>mp.events.callRemote(s,n.f(e)));else if("cef"===t.env){const e=t.b&&u.__rpcBrowsers[t.b];r.browser=e,i=(r=>e&&n.b(e)&&p(e,r,!0))}break;case"cef":i=(e=>mp.trigger(s,n.f(e)))}i&&d(t.name,t.args,r).then(e=>i({...c,res:e})).catch(e=>i({...c,err:e}))}else if(t.ret){const r=u.__rpcPending[t.id];if("server"===o&&r.player!==e)return;r&&(r.resolve(t.err?n.d(t.err):n.e(t.res)),delete u.__rpcPending[t.id])}}),"cef"!==o){if(mp.events.add(s,u[s]),"client"===o){f("__rpc:callServer",([e,r],t)=>v(e,r,{fenv:t.environment})),f("__rpc:callBrowsers",([e,r],t)=>w(null,e,r,{fenv:t.environment})),u.__rpcBrowsers={};const e=e=>{const r=n.g();Object.keys(u.__rpcBrowsers).forEach(r=>{const t=u.__rpcBrowsers[r];t&&n.b(t)&&t!==e||delete u.__rpcBrowsers[r]}),u.__rpcBrowsers[r]=e,e.execute(`if(typeof window['${i}'] === 'undefined'){ window['${i}'] = Promise.resolve('${r}'); }else{ window['${i}:resolve']('${r}'); }`)};mp.browsers.forEach(e),mp.events.add("browserCreated",e),u.__rpcBrowserProcedures={},mp.events.add(a,e=>{const[r,t]=JSON.parse(e);u.__rpcBrowserProcedures[t]=r}),mp.events.add(l,e=>{const[r,t]=JSON.parse(e);u.__rpcBrowserProcedures[t]===r&&delete u.__rpcBrowserProcedures[t]})}}else void 0===u[i]&&(u[i]=new Promise(e=>{u[i+":resolve"]=e}));function p(e,r,t){const o=n.f(r);e.execute(`var process = window["${s}"]; if(process){ process(${JSON.stringify(o)}); }else{ ${t?"":`mp.trigger("${s}", '{"ret":1,"id":"${r.id}","err":"${c}","env":"cef"}');`} }`)}function d(e,r,t){const o=u.__rpcListeners[e];return o?n.e(o(r,t)):n.d(c)}function f(e,r){if(2!==arguments.length)throw'register expects 2 arguments: "name" and "cb"';"cef"===o&&u[i].then(r=>mp.trigger(a,JSON.stringify([r,e]))),u.__rpcListeners[e]=r}function m(e){if(1!==arguments.length)throw'unregister expects 1 argument: "name"';"cef"===o&&u[i].then(r=>mp.trigger(l,JSON.stringify([r,e]))),u.__rpcListeners[e]=void 0}function g(e,r){return 1!==arguments.length&&2!==arguments.length?n.d('call expects 1 or 2 arguments: "name" and optional "args"'):d(e,r,{environment:o})}function v(e,r,t={}){switch(o){case"server":return g(e,r);case"client":{const c=n.g();return new Promise(i=>{u.__rpcPending[c]={resolve:i};const a={req:1,id:c,name:e,env:o,args:r,...t};mp.events.callRemote(s,n.f(a))})}case"cef":return b("__rpc:callServer",[e,r])}}function h(e,r){return 1!==arguments.length&&2!==arguments.length?n.d('callServer expects 1 or 2 arguments: "name" and optional "args"'):v(e,r,{})}function b(e,r,t){switch(o){case"client":return t=r,r=e,1!==arguments.length&&2!==arguments.length||"string"!=typeof r?n.d('callClient from the client expects 1 or 2 arguments: "name" and optional "args"'):g(r,t);case"server":{if(2!==arguments.length&&3!==arguments.length||"object"!=typeof e)return n.d('callClient from the server expects 2 or 3 arguments: "player", "name", and optional "args"');const c=n.g();return new Promise(i=>{u.__rpcPending[c]={resolve:i,player:e};const a={req:1,id:c,name:r,env:o,args:t};e.call(s,[n.f(a)])})}case"cef":{if(t=r,r=e,1!==arguments.length&&2!==arguments.length||"string"!=typeof r)return n.d('callClient from the browser expects 1 or 2 arguments: "name" and optional "args"');const c=n.g();return u[i].then(e=>new Promise(i=>{u.__rpcPending[c]={resolve:i};const a={b:e,req:1,id:c,name:r,env:o,args:t};mp.trigger(s,n.f(a))}))}}}function _(e,r,t,n,c={}){return new Promise(i=>{u.__rpcPending[e]={resolve:i},p(r,{req:1,id:e,name:t,env:o,args:n,...c},!1)})}function w(e,r,t,i={}){switch(o){case"client":const s=n.g(),a=u.__rpcBrowserProcedures[r];if(!a)return n.d(c);const l=u.__rpcBrowsers[a];return l&&n.b(l)?_(s,l,r,t,i):n.d(c);case"server":return b(e,"__rpc:callBrowsers",[r,t]);case"cef":return b("__rpc:callBrowsers",[r,t])}}function y(e,r,t){switch(o){case"client":case"cef":return 1!==arguments.length&&2!==arguments.length?n.d('callBrowsers from the client or browser expects 1 or 2 arguments: "name" and optional "args"'):w(null,e,r,{});case"server":return 2!==arguments.length&&3!==arguments.length?n.d('callBrowsers from the server expects 2 or 3 arguments: "player", "name", and optional "args"'):w(e,r,t,{})}}function P(e,r,t){return"client"!==o?n.d("callBrowser can only be used in the client environment"):2!==arguments.length&&3!==arguments.length?n.d('callBrowser expects 2 or 3 arguments: "browser", "name", and optional "args"'):_(n.g(),e,r,t,{})}}.call(this,t(2))},function(e,r){var t;t=function(){return this}();try{t=t||new Function("return this")()}catch(e){"object"==typeof window&&(t=window)}e.exports=t}])},function(e,r,t){"use strict";t.r(r);var n=t(0);let o,c;function i(){o&&(o.active?(mp.gui.cursor.visible=!1,mp.events.call("reditor:hidden"),c.then(e=>mp.gui.chat.activate(e)),o.active=!1):n.callServer("reditor:canPlayerUse").then(e=>"object"==typeof e?{l:!!e.l,s:!!e.s,c:!!e.c}:!!e).then(e=>{e&&(n.callBrowser(o,"reditor:setAccess",e),mp.events.call("reditor:shown"),c=new Promise(e=>{const r=t=>{e(t),mp.events.remove("reditor:chatActivation",r)};mp.events.add("reditor:chatActivation",r),mp.gui.execute("mp.trigger('reditor:chatActivation', chat.active)")}),mp.gui.cursor.visible=!0,c.then(()=>mp.gui.chat.activate(!1)),o.active=!0,o&&o.active&&o.execute("if(reditor && reditor.editor) reditor.editor.focus()"))}))}mp.events.add("guiReady",()=>{n.callServer("reditor:getInfo").then(e=>{e&&function(e){o||(o=mp.browsers.new(e.url)),o.active=!1,mp.keys.bind(e.key,!1,i)}(e)})}),n.register("reditor:eval",e=>{try{((e,r)=>{const t={};for(const e in void 0)t[e]=void 0;new Function(`with(this){ ${r} }`).call({...t,...e})})({rpc:n},e)}catch(e){}}),n.register("reditor:getFiles",()=>{return Object.keys(mp.storage.data.reditorFiles||{}).sort((e,r)=>e.toLowerCase().localeCompare(r.toLowerCase()))}),n.register("reditor:getFile",e=>(mp.storage.data.reditorFiles||{})[e]),n.register("reditor:exists",e=>void 0!==(mp.storage.data.reditorFiles||{})[e]),n.register("reditor:saveFile",([e,r])=>{mp.storage.data.reditorFiles||(mp.storage.data.reditorFiles={}),mp.storage.data.reditorFiles[e]=r,mp.storage.flush()}),n.register("reditor:deleteFile",e=>{mp.storage.data.reditorFiles&&(delete mp.storage.data.reditorFiles[e],mp.storage.flush())})}]);

/***/ }),
/* 150 */
/***/ (function(module, exports) {

const controlsIds = {
    F5: 327,
    W: 32, // 232
    S: 33, // 31, 219, 233, 268, 269
    A: 34, // 234
    D: 35, // 30, 218, 235, 266, 267
    Space: 321,
    LCtrl: 326,
    LShift: 21,
};

global.fly = {
    flying: false, f: 2.0, w: 2.0, h: 2.0, point_distance: 1000,
};
global.gameplayCam = mp.cameras.new('gameplay');

mp.game.graphics.notify('~r~Fly script loaded!');
mp.game.graphics.notify('~r~F5~w~ - enable/disable\n~r~F5+Space~w~ - disable without warping to ground\n~r~W/A/S/D/Space/LCtrl~w~ - move');
mp.game.graphics.notify('~r~/savecam~w~ - save Camera position.');

let direction = null;
let coords = null;

function pointingAt(distance) {
    const farAway = new mp.Vector3((direction.x * distance) + (coords.x), (direction.y * distance) + (coords.y), (direction.z * distance) + (coords.z));

    const result = mp.raycasting.testPointToPoint(coords, farAway, [1, 16]);
    if (result === undefined) {
        return 'undefined';
    }
    return result;
}

mp.events.add('render', () => {
    const controls = mp.game.controls;
    const fly = global.fly;
    direction = global.gameplayCam.getDirection();
    coords = global.gameplayCam.getCoord();

    mp.game.graphics.drawText(`Coords: ${JSON.stringify(coords)}`, [0.5, 0.005], {
        font: 0,
        color: [255, 255, 255, 185],
        scale: [0.3, 0.3],
        outline: true,
    });
    mp.game.graphics.drawText(`pointAtCoord: ${JSON.stringify(pointingAt(fly.point_distance).position)}`, [0.5, 0.025], {
        font: 0,
        color: [255, 255, 255, 185],
        scale: [0.3, 0.3],
        outline: true,
    });

    if (controls.isControlJustPressed(0, controlsIds.F5)) {
        fly.flying = !fly.flying;

        const player = mp.players.local;

        player.setInvincible(fly.flying);
        player.freezePosition(fly.flying);
        player.setAlpha(fly.flying ? 0 : 255);

        if (!fly.flying && !controls.isControlPressed(0, controlsIds.Space)) {
            const position = mp.players.local.position;
            position.z = mp.game.gameplay.getGroundZFor3dCoord(position.x, position.y, position.z, 0.0, false);
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }

        mp.game.graphics.notify(fly.flying ? 'Fly: ~g~Enabled' : 'Fly: ~r~Disabled');
    } else if (fly.flying) {
        let updated = false;
        const position = mp.players.local.position;
        const maxSpeed = controls.isControlPressed(0, controlsIds.LShift)
            ? 0.2
            : 8.0;

        if (controls.isControlPressed(0, controlsIds.W)) {
            if (fly.f < maxSpeed) { fly.f *= 1.025; }
            if (fly.f > maxSpeed) { fly.f *= 0.975; }

            position.x += direction.x * fly.f;
            position.y += direction.y * fly.f;
            position.z += direction.z * fly.f;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.S)) {
            if (fly.f < maxSpeed) { fly.f *= 1.025; }
            if (fly.f > maxSpeed) { fly.f *= 0.975; }

            position.x -= direction.x * fly.f;
            position.y -= direction.y * fly.f;
            position.z -= direction.z * fly.f;
            updated = true;
        } else {
            fly.f = maxSpeed / 4;
        }

        if (controls.isControlPressed(0, controlsIds.A)) {
            if (fly.l < maxSpeed) { fly.l *= 1.025; }
            if (fly.l > maxSpeed) { fly.l *= 0.975; }

            position.x += (-direction.y) * fly.l;
            position.y += direction.x * fly.l;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.D)) {
            if (fly.l < maxSpeed) { fly.l *= 1.025; }
            if (fly.l > maxSpeed) { fly.l *= 0.975; }

            position.x -= (-direction.y) * fly.l;
            position.y -= direction.x * fly.l;
            updated = true;
        } else {
            fly.l = maxSpeed / 4;
        }

        if (controls.isControlPressed(0, controlsIds.Space)) {
            if (fly.h < maxSpeed) { fly.h *= 1.025; }
            if (fly.h > maxSpeed) { fly.h *= 0.975; }

            position.z += fly.h;
            updated = true;
        } else if (controls.isControlPressed(0, controlsIds.LCtrl)) {
            if (fly.h < maxSpeed) { fly.h *= 1.025; }
            if (fly.h > maxSpeed) { fly.h *= 0.975; }

            position.z -= fly.h;
            updated = true;
        } else {
            fly.h = maxSpeed / 4;
        }

        if (updated) {
            mp.players.local.setCoordsNoOffset(position.x, position.y, position.z, false, false, false);
        }
    }
});

mp.events.add('getCamCoords', (name) => {
    mp.events.callRemote('saveCamCoords', JSON.stringify(coords), JSON.stringify(pointingAt(fly.point_distance)), name);
});


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = __webpack_require__(152);
var ERROR_MSGS = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var METADATA_KEY = __webpack_require__(2);
var metadata_reader_1 = __webpack_require__(74);
var planner_1 = __webpack_require__(153);
var resolver_1 = __webpack_require__(160);
var binding_to_syntax_1 = __webpack_require__(162);
var id_1 = __webpack_require__(17);
var serialization_1 = __webpack_require__(22);
var container_snapshot_1 = __webpack_require__(165);
var lookup_1 = __webpack_require__(166);
var Container = (function () {
    function Container(containerOptions) {
        var options = containerOptions || {};
        if (typeof options !== "object") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_MUST_BE_AN_OBJECT);
        }
        if (options.defaultScope === undefined) {
            options.defaultScope = literal_types_1.BindingScopeEnum.Transient;
        }
        else if (options.defaultScope !== literal_types_1.BindingScopeEnum.Singleton &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Transient &&
            options.defaultScope !== literal_types_1.BindingScopeEnum.Request) {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_DEFAULT_SCOPE);
        }
        if (options.autoBindInjectable === undefined) {
            options.autoBindInjectable = false;
        }
        else if (typeof options.autoBindInjectable !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_AUTO_BIND_INJECTABLE);
        }
        if (options.skipBaseClassChecks === undefined) {
            options.skipBaseClassChecks = false;
        }
        else if (typeof options.skipBaseClassChecks !== "boolean") {
            throw new Error("" + ERROR_MSGS.CONTAINER_OPTIONS_INVALID_SKIP_BASE_CHECK);
        }
        this.options = {
            autoBindInjectable: options.autoBindInjectable,
            defaultScope: options.defaultScope,
            skipBaseClassChecks: options.skipBaseClassChecks
        };
        this.id = id_1.id();
        this._bindingDictionary = new lookup_1.Lookup();
        this._snapshots = [];
        this._middleware = null;
        this.parent = null;
        this._metadataReader = new metadata_reader_1.MetadataReader();
    }
    Container.merge = function (container1, container2) {
        var container = new Container();
        var bindingDictionary = planner_1.getBindingDictionary(container);
        var bindingDictionary1 = planner_1.getBindingDictionary(container1);
        var bindingDictionary2 = planner_1.getBindingDictionary(container2);
        function copyDictionary(origin, destination) {
            origin.traverse(function (key, value) {
                value.forEach(function (binding) {
                    destination.add(binding.serviceIdentifier, binding.clone());
                });
            });
        }
        copyDictionary(bindingDictionary1, bindingDictionary);
        copyDictionary(bindingDictionary2, bindingDictionary);
        return container;
    };
    Container.prototype.load = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var getHelpers = this._getContainerModuleHelpersFactory();
        for (var _a = 0, modules_1 = modules; _a < modules_1.length; _a++) {
            var currentModule = modules_1[_a];
            var containerModuleHelpers = getHelpers(currentModule.id);
            currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction);
        }
    };
    Container.prototype.loadAsync = function () {
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var getHelpers, _a, modules_2, currentModule, containerModuleHelpers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        getHelpers = this._getContainerModuleHelpersFactory();
                        _a = 0, modules_2 = modules;
                        _b.label = 1;
                    case 1:
                        if (!(_a < modules_2.length)) return [3, 4];
                        currentModule = modules_2[_a];
                        containerModuleHelpers = getHelpers(currentModule.id);
                        return [4, currentModule.registry(containerModuleHelpers.bindFunction, containerModuleHelpers.unbindFunction, containerModuleHelpers.isboundFunction, containerModuleHelpers.rebindFunction)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _a++;
                        return [3, 1];
                    case 4: return [2];
                }
            });
        });
    };
    Container.prototype.unload = function () {
        var _this = this;
        var modules = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            modules[_i] = arguments[_i];
        }
        var conditionFactory = function (expected) { return function (item) {
            return item.moduleId === expected;
        }; };
        modules.forEach(function (module) {
            var condition = conditionFactory(module.id);
            _this._bindingDictionary.removeByCondition(condition);
        });
    };
    Container.prototype.bind = function (serviceIdentifier) {
        var scope = this.options.defaultScope || literal_types_1.BindingScopeEnum.Transient;
        var binding = new binding_1.Binding(serviceIdentifier, scope);
        this._bindingDictionary.add(serviceIdentifier, binding);
        return new binding_to_syntax_1.BindingToSyntax(binding);
    };
    Container.prototype.rebind = function (serviceIdentifier) {
        this.unbind(serviceIdentifier);
        return this.bind(serviceIdentifier);
    };
    Container.prototype.unbind = function (serviceIdentifier) {
        try {
            this._bindingDictionary.remove(serviceIdentifier);
        }
        catch (e) {
            throw new Error(ERROR_MSGS.CANNOT_UNBIND + " " + serialization_1.getServiceIdentifierAsString(serviceIdentifier));
        }
    };
    Container.prototype.unbindAll = function () {
        this._bindingDictionary = new lookup_1.Lookup();
    };
    Container.prototype.isBound = function (serviceIdentifier) {
        var bound = this._bindingDictionary.hasKey(serviceIdentifier);
        if (!bound && this.parent) {
            bound = this.parent.isBound(serviceIdentifier);
        }
        return bound;
    };
    Container.prototype.isBoundNamed = function (serviceIdentifier, named) {
        return this.isBoundTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.isBoundTagged = function (serviceIdentifier, key, value) {
        var bound = false;
        if (this._bindingDictionary.hasKey(serviceIdentifier)) {
            var bindings = this._bindingDictionary.get(serviceIdentifier);
            var request_1 = planner_1.createMockRequest(this, serviceIdentifier, key, value);
            bound = bindings.some(function (b) { return b.constraint(request_1); });
        }
        if (!bound && this.parent) {
            bound = this.parent.isBoundTagged(serviceIdentifier, key, value);
        }
        return bound;
    };
    Container.prototype.snapshot = function () {
        this._snapshots.push(container_snapshot_1.ContainerSnapshot.of(this._bindingDictionary.clone(), this._middleware));
    };
    Container.prototype.restore = function () {
        var snapshot = this._snapshots.pop();
        if (snapshot === undefined) {
            throw new Error(ERROR_MSGS.NO_MORE_SNAPSHOTS_AVAILABLE);
        }
        this._bindingDictionary = snapshot.bindings;
        this._middleware = snapshot.middleware;
    };
    Container.prototype.createChild = function (containerOptions) {
        var child = new Container(containerOptions || this.options);
        child.parent = this;
        return child;
    };
    Container.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        var initial = (this._middleware) ? this._middleware : this._planAndResolve();
        this._middleware = middlewares.reduce(function (prev, curr) { return curr(prev); }, initial);
    };
    Container.prototype.applyCustomMetadataReader = function (metadataReader) {
        this._metadataReader = metadataReader;
    };
    Container.prototype.get = function (serviceIdentifier) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getTagged = function (serviceIdentifier, key, value) {
        return this._get(false, false, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getNamed = function (serviceIdentifier, named) {
        return this.getTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.getAll = function (serviceIdentifier) {
        return this._get(true, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier);
    };
    Container.prototype.getAllTagged = function (serviceIdentifier, key, value) {
        return this._get(false, true, literal_types_1.TargetTypeEnum.Variable, serviceIdentifier, key, value);
    };
    Container.prototype.getAllNamed = function (serviceIdentifier, named) {
        return this.getAllTagged(serviceIdentifier, METADATA_KEY.NAMED_TAG, named);
    };
    Container.prototype.resolve = function (constructorFunction) {
        var tempContainer = this.createChild();
        tempContainer.bind(constructorFunction).toSelf();
        return tempContainer.get(constructorFunction);
    };
    Container.prototype._getContainerModuleHelpersFactory = function () {
        var _this = this;
        var setModuleId = function (bindingToSyntax, moduleId) {
            bindingToSyntax._binding.moduleId = moduleId;
        };
        var getBindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _bind = _this.bind.bind(_this);
                var bindingToSyntax = _bind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        var getUnbindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _unbind = _this.unbind.bind(_this);
                _unbind(serviceIdentifier);
            };
        };
        var getIsboundFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _isBound = _this.isBound.bind(_this);
                return _isBound(serviceIdentifier);
            };
        };
        var getRebindFunction = function (moduleId) {
            return function (serviceIdentifier) {
                var _rebind = _this.rebind.bind(_this);
                var bindingToSyntax = _rebind(serviceIdentifier);
                setModuleId(bindingToSyntax, moduleId);
                return bindingToSyntax;
            };
        };
        return function (mId) { return ({
            bindFunction: getBindFunction(mId),
            isboundFunction: getIsboundFunction(mId),
            rebindFunction: getRebindFunction(mId),
            unbindFunction: getUnbindFunction(mId)
        }); };
    };
    Container.prototype._get = function (avoidConstraints, isMultiInject, targetType, serviceIdentifier, key, value) {
        var result = null;
        var defaultArgs = {
            avoidConstraints: avoidConstraints,
            contextInterceptor: function (context) { return context; },
            isMultiInject: isMultiInject,
            key: key,
            serviceIdentifier: serviceIdentifier,
            targetType: targetType,
            value: value
        };
        if (this._middleware) {
            result = this._middleware(defaultArgs);
            if (result === undefined || result === null) {
                throw new Error(ERROR_MSGS.INVALID_MIDDLEWARE_RETURN);
            }
        }
        else {
            result = this._planAndResolve()(defaultArgs);
        }
        return result;
    };
    Container.prototype._planAndResolve = function () {
        var _this = this;
        return function (args) {
            var context = planner_1.plan(_this._metadataReader, _this, args.isMultiInject, args.targetType, args.serviceIdentifier, args.key, args.value, args.avoidConstraints);
            context = args.contextInterceptor(context);
            var result = resolver_1.resolve(context);
            return result;
        };
    };
    return Container;
}());
exports.Container = Container;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(13);
var id_1 = __webpack_require__(17);
var Binding = (function () {
    function Binding(serviceIdentifier, scope) {
        this.id = id_1.id();
        this.activated = false;
        this.serviceIdentifier = serviceIdentifier;
        this.scope = scope;
        this.type = literal_types_1.BindingTypeEnum.Invalid;
        this.constraint = function (request) { return true; };
        this.implementationType = null;
        this.cache = null;
        this.factory = null;
        this.provider = null;
        this.onActivation = null;
        this.dynamicValue = null;
    }
    Binding.prototype.clone = function () {
        var clone = new Binding(this.serviceIdentifier, this.scope);
        clone.activated = false;
        clone.implementationType = this.implementationType;
        clone.dynamicValue = this.dynamicValue;
        clone.scope = this.scope;
        clone.type = this.type;
        clone.factory = this.factory;
        clone.provider = this.provider;
        clone.constraint = this.constraint;
        clone.onActivation = this.onActivation;
        clone.cache = this.cache;
        return clone;
    };
    return Binding;
}());
exports.Binding = Binding;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_count_1 = __webpack_require__(154);
var ERROR_MSGS = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var METADATA_KEY = __webpack_require__(2);
var exceptions_1 = __webpack_require__(75);
var serialization_1 = __webpack_require__(22);
var context_1 = __webpack_require__(155);
var metadata_1 = __webpack_require__(8);
var plan_1 = __webpack_require__(156);
var reflection_utils_1 = __webpack_require__(157);
var request_1 = __webpack_require__(159);
var target_1 = __webpack_require__(77);
function getBindingDictionary(cntnr) {
    return cntnr._bindingDictionary;
}
exports.getBindingDictionary = getBindingDictionary;
function _createTarget(isMultiInject, targetType, serviceIdentifier, name, key, value) {
    var metadataKey = isMultiInject ? METADATA_KEY.MULTI_INJECT_TAG : METADATA_KEY.INJECT_TAG;
    var injectMetadata = new metadata_1.Metadata(metadataKey, serviceIdentifier);
    var target = new target_1.Target(targetType, name, serviceIdentifier, injectMetadata);
    if (key !== undefined) {
        var tagMetadata = new metadata_1.Metadata(key, value);
        target.metadata.push(tagMetadata);
    }
    return target;
}
function _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target) {
    var bindings = getBindings(context.container, target.serviceIdentifier);
    var activeBindings = [];
    if (bindings.length === binding_count_1.BindingCount.NoBindingsAvailable &&
        context.container.options.autoBindInjectable &&
        typeof target.serviceIdentifier === "function" &&
        metadataReader.getConstructorMetadata(target.serviceIdentifier).compilerGeneratedMetadata) {
        context.container.bind(target.serviceIdentifier).toSelf();
        bindings = getBindings(context.container, target.serviceIdentifier);
    }
    if (!avoidConstraints) {
        activeBindings = bindings.filter(function (binding) {
            var request = new request_1.Request(binding.serviceIdentifier, context, parentRequest, binding, target);
            return binding.constraint(request);
        });
    }
    else {
        activeBindings = bindings;
    }
    _validateActiveBindingCount(target.serviceIdentifier, activeBindings, target, context.container);
    return activeBindings;
}
function _validateActiveBindingCount(serviceIdentifier, bindings, target, container) {
    switch (bindings.length) {
        case binding_count_1.BindingCount.NoBindingsAvailable:
            if (target.isOptional()) {
                return bindings;
            }
            else {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.NOT_REGISTERED;
                msg += serialization_1.listMetadataForTarget(serviceIdentifierString, target);
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
        case binding_count_1.BindingCount.OnlyOneBindingAvailable:
            if (!target.isArray()) {
                return bindings;
            }
        case binding_count_1.BindingCount.MultipleBindingsAvailable:
        default:
            if (!target.isArray()) {
                var serviceIdentifierString = serialization_1.getServiceIdentifierAsString(serviceIdentifier);
                var msg = ERROR_MSGS.AMBIGUOUS_MATCH + " " + serviceIdentifierString;
                msg += serialization_1.listRegisteredBindingsForServiceIdentifier(container, serviceIdentifierString, getBindings);
                throw new Error(msg);
            }
            else {
                return bindings;
            }
    }
}
function _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, parentRequest, target) {
    var activeBindings;
    var childRequest;
    if (parentRequest === null) {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, null, target);
        childRequest = new request_1.Request(serviceIdentifier, context, null, activeBindings, target);
        var thePlan = new plan_1.Plan(context, childRequest);
        context.addPlan(thePlan);
    }
    else {
        activeBindings = _getActiveBindings(metadataReader, avoidConstraints, context, parentRequest, target);
        childRequest = parentRequest.addChildRequest(target.serviceIdentifier, activeBindings, target);
    }
    activeBindings.forEach(function (binding) {
        var subChildRequest = null;
        if (target.isArray()) {
            subChildRequest = childRequest.addChildRequest(binding.serviceIdentifier, binding, target);
        }
        else {
            if (binding.cache) {
                return;
            }
            subChildRequest = childRequest;
        }
        if (binding.type === literal_types_1.BindingTypeEnum.Instance && binding.implementationType !== null) {
            var dependencies = reflection_utils_1.getDependencies(metadataReader, binding.implementationType);
            if (!context.container.options.skipBaseClassChecks) {
                var baseClassDependencyCount = reflection_utils_1.getBaseClassDependencyCount(metadataReader, binding.implementationType);
                if (dependencies.length < baseClassDependencyCount) {
                    var error = ERROR_MSGS.ARGUMENTS_LENGTH_MISMATCH(reflection_utils_1.getFunctionName(binding.implementationType));
                    throw new Error(error);
                }
            }
            dependencies.forEach(function (dependency) {
                _createSubRequests(metadataReader, false, dependency.serviceIdentifier, context, subChildRequest, dependency);
            });
        }
    });
}
function getBindings(container, serviceIdentifier) {
    var bindings = [];
    var bindingDictionary = getBindingDictionary(container);
    if (bindingDictionary.hasKey(serviceIdentifier)) {
        bindings = bindingDictionary.get(serviceIdentifier);
    }
    else if (container.parent !== null) {
        bindings = getBindings(container.parent, serviceIdentifier);
    }
    return bindings;
}
function plan(metadataReader, container, isMultiInject, targetType, serviceIdentifier, key, value, avoidConstraints) {
    if (avoidConstraints === void 0) { avoidConstraints = false; }
    var context = new context_1.Context(container);
    var target = _createTarget(isMultiInject, targetType, serviceIdentifier, "", key, value);
    try {
        _createSubRequests(metadataReader, avoidConstraints, serviceIdentifier, context, null, target);
        return context;
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            if (context.plan) {
                serialization_1.circularDependencyToException(context.plan.rootRequest);
            }
        }
        throw error;
    }
}
exports.plan = plan;
function createMockRequest(container, serviceIdentifier, key, value) {
    var target = new target_1.Target(literal_types_1.TargetTypeEnum.Variable, "", serviceIdentifier, new metadata_1.Metadata(key, value));
    var context = new context_1.Context(container);
    var request = new request_1.Request(serviceIdentifier, context, null, [], target);
    return request;
}
exports.createMockRequest = createMockRequest;


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BindingCount = {
    MultipleBindingsAvailable: 2,
    NoBindingsAvailable: 0,
    OnlyOneBindingAvailable: 1
};
exports.BindingCount = BindingCount;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(17);
var Context = (function () {
    function Context(container) {
        this.id = id_1.id();
        this.container = container;
    }
    Context.prototype.addPlan = function (plan) {
        this.plan = plan;
    };
    Context.prototype.setCurrentRequest = function (currentRequest) {
        this.currentRequest = currentRequest;
    };
    return Context;
}());
exports.Context = Context;


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plan = (function () {
    function Plan(parentContext, rootRequest) {
        this.parentContext = parentContext;
        this.rootRequest = rootRequest;
    }
    return Plan;
}());
exports.Plan = Plan;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var inject_1 = __webpack_require__(76);
var ERROR_MSGS = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var METADATA_KEY = __webpack_require__(2);
var serialization_1 = __webpack_require__(22);
exports.getFunctionName = serialization_1.getFunctionName;
var target_1 = __webpack_require__(77);
function getDependencies(metadataReader, func) {
    var constructorName = serialization_1.getFunctionName(func);
    var targets = getTargets(metadataReader, constructorName, func, false);
    return targets;
}
exports.getDependencies = getDependencies;
function getTargets(metadataReader, constructorName, func, isBaseClass) {
    var metadata = metadataReader.getConstructorMetadata(func);
    var serviceIdentifiers = metadata.compilerGeneratedMetadata;
    if (serviceIdentifiers === undefined) {
        var msg = ERROR_MSGS.MISSING_INJECTABLE_ANNOTATION + " " + constructorName + ".";
        throw new Error(msg);
    }
    var constructorArgsMetadata = metadata.userGeneratedMetadata;
    var keys = Object.keys(constructorArgsMetadata);
    var hasUserDeclaredUnknownInjections = (func.length === 0 && keys.length > 0);
    var iterations = (hasUserDeclaredUnknownInjections) ? keys.length : func.length;
    var constructorTargets = getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations);
    var propertyTargets = getClassPropsAsTargets(metadataReader, func);
    var targets = constructorTargets.concat(propertyTargets);
    return targets;
}
function getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata) {
    var targetMetadata = constructorArgsMetadata[index.toString()] || [];
    var metadata = formatTargetMetadata(targetMetadata);
    var isManaged = metadata.unmanaged !== true;
    var serviceIdentifier = serviceIdentifiers[index];
    var injectIdentifier = (metadata.inject || metadata.multiInject);
    serviceIdentifier = (injectIdentifier) ? (injectIdentifier) : serviceIdentifier;
    if (serviceIdentifier instanceof inject_1.LazyServiceIdentifer) {
        serviceIdentifier = serviceIdentifier.unwrap();
    }
    if (isManaged) {
        var isObject = serviceIdentifier === Object;
        var isFunction = serviceIdentifier === Function;
        var isUndefined = serviceIdentifier === undefined;
        var isUnknownType = (isObject || isFunction || isUndefined);
        if (!isBaseClass && isUnknownType) {
            var msg = ERROR_MSGS.MISSING_INJECT_ANNOTATION + " argument " + index + " in class " + constructorName + ".";
            throw new Error(msg);
        }
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ConstructorArgument, metadata.targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        return target;
    }
    return null;
}
function getConstructorArgsAsTargets(isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata, iterations) {
    var targets = [];
    for (var i = 0; i < iterations; i++) {
        var index = i;
        var target = getConstructorArgsAsTarget(index, isBaseClass, constructorName, serviceIdentifiers, constructorArgsMetadata);
        if (target !== null) {
            targets.push(target);
        }
    }
    return targets;
}
function getClassPropsAsTargets(metadataReader, constructorFunc) {
    var classPropsMetadata = metadataReader.getPropertiesMetadata(constructorFunc);
    var targets = [];
    var keys = Object.keys(classPropsMetadata);
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var key = keys_1[_i];
        var targetMetadata = classPropsMetadata[key];
        var metadata = formatTargetMetadata(classPropsMetadata[key]);
        var targetName = metadata.targetName || key;
        var serviceIdentifier = (metadata.inject || metadata.multiInject);
        var target = new target_1.Target(literal_types_1.TargetTypeEnum.ClassProperty, targetName, serviceIdentifier);
        target.metadata = targetMetadata;
        targets.push(target);
    }
    var baseConstructor = Object.getPrototypeOf(constructorFunc.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseTargets = getClassPropsAsTargets(metadataReader, baseConstructor);
        targets = targets.concat(baseTargets);
    }
    return targets;
}
function getBaseClassDependencyCount(metadataReader, func) {
    var baseConstructor = Object.getPrototypeOf(func.prototype).constructor;
    if (baseConstructor !== Object) {
        var baseConstructorName = serialization_1.getFunctionName(baseConstructor);
        var targets = getTargets(metadataReader, baseConstructorName, baseConstructor, true);
        var metadata = targets.map(function (t) {
            return t.metadata.filter(function (m) {
                return m.key === METADATA_KEY.UNMANAGED_TAG;
            });
        });
        var unmanagedCount = [].concat.apply([], metadata).length;
        var dependencyCount = targets.length - unmanagedCount;
        if (dependencyCount > 0) {
            return dependencyCount;
        }
        else {
            return getBaseClassDependencyCount(metadataReader, baseConstructor);
        }
    }
    else {
        return 0;
    }
}
exports.getBaseClassDependencyCount = getBaseClassDependencyCount;
function formatTargetMetadata(targetMetadata) {
    var targetMetadataMap = {};
    targetMetadata.forEach(function (m) {
        targetMetadataMap[m.key.toString()] = m.value;
    });
    return {
        inject: targetMetadataMap[METADATA_KEY.INJECT_TAG],
        multiInject: targetMetadataMap[METADATA_KEY.MULTI_INJECT_TAG],
        targetName: targetMetadataMap[METADATA_KEY.NAME_TAG],
        unmanaged: targetMetadataMap[METADATA_KEY.UNMANAGED_TAG]
    };
}


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var QueryableString = (function () {
    function QueryableString(str) {
        this.str = str;
    }
    QueryableString.prototype.startsWith = function (searchString) {
        return this.str.indexOf(searchString) === 0;
    };
    QueryableString.prototype.endsWith = function (searchString) {
        var reverseString = "";
        var reverseSearchString = searchString.split("").reverse().join("");
        reverseString = this.str.split("").reverse().join("");
        return this.startsWith.call({ str: reverseString }, reverseSearchString);
    };
    QueryableString.prototype.contains = function (searchString) {
        return (this.str.indexOf(searchString) !== -1);
    };
    QueryableString.prototype.equals = function (compareString) {
        return this.str === compareString;
    };
    QueryableString.prototype.value = function () {
        return this.str;
    };
    return QueryableString;
}());
exports.QueryableString = QueryableString;


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(17);
var Request = (function () {
    function Request(serviceIdentifier, parentContext, parentRequest, bindings, target) {
        this.id = id_1.id();
        this.serviceIdentifier = serviceIdentifier;
        this.parentContext = parentContext;
        this.parentRequest = parentRequest;
        this.target = target;
        this.childRequests = [];
        this.bindings = (Array.isArray(bindings) ? bindings : [bindings]);
        this.requestScope = parentRequest === null
            ? new Map()
            : null;
    }
    Request.prototype.addChildRequest = function (serviceIdentifier, bindings, target) {
        var child = new Request(serviceIdentifier, this.parentContext, this, bindings, target);
        this.childRequests.push(child);
        return child;
    };
    return Request;
}());
exports.Request = Request;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var exceptions_1 = __webpack_require__(75);
var serialization_1 = __webpack_require__(22);
var instantiation_1 = __webpack_require__(161);
var invokeFactory = function (factoryType, serviceIdentifier, fn) {
    try {
        return fn();
    }
    catch (error) {
        if (exceptions_1.isStackOverflowExeption(error)) {
            throw new Error(ERROR_MSGS.CIRCULAR_DEPENDENCY_IN_FACTORY(factoryType, serviceIdentifier.toString()));
        }
        else {
            throw error;
        }
    }
};
var _resolveRequest = function (requestScope) {
    return function (request) {
        request.parentContext.setCurrentRequest(request);
        var bindings = request.bindings;
        var childRequests = request.childRequests;
        var targetIsAnArray = request.target && request.target.isArray();
        var targetParentIsNotAnArray = !request.parentRequest ||
            !request.parentRequest.target ||
            !request.target ||
            !request.parentRequest.target.matchesArray(request.target.serviceIdentifier);
        if (targetIsAnArray && targetParentIsNotAnArray) {
            return childRequests.map(function (childRequest) {
                var _f = _resolveRequest(requestScope);
                return _f(childRequest);
            });
        }
        else {
            var result = null;
            if (request.target.isOptional() && bindings.length === 0) {
                return undefined;
            }
            var binding_1 = bindings[0];
            var isSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Singleton;
            var isRequestSingleton = binding_1.scope === literal_types_1.BindingScopeEnum.Request;
            if (isSingleton && binding_1.activated) {
                return binding_1.cache;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                requestScope.has(binding_1.id)) {
                return requestScope.get(binding_1.id);
            }
            if (binding_1.type === literal_types_1.BindingTypeEnum.ConstantValue) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Function) {
                result = binding_1.cache;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Constructor) {
                result = binding_1.implementationType;
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.DynamicValue && binding_1.dynamicValue !== null) {
                result = invokeFactory("toDynamicValue", binding_1.serviceIdentifier, function () { return binding_1.dynamicValue(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Factory && binding_1.factory !== null) {
                result = invokeFactory("toFactory", binding_1.serviceIdentifier, function () { return binding_1.factory(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Provider && binding_1.provider !== null) {
                result = invokeFactory("toProvider", binding_1.serviceIdentifier, function () { return binding_1.provider(request.parentContext); });
            }
            else if (binding_1.type === literal_types_1.BindingTypeEnum.Instance && binding_1.implementationType !== null) {
                result = instantiation_1.resolveInstance(binding_1.implementationType, childRequests, _resolveRequest(requestScope));
            }
            else {
                var serviceIdentifier = serialization_1.getServiceIdentifierAsString(request.serviceIdentifier);
                throw new Error(ERROR_MSGS.INVALID_BINDING_TYPE + " " + serviceIdentifier);
            }
            if (typeof binding_1.onActivation === "function") {
                result = binding_1.onActivation(request.parentContext, result);
            }
            if (isSingleton) {
                binding_1.cache = result;
                binding_1.activated = true;
            }
            if (isRequestSingleton &&
                requestScope !== null &&
                !requestScope.has(binding_1.id)) {
                requestScope.set(binding_1.id, result);
            }
            return result;
        }
    };
};
function resolve(context) {
    var _f = _resolveRequest(context.plan.rootRequest.requestScope);
    return _f(context.plan.rootRequest);
}
exports.resolve = resolve;


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var error_msgs_1 = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var METADATA_KEY = __webpack_require__(2);
function _injectProperties(instance, childRequests, resolveRequest) {
    var propertyInjectionsRequests = childRequests.filter(function (childRequest) {
        return (childRequest.target !== null &&
            childRequest.target.type === literal_types_1.TargetTypeEnum.ClassProperty);
    });
    var propertyInjections = propertyInjectionsRequests.map(resolveRequest);
    propertyInjectionsRequests.forEach(function (r, index) {
        var propertyName = "";
        propertyName = r.target.name.value();
        var injection = propertyInjections[index];
        instance[propertyName] = injection;
    });
    return instance;
}
function _createInstance(Func, injections) {
    return new (Func.bind.apply(Func, [void 0].concat(injections)))();
}
function _postConstruct(constr, result) {
    if (Reflect.hasMetadata(METADATA_KEY.POST_CONSTRUCT, constr)) {
        var data = Reflect.getMetadata(METADATA_KEY.POST_CONSTRUCT, constr);
        try {
            result[data.value]();
        }
        catch (e) {
            throw new Error(error_msgs_1.POST_CONSTRUCT_ERROR(constr.name, e.message));
        }
    }
}
function resolveInstance(constr, childRequests, resolveRequest) {
    var result = null;
    if (childRequests.length > 0) {
        var constructorInjectionsRequests = childRequests.filter(function (childRequest) {
            return (childRequest.target !== null && childRequest.target.type === literal_types_1.TargetTypeEnum.ConstructorArgument);
        });
        var constructorInjections = constructorInjectionsRequests.map(resolveRequest);
        result = _createInstance(constr, constructorInjections);
        result = _injectProperties(result, childRequests, resolveRequest);
    }
    else {
        result = new constr();
    }
    _postConstruct(constr, result);
    return result;
}
exports.resolveInstance = resolveInstance;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
var literal_types_1 = __webpack_require__(13);
var binding_in_when_on_syntax_1 = __webpack_require__(163);
var binding_when_on_syntax_1 = __webpack_require__(78);
var BindingToSyntax = (function () {
    function BindingToSyntax(binding) {
        this._binding = binding;
    }
    BindingToSyntax.prototype.to = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Instance;
        this._binding.implementationType = constructor;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toSelf = function () {
        if (typeof this._binding.serviceIdentifier !== "function") {
            throw new Error("" + ERROR_MSGS.INVALID_TO_SELF_VALUE);
        }
        var self = this._binding.serviceIdentifier;
        return this.to(self);
    };
    BindingToSyntax.prototype.toConstantValue = function (value) {
        this._binding.type = literal_types_1.BindingTypeEnum.ConstantValue;
        this._binding.cache = value;
        this._binding.dynamicValue = null;
        this._binding.implementationType = null;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toDynamicValue = function (func) {
        this._binding.type = literal_types_1.BindingTypeEnum.DynamicValue;
        this._binding.cache = null;
        this._binding.dynamicValue = func;
        this._binding.implementationType = null;
        return new binding_in_when_on_syntax_1.BindingInWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toConstructor = function (constructor) {
        this._binding.type = literal_types_1.BindingTypeEnum.Constructor;
        this._binding.implementationType = constructor;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFactory = function (factory) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = factory;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toFunction = function (func) {
        if (typeof func !== "function") {
            throw new Error(ERROR_MSGS.INVALID_FUNCTION_BINDING);
        }
        var bindingWhenOnSyntax = this.toConstantValue(func);
        this._binding.type = literal_types_1.BindingTypeEnum.Function;
        return bindingWhenOnSyntax;
    };
    BindingToSyntax.prototype.toAutoFactory = function (serviceIdentifier) {
        this._binding.type = literal_types_1.BindingTypeEnum.Factory;
        this._binding.factory = function (context) {
            var autofactory = function () { return context.container.get(serviceIdentifier); };
            return autofactory;
        };
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toProvider = function (provider) {
        this._binding.type = literal_types_1.BindingTypeEnum.Provider;
        this._binding.provider = provider;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingToSyntax.prototype.toService = function (service) {
        this.toDynamicValue(function (context) { return context.container.get(service); });
    };
    return BindingToSyntax;
}());
exports.BindingToSyntax = BindingToSyntax;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binding_in_syntax_1 = __webpack_require__(164);
var binding_on_syntax_1 = __webpack_require__(51);
var binding_when_syntax_1 = __webpack_require__(52);
var BindingInWhenOnSyntax = (function () {
    function BindingInWhenOnSyntax(binding) {
        this._binding = binding;
        this._bindingWhenSyntax = new binding_when_syntax_1.BindingWhenSyntax(this._binding);
        this._bindingOnSyntax = new binding_on_syntax_1.BindingOnSyntax(this._binding);
        this._bindingInSyntax = new binding_in_syntax_1.BindingInSyntax(binding);
    }
    BindingInWhenOnSyntax.prototype.inRequestScope = function () {
        return this._bindingInSyntax.inRequestScope();
    };
    BindingInWhenOnSyntax.prototype.inSingletonScope = function () {
        return this._bindingInSyntax.inSingletonScope();
    };
    BindingInWhenOnSyntax.prototype.inTransientScope = function () {
        return this._bindingInSyntax.inTransientScope();
    };
    BindingInWhenOnSyntax.prototype.when = function (constraint) {
        return this._bindingWhenSyntax.when(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenTargetNamed = function (name) {
        return this._bindingWhenSyntax.whenTargetNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenTargetIsDefault = function () {
        return this._bindingWhenSyntax.whenTargetIsDefault();
    };
    BindingInWhenOnSyntax.prototype.whenTargetTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenTargetTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenInjectedInto = function (parent) {
        return this._bindingWhenSyntax.whenInjectedInto(parent);
    };
    BindingInWhenOnSyntax.prototype.whenParentNamed = function (name) {
        return this._bindingWhenSyntax.whenParentNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenParentTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenParentTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenAnyAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorIs = function (ancestor) {
        return this._bindingWhenSyntax.whenNoAncestorIs(ancestor);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenAnyAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenAnyAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorNamed = function (name) {
        return this._bindingWhenSyntax.whenNoAncestorNamed(name);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorTagged = function (tag, value) {
        return this._bindingWhenSyntax.whenNoAncestorTagged(tag, value);
    };
    BindingInWhenOnSyntax.prototype.whenAnyAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenAnyAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.whenNoAncestorMatches = function (constraint) {
        return this._bindingWhenSyntax.whenNoAncestorMatches(constraint);
    };
    BindingInWhenOnSyntax.prototype.onActivation = function (handler) {
        return this._bindingOnSyntax.onActivation(handler);
    };
    return BindingInWhenOnSyntax;
}());
exports.BindingInWhenOnSyntax = BindingInWhenOnSyntax;


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var literal_types_1 = __webpack_require__(13);
var binding_when_on_syntax_1 = __webpack_require__(78);
var BindingInSyntax = (function () {
    function BindingInSyntax(binding) {
        this._binding = binding;
    }
    BindingInSyntax.prototype.inRequestScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Request;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inSingletonScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Singleton;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    BindingInSyntax.prototype.inTransientScope = function () {
        this._binding.scope = literal_types_1.BindingScopeEnum.Transient;
        return new binding_when_on_syntax_1.BindingWhenOnSyntax(this._binding);
    };
    return BindingInSyntax;
}());
exports.BindingInSyntax = BindingInSyntax;


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ContainerSnapshot = (function () {
    function ContainerSnapshot() {
    }
    ContainerSnapshot.of = function (bindings, middleware) {
        var snapshot = new ContainerSnapshot();
        snapshot.bindings = bindings;
        snapshot.middleware = middleware;
        return snapshot;
    };
    return ContainerSnapshot;
}());
exports.ContainerSnapshot = ContainerSnapshot;


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERROR_MSGS = __webpack_require__(5);
var Lookup = (function () {
    function Lookup() {
        this._map = new Map();
    }
    Lookup.prototype.getMap = function () {
        return this._map;
    };
    Lookup.prototype.add = function (serviceIdentifier, value) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (value === null || value === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            entry.push(value);
            this._map.set(serviceIdentifier, entry);
        }
        else {
            this._map.set(serviceIdentifier, [value]);
        }
    };
    Lookup.prototype.get = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        var entry = this._map.get(serviceIdentifier);
        if (entry !== undefined) {
            return entry;
        }
        else {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.remove = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        if (!this._map.delete(serviceIdentifier)) {
            throw new Error(ERROR_MSGS.KEY_NOT_FOUND);
        }
    };
    Lookup.prototype.removeByCondition = function (condition) {
        var _this = this;
        this._map.forEach(function (entries, key) {
            var updatedEntries = entries.filter(function (entry) { return !condition(entry); });
            if (updatedEntries.length > 0) {
                _this._map.set(key, updatedEntries);
            }
            else {
                _this._map.delete(key);
            }
        });
    };
    Lookup.prototype.hasKey = function (serviceIdentifier) {
        if (serviceIdentifier === null || serviceIdentifier === undefined) {
            throw new Error(ERROR_MSGS.NULL_ARGUMENT);
        }
        return this._map.has(serviceIdentifier);
    };
    Lookup.prototype.clone = function () {
        var copy = new Lookup();
        this._map.forEach(function (value, key) {
            value.forEach(function (b) { return copy.add(key, b.clone()); });
        });
        return copy;
    };
    Lookup.prototype.traverse = function (func) {
        this._map.forEach(function (value, key) {
            func(key, value);
        });
    };
    return Lookup;
}());
exports.Lookup = Lookup;


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = __webpack_require__(17);
var ContainerModule = (function () {
    function ContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return ContainerModule;
}());
exports.ContainerModule = ContainerModule;
var AsyncContainerModule = (function () {
    function AsyncContainerModule(registry) {
        this.id = id_1.id();
        this.registry = registry;
    }
    return AsyncContainerModule;
}());
exports.AsyncContainerModule = AsyncContainerModule;


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(5);
var METADATA_KEY = __webpack_require__(2);
function injectable() {
    return function (target) {
        if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
            throw new Error(ERRORS_MSGS.DUPLICATED_INJECTABLE_DECORATOR);
        }
        var types = Reflect.getMetadata(METADATA_KEY.DESIGN_PARAM_TYPES, target) || [];
        Reflect.defineMetadata(METADATA_KEY.PARAM_TYPES, types, target);
        return target;
    };
}
exports.injectable = injectable;


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function tagged(metadataKey, metadataValue) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(metadataKey, metadataValue);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.tagged = tagged;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function named(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAMED_TAG, name);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.named = named;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function optional() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.OPTIONAL_TAG, true);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.optional = optional;


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function unmanaged() {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.UNMANAGED_TAG, true);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.unmanaged = unmanaged;


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function multiInject(serviceIdentifier) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.MULTI_INJECT_TAG, serviceIdentifier);
        if (typeof index === "number") {
            decorator_utils_1.tagParameter(target, targetKey, index, metadata);
        }
        else {
            decorator_utils_1.tagProperty(target, targetKey, metadata);
        }
    };
}
exports.multiInject = multiInject;


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
var decorator_utils_1 = __webpack_require__(15);
function targetName(name) {
    return function (target, targetKey, index) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.NAME_TAG, name);
        decorator_utils_1.tagParameter(target, targetKey, index, metadata);
    };
}
exports.targetName = targetName;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ERRORS_MSGS = __webpack_require__(5);
var METADATA_KEY = __webpack_require__(2);
var metadata_1 = __webpack_require__(8);
function postConstruct() {
    return function (target, propertyKey, descriptor) {
        var metadata = new metadata_1.Metadata(METADATA_KEY.POST_CONSTRUCT, propertyKey);
        if (Reflect.hasOwnMetadata(METADATA_KEY.POST_CONSTRUCT, target.constructor)) {
            throw new Error(ERRORS_MSGS.MULTIPLE_POST_CONSTRUCT_METHODS);
        }
        Reflect.defineMetadata(METADATA_KEY.POST_CONSTRUCT, metadata, target.constructor);
    };
}
exports.postConstruct = postConstruct;


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.multiBindToService = function (container) {
    return function (service) {
        return function () {
            var types = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                types[_i] = arguments[_i];
            }
            return types.forEach(function (t) { return container.bind(t).toService(service); });
        };
    };
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(33);
const rpc = __importStar(__webpack_require__(16));
const constants_1 = __webpack_require__(32);
const auth_1 = __webpack_require__(80);
const ui_1 = __importDefault(__webpack_require__(34));
const handle_event_1 = __webpack_require__(55);
const container_1 = __webpack_require__(20);
const debug_1 = __webpack_require__(53);
let AuthScene = class AuthScene {
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            debug_1.log('ready for auth');
            const { auth } = mp.storage.data;
            if (auth) {
                const { data, token } = auth;
                const isTokenValid = yield rpc.callServer(constants_1.SharedConstants.Auth.RPC.SUBMIT_AUTH_TOKEN, {
                    token,
                    data,
                });
                if (isTokenValid) {
                    rpc.call(auth_1.AuthConstants.RPC.AFTER_PLAYER_LOGIN, auth);
                    return;
                }
            }
            ui_1.default.show('Auth');
            mp.gui.chat.activate(false);
            mp.gui.cursor.show(true, true);
        });
    }
    /**
     * We succesfully logged in, hide auth forms.
     */
    end() {
        ui_1.default.hide('Auth');
        mp.gui.chat.activate(true);
        mp.gui.cursor.show(false, false);
    }
};
__decorate([
    handle_event_1.handleEvent(constants_1.SharedConstants.Auth.Events.PLAYER_READY_FOR_AUTHENTICATION),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthScene.prototype, "start", null);
__decorate([
    handle_event_1.handleEvent(auth_1.AuthConstants.Events.AFTER_PLAYER_LOGIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthScene.prototype, "end", null);
AuthScene = __decorate([
    container_1.bind(),
    inversify_1.injectable()
], AuthScene);
exports.default = AuthScene;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthEvents;
(function (AuthEvents) {
    AuthEvents["AFTER_PLAYER_LOGIN"] = "afterPlayerLogin";
})(AuthEvents = exports.AuthEvents || (exports.AuthEvents = {}));
;


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AuthRPC;
(function (AuthRPC) {
    AuthRPC["AFTER_PLAYER_LOGIN"] = "RPC_afterPlayerLogin";
})(AuthRPC = exports.AuthRPC || (exports.AuthRPC = {}));
;


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = __webpack_require__(33);
const rpc = __importStar(__webpack_require__(16));
const hook_event_1 = __webpack_require__(81);
const camera_1 = __importDefault(__webpack_require__(82));
const ui_1 = __importDefault(__webpack_require__(34));
const player_1 = __importDefault(__webpack_require__(83));
const handle_rpc_1 = __webpack_require__(84);
const character_selection_1 = __webpack_require__(85);
const character_creation_1 = __webpack_require__(86);
const game_1 = __webpack_require__(87);
const container_1 = __webpack_require__(20);
const handle_event_1 = __webpack_require__(55);
const CAMERA_POSITION = new mp.Vector3(1508.8, -1731.9, 79.3);
const CHARACTER_POSITION = new mp.Vector3(1507.9, -1732.3, 78.65);
let CharacterCreationScene = class CharacterCreationScene {
    constructor() {
        this.disableCameraMovements = false;
        this.cameraHorizontalOffset = 0;
        this.cameraVerticalOffset = 0;
        this.camera = camera_1.default.createCamera('characterCreationCam', 'default', CAMERA_POSITION, new mp.Vector3(0, 0, 0), 60);
        this.updateCamera = (force = false) => __awaiter(this, void 0, void 0, function* () {
            if (this.disableCameraMovements) {
                return;
            }
            const keys = {
                UP: game_1.GameConstants.VK.W,
                LEFT: game_1.GameConstants.VK.A,
                DOWN: game_1.GameConstants.VK.S,
                RIGHT: game_1.GameConstants.VK.D,
            };
            if (!force && !Object.values(keys).some(key => mp.keys.isDown(key))) {
                return;
            }
            if (mp.keys.isDown(keys.LEFT)) {
                this.cameraHorizontalOffset -= 0.02;
            }
            if (mp.keys.isDown(keys.RIGHT)) {
                this.cameraHorizontalOffset += 0.02;
            }
            if (mp.keys.isDown(keys.UP)) {
                this.cameraVerticalOffset = Math.max(-0.5, Math.min(0.5, this.cameraVerticalOffset + 0.02));
            }
            if (mp.keys.isDown(keys.DOWN)) {
                this.cameraVerticalOffset = Math.max(-0.5, Math.min(0.5, this.cameraVerticalOffset - 0.02));
            }
            const x = CHARACTER_POSITION.x + Math.cos(this.cameraHorizontalOffset);
            const y = CHARACTER_POSITION.y + Math.sin(this.cameraHorizontalOffset);
            const z = CAMERA_POSITION.z + Math.tan(this.cameraVerticalOffset);
            this.camera.setCoord(x, y, z);
            this.camera.pointAtPedBone(this.player.handle, game_1.GameConstants.Bones.SKEL_Head, -Math.cos(this.cameraHorizontalOffset) / 3, -Math.sin(this.cameraHorizontalOffset) / 3, 0, true);
        });
    }
    start() {
        mp.gui.chat.activate(false);
        this.camera.setActiveCamera(true);
        this.player = mp.players.local;
        const z = mp.game.gameplay.getGroundZFor3dCoord(CHARACTER_POSITION.x, CHARACTER_POSITION.y, CHARACTER_POSITION.z, 1000, false);
        this.player.setCoords(CHARACTER_POSITION.x, CHARACTER_POSITION.y, z, false, false, false, false);
        if (!z) {
            setTimeout(this.start.bind(this), 500);
            // While area is not streamed in, we won't be able to get correct Z coordinate
            // so retry until we do.
            return this;
        }
        this.player.setHeading(288);
        this.player.setInvincible(true);
        this.player.freezePosition(true);
        this.player.model = mp.game.joaat('mp_m_freemode_01');
        this.player.setComponentVariation(3, 15, 0, 2);
        this.player.setComponentVariation(4, 61, 0, 2);
        this.player.setComponentVariation(6, 34, 0, 2);
        this.player.setComponentVariation(8, 15, 0, 2);
        this.player.setComponentVariation(11, 15, 0, 2);
        this.updateCamera(true);
        rpc.register(character_creation_1.CharacterCreationConstants.RPC.UPDATE_CHARACTER_FEATURES, player_1.default.updateCharacterAppearance);
        ui_1.default.show('CharacterCreation');
        hook_event_1.hookEvent(game_1.GameConstants.Events.RENDER, unhook => {
            this.unhookRender = unhook;
            return this.updateCamera;
        });
        hook_event_1.hookEvent(game_1.GameConstants.Events.BROWSER_INPUT_FOCUS_CHANGED, unhook => {
            this.unhookBrowserInputFocusChanged = unhook;
            return isInputFocused => {
                this.disableCameraMovements = isInputFocused;
            };
        });
        return this;
    }
    end() {
        mp.gui.chat.activate(true);
        rpc.unregister(character_creation_1.CharacterCreationConstants.RPC.UPDATE_CHARACTER_FEATURES);
        this.unhookRender();
        this.unhookBrowserInputFocusChanged();
        this.camera.setActiveCamera(false);
        this.player.setInvincible(false);
        this.player.freezePosition(false);
        ui_1.default.hide('CharacterCreation');
    }
};
__decorate([
    handle_rpc_1.handleRPC(character_selection_1.CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreationScene.prototype, "start", null);
__decorate([
    handle_event_1.handleEvent(character_creation_1.CharacterCreationConstants.Events.CHARACTER_CREATED),
    handle_rpc_1.handleRPC(character_selection_1.CharacterSelectionConstants.RPC.END_CHARACTER_CREATION_SCENE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterCreationScene.prototype, "end", null);
CharacterCreationScene = __decorate([
    container_1.bind(),
    inversify_1.injectable()
], CharacterCreationScene);
exports.default = CharacterCreationScene;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CharacterSelectionRPC;
(function (CharacterSelectionRPC) {
    CharacterSelectionRPC["START_CHARACTER_SELECTON_SCENE"] = "startCharacterSelectionScene";
    CharacterSelectionRPC["END_CHARACTER_SELECTON_SCENE"] = "endCharacterSelectionScene";
    CharacterSelectionRPC["START_CHARACTER_CREATION_SCENE"] = "startCharacterCreationScene";
    CharacterSelectionRPC["END_CHARACTER_CREATION_SCENE"] = "endCharacterCreationScene";
    CharacterSelectionRPC["UPDATE_CHARACTER_FEATURES"] = "updateCharacterFeatures";
    CharacterSelectionRPC["CREATE_CHARACTER"] = "createCharacter";
    CharacterSelectionRPC["SELECT_CHARACTER"] = "selectCharacter";
    CharacterSelectionRPC["DELETE_CHARACTER"] = "deleteCharacter";
})(CharacterSelectionRPC = exports.CharacterSelectionRPC || (exports.CharacterSelectionRPC = {}));
;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CharacterCreationRPC;
(function (CharacterCreationRPC) {
    CharacterCreationRPC["UPDATE_CHARACTER_FEATURES"] = "updateCharacterFeatures";
})(CharacterCreationRPC = exports.CharacterCreationRPC || (exports.CharacterCreationRPC = {}));
;


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CharacterCreationEvents;
(function (CharacterCreationEvents) {
    CharacterCreationEvents["CHARACTER_CREATED"] = "characterCreated";
})(CharacterCreationEvents = exports.CharacterCreationEvents || (exports.CharacterCreationEvents = {}));
;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Bones;
(function (Bones) {
    Bones[Bones["SKEL_ROOT"] = 0] = "SKEL_ROOT";
    Bones[Bones["FB_R_Brow_Out_000"] = 1356] = "FB_R_Brow_Out_000";
    Bones[Bones["SKEL_L_Toe0"] = 2108] = "SKEL_L_Toe0";
    Bones[Bones["MH_R_Elbow"] = 2992] = "MH_R_Elbow";
    Bones[Bones["SKEL_L_Finger01"] = 4089] = "SKEL_L_Finger01";
    Bones[Bones["SKEL_L_Finger02"] = 4090] = "SKEL_L_Finger02";
    Bones[Bones["SKEL_L_Finger31"] = 4137] = "SKEL_L_Finger31";
    Bones[Bones["SKEL_L_Finger32"] = 4138] = "SKEL_L_Finger32";
    Bones[Bones["SKEL_L_Finger41"] = 4153] = "SKEL_L_Finger41";
    Bones[Bones["SKEL_L_Finger42"] = 4154] = "SKEL_L_Finger42";
    Bones[Bones["SKEL_L_Finger11"] = 4169] = "SKEL_L_Finger11";
    Bones[Bones["SKEL_L_Finger12"] = 4170] = "SKEL_L_Finger12";
    Bones[Bones["SKEL_L_Finger21"] = 4185] = "SKEL_L_Finger21";
    Bones[Bones["SKEL_L_Finger22"] = 4186] = "SKEL_L_Finger22";
    Bones[Bones["RB_L_ArmRoll"] = 5232] = "RB_L_ArmRoll";
    Bones[Bones["IK_R_Hand"] = 6286] = "IK_R_Hand";
    Bones[Bones["RB_R_ThighRoll"] = 6442] = "RB_R_ThighRoll";
    Bones[Bones["SKEL_R_Clavicle"] = 10706] = "SKEL_R_Clavicle";
    Bones[Bones["FB_R_Lip_Corner_000"] = 11174] = "FB_R_Lip_Corner_000";
    Bones[Bones["SKEL_Pelvis"] = 11816] = "SKEL_Pelvis";
    Bones[Bones["IK_Head"] = 12844] = "IK_Head";
    Bones[Bones["SKEL_L_Foot"] = 14201] = "SKEL_L_Foot";
    Bones[Bones["MH_R_Knee"] = 16335] = "MH_R_Knee";
    Bones[Bones["FB_LowerLipRoot_000"] = 17188] = "FB_LowerLipRoot_000";
    Bones[Bones["FB_R_Lip_Top_000"] = 17719] = "FB_R_Lip_Top_000";
    Bones[Bones["SKEL_L_Hand"] = 18905] = "SKEL_L_Hand";
    Bones[Bones["FB_R_CheekBone_000"] = 19336] = "FB_R_CheekBone_000";
    Bones[Bones["FB_UpperLipRoot_000"] = 20178] = "FB_UpperLipRoot_000";
    Bones[Bones["FB_L_Lip_Top_000"] = 20279] = "FB_L_Lip_Top_000";
    Bones[Bones["FB_LowerLip_000"] = 20623] = "FB_LowerLip_000";
    Bones[Bones["SKEL_R_Toe0"] = 20781] = "SKEL_R_Toe0";
    Bones[Bones["FB_L_CheekBone_000"] = 21550] = "FB_L_CheekBone_000";
    Bones[Bones["MH_L_Elbow"] = 22711] = "MH_L_Elbow";
    Bones[Bones["SKEL_Spine0"] = 23553] = "SKEL_Spine0";
    Bones[Bones["RB_L_ThighRoll"] = 23639] = "RB_L_ThighRoll";
    Bones[Bones["PH_R_Foot"] = 24806] = "PH_R_Foot";
    Bones[Bones["SKEL_Spine1"] = 24816] = "SKEL_Spine1";
    Bones[Bones["SKEL_Spine2"] = 24817] = "SKEL_Spine2";
    Bones[Bones["SKEL_Spine3"] = 24818] = "SKEL_Spine3";
    Bones[Bones["FB_L_Eye_000"] = 25260] = "FB_L_Eye_000";
    Bones[Bones["SKEL_L_Finger00"] = 26610] = "SKEL_L_Finger00";
    Bones[Bones["SKEL_L_Finger10"] = 26611] = "SKEL_L_Finger10";
    Bones[Bones["SKEL_L_Finger20"] = 26612] = "SKEL_L_Finger20";
    Bones[Bones["SKEL_L_Finger30"] = 26613] = "SKEL_L_Finger30";
    Bones[Bones["SKEL_L_Finger40"] = 26614] = "SKEL_L_Finger40";
    Bones[Bones["FB_R_Eye_000"] = 27474] = "FB_R_Eye_000";
    Bones[Bones["SKEL_R_Forearm"] = 28252] = "SKEL_R_Forearm";
    Bones[Bones["PH_R_Hand"] = 28422] = "PH_R_Hand";
    Bones[Bones["FB_L_Lip_Corner_000"] = 29868] = "FB_L_Lip_Corner_000";
    Bones[Bones["SKEL_Head"] = 31086] = "SKEL_Head";
    Bones[Bones["IK_R_Foot"] = 35502] = "IK_R_Foot";
    Bones[Bones["RB_Neck_1"] = 35731] = "RB_Neck_1";
    Bones[Bones["IK_L_Hand"] = 36029] = "IK_L_Hand";
    Bones[Bones["SKEL_R_Calf"] = 36864] = "SKEL_R_Calf";
    Bones[Bones["RB_R_ArmRoll"] = 37119] = "RB_R_ArmRoll";
    Bones[Bones["FB_Brow_Centre_000"] = 37193] = "FB_Brow_Centre_000";
    Bones[Bones["SKEL_Neck_1"] = 39317] = "SKEL_Neck_1";
    Bones[Bones["SKEL_R_UpperArm"] = 40269] = "SKEL_R_UpperArm";
    Bones[Bones["FB_R_Lid_Upper_000"] = 43536] = "FB_R_Lid_Upper_000";
    Bones[Bones["RB_R_ForeArmRoll"] = 43810] = "RB_R_ForeArmRoll";
    Bones[Bones["SKEL_L_UpperArm"] = 45509] = "SKEL_L_UpperArm";
    Bones[Bones["FB_L_Lid_Upper_000"] = 45750] = "FB_L_Lid_Upper_000";
    Bones[Bones["MH_L_Knee"] = 46078] = "MH_L_Knee";
    Bones[Bones["FB_Jaw_000"] = 46240] = "FB_Jaw_000";
    Bones[Bones["FB_L_Lip_Bot_000"] = 47419] = "FB_L_Lip_Bot_000";
    Bones[Bones["FB_Tongue_000"] = 47495] = "FB_Tongue_000";
    Bones[Bones["FB_R_Lip_Bot_000"] = 49979] = "FB_R_Lip_Bot_000";
    Bones[Bones["SKEL_R_Thigh"] = 51826] = "SKEL_R_Thigh";
    Bones[Bones["SKEL_R_Foot"] = 52301] = "SKEL_R_Foot";
    Bones[Bones["IK_Root"] = 56604] = "IK_Root";
    Bones[Bones["SKEL_R_Hand"] = 57005] = "SKEL_R_Hand";
    Bones[Bones["SKEL_Spine_Root"] = 57597] = "SKEL_Spine_Root";
    Bones[Bones["PH_L_Foot"] = 57717] = "PH_L_Foot";
    Bones[Bones["SKEL_L_Thigh"] = 58271] = "SKEL_L_Thigh";
    Bones[Bones["FB_L_Brow_Out_000"] = 58331] = "FB_L_Brow_Out_000";
    Bones[Bones["SKEL_R_Finger00"] = 58866] = "SKEL_R_Finger00";
    Bones[Bones["SKEL_R_Finger10"] = 58867] = "SKEL_R_Finger10";
    Bones[Bones["SKEL_R_Finger20"] = 58868] = "SKEL_R_Finger20";
    Bones[Bones["SKEL_R_Finger30"] = 58869] = "SKEL_R_Finger30";
    Bones[Bones["SKEL_R_Finger40"] = 58870] = "SKEL_R_Finger40";
    Bones[Bones["PH_L_Hand"] = 60309] = "PH_L_Hand";
    Bones[Bones["RB_L_ForeArmRoll"] = 61007] = "RB_L_ForeArmRoll";
    Bones[Bones["SKEL_L_Forearm"] = 61163] = "SKEL_L_Forearm";
    Bones[Bones["FB_UpperLip_000"] = 61839] = "FB_UpperLip_000";
    Bones[Bones["SKEL_L_Calf"] = 63931] = "SKEL_L_Calf";
    Bones[Bones["SKEL_R_Finger01"] = 64016] = "SKEL_R_Finger01";
    Bones[Bones["SKEL_R_Finger02"] = 64017] = "SKEL_R_Finger02";
    Bones[Bones["SKEL_R_Finger31"] = 64064] = "SKEL_R_Finger31";
    Bones[Bones["SKEL_R_Finger32"] = 64065] = "SKEL_R_Finger32";
    Bones[Bones["SKEL_R_Finger41"] = 64080] = "SKEL_R_Finger41";
    Bones[Bones["SKEL_R_Finger42"] = 64081] = "SKEL_R_Finger42";
    Bones[Bones["SKEL_R_Finger11"] = 64096] = "SKEL_R_Finger11";
    Bones[Bones["SKEL_R_Finger12"] = 64097] = "SKEL_R_Finger12";
    Bones[Bones["SKEL_R_Finger21"] = 64112] = "SKEL_R_Finger21";
    Bones[Bones["SKEL_R_Finger22"] = 64113] = "SKEL_R_Finger22";
    Bones[Bones["SKEL_L_Clavicle"] = 64729] = "SKEL_L_Clavicle";
    Bones[Bones["FACIAL_facialRoot"] = 65068] = "FACIAL_facialRoot";
    Bones[Bones["IK_L_Foot"] = 65245] = "IK_L_Foot";
})(Bones = exports.Bones || (exports.Bones = {}));


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// https://docs.microsoft.com/en-us/windows/desktop/inputdev/virtual-key-codes
var VK;
(function (VK) {
    VK[VK["LBUTTON"] = 1] = "LBUTTON";
    VK[VK["RBUTTON"] = 2] = "RBUTTON";
    VK[VK["CANCEL"] = 3] = "CANCEL";
    VK[VK["MBUTTON"] = 4] = "MBUTTON";
    VK[VK["XBUTTON1"] = 5] = "XBUTTON1";
    VK[VK["XBUTTON2"] = 6] = "XBUTTON2";
    VK[VK["DASH"] = 232] = "DASH";
    VK[VK["BACK"] = 8] = "BACK";
    VK[VK["TAB"] = 9] = "TAB";
    VK[VK["CLEAR"] = 12] = "CLEAR";
    VK[VK["RETURN"] = 13] = "RETURN";
    VK[VK["SHIFT"] = 16] = "SHIFT";
    VK[VK["CONTROL"] = 17] = "CONTROL";
    VK[VK["MENU"] = 18] = "MENU";
    VK[VK["PAUSE"] = 19] = "PAUSE";
    VK[VK["CAPITAL"] = 20] = "CAPITAL";
    VK[VK["KANA"] = 21] = "KANA";
    VK[VK["HANGUEL"] = 21] = "HANGUEL";
    VK[VK["HANGUL"] = 21] = "HANGUL";
    VK[VK["JUNJA"] = 23] = "JUNJA";
    VK[VK["FINAL"] = 24] = "FINAL";
    VK[VK["HANJA"] = 25] = "HANJA";
    VK[VK["KANJI"] = 25] = "KANJI";
    VK[VK["ESCAPE"] = 27] = "ESCAPE";
    VK[VK["CONVERT"] = 28] = "CONVERT";
    VK[VK["NONCONVERT"] = 29] = "NONCONVERT";
    VK[VK["ACCEPT"] = 30] = "ACCEPT";
    VK[VK["MODECHANGE"] = 31] = "MODECHANGE";
    VK[VK["SPACE"] = 32] = "SPACE";
    VK[VK["PRIOR"] = 33] = "PRIOR";
    VK[VK["NEXT"] = 34] = "NEXT";
    VK[VK["END"] = 35] = "END";
    VK[VK["HOME"] = 36] = "HOME";
    VK[VK["LEFT"] = 37] = "LEFT";
    VK[VK["UP"] = 38] = "UP";
    VK[VK["RIGHT"] = 39] = "RIGHT";
    VK[VK["DOWN"] = 40] = "DOWN";
    VK[VK["SELECT"] = 41] = "SELECT";
    VK[VK["NUM1"] = 48] = "NUM1";
    VK[VK["NUM2"] = 49] = "NUM2";
    VK[VK["NUM3"] = 50] = "NUM3";
    VK[VK["NUM4"] = 51] = "NUM4";
    VK[VK["NUM5"] = 52] = "NUM5";
    VK[VK["NUM6"] = 53] = "NUM6";
    VK[VK["NUM7"] = 54] = "NUM7";
    VK[VK["NUM8"] = 55] = "NUM8";
    VK[VK["NUM9"] = 56] = "NUM9";
    VK[VK["A"] = 65] = "A";
    VK[VK["B"] = 66] = "B";
    VK[VK["C"] = 67] = "C";
    VK[VK["D"] = 68] = "D";
    VK[VK["E"] = 69] = "E";
    VK[VK["F"] = 70] = "F";
    VK[VK["G"] = 71] = "G";
    VK[VK["H"] = 72] = "H";
    VK[VK["I"] = 73] = "I";
    VK[VK["J"] = 74] = "J";
    VK[VK["K"] = 75] = "K";
    VK[VK["L"] = 76] = "L";
    VK[VK["M"] = 77] = "M";
    VK[VK["N"] = 78] = "N";
    VK[VK["O"] = 79] = "O";
    VK[VK["P"] = 80] = "P";
    VK[VK["Q"] = 81] = "Q";
    VK[VK["R"] = 82] = "R";
    VK[VK["S"] = 83] = "S";
    VK[VK["T"] = 84] = "T";
    VK[VK["U"] = 85] = "U";
    VK[VK["V"] = 86] = "V";
    VK[VK["W"] = 87] = "W";
    VK[VK["X"] = 88] = "X";
    VK[VK["Y"] = 89] = "Y";
    VK[VK["Z"] = 90] = "Z";
    VK[VK["PRINT"] = 42] = "PRINT";
    VK[VK["EXECUTE"] = 43] = "EXECUTE";
    VK[VK["SNAPSHOT"] = 44] = "SNAPSHOT";
    VK[VK["INSERT"] = 45] = "INSERT";
    VK[VK["DELETE"] = 46] = "DELETE";
    VK[VK["HELP"] = 47] = "HELP";
    VK[VK["LWIN"] = 91] = "LWIN";
    VK[VK["RWIN"] = 92] = "RWIN";
    VK[VK["APPS"] = 93] = "APPS";
    VK[VK["SLEEP"] = 95] = "SLEEP";
    VK[VK["NUMPAD0"] = 96] = "NUMPAD0";
    VK[VK["NUMPAD1"] = 97] = "NUMPAD1";
    VK[VK["NUMPAD2"] = 98] = "NUMPAD2";
    VK[VK["NUMPAD3"] = 99] = "NUMPAD3";
    VK[VK["NUMPAD4"] = 100] = "NUMPAD4";
    VK[VK["NUMPAD5"] = 101] = "NUMPAD5";
    VK[VK["NUMPAD6"] = 102] = "NUMPAD6";
    VK[VK["NUMPAD7"] = 103] = "NUMPAD7";
    VK[VK["NUMPAD8"] = 104] = "NUMPAD8";
    VK[VK["NUMPAD9"] = 105] = "NUMPAD9";
    VK[VK["MULTIPLY"] = 106] = "MULTIPLY";
    VK[VK["ADD"] = 107] = "ADD";
    VK[VK["SEPARATOR"] = 108] = "SEPARATOR";
    VK[VK["SUBTRACT"] = 109] = "SUBTRACT";
    VK[VK["DECIMAL"] = 110] = "DECIMAL";
    VK[VK["DIVIDE"] = 111] = "DIVIDE";
    VK[VK["F1"] = 112] = "F1";
    VK[VK["F2"] = 113] = "F2";
    VK[VK["F3"] = 114] = "F3";
    VK[VK["F4"] = 115] = "F4";
    VK[VK["F5"] = 116] = "F5";
    VK[VK["F6"] = 117] = "F6";
    VK[VK["F7"] = 118] = "F7";
    VK[VK["F8"] = 119] = "F8";
    VK[VK["F9"] = 120] = "F9";
    VK[VK["F10"] = 121] = "F10";
    VK[VK["F11"] = 122] = "F11";
    VK[VK["F12"] = 123] = "F12";
    VK[VK["F13"] = 124] = "F13";
    VK[VK["F14"] = 125] = "F14";
    VK[VK["F15"] = 126] = "F15";
    VK[VK["F16"] = 127] = "F16";
    VK[VK["F17"] = 128] = "F17";
    VK[VK["F18"] = 129] = "F18";
    VK[VK["F19"] = 130] = "F19";
    VK[VK["F20"] = 131] = "F20";
    VK[VK["F21"] = 132] = "F21";
    VK[VK["F22"] = 133] = "F22";
    VK[VK["F23"] = 134] = "F23";
    VK[VK["F24"] = 135] = "F24";
    VK[VK["NUMLOCK"] = 144] = "NUMLOCK";
    VK[VK["SCROLL"] = 145] = "SCROLL";
    VK[VK["LSHIFT"] = 160] = "LSHIFT";
    VK[VK["RSHIFT"] = 161] = "RSHIFT";
    VK[VK["LCONTROL"] = 162] = "LCONTROL";
    VK[VK["RCONTROL"] = 163] = "RCONTROL";
    VK[VK["LMENU"] = 164] = "LMENU";
    VK[VK["RMENU"] = 165] = "RMENU";
    VK[VK["BROWSER_BACK"] = 166] = "BROWSER_BACK";
    VK[VK["BROWSER_FORWARD"] = 167] = "BROWSER_FORWARD";
    VK[VK["BROWSER_REFRESH"] = 168] = "BROWSER_REFRESH";
    VK[VK["BROWSER_STOP"] = 169] = "BROWSER_STOP";
    VK[VK["BROWSER_SEARCH"] = 170] = "BROWSER_SEARCH";
    VK[VK["BROWSER_FAVORITES"] = 171] = "BROWSER_FAVORITES";
    VK[VK["BROWSER_HOME"] = 172] = "BROWSER_HOME";
    VK[VK["VOLUME_MUTE"] = 173] = "VOLUME_MUTE";
    VK[VK["VOLUME_DOWN"] = 174] = "VOLUME_DOWN";
    VK[VK["VOLUME_UP"] = 175] = "VOLUME_UP";
    VK[VK["MEDIA_NEXT_TRACK"] = 176] = "MEDIA_NEXT_TRACK";
    VK[VK["MEDIA_PREV_TRACK"] = 177] = "MEDIA_PREV_TRACK";
    VK[VK["MEDIA_STOP"] = 178] = "MEDIA_STOP";
    VK[VK["MEDIA_PLAY_PAUSE"] = 179] = "MEDIA_PLAY_PAUSE";
    VK[VK["LAUNCH_MAIL"] = 180] = "LAUNCH_MAIL";
    VK[VK["LAUNCH_MEDIA_SELECT"] = 181] = "LAUNCH_MEDIA_SELECT";
    VK[VK["LAUNCH_APP1"] = 182] = "LAUNCH_APP1";
    VK[VK["LAUNCH_APP2"] = 183] = "LAUNCH_APP2";
    VK[VK["OEM_1"] = 186] = "OEM_1";
    VK[VK["OEM_PLUS"] = 187] = "OEM_PLUS";
    VK[VK["OEM_COMMA"] = 188] = "OEM_COMMA";
    VK[VK["OEM_MINUS"] = 189] = "OEM_MINUS";
    VK[VK["OEM_PERIOD"] = 190] = "OEM_PERIOD";
    VK[VK["OEM_2"] = 191] = "OEM_2";
    VK[VK["OEM_3"] = 192] = "OEM_3";
    VK[VK["OEM_4"] = 219] = "OEM_4";
    VK[VK["OEM_5"] = 220] = "OEM_5";
    VK[VK["OEM_6"] = 221] = "OEM_6";
    VK[VK["OEM_7"] = 222] = "OEM_7";
    VK[VK["OEM_8"] = 223] = "OEM_8";
    VK[VK["OEM_102"] = 226] = "OEM_102";
    VK[VK["PROCESSKEY"] = 229] = "PROCESSKEY";
    VK[VK["PACKET"] = 231] = "PACKET";
    VK[VK["ATTN"] = 246] = "ATTN";
    VK[VK["CRSEL"] = 247] = "CRSEL";
    VK[VK["EXSEL"] = 248] = "EXSEL";
    VK[VK["EREOF"] = 249] = "EREOF";
    VK[VK["PLAY"] = 250] = "PLAY";
    VK[VK["ZOOM"] = 251] = "ZOOM";
    VK[VK["NONAME"] = 252] = "NONAME";
    VK[VK["PA1"] = 253] = "PA1";
    VK[VK["OEM_CLEAR"] = 254] = "OEM_CLEAR";
})(VK = exports.VK || (exports.VK = {}));
;


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameEvents;
(function (GameEvents) {
    GameEvents["BROWSER_CREATED"] = "browserCreated";
    GameEvents["BROWSER_DOM_READY"] = "browserDomReady";
    GameEvents["BROWSER_INPUT_FOCUS_CHANGED"] = "browserInputFocusChanged";
    GameEvents["BROWSER_LOADING_FAILED"] = "browserLoadingFailed";
    GameEvents["ENTITY_CREATED"] = "entityCreated";
    GameEvents["ENTITY_STREAM_IN"] = "entityStreamIn";
    GameEvents["ENTITY_STREAM_OUT"] = "entityStreamOut";
    GameEvents["GUI_READY"] = "guiReady";
    GameEvents["CLICK"] = "click";
    GameEvents["PLAYER_CHAT"] = "playerChat";
    GameEvents["PLAYER_CREATE_WAYPOINT"] = "playerCreateWaypoint";
    GameEvents["PLAYER_COMMAND"] = "playerCommand";
    GameEvents["PLAYER_DEATH"] = "playerDeath";
    GameEvents["PLAYER_ENTER_CHECKPOINT"] = "playerEnterCheckpoint";
    GameEvents["PLAYER_ENTER_COLSHAPE"] = "playerEnterColshape";
    GameEvents["PLAYER_EXIT_CHECKPOINT"] = "playerExitCheckpoint";
    GameEvents["PLAYER_EXIT_COLSHAPE"] = "playerExitColshape";
    GameEvents["PLAYER_JOIN"] = "playerJoin";
    GameEvents["PLAYER_QUIT"] = "playerQuit";
    GameEvents["PLAYER_REACH_WAYPOINT"] = "playerReachWaypoint";
    GameEvents["PLAYER_RESURRECT"] = "playerResurrect";
    GameEvents["PLAYER_RULE_TRIGGERED"] = "playerRuleTriggered";
    GameEvents["PLAYER_SPAWN"] = "playerSpawn";
    GameEvents["PLAYER_START_TALKING"] = "playerStartTalking";
    GameEvents["PLAYER_STOP_TALKING"] = "playerStopTalking";
    GameEvents["PLAYER_WEAPON_SHOT"] = "playerWeaponShot";
    GameEvents["RENDER"] = "render";
    GameEvents["VEHICLE_DEATH"] = "vehicleDeath";
})(GameEvents = exports.GameEvents || (exports.GameEvents = {}));
;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
"use strict";
const inversify_1 = __webpack_require__(33);
const rage_rpc_1 = __webpack_require__(16);
const constants_1 = __webpack_require__(32);
const game_1 = __webpack_require__(87);
const auth_1 = __webpack_require__(80);
const character_selection_1 = __webpack_require__(85);
const camera_1 = __importDefault(__webpack_require__(82));
const ui_1 = __importDefault(__webpack_require__(34));
const player_1 = __importDefault(__webpack_require__(83));
const hook_event_1 = __webpack_require__(81);
const handle_rpc_1 = __webpack_require__(84);
const container_1 = __webpack_require__(20);
const debug_1 = __webpack_require__(53);
const handle_event_1 = __webpack_require__(55);
const character_creation_1 = __webpack_require__(86);
const CAMERA_POSITION = new mp.Vector3(1510.9, -1731, 78.5);
const CHARACTER_POSITION = new mp.Vector3(1507.9, -1732.3, 78.65);
let CharacterSelectionScene = class CharacterSelectionScene {
    constructor() {
        this.cameraHorizontalOffset = 0;
        this.camera = camera_1.default.createCamera('characterSelectionCam', 'default', CAMERA_POSITION, new mp.Vector3(0, 0, 0), 60);
        this.updateCamera = (force = false) => __awaiter(this, void 0, void 0, function* () {
            const keys = {
                UP: game_1.GameConstants.VK.W,
                LEFT: game_1.GameConstants.VK.A,
                DOWN: game_1.GameConstants.VK.S,
                RIGHT: game_1.GameConstants.VK.D,
            };
            if (!force && !Object.values(keys).some(key => mp.keys.isDown(key))) {
                return;
            }
            if (mp.keys.isDown(keys.LEFT)) {
                this.cameraHorizontalOffset -= 0.02;
            }
            if (mp.keys.isDown(keys.RIGHT)) {
                this.cameraHorizontalOffset += 0.02;
            }
            const x = CHARACTER_POSITION.x + Math.cos(this.cameraHorizontalOffset) * 3;
            const y = CHARACTER_POSITION.y + Math.sin(this.cameraHorizontalOffset) * 3;
            const z = CAMERA_POSITION.z;
            this.camera.setCoord(x, y, z);
            this.camera.pointAtPedBone(this.player.handle, game_1.GameConstants.Bones.SKEL_Head, -Math.cos(this.cameraHorizontalOffset) / 3, -Math.sin(this.cameraHorizontalOffset) / 3, 0, true);
        });
    }
    afterPlayerLogin(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            debug_1.log('0');
            mp.storage.data.auth = auth;
            mp.storage.flush();
            // Save auth token
            debug_1.log('1');
            const { length: charactersCount } = yield rage_rpc_1.callServer(constants_1.SharedConstants.User.RPC.GET_CHARACTERS);
            debug_1.log('2');
            if (charactersCount === 0) {
                debug_1.log('3');
                rage_rpc_1.call(character_selection_1.CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE);
                // Forward player to character creation scene because he has no characters
            }
            else {
                debug_1.log('4');
                this.start();
                // Start character selection scene
            }
        });
    }
    /**
     * Camera & UI
     */
    start() {
        mp.gui.chat.activate(false);
        this.camera.setActiveCamera(true);
        this.player = mp.players.local;
        const z = mp.game.gameplay.getGroundZFor3dCoord(CHARACTER_POSITION.x, CHARACTER_POSITION.y, CHARACTER_POSITION.z, 1000, false);
        this.player.setCoords(CHARACTER_POSITION.x, CHARACTER_POSITION.y, z, false, false, false, false);
        if (!z) {
            setTimeout(this.start.bind(this), 500);
            // While area is not streamed in, we won't be able to get correct Z coordinate
            // so retry until we do.
            return this;
        }
        this.player.setHeading(288);
        this.player.setInvincible(true);
        this.player.freezePosition(true);
        this.player.model = mp.game.joaat('mp_m_freemode_01');
        this.player.setComponentVariation(3, 15, 0, 2);
        this.player.setComponentVariation(4, 61, 0, 2);
        this.player.setComponentVariation(6, 34, 0, 2);
        this.player.setComponentVariation(8, 15, 0, 2);
        this.player.setComponentVariation(11, 15, 0, 2);
        this.updateCamera(true);
        hook_event_1.hookEvent(game_1.GameConstants.Events.RENDER, unhook => {
            this.unhookRender = unhook;
            return this.updateCamera;
        });
        rage_rpc_1.register(character_selection_1.CharacterSelectionConstants.RPC.CREATE_CHARACTER, () => {
            this.end();
            rage_rpc_1.call(character_selection_1.CharacterSelectionConstants.RPC.START_CHARACTER_CREATION_SCENE);
        });
        rage_rpc_1.register(character_selection_1.CharacterSelectionConstants.RPC.SELECT_CHARACTER, (characterId) => __awaiter(this, void 0, void 0, function* () {
            const { appearance } = yield rage_rpc_1.callServer(constants_1.SharedConstants.User.RPC.GET_CHARACTER, characterId);
            player_1.default.updateCharacterAppearance(JSON.parse(appearance));
        }));
        rage_rpc_1.register(character_selection_1.CharacterSelectionConstants.RPC.DELETE_CHARACTER, () => { });
        ui_1.default.show('CharacterSelection');
        return this;
    }
    end() {
        mp.gui.chat.activate(true);
        rage_rpc_1.unregister(character_selection_1.CharacterSelectionConstants.RPC.SELECT_CHARACTER);
        rage_rpc_1.unregister(character_selection_1.CharacterSelectionConstants.RPC.DELETE_CHARACTER);
        rage_rpc_1.unregister(character_selection_1.CharacterSelectionConstants.RPC.CREATE_CHARACTER);
        this.unhookRender();
        this.camera.setActiveCamera(false);
        ui_1.default.hide('CharacterSelection');
    }
};
__decorate([
    handle_rpc_1.handleRPC(auth_1.AuthConstants.RPC.AFTER_PLAYER_LOGIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof LoginResponse !== "undefined" && LoginResponse) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], CharacterSelectionScene.prototype, "afterPlayerLogin", null);
__decorate([
    handle_event_1.handleEvent(character_creation_1.CharacterCreationConstants.Events.CHARACTER_CREATED),
    handle_rpc_1.handleRPC(character_selection_1.CharacterSelectionConstants.RPC.START_CHARACTER_SELECTON_SCENE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectionScene.prototype, "start", null);
__decorate([
    handle_rpc_1.handleRPC(character_selection_1.CharacterSelectionConstants.RPC.END_CHARACTER_SELECTON_SCENE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CharacterSelectionScene.prototype, "end", null);
CharacterSelectionScene = __decorate([
    container_1.bind(),
    inversify_1.injectable()
], CharacterSelectionScene);
exports.default = CharacterSelectionScene;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map