function createUnityInstance(canvas, config, onProgress) {
    onProgress = onProgress || function() {};
    
    // 1. Setup the Module configuration
    var Module = {
        canvas: canvas,
        webglContextAttributes: {
            preserveDrawingBuffer: false,
            powerPreference: 2
        },
        cacheControl: function(url) {
            return (url == Module.dataUrl || url.match(/\.bundle/)) ? "must-revalidate" : "no-store";
        },
        streamingAssetsUrl: "StreamingAssets",
        downloadProgress: {},
        deinitializers: [],
        intervals: {},
        setInterval: function(func, ms) {
            var id = window.setInterval(func, ms);
            this.intervals[id] = true;
            return id;
        },
        clearInterval: function(id) {
            delete this.intervals[id];
            window.clearInterval(id);
        },
        preRun: [],
        postRun: [],
        print: function(message) { console.log(message); },
        printErr: function(message) { console.error(message); },
        locateFile: function(path) {
            return (path == "build.wasm") ? this.codeUrl : path;
        },
        disabledCanvasEvents: ["contextmenu", "dragstart"]
    };

    // 2. Merge user config into Module
    for (var key in config) {
        Module[key] = config[key];
    }

    // 3. Setup Progress Tracking
    function updateProgress(url, event) {
        if (url == "symbolsUrl") return;
        var p = Module.downloadProgress[url];
        if (!p) {
            p = Module.downloadProgress[url] = {
                started: false,
                finished: false,
                lengthComputable: false,
                total: 0,
                loaded: 0
            };
        }
        if (typeof event === 'object' && (event.type == "progress" || event.type == "load")) {
            if (!p.started) {
                p.started = true;
                p.lengthComputable = event.lengthComputable;
            }
            p.total = event.total;
            p.loaded = event.loaded;
            if (event.type == "load") p.finished = true;
        }

        var totalSize = 0, loadedSize = 0, filesStarted = 0, filesFinished = 0;
        for (var file in Module.downloadProgress) {
            var data = Module.downloadProgress[file];
            if (!data.started) return;
            filesStarted++;
            if (data.lengthComputable) {
                totalSize += data.total;
                loadedSize += data.loaded;
            } else if (!data.finished) {
                filesFinished++;
            }
        }
        onProgress(0.9 * (filesStarted ? (filesStarted - filesFinished - (totalSize ? (totalSize - loadedSize) / totalSize : 0)) / filesStarted : 0));
    }

    // 4. Load the Framework
    return new Promise(function(resolve, reject) {
        var script = document.createElement("script");
        script.src = Module.frameworkUrl;
        script.onload = function() {
            if (typeof unityFramework === 'undefined' || !unityFramework) {
                return reject("Unable to parse " + Module.frameworkUrl);
            }
            // Initialize engine
            unityFramework(Module).then(function(instance) {
                resolve({
                    Module: Module,
                    SetFullscreen: function() { instance.SetFullscreen.apply(instance, arguments); },
                    SendMessage: function() { instance.SendMessage.apply(instance, arguments); },
                    Quit: function() { 
                        return new Promise(function(res) {
                            Module.shouldQuit = true;
                            Module.onQuit = res;
                        });
                    }
                });
            });
        };
        script.onerror = function() { reject("Failed to load framework"); };
        document.body.appendChild(script);
        
        // Track progress for main files
        updateProgress(Module.dataUrl, { type: "progress", total: 1, loaded: 0 });
        updateProgress(Module.frameworkUrl, { type: "progress", total: 1, loaded: 0 });
        updateProgress(Module.codeUrl, { type: "progress", total: 1, loaded: 0 });
    });
}