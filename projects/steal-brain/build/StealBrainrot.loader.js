function createUnityInstance(_0x3f5793, _0x1f7895, _0x3c61eb) {
    _0x3c61eb = _0x3c61eb || function() {};
    
    var _0x2ccf0b = {
        'canvas': _0x3f5793,
        'webglContextAttributes': {
            'preserveDrawingBuffer': false,
            'powerPreference': 2
        },
        'cacheControl': function(_0x39a0e3) {
            return _0x39a0e3 == _0x2ccf0b['dataUrl'] || _0x39a0e3['match'](/\.bundle/) ? 'must-revalidate' : 'no-store';
        },
        'streamingAssetsUrl': 'StreamingAssets',
        'downloadProgress': {},
        'deinitializers': [],
        'intervals': {},
        'setInterval': function(_0x7d1e77, _0x3a6fab) {
            _0x7d1e77 = window['setInterval'](_0x7d1e77, _0x3a6fab);
            this['intervals'][_0x7d1e77] = true;
            return _0x7d1e77;
        },
        'clearInterval': function(_0xc8a03) {
            delete this['intervals'][_0xc8a03];
            window['clearInterval'](_0xc8a03);
        },
        'preRun': [],
        'postRun': [],
        'print': function(_0x5214be) {
            console['log'](_0x5214be);
        },
        'printErr': function(_0x6c303) {
            console['error'](_0x6c303);
        },
        'locateFile': function(_0x585823) {
            return 'build.wasm' == _0x585823 ? this['codeUrl'] : _0x585823;
        },
        'disabledCanvasEvents': ['contextmenu', 'dragstart']
    };

    // Copying configuration properties
    for (var key in _0x1f7895) {
        _0x2ccf0b[key] = _0x1f7895[key];
    }

    _0x2ccf0b['streamingAssetsUrl'] = new URL(_0x2ccf0b['streamingAssetsUrl'], document['URL'])['href'];
    
    var _0x5b2e3f = _0x2ccf0b['disabledCanvasEvents']['slice']();
    function _0x31992e(_0x51d50b) {
        _0x51d50b['preventDefault']();
    }
    
    _0x5b2e3f['forEach'](function(_0x1a91f9) {
        _0x3f5793['addEventListener'](_0x1a91f9, _0x31992e);
    });

    // Error and Progress handlers
    function _0xc9f76b(_0x5df895, _0x499815) {
        console.log(_0x5df895);
    }

    function _0x26dd44(_0x1bc7f4, _0x4510e4) {
        if ('symbolsUrl' != _0x1bc7f4) {
            var _0x516573 = _0x2ccf0b['downloadProgress'][_0x1bc7f4];
            if (!_0x516573) {
                _0x516573 = _0x2ccf0b['downloadProgress'][_0x1bc7f4] = {
                    'started': false,
                    'finished': false,
                    'lengthComputable': false,
                    'total': 0,
                    'loaded': 0
                };
            }
            if (typeof _0x4510e4 == 'object' && (_0x4510e4['type'] == 'progress' || _0x4510e4['type'] == 'load')) {
                if (!_0x516573['started']) {
                    _0x516573['started'] = true;
                    _0x516573['lengthComputable'] = _0x4510e4['lengthComputable'];
                }
                _0x516573['total'] = _0x4510e4['total'];
                _0x516573['loaded'] = _0x4510e4['loaded'];
                if (_0x4510e4['type'] == 'load') {
                    _0x516573['finished'] = true;
                }
            }
            var _0x27fc39 = 0, _0x47148c = 0, _0x533f03 = 0, _0x5498ec = 0, _0x449807 = 0;
            for (var _0x1bc7f4 in _0x2ccf0b['downloadProgress']) {
                _0x516573 = _0x2ccf0b['downloadProgress'][_0x1bc7f4];
                if (!_0x516573['started']) return;
                _0x533f03++;
                if (_0x516573['lengthComputable']) {
                    _0x27fc39 += _0x516573['loaded'];
                    _0x47148c += _0x516573['total'];
                    _0x5498ec++;
                } else if (!_0x516573['finished']) {
                    _0x449807++;
                }
            }
            _0x3c61eb(0.9 * (_0x533f03 ? (_0x533f03 - _0x449807 - (_0x47148c ? _0x5498ec * (_0x47148c - _0x27fc39) / _0x47148c : 0)) / _0x533f03 : 0));
        }
    }

    // Main script loading
    return new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = _0x2ccf0b['frameworkUrl'];
        script.onload = function() {
            if (typeof unityFramework === 'undefined' || !unityFramework) {
                return reject("Unable to parse " + _0x2ccf0b['frameworkUrl']);
            }
            unityFramework(_0x2ccf0b).then(function(instance) {
                resolve({
                    'SetFullscreen': function() { instance.SetFullscreen.apply(instance, arguments); },
                    'SendMessage': function() { instance.SendMessage.apply(instance, arguments); },
                    'Quit': function() {
                        return new Promise(function(res) {
                            _0x2ccf0b['shouldQuit'] = true;
                            _0x2ccf0b['onQuit'] = res;
                        });
                    }
                });
            });
        };
        document.body.appendChild(script);
        
        // Simulating progress for the files
        _0x26dd44(_0x2ccf0b['dataUrl'], { 'type': 'progress', 'total': 1, 'loaded': 0 });
        _0x26dd44(_0x2ccf0b['frameworkUrl'], { 'type': 'progress', 'total': 1, 'loaded': 0 });
        _0x26dd44(_0x2ccf0b['codeUrl'], { 'type': 'progress', 'total': 1, 'loaded': 0 });
    });
}