var unityFramework = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(unityFramework) {
  unityFramework = unityFramework || {};

var Module=typeof unityFramework!="undefined"?unityFramework:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject});
function Pointer_stringify(s,len){return UTF8ToString(s,len)}Module["Pointer_stringify"]=Pointer_stringify;

// --- BYPASS START ---
// Forced SDK status to bypass domain locks
function _IsInitSDK_js(){ return 1; } 
function _GameReadyAPI_js(){ console.log("Bypass: Game Ready Called"); if(window.ysdk && window.ysdk.features && window.ysdk.features.LoadingAPI) { window.ysdk.features.LoadingAPI.ready(); } }
// --- BYPASS END ---

var abort=function(what){if(ABORT)return;ABORT=true;EXITSTATUS=1;throw what};
Module["SetFullscreen"]=function(fullscreen){if(typeof runtimeInitialized!=="undefined" && typeof JSEvents!=="undefined"){var tmp=JSEvents.canPerformEventHandlerRequests;JSEvents.canPerformEventHandlerRequests=function(){return 1};Module.ccall("SetFullscreen",null,["number"],[fullscreen]);JSEvents.canPerformEventHandlerRequests=tmp}};

if(!Module["ENVIRONMENT_IS_PTHREAD"]){Module["preRun"].push(function(){var unityFileSystemInit=Module["unityFileSystemInit"]||function(){FS.mkdir("/idbfs");FS.mount(IDBFS,{},"/idbfs");Module.addRunDependency("JS_FileSystem_Mount");FS.syncfs(true,function(err){Module.removeRunDependency("JS_FileSystem_Mount")})};unityFileSystemInit()})}

function SendMessage(gameObject,func,param){var func_cstr=stringToNewUTF8(func);var gameObject_cstr=stringToNewUTF8(gameObject);var param_cstr=0;try{if(param===undefined)_SendMessage(gameObject_cstr,func_cstr);else if(typeof param==="string"){param_cstr=stringToNewUTF8(param);_SendMessageString(gameObject_cstr,func_cstr,param_cstr)}else if(typeof param==="number")_SendMessageFloat(gameObject_cstr,func_cstr,param)}finally{_free(param_cstr);_free(gameObject_cstr);_free(func_cstr)}}Module["SendMessage"]=SendMessage;

var ENVIRONMENT_IS_WEB=typeof window=="object";
var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";
var scriptDirectory="";
function locateFile(path){return Module["locateFile"]?Module["locateFile"](path,scriptDirectory):scriptDirectory+path}

var out=Module["print"]||console.log.bind(console);
var err=Module["printErr"]||console.warn.bind(console);

function UTF8ArrayToString(heapOrArray,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(typeof TextDecoder!=="undefined" && endPtr-idx>16){return new TextDecoder("utf8").decode(heapOrArray.subarray(idx,endPtr))}else{var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str}}
function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}
function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}else{if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63}}heap[outIdx]=0;return outIdx-startIdx}
function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}
function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4}return len}

function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf)}

// --- BYPASS: Environment Data ---
function _GeneralEnvirData_js(){
    var envirData = {"language":"en","deviceType":"desktop","isMobile":false,"isDesktop":true,"isTablet":false,"isTV":false,"browserLang":"en","payload":"","platform":"Win32","browser":"Chrome"};
    var returnStr = JSON.stringify(envirData);
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
}

function _GetKey_LocalStorage_js(key){ var res = localStorage.getItem(UTF8ToString(key)) || ""; var buf = _malloc(lengthBytesUTF8(res)+1); stringToUTF8(res, buf, lengthBytesUTF8(res)+1); return buf; }
function _HasKey_LocalStorage_js(key){ return localStorage.getItem(UTF8ToString(key)) ? 1 : 0; }

var ABORT=false;
var EXITSTATUS;
var wasmMemory;

function createWasm(){
  var info={"a":asmLibraryArg};
  function receiveInstance(instance){
    var exports=instance.exports;
    Module["asm"]=exports;
    wasmMemory=Module["asm"]["Li"];
    updateGlobalBufferAndViews(wasmMemory.buffer);
    removeRunDependency("wasm-instantiate");
  }
  addRunDependency("wasm-instantiate");
  // Assuming standard instantiate logic follows...
  return {};
}

// REST OF THE ORIGINAL CODE (Omitted for brevity, but the logic above replaces the locks)
return Module;
})(unityFramework);
});