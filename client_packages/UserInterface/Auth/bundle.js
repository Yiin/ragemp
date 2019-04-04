/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "../.hot/" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "../.hot/" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3d21679ab5aeb99350df";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/Auth/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/UserInterface/Auth/Auth.js":
/*!*******************************************!*\
  !*** ./client/UserInterface/Auth/Auth.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

const root_1 = __webpack_require__(/*! react-hot-loader/root */ "./node_modules/react-hot-loader/root.js");

const withStyles_1 = __importDefault(__webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js"));

const Paper_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Paper */ "./node_modules/@material-ui/core/Paper/index.js"));

const Tabs_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Tabs */ "./node_modules/@material-ui/core/Tabs/index.js"));

const Tab_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Tab */ "./node_modules/@material-ui/core/Tab/index.js"));

const Login_1 = __importDefault(__webpack_require__(/*! ./tabs/Login */ "./client/UserInterface/Auth/tabs/Login.tsx"));

const Registration_1 = __importDefault(__webpack_require__(/*! ./tabs/Registration */ "./client/UserInterface/Auth/tabs/Registration.tsx"));

const _1 = __webpack_require__(/*! . */ "./client/UserInterface/Auth/index.js");

const asm_1 = __webpack_require__(/*! ./asm */ "./client/UserInterface/Auth/asm.js");

const core_1 = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

const _theme_1 = __webpack_require__(/*! ../_theme */ "./client/UserInterface/_theme/index.js");

const styles = theme => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  window: Object.assign({}, theme.mixins.gutters(), {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: '15%'
  })
});

const Auth = ({
  classes
}) => {
  const {
    state,
    dispatch
  } = react_1.useContext(_1.Context);

  const handleSceneChange = (e, scene) => {
    if (scene !== state.scene) {
      switch (scene) {
        case 'login':
          dispatch(asm_1.setLoginErrors({
            username: 'Some error message'
          }));
          break;

        case 'registration':
          dispatch(asm_1.setRegistrationErrors(null));
          break;
      }

      dispatch(asm_1.setScene(scene));
    }
  };

  return react_1.default.createElement(core_1.MuiThemeProvider, {
    theme: _theme_1.theme
  }, react_1.default.createElement("div", {
    className: classes.root
  }, react_1.default.createElement(Paper_1.default, {
    className: classes.window
  }, react_1.default.createElement(Tabs_1.default, {
    value: state.scene,
    onChange: handleSceneChange,
    textColor: "primary",
    indicatorColor: "primary"
  }, react_1.default.createElement(Tab_1.default, {
    disableRipple: true,
    label: "Login",
    value: "login"
  }), react_1.default.createElement(Tab_1.default, {
    disableRipple: true,
    label: "Register",
    value: "registration"
  })), {
    login: () => react_1.default.createElement(Login_1.default, null),
    registration: () => react_1.default.createElement(Registration_1.default, null)
  }[state.scene]())));
};

exports.default = root_1.hot(withStyles_1.default(styles)(Auth));
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__importStar, "__importStar", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(__importDefault, "__importDefault", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(react_1, "react_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(withStyles_1, "withStyles_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Paper_1, "Paper_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Tabs_1, "Tabs_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Tab_1, "Tab_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Login_1, "Login_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Registration_1, "Registration_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(styles, "styles", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
  reactHotLoader.register(Auth, "Auth", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\Auth.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/UserInterface/Auth/asm.js":
/*!******************************************!*\
  !*** ./client/UserInterface/Auth/asm.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = {
  scene: 'login',
  loginForm: {
    username: '',
    password: '',
    errors: {}
  },
  registrationForm: {
    errors: {}
  }
};
exports.default = {
  SET_SCENE: (state, scene) => Object.assign({}, state, {
    scene,
    error: false
  }),
  SET_LOGIN_USERNAME: (state, username) => Object.assign({}, state, {
    loginForm: Object.assign({}, state.loginForm, {
      username
    })
  }),
  SET_LOGIN_PASSWORD: (state, password) => Object.assign({}, state, {
    loginForm: Object.assign({}, state.loginForm, {
      password
    })
  }),
  SET_LOGIN_ERRORS: (state, errors) => Object.assign({}, state, {
    loginForm: Object.assign({}, state.loginForm, {
      errors
    })
  }),
  SET_REGISTRATION_ERRORS: (state, errors) => Object.assign({}, state, {
    registrationForm: Object.assign({}, state.registrationForm, {
      errors
    })
  })
};

exports.setScene = scene => ({
  type: 'SET_SCENE',
  payload: scene
});

exports.setLoginUsername = username => ({
  type: 'SET_LOGIN_USERNAME',
  payload: username
});

exports.setLoginPassword = password => ({
  type: 'SET_LOGIN_PASSWORD',
  payload: password
});

exports.setLoginErrors = errors => ({
  type: 'SET_LOGIN_ERRORS',
  payload: errors || {}
});

exports.setRegistrationErrors = errors => ({
  type: 'SET_REGISTRATION_ERRORS',
  payload: errors || {}
});

/***/ }),

/***/ "./client/UserInterface/Auth/index.js":
/*!********************************************!*\
  !*** ./client/UserInterface/Auth/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

const react_dom_1 = __importDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

const Auth_1 = __importDefault(__webpack_require__(/*! ./Auth */ "./client/UserInterface/Auth/Auth.js"));

const asm_1 = __importStar(__webpack_require__(/*! ./asm */ "./client/UserInterface/Auth/asm.js"));

exports.Context = react_1.createContext();

const reducer = (state, action) => asm_1.default[action.type](state, action.payload);

function ContextProvider({
  children
}) {
  const [state, dispatch] = react_1.useReducer(reducer, asm_1.initialState);

  window.dispatch = (type, payload) => dispatch({
    type,
    payload
  });

  const value = {
    state,
    dispatch
  };
  return react_1.default.createElement(exports.Context.Provider, {
    value: value
  }, children);
}

const Bridge = () => {
  const [state, setState] = react_1.useState({});

  window.dispatch = (actionType, payload) => dispatch(actionType, payload);

  window.setState = updatedState => setState(Object.assign({}, state, {
    updatedState
  }));

  return react_1.default.createElement(ContextProvider, {
    value: state
  }, react_1.default.createElement(Auth_1.default, Object.assign({}, state)));
};

react_dom_1.default.render(react_1.default.createElement(Bridge, null), document.getElementById('main'));
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__importStar, "__importStar", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(__importDefault, "__importDefault", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(react_1, "react_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(react_dom_1, "react_dom_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(Auth_1, "Auth_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(asm_1, "asm_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(reducer, "reducer", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(ContextProvider, "ContextProvider", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
  reactHotLoader.register(Bridge, "Bridge", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/UserInterface/Auth/tabs/Login.tsx":
/*!**************************************************!*\
  !*** ./client/UserInterface/Auth/tabs/Login.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

const rpc = __importStar(__webpack_require__(/*! rage-rpc */ "./node_modules/rage-rpc/dist/rage-rpc.min.js"));

const Typography_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js"));

const Button_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js"));

const TextField_1 = __importDefault(__webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/TextField/index.js"));

const withStyles_1 = __importDefault(__webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js"));

const KeyboardArrowRight_1 = __importDefault(__webpack_require__(/*! @material-ui/icons/KeyboardArrowRight */ "./node_modules/@material-ui/icons/KeyboardArrowRight.js"));

const core_1 = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.es.js");

const constants_1 = __webpack_require__(/*! Shared/constants */ "./shared/constants/index.ts");

const auth_1 = __webpack_require__(/*! ~/constants/auth */ "./client/src/constants/auth/index.ts");

const __1 = __webpack_require__(/*! .. */ "./client/UserInterface/Auth/index.js");

const asm_1 = __webpack_require__(/*! ../asm */ "./client/UserInterface/Auth/asm.js");

const styles = () => ({
  root: {
    display: 'flex',
    flexFlow: 'column'
  },
  description: {
    paddingTop: '15px',
    paddingBottom: '10px'
  },
  button: {
    marginTop: '10px'
  },
  buttonLabel: {
    paddingTop: '1px'
  }
});

const Login = ({
  classes
}) => {
  const {
    state,
    dispatch
  } = react_1.useContext(__1.Context);
  const [username, setUsername] = react_1.useState(state.loginForm.username);
  const [password, setPassword] = react_1.useState(state.loginForm.password);
  const [remember, setRemember] = react_1.useState(true);
  const [loading, setLoading] = react_1.useState(false);
  const {
    errors
  } = state.loginForm;

  const handleUsernameChange = e => setUsername(e.target.value);

  const handlePasswordChange = e => setPassword(e.target.value);

  const handleRememberChange = e => setRemember(!remember);

  const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);

    try {
      const response = yield rpc.callServer(constants_1.SharedConstants.Auth.RPC.SUBMIT_LOGIN_FORM, {
        username,
        password,
        remember
      });
      dispatch(asm_1.setLoginErrors(null)); // @ts-ignore mp.trigger method exists in CEF environment

      yield mp.trigger(auth_1.AuthConstants.Events.AFTER_PLAYER_LOGIN);
      yield rpc.callClient(auth_1.AuthConstants.RPC.AFTER_PLAYER_LOGIN, response);
    } catch (errors) {
      dispatch(asm_1.setLoginErrors(errors));
    }

    setLoading(false);
  });

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return react_1.default.createElement("div", {
    className: classes.root
  }, react_1.default.createElement("div", {
    className: classes.description
  }, react_1.default.createElement(Typography_1.default, {
    variant: "body2"
  }, "Login"), react_1.default.createElement(Typography_1.default, {
    variant: "body1"
  }, "Please enter your credentials.")), react_1.default.createElement(TextField_1.default, {
    value: username,
    onChange: handleUsernameChange,
    onKeyDown: handleKeyDown,
    label: "Username",
    margin: "dense",
    variant: "outlined",
    error: !!errors.username,
    helperText: errors.username
  }), react_1.default.createElement(TextField_1.default, {
    value: password,
    onChange: handlePasswordChange,
    onKeyDown: handleKeyDown,
    type: "password",
    label: "Password",
    margin: "dense",
    variant: "outlined",
    error: !!errors.password,
    helperText: errors.password
  }), react_1.default.createElement(core_1.FormControlLabel, {
    control: react_1.default.createElement(core_1.Checkbox, {
      checked: remember,
      onChange: handleRememberChange,
      color: "primary"
    }),
    label: "Remember me"
  }), react_1.default.createElement(Button_1.default, {
    onClick: handleSubmit,
    variant: "contained",
    color: "primary",
    classes: {
      root: classes.button,
      label: classes.buttonLabel
    },
    size: "large",
    disabled: loading
  }, "Login", react_1.default.createElement(KeyboardArrowRight_1.default, null)));
};

exports.default = withStyles_1.default(styles)(Login);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__awaiter, "__awaiter", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(__importStar, "__importStar", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(__importDefault, "__importDefault", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(react_1, "react_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(rpc, "rpc", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(Typography_1, "Typography_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(Button_1, "Button_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(TextField_1, "TextField_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(withStyles_1, "withStyles_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(KeyboardArrowRight_1, "KeyboardArrowRight_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(styles, "styles", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
  reactHotLoader.register(Login, "Login", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Login.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/UserInterface/Auth/tabs/Registration.tsx":
/*!*********************************************************!*\
  !*** ./client/UserInterface/Auth/tabs/Registration.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result["default"] = mod;
  return result;
};

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const react_1 = __importStar(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

const rpc = __importStar(__webpack_require__(/*! rage-rpc */ "./node_modules/rage-rpc/dist/rage-rpc.min.js"));

const Button_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Button */ "./node_modules/@material-ui/core/Button/index.js"));

const Typography_1 = __importDefault(__webpack_require__(/*! @material-ui/core/Typography */ "./node_modules/@material-ui/core/Typography/index.js"));

const TextField_1 = __importDefault(__webpack_require__(/*! @material-ui/core/TextField */ "./node_modules/@material-ui/core/TextField/index.js"));

const withStyles_1 = __importDefault(__webpack_require__(/*! @material-ui/core/styles/withStyles */ "./node_modules/@material-ui/core/styles/withStyles.js"));

const KeyboardArrowRight_1 = __importDefault(__webpack_require__(/*! @material-ui/icons/KeyboardArrowRight */ "./node_modules/@material-ui/icons/KeyboardArrowRight.js"));

const constants_1 = __webpack_require__(/*! Shared/constants */ "./shared/constants/index.ts");

const __1 = __webpack_require__(/*! .. */ "./client/UserInterface/Auth/index.js");

const asm_1 = __webpack_require__(/*! ../asm */ "./client/UserInterface/Auth/asm.js");

const styles = () => ({
  root: {
    display: 'flex',
    flexFlow: 'column'
  },
  description: {
    paddingTop: '15px',
    paddingBottom: '10px'
  },
  button: {
    marginTop: '10px'
  },
  buttonLabel: {
    paddingTop: '1px'
  }
});

const Registration = ({
  classes
}) => {
  const {
    state,
    dispatch
  } = react_1.useContext(__1.Context);
  const [username, setUsername] = react_1.useState('');
  const [password, setPassword] = react_1.useState('');
  const [email, setEmail] = react_1.useState('');
  const [loading, setLoading] = react_1.useState(false);
  const {
    errors
  } = state.registrationForm;

  const handleUsernameChange = e => setUsername(e.target.value);

  const handlePasswordChange = e => setPassword(e.target.value);

  const handleEmailChange = e => setEmail(e.target.value);

  const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
    setLoading(true);

    try {
      yield rpc.callServer(constants_1.SharedConstants.Auth.RPC.SUBMIT_REGISTRATION_FORM, {
        username,
        email,
        password
      });
      dispatch(asm_1.setRegistrationErrors(null));
      dispatch(asm_1.setLoginErrors(null));
      dispatch(asm_1.setLoginUsername(username));
      dispatch(asm_1.setLoginPassword(password));
      dispatch(asm_1.setScene('login'));
    } catch (errors) {
      dispatch(asm_1.setRegistrationErrors(errors));
    }

    setLoading(false);
  });

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return react_1.default.createElement("div", {
    className: classes.root
  }, react_1.default.createElement("div", {
    className: classes.description
  }, react_1.default.createElement(Typography_1.default, {
    variant: "body2"
  }, "Registration"), react_1.default.createElement(Typography_1.default, {
    variant: "body1"
  }, "Create new account if you haven't registered yet.")), react_1.default.createElement(TextField_1.default, {
    value: username,
    onChange: handleUsernameChange,
    onKeyDown: handleKeyDown,
    label: "Username",
    margin: "dense",
    variant: "outlined",
    error: errors.username,
    helperText: errors.username
  }), react_1.default.createElement(TextField_1.default, {
    value: email,
    onChange: handleEmailChange,
    onKeyDown: handleKeyDown,
    type: "email",
    label: "Email",
    margin: "dense",
    variant: "outlined",
    error: errors.email,
    helperText: errors.email
  }), react_1.default.createElement(TextField_1.default, {
    value: password,
    onChange: handlePasswordChange,
    onKeyDown: handleKeyDown,
    type: "password",
    label: "Password",
    margin: "dense",
    variant: "outlined",
    error: errors.password,
    helperText: errors.password
  }), react_1.default.createElement(Button_1.default, {
    onClick: handleSubmit,
    variant: "contained",
    color: "primary",
    classes: {
      root: classes.button,
      label: classes.buttonLabel
    },
    size: "large",
    disabled: loading
  }, "Register", react_1.default.createElement(KeyboardArrowRight_1.default, null)));
};

exports.default = withStyles_1.default(styles)(Registration);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__awaiter, "__awaiter", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(__importStar, "__importStar", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(__importDefault, "__importDefault", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(react_1, "react_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(rpc, "rpc", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(Button_1, "Button_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(Typography_1, "Typography_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(TextField_1, "TextField_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(withStyles_1, "withStyles_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(KeyboardArrowRight_1, "KeyboardArrowRight_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(styles, "styles", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
  reactHotLoader.register(Registration, "Registration", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\Auth\\tabs\\Registration.tsx");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/UserInterface/_theme/index.js":
/*!**********************************************!*\
  !*** ./client/UserInterface/_theme/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const createMuiTheme_1 = __importDefault(__webpack_require__(/*! @material-ui/core/styles/createMuiTheme */ "./node_modules/@material-ui/core/styles/createMuiTheme.js"));

const colors_1 = __webpack_require__(/*! @material-ui/core/colors */ "./node_modules/@material-ui/core/colors/index.js");

exports.theme = createMuiTheme_1.default({
  palette: {
    background: {
      paper: colors_1.blueGrey[50]
    },
    primary: colors_1.teal,
    error: {
      main: colors_1.grey[900]
    }
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        userSelect: 'none'
      }
    }
  }
});
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(__importDefault, "__importDefault", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\_theme\\index.js");
  reactHotLoader.register(createMuiTheme_1, "createMuiTheme_1", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\UserInterface\\_theme\\index.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/src/constants/auth/events.ts":
/*!*********************************************!*\
  !*** ./client/src/constants/auth/events.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AuthEvents;

(function (AuthEvents) {
  AuthEvents["AFTER_PLAYER_LOGIN"] = "afterPlayerLogin";
})(AuthEvents = exports.AuthEvents || (exports.AuthEvents = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthEvents, "AuthEvents", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\src\\constants\\auth\\events.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/src/constants/auth/index.ts":
/*!********************************************!*\
  !*** ./client/src/constants/auth/index.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = __webpack_require__(/*! ./events */ "./client/src/constants/auth/events.ts");

const rpc_1 = __webpack_require__(/*! ./rpc */ "./client/src/constants/auth/rpc.ts");

var AuthConstants;

(function (AuthConstants) {
  AuthConstants.Events = events_1.AuthEvents;
  AuthConstants.RPC = rpc_1.AuthRPC;
})(AuthConstants = exports.AuthConstants || (exports.AuthConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthConstants, "AuthConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\src\\constants\\auth\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./client/src/constants/auth/rpc.ts":
/*!******************************************!*\
  !*** ./client/src/constants/auth/rpc.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AuthRPC;

(function (AuthRPC) {
  AuthRPC["AFTER_PLAYER_LOGIN"] = "RPC_afterPlayerLogin";
})(AuthRPC = exports.AuthRPC || (exports.AuthRPC = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthRPC, "AuthRPC", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\client\\src\\constants\\auth\\rpc.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/auth/events.ts":
/*!*****************************************!*\
  !*** ./shared/constants/auth/events.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AuthEvents;

(function (AuthEvents) {
  AuthEvents["PLAYER_READY_FOR_AUTHENTICATION"] = "playerReadyForAuthentication";
})(AuthEvents = exports.AuthEvents || (exports.AuthEvents = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthEvents, "AuthEvents", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\auth\\events.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/auth/index.ts":
/*!****************************************!*\
  !*** ./shared/constants/auth/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const events_1 = __webpack_require__(/*! ./events */ "./shared/constants/auth/events.ts");

const rpc_1 = __webpack_require__(/*! ./rpc */ "./shared/constants/auth/rpc.ts");

var AuthConstants;

(function (AuthConstants) {
  AuthConstants.Events = events_1.AuthEvents;
  AuthConstants.RPC = rpc_1.AuthRPC;
})(AuthConstants = exports.AuthConstants || (exports.AuthConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthConstants, "AuthConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\auth\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/auth/rpc.ts":
/*!**************************************!*\
  !*** ./shared/constants/auth/rpc.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var AuthRPC;

(function (AuthRPC) {
  AuthRPC["SUBMIT_REGISTRATION_FORM"] = "submitRegistrationForm";
  AuthRPC["SUBMIT_LOGIN_FORM"] = "submitLoginForm";
  AuthRPC["SUBMIT_AUTH_TOKEN"] = "submitAuthToken";
})(AuthRPC = exports.AuthRPC || (exports.AuthRPC = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AuthRPC, "AuthRPC", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\auth\\rpc.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/character-creation/index.ts":
/*!******************************************************!*\
  !*** ./shared/constants/character-creation/index.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const rpc_1 = __webpack_require__(/*! ./rpc */ "./shared/constants/character-creation/rpc.ts");

var CharacterCreationConstants;

(function (CharacterCreationConstants) {
  CharacterCreationConstants.RPC = rpc_1.CharacterCreationRPC;
})(CharacterCreationConstants = exports.CharacterCreationConstants || (exports.CharacterCreationConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CharacterCreationConstants, "CharacterCreationConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\character-creation\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/character-creation/rpc.ts":
/*!****************************************************!*\
  !*** ./shared/constants/character-creation/rpc.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CharacterCreationRPC;

(function (CharacterCreationRPC) {
  CharacterCreationRPC["CREATE_CHARACTER"] = "createCharacter";
})(CharacterCreationRPC = exports.CharacterCreationRPC || (exports.CharacterCreationRPC = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(CharacterCreationRPC, "CharacterCreationRPC", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\character-creation\\rpc.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/index.ts":
/*!***********************************!*\
  !*** ./shared/constants/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const sentry_1 = __webpack_require__(/*! ./sentry */ "./shared/constants/sentry/index.ts");

const auth_1 = __webpack_require__(/*! ./auth */ "./shared/constants/auth/index.ts");

const character_creation_1 = __webpack_require__(/*! ./character-creation */ "./shared/constants/character-creation/index.ts");

const user_1 = __webpack_require__(/*! ./user */ "./shared/constants/user/index.ts");

var SharedConstants;

(function (SharedConstants) {
  SharedConstants.Sentry = sentry_1.SentryConstants;
  SharedConstants.Auth = auth_1.AuthConstants;
  SharedConstants.CharacterCreation = character_creation_1.CharacterCreationConstants;
  SharedConstants.User = user_1.UserConstants;
})(SharedConstants = exports.SharedConstants || (exports.SharedConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SharedConstants, "SharedConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/sentry/index.ts":
/*!******************************************!*\
  !*** ./shared/constants/sentry/index.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const rpc_1 = __webpack_require__(/*! ./rpc */ "./shared/constants/sentry/rpc.ts");

var SentryConstants;

(function (SentryConstants) {
  SentryConstants.RPC = rpc_1.SentryRPC;
})(SentryConstants = exports.SentryConstants || (exports.SentryConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SentryConstants, "SentryConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\sentry\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/sentry/rpc.ts":
/*!****************************************!*\
  !*** ./shared/constants/sentry/rpc.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SentryRPC;

(function (SentryRPC) {
  SentryRPC["CAPTURE_EXCEPTION"] = "captureException";
})(SentryRPC = exports.SentryRPC || (exports.SentryRPC = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SentryRPC, "SentryRPC", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\sentry\\rpc.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/user/index.ts":
/*!****************************************!*\
  !*** ./shared/constants/user/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

const rpc_1 = __webpack_require__(/*! ./rpc */ "./shared/constants/user/rpc.ts");

var UserConstants;

(function (UserConstants) {
  UserConstants.RPC = rpc_1.UserRPC;
})(UserConstants = exports.UserConstants || (exports.UserConstants = {}));

;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserConstants, "UserConstants", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\user\\index.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./shared/constants/user/rpc.ts":
/*!**************************************!*\
  !*** ./shared/constants/user/rpc.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserRPC;

(function (UserRPC) {
  UserRPC["GET_CHARACTERS"] = "getCharacters";
  UserRPC["GET_CHARACTER"] = "getCharacter";
})(UserRPC = exports.UserRPC || (exports.UserRPC = {}));

;
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(UserRPC, "UserRPC", "c:\\Users\\stani\\Projects\\ragemp\\server-files\\src\\shared\\constants\\user\\rpc.ts");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./client/UserInterface/Auth/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./client/UserInterface/Auth/index.js */"./client/UserInterface/Auth/index.js");


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map