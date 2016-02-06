
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 717, "filename": "/base.lua"}, {"audio": 0, "start": 717, "crunched": 0, "end": 3122, "filename": "/conf.lua"}, {"audio": 0, "start": 3122, "crunched": 0, "end": 4482, "filename": "/direction.lua"}, {"audio": 0, "start": 4482, "crunched": 0, "end": 6407, "filename": "/game.lua"}, {"audio": 0, "start": 6407, "crunched": 0, "end": 8433, "filename": "/goal.lua"}, {"audio": 0, "start": 8433, "crunched": 0, "end": 9036, "filename": "/hazard.lua"}, {"audio": 0, "start": 9036, "crunched": 0, "end": 10752, "filename": "/main.lua"}, {"audio": 0, "start": 10752, "crunched": 0, "end": 16962, "filename": "/map_loader.lua"}, {"audio": 0, "start": 16962, "crunched": 0, "end": 19207, "filename": "/player_character.lua"}, {"audio": 0, "start": 19207, "crunched": 0, "end": 19350, "filename": "/README.md"}, {"audio": 0, "start": 19350, "crunched": 0, "end": 21455, "filename": "/requirements.lua"}, {"audio": 0, "start": 21455, "crunched": 0, "end": 40947, "filename": "/fonts/04b03.TTF"}, {"audio": 0, "start": 40947, "crunched": 0, "end": 68163, "filename": "/fonts/fixedsys.ttf"}, {"audio": 0, "start": 68163, "crunched": 0, "end": 68195, "filename": "/fonts/README.md"}, {"audio": 0, "start": 68195, "crunched": 0, "end": 69751, "filename": "/images/beam_pi.png"}, {"audio": 0, "start": 69751, "crunched": 0, "end": 71317, "filename": "/images/beam_rec.png"}, {"audio": 0, "start": 71317, "crunched": 0, "end": 75675, "filename": "/images/bg.png"}, {"audio": 0, "start": 75675, "crunched": 0, "end": 76885, "filename": "/images/cloud1.png"}, {"audio": 0, "start": 76885, "crunched": 0, "end": 78130, "filename": "/images/cloud2.png"}, {"audio": 0, "start": 78130, "crunched": 0, "end": 79418, "filename": "/images/cloud3.png"}, {"audio": 0, "start": 79418, "crunched": 0, "end": 88696, "filename": "/images/friendshape.png"}, {"audio": 0, "start": 88696, "crunched": 0, "end": 98849, "filename": "/images/friendshape_controls.png"}, {"audio": 0, "start": 98849, "crunched": 0, "end": 100425, "filename": "/images/gradient.png"}, {"audio": 0, "start": 100425, "crunched": 0, "end": 107154, "filename": "/images/lose.png"}, {"audio": 0, "start": 107154, "crunched": 0, "end": 108886, "filename": "/images/pi_blink.png"}, {"audio": 0, "start": 108886, "crunched": 0, "end": 110653, "filename": "/images/pi_idle.png"}, {"audio": 0, "start": 110653, "crunched": 0, "end": 112070, "filename": "/images/player_circle.png"}, {"audio": 0, "start": 112070, "crunched": 0, "end": 113487, "filename": "/images/player_square.png"}, {"audio": 0, "start": 113487, "crunched": 0, "end": 113520, "filename": "/images/README.md"}, {"audio": 0, "start": 113520, "crunched": 0, "end": 115298, "filename": "/images/rec_blink.png"}, {"audio": 0, "start": 115298, "crunched": 0, "end": 117138, "filename": "/images/rec_idle.png"}, {"audio": 0, "start": 117138, "crunched": 0, "end": 239947, "filename": "/images/spritesheet.png"}, {"audio": 0, "start": 239947, "crunched": 0, "end": 240134, "filename": "/images/tiles.tsx"}, {"audio": 0, "start": 240134, "crunched": 0, "end": 246935, "filename": "/images/win.png"}, {"audio": 0, "start": 246935, "crunched": 0, "end": 283350, "filename": "/levels/Costanza.lua"}, {"audio": 0, "start": 283350, "crunched": 0, "end": 340938, "filename": "/levels/Friends Fall-Ever.lua"}, {"audio": 0, "start": 340938, "crunched": 0, "end": 381901, "filename": "/levels/Friends On The Edge.lua"}, {"audio": 0, "start": 381901, "crunched": 0, "end": 399101, "filename": "/levels/Lever 9000.lua"}, {"audio": 0, "start": 399101, "crunched": 0, "end": 399319, "filename": "/levels/list.lua"}, {"audio": 0, "start": 399319, "crunched": 0, "end": 437778, "filename": "/levels/One Step At A Time.lua"}, {"audio": 0, "start": 437778, "crunched": 0, "end": 488917, "filename": "/levels/Right And Back Again.lua"}, {"audio": 0, "start": 488917, "crunched": 0, "end": 510674, "filename": "/levels/Scorn Sandwich.lua"}, {"audio": 0, "start": 510674, "crunched": 0, "end": 553351, "filename": "/levels/Separated At Birth.lua"}, {"audio": 0, "start": 553351, "crunched": 0, "end": 608643, "filename": "/levels/Taste Delta.lua"}, {"audio": 0, "start": 608643, "crunched": 0, "end": 620846, "filename": "/levels/The Longshot.lua"}, {"audio": 0, "start": 620846, "crunched": 0, "end": 622326, "filename": "/levels/triggers/common.lua"}, {"audio": 0, "start": 622326, "crunched": 0, "end": 623030, "filename": "/levels/triggers/Costanza.lua"}, {"audio": 0, "start": 623030, "crunched": 0, "end": 623735, "filename": "/levels/triggers/Lever 9000.lua"}, {"audio": 0, "start": 623735, "crunched": 0, "end": 624440, "filename": "/levels/triggers/Scorn Sandwich.lua"}, {"audio": 0, "start": 624440, "crunched": 0, "end": 625144, "filename": "/levels/triggers/Taste Delta.lua"}, {"audio": 0, "start": 625144, "crunched": 0, "end": 631709, "filename": "/lib/AnAL.lua"}, {"audio": 0, "start": 631709, "crunched": 0, "end": 633508, "filename": "/lib/astar.lua"}, {"audio": 0, "start": 633508, "crunched": 0, "end": 638376, "filename": "/lib/beholder.lua"}, {"audio": 0, "start": 638376, "crunched": 0, "end": 641430, "filename": "/lib/boid.lua"}, {"audio": 0, "start": 641430, "crunched": 0, "end": 643568, "filename": "/lib/camera.lua"}, {"audio": 0, "start": 643568, "crunched": 0, "end": 654258, "filename": "/lib/colors.lua"}, {"audio": 0, "start": 654258, "crunched": 0, "end": 659981, "filename": "/lib/cron.lua"}, {"audio": 0, "start": 659981, "crunched": 0, "end": 660762, "filename": "/lib/dict_grid.lua"}, {"audio": 0, "start": 660762, "crunched": 0, "end": 664058, "filename": "/lib/grid.lua"}, {"audio": 0, "start": 664058, "crunched": 0, "end": 669631, "filename": "/lib/inspect.lua"}, {"audio": 0, "start": 669631, "crunched": 0, "end": 671593, "filename": "/lib/line.lua"}, {"audio": 0, "start": 671593, "crunched": 0, "end": 677438, "filename": "/lib/love-loader.lua"}, {"audio": 0, "start": 677438, "crunched": 0, "end": 683499, "filename": "/lib/middleclass.lua"}, {"audio": 0, "start": 683499, "crunched": 0, "end": 687319, "filename": "/lib/ordered_set.lua"}, {"audio": 0, "start": 687319, "crunched": 0, "end": 689145, "filename": "/lib/priority_queue.lua"}, {"audio": 0, "start": 689145, "crunched": 0, "end": 694704, "filename": "/lib/skiplist.lua"}, {"audio": 0, "start": 694704, "crunched": 0, "end": 701203, "filename": "/lib/stateful.lua"}, {"audio": 0, "start": 701203, "crunched": 0, "end": 713833, "filename": "/lib/tween.lua"}, {"audio": 0, "start": 713833, "crunched": 0, "end": 719183, "filename": "/lib/vector.lua"}, {"audio": 0, "start": 719183, "crunched": 0, "end": 719224, "filename": "/lib/caternary/.git"}, {"audio": 0, "start": 719224, "crunched": 0, "end": 719548, "filename": "/lib/caternary/.gitignore"}, {"audio": 0, "start": 719548, "crunched": 0, "end": 723848, "filename": "/lib/caternary/init.lua"}, {"audio": 0, "start": 723848, "crunched": 0, "end": 724930, "filename": "/lib/caternary/LICENSE"}, {"audio": 0, "start": 724930, "crunched": 0, "end": 725940, "filename": "/lib/caternary/readme.md"}, {"audio": 1, "start": 725940, "crunched": 0, "end": 1429453, "filename": "/music/intromusic.ogg"}, {"audio": 1, "start": 1429453, "crunched": 0, "end": 1937335, "filename": "/music/music1.ogg"}, {"audio": 0, "start": 1937335, "crunched": 0, "end": 1937914, "filename": "/shaders/loading_shader.glsl"}, {"audio": 0, "start": 1937914, "crunched": 0, "end": 1937942, "filename": "/shaders/README.md"}, {"audio": 1, "start": 1937942, "crunched": 0, "end": 1963839, "filename": "/sounds/block1.ogg"}, {"audio": 1, "start": 1963839, "crunched": 0, "end": 1988871, "filename": "/sounds/block2.ogg"}, {"audio": 1, "start": 1988871, "crunched": 0, "end": 2016342, "filename": "/sounds/cjump.ogg"}, {"audio": 1, "start": 2016342, "crunched": 0, "end": 2074764, "filename": "/sounds/failuresound.ogg"}, {"audio": 1, "start": 2074764, "crunched": 0, "end": 2161681, "filename": "/sounds/friend.ogg"}, {"audio": 1, "start": 2161681, "crunched": 0, "end": 2190207, "filename": "/sounds/goalsound3a.ogg"}, {"audio": 1, "start": 2190207, "crunched": 0, "end": 2217508, "filename": "/sounds/jumppad.ogg"}, {"audio": 0, "start": 2217508, "crunched": 0, "end": 2217541, "filename": "/sounds/README.md"}, {"audio": 1, "start": 2217541, "crunched": 0, "end": 2244757, "filename": "/sounds/sjump.ogg"}, {"audio": 1, "start": 2244757, "crunched": 0, "end": 2357391, "filename": "/sounds/victorysound.ogg"}, {"audio": 0, "start": 2357391, "crunched": 0, "end": 2361342, "filename": "/spec/grid_spec.lua"}, {"audio": 0, "start": 2361342, "crunched": 0, "end": 2363589, "filename": "/spec/line_spec.lua"}, {"audio": 0, "start": 2363589, "crunched": 0, "end": 2367664, "filename": "/states/game/game_loading.lua"}, {"audio": 0, "start": 2367664, "crunched": 0, "end": 2368628, "filename": "/states/game/game_lose.lua"}, {"audio": 0, "start": 2368628, "crunched": 0, "end": 2377013, "filename": "/states/game/game_main.lua"}, {"audio": 0, "start": 2377013, "crunched": 0, "end": 2380389, "filename": "/states/game/game_menu.lua"}, {"audio": 0, "start": 2380389, "crunched": 0, "end": 2380504, "filename": "/states/game/game_over.lua"}, {"audio": 0, "start": 2380504, "crunched": 0, "end": 2381415, "filename": "/states/game/game_title.lua"}, {"audio": 0, "start": 2381415, "crunched": 0, "end": 2382350, "filename": "/states/game/game_win.lua"}], "remote_package_size": 2382350, "package_uuid": "7e80355b-be5b-431a-97ad-44692151eb86"});

})();
