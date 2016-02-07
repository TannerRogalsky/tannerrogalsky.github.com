
var Module;

if (typeof Module === 'undefined') Module = eval('(function() { try { return Module || {} } catch(e) { return {} } })()');

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'game.data';
    var REMOTE_PACKAGE_BASE = 'game.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      Module.printErr('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = typeof Module['locateFile'] === 'function' ?
                              Module['locateFile'](REMOTE_PACKAGE_BASE) :
                              ((Module['filePackagePrefixURL'] || '') + REMOTE_PACKAGE_BASE);
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onload = function(event) {
        var packageData = xhr.response;
        callback(packageData);
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetched = null, fetchedCallback = null;
      fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'fonts', true, true);
Module['FS_createPath']('/', 'images', true, true);
Module['FS_createPath']('/', 'levels', true, true);
Module['FS_createPath']('/levels', 'triggers', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'caternary', true, true);
Module['FS_createPath']('/', 'music', true, true);
Module['FS_createPath']('/', 'shaders', true, true);
Module['FS_createPath']('/', 'sounds', true, true);
Module['FS_createPath']('/', 'spec', true, true);
Module['FS_createPath']('/', 'states', true, true);
Module['FS_createPath']('/states', 'game', true, true);

    function DataRequest(start, end, crunched, audio) {
      this.start = start;
      this.end = end;
      this.crunched = crunched;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);

          this.finish(byteArray);

      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      },
    };

        var files = metadata.files;
        for (i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].crunched, files[i].audio).open('GET', files[i].filename);
        }

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // copy the entire loaded file into a spot in the heap. Files will refer to slices in that. They cannot be freed though
        // (we may be allocating before malloc is ready, during startup).
        if (Module['SPLIT_MEMORY']) Module.printErr('warning: you should run the file packager with --no-heap-copy when SPLIT_MEMORY is used, otherwise copying into the heap may fail due to the splitting');
        var ptr = Module['getMemory'](byteArray.length);
        Module['HEAPU8'].set(byteArray, ptr);
        DataRequest.prototype.byteArray = Module['HEAPU8'].subarray(ptr, ptr+byteArray.length);
  
          var files = metadata.files;
          for (i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_game.data');

    };
    Module['addRunDependency']('datafile_game.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 6148, "filename": "/.DS_Store"}, {"audio": 0, "start": 6148, "crunched": 0, "end": 6865, "filename": "/base.lua"}, {"audio": 0, "start": 6865, "crunched": 0, "end": 9270, "filename": "/conf.lua"}, {"audio": 0, "start": 9270, "crunched": 0, "end": 10630, "filename": "/direction.lua"}, {"audio": 0, "start": 10630, "crunched": 0, "end": 12555, "filename": "/game.lua"}, {"audio": 0, "start": 12555, "crunched": 0, "end": 14581, "filename": "/goal.lua"}, {"audio": 0, "start": 14581, "crunched": 0, "end": 15184, "filename": "/hazard.lua"}, {"audio": 0, "start": 15184, "crunched": 0, "end": 16900, "filename": "/main.lua"}, {"audio": 0, "start": 16900, "crunched": 0, "end": 23110, "filename": "/map_loader.lua"}, {"audio": 0, "start": 23110, "crunched": 0, "end": 25355, "filename": "/player_character.lua"}, {"audio": 0, "start": 25355, "crunched": 0, "end": 25498, "filename": "/README.md"}, {"audio": 0, "start": 25498, "crunched": 0, "end": 27603, "filename": "/requirements.lua"}, {"audio": 0, "start": 27603, "crunched": 0, "end": 47095, "filename": "/fonts/04b03.TTF"}, {"audio": 0, "start": 47095, "crunched": 0, "end": 74311, "filename": "/fonts/fixedsys.ttf"}, {"audio": 0, "start": 74311, "crunched": 0, "end": 74343, "filename": "/fonts/README.md"}, {"audio": 0, "start": 74343, "crunched": 0, "end": 75899, "filename": "/images/beam_pi.png"}, {"audio": 0, "start": 75899, "crunched": 0, "end": 77465, "filename": "/images/beam_rec.png"}, {"audio": 0, "start": 77465, "crunched": 0, "end": 81823, "filename": "/images/bg.png"}, {"audio": 0, "start": 81823, "crunched": 0, "end": 83033, "filename": "/images/cloud1.png"}, {"audio": 0, "start": 83033, "crunched": 0, "end": 84278, "filename": "/images/cloud2.png"}, {"audio": 0, "start": 84278, "crunched": 0, "end": 85566, "filename": "/images/cloud3.png"}, {"audio": 0, "start": 85566, "crunched": 0, "end": 94844, "filename": "/images/friendshape.png"}, {"audio": 0, "start": 94844, "crunched": 0, "end": 104997, "filename": "/images/friendshape_controls.png"}, {"audio": 0, "start": 104997, "crunched": 0, "end": 106573, "filename": "/images/gradient.png"}, {"audio": 0, "start": 106573, "crunched": 0, "end": 113302, "filename": "/images/lose.png"}, {"audio": 0, "start": 113302, "crunched": 0, "end": 115034, "filename": "/images/pi_blink.png"}, {"audio": 0, "start": 115034, "crunched": 0, "end": 116801, "filename": "/images/pi_idle.png"}, {"audio": 0, "start": 116801, "crunched": 0, "end": 118218, "filename": "/images/player_circle.png"}, {"audio": 0, "start": 118218, "crunched": 0, "end": 119635, "filename": "/images/player_square.png"}, {"audio": 0, "start": 119635, "crunched": 0, "end": 119668, "filename": "/images/README.md"}, {"audio": 0, "start": 119668, "crunched": 0, "end": 121446, "filename": "/images/rec_blink.png"}, {"audio": 0, "start": 121446, "crunched": 0, "end": 123286, "filename": "/images/rec_idle.png"}, {"audio": 0, "start": 123286, "crunched": 0, "end": 246095, "filename": "/images/spritesheet.png"}, {"audio": 0, "start": 246095, "crunched": 0, "end": 246282, "filename": "/images/tiles.tsx"}, {"audio": 0, "start": 246282, "crunched": 0, "end": 253083, "filename": "/images/win.png"}, {"audio": 0, "start": 253083, "crunched": 0, "end": 289498, "filename": "/levels/Costanza.lua"}, {"audio": 0, "start": 289498, "crunched": 0, "end": 347086, "filename": "/levels/Friends Fall-Ever.lua"}, {"audio": 0, "start": 347086, "crunched": 0, "end": 388049, "filename": "/levels/Friends On The Edge.lua"}, {"audio": 0, "start": 388049, "crunched": 0, "end": 405249, "filename": "/levels/Lever 9000.lua"}, {"audio": 0, "start": 405249, "crunched": 0, "end": 405467, "filename": "/levels/list.lua"}, {"audio": 0, "start": 405467, "crunched": 0, "end": 443926, "filename": "/levels/One Step At A Time.lua"}, {"audio": 0, "start": 443926, "crunched": 0, "end": 495065, "filename": "/levels/Right And Back Again.lua"}, {"audio": 0, "start": 495065, "crunched": 0, "end": 516822, "filename": "/levels/Scorn Sandwich.lua"}, {"audio": 0, "start": 516822, "crunched": 0, "end": 559499, "filename": "/levels/Separated At Birth.lua"}, {"audio": 0, "start": 559499, "crunched": 0, "end": 614791, "filename": "/levels/Taste Delta.lua"}, {"audio": 0, "start": 614791, "crunched": 0, "end": 626994, "filename": "/levels/The Longshot.lua"}, {"audio": 0, "start": 626994, "crunched": 0, "end": 628474, "filename": "/levels/triggers/common.lua"}, {"audio": 0, "start": 628474, "crunched": 0, "end": 629178, "filename": "/levels/triggers/Costanza.lua"}, {"audio": 0, "start": 629178, "crunched": 0, "end": 629883, "filename": "/levels/triggers/Lever 9000.lua"}, {"audio": 0, "start": 629883, "crunched": 0, "end": 630588, "filename": "/levels/triggers/Scorn Sandwich.lua"}, {"audio": 0, "start": 630588, "crunched": 0, "end": 631292, "filename": "/levels/triggers/Taste Delta.lua"}, {"audio": 0, "start": 631292, "crunched": 0, "end": 637857, "filename": "/lib/AnAL.lua"}, {"audio": 0, "start": 637857, "crunched": 0, "end": 639656, "filename": "/lib/astar.lua"}, {"audio": 0, "start": 639656, "crunched": 0, "end": 644524, "filename": "/lib/beholder.lua"}, {"audio": 0, "start": 644524, "crunched": 0, "end": 647578, "filename": "/lib/boid.lua"}, {"audio": 0, "start": 647578, "crunched": 0, "end": 649716, "filename": "/lib/camera.lua"}, {"audio": 0, "start": 649716, "crunched": 0, "end": 660406, "filename": "/lib/colors.lua"}, {"audio": 0, "start": 660406, "crunched": 0, "end": 666129, "filename": "/lib/cron.lua"}, {"audio": 0, "start": 666129, "crunched": 0, "end": 666910, "filename": "/lib/dict_grid.lua"}, {"audio": 0, "start": 666910, "crunched": 0, "end": 670206, "filename": "/lib/grid.lua"}, {"audio": 0, "start": 670206, "crunched": 0, "end": 675779, "filename": "/lib/inspect.lua"}, {"audio": 0, "start": 675779, "crunched": 0, "end": 677741, "filename": "/lib/line.lua"}, {"audio": 0, "start": 677741, "crunched": 0, "end": 683586, "filename": "/lib/love-loader.lua"}, {"audio": 0, "start": 683586, "crunched": 0, "end": 689647, "filename": "/lib/middleclass.lua"}, {"audio": 0, "start": 689647, "crunched": 0, "end": 693467, "filename": "/lib/ordered_set.lua"}, {"audio": 0, "start": 693467, "crunched": 0, "end": 695293, "filename": "/lib/priority_queue.lua"}, {"audio": 0, "start": 695293, "crunched": 0, "end": 700852, "filename": "/lib/skiplist.lua"}, {"audio": 0, "start": 700852, "crunched": 0, "end": 707351, "filename": "/lib/stateful.lua"}, {"audio": 0, "start": 707351, "crunched": 0, "end": 719981, "filename": "/lib/tween.lua"}, {"audio": 0, "start": 719981, "crunched": 0, "end": 725331, "filename": "/lib/vector.lua"}, {"audio": 0, "start": 725331, "crunched": 0, "end": 725372, "filename": "/lib/caternary/.git"}, {"audio": 0, "start": 725372, "crunched": 0, "end": 725696, "filename": "/lib/caternary/.gitignore"}, {"audio": 0, "start": 725696, "crunched": 0, "end": 729996, "filename": "/lib/caternary/init.lua"}, {"audio": 0, "start": 729996, "crunched": 0, "end": 731078, "filename": "/lib/caternary/LICENSE"}, {"audio": 0, "start": 731078, "crunched": 0, "end": 732088, "filename": "/lib/caternary/readme.md"}, {"audio": 1, "start": 732088, "crunched": 0, "end": 1435601, "filename": "/music/intromusic.ogg"}, {"audio": 1, "start": 1435601, "crunched": 0, "end": 1943483, "filename": "/music/music1.ogg"}, {"audio": 0, "start": 1943483, "crunched": 0, "end": 1944062, "filename": "/shaders/loading_shader.glsl"}, {"audio": 0, "start": 1944062, "crunched": 0, "end": 1944090, "filename": "/shaders/README.md"}, {"audio": 1, "start": 1944090, "crunched": 0, "end": 1969987, "filename": "/sounds/block1.ogg"}, {"audio": 1, "start": 1969987, "crunched": 0, "end": 1995019, "filename": "/sounds/block2.ogg"}, {"audio": 1, "start": 1995019, "crunched": 0, "end": 2022490, "filename": "/sounds/cjump.ogg"}, {"audio": 1, "start": 2022490, "crunched": 0, "end": 2080912, "filename": "/sounds/failuresound.ogg"}, {"audio": 1, "start": 2080912, "crunched": 0, "end": 2167829, "filename": "/sounds/friend.ogg"}, {"audio": 1, "start": 2167829, "crunched": 0, "end": 2196355, "filename": "/sounds/goalsound3a.ogg"}, {"audio": 1, "start": 2196355, "crunched": 0, "end": 2223656, "filename": "/sounds/jumppad.ogg"}, {"audio": 0, "start": 2223656, "crunched": 0, "end": 2223689, "filename": "/sounds/README.md"}, {"audio": 1, "start": 2223689, "crunched": 0, "end": 2250905, "filename": "/sounds/sjump.ogg"}, {"audio": 1, "start": 2250905, "crunched": 0, "end": 2363539, "filename": "/sounds/victorysound.ogg"}, {"audio": 0, "start": 2363539, "crunched": 0, "end": 2367490, "filename": "/spec/grid_spec.lua"}, {"audio": 0, "start": 2367490, "crunched": 0, "end": 2369737, "filename": "/spec/line_spec.lua"}, {"audio": 0, "start": 2369737, "crunched": 0, "end": 2373812, "filename": "/states/game/game_loading.lua"}, {"audio": 0, "start": 2373812, "crunched": 0, "end": 2374776, "filename": "/states/game/game_lose.lua"}, {"audio": 0, "start": 2374776, "crunched": 0, "end": 2383161, "filename": "/states/game/game_main.lua"}, {"audio": 0, "start": 2383161, "crunched": 0, "end": 2386537, "filename": "/states/game/game_menu.lua"}, {"audio": 0, "start": 2386537, "crunched": 0, "end": 2386652, "filename": "/states/game/game_over.lua"}, {"audio": 0, "start": 2386652, "crunched": 0, "end": 2387563, "filename": "/states/game/game_title.lua"}, {"audio": 0, "start": 2387563, "crunched": 0, "end": 2388498, "filename": "/states/game/game_win.lua"}], "remote_package_size": 2388498, "package_uuid": "6f57b6bc-d850-4c8c-ab23-2669c6f3cc43"});

})();
