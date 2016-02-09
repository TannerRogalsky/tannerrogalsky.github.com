
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
Module['FS_createPath']('/', 'images', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'HardonCollider', true, true);
Module['FS_createPath']('/', 'mixins', true, true);
Module['FS_createPath']('/', 'shaders', true, true);
Module['FS_createPath']('/', 'sounds', true, true);
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 10, "filename": "/.gitignore"}, {"audio": 0, "start": 10, "crunched": 0, "end": 721, "filename": "/base.lua"}, {"audio": 0, "start": 721, "crunched": 0, "end": 2247, "filename": "/conf.lua"}, {"audio": 0, "start": 2247, "crunched": 0, "end": 2935, "filename": "/game.lua"}, {"audio": 0, "start": 2935, "crunched": 0, "end": 3818, "filename": "/main.lua"}, {"audio": 0, "start": 3818, "crunched": 0, "end": 5113, "filename": "/moving_sprite.lua"}, {"audio": 0, "start": 5113, "crunched": 0, "end": 7111, "filename": "/obstacle.lua"}, {"audio": 0, "start": 7111, "crunched": 0, "end": 7960, "filename": "/platform.lua"}, {"audio": 0, "start": 7960, "crunched": 0, "end": 8103, "filename": "/README.md"}, {"audio": 0, "start": 8103, "crunched": 0, "end": 9821, "filename": "/requirements.lua"}, {"audio": 0, "start": 9821, "crunched": 0, "end": 12569, "filename": "/rob_ford.lua"}, {"audio": 0, "start": 12569, "crunched": 0, "end": 13789, "filename": "/runner.lua"}, {"audio": 0, "start": 13789, "crunched": 0, "end": 20738, "filename": "/images/Beige_bldg.png"}, {"audio": 0, "start": 20738, "crunched": 0, "end": 26557, "filename": "/images/Brown_bldg.png"}, {"audio": 0, "start": 26557, "crunched": 0, "end": 34924, "filename": "/images/Cheesy_background.png"}, {"audio": 0, "start": 34924, "crunched": 0, "end": 72900, "filename": "/images/Game_Over.png"}, {"audio": 0, "start": 72900, "crunched": 0, "end": 79749, "filename": "/images/Green_bldg.png"}, {"audio": 0, "start": 79749, "crunched": 0, "end": 88882, "filename": "/images/Grey_bldg.png"}, {"audio": 0, "start": 88882, "crunched": 0, "end": 104439, "filename": "/images/homeless_man.png"}, {"audio": 0, "start": 104439, "crunched": 0, "end": 192514, "filename": "/images/Intro_Screen.png"}, {"audio": 0, "start": 192514, "crunched": 0, "end": 210129, "filename": "/images/Karen_Stintz_punch copy.png"}, {"audio": 0, "start": 210129, "crunched": 0, "end": 226411, "filename": "/images/Karen_Stintz_stand copy.png"}, {"audio": 0, "start": 226411, "crunched": 0, "end": 234502, "filename": "/images/KFC_bucket.png"}, {"audio": 0, "start": 234502, "crunched": 0, "end": 249469, "filename": "/images/Paparazzi.png"}, {"audio": 0, "start": 249469, "crunched": 0, "end": 256600, "filename": "/images/Pink_bldg.png"}, {"audio": 0, "start": 256600, "crunched": 0, "end": 256633, "filename": "/images/README.md"}, {"audio": 0, "start": 256633, "crunched": 0, "end": 280095, "filename": "/images/Rob Ford.png"}, {"audio": 0, "start": 280095, "crunched": 0, "end": 367602, "filename": "/images/rob_ford_anim.png"}, {"audio": 0, "start": 367602, "crunched": 0, "end": 389683, "filename": "/images/Rob_Ford_fall copy.png"}, {"audio": 0, "start": 389683, "crunched": 0, "end": 412486, "filename": "/images/Rob_Ford_jump copy.png"}, {"audio": 0, "start": 412486, "crunched": 0, "end": 436249, "filename": "/images/Rob_Ford_punching copy.png"}, {"audio": 0, "start": 436249, "crunched": 0, "end": 459467, "filename": "/images/Rob_Ford_standing copy.png"}, {"audio": 0, "start": 459467, "crunched": 0, "end": 484588, "filename": "/images/Rob_Ford_walk1.png"}, {"audio": 0, "start": 484588, "crunched": 0, "end": 508305, "filename": "/images/Rob_Ford_walk2.png"}, {"audio": 0, "start": 508305, "crunched": 0, "end": 531055, "filename": "/images/Rob_Ford_walk3.png"}, {"audio": 0, "start": 531055, "crunched": 0, "end": 555867, "filename": "/images/Rob_Ford_walk4.png"}, {"audio": 0, "start": 555867, "crunched": 0, "end": 565976, "filename": "/images/Street_pole.png"}, {"audio": 0, "start": 565976, "crunched": 0, "end": 650944, "filename": "/images/Subway_screenshot.png"}, {"audio": 0, "start": 650944, "crunched": 0, "end": 656783, "filename": "/images/trashbag.png"}, {"audio": 0, "start": 656783, "crunched": 0, "end": 671853, "filename": "/images/tree.png"}, {"audio": 0, "start": 671853, "crunched": 0, "end": 678418, "filename": "/lib/AnAL.lua"}, {"audio": 0, "start": 678418, "crunched": 0, "end": 680217, "filename": "/lib/astar.lua"}, {"audio": 0, "start": 680217, "crunched": 0, "end": 685085, "filename": "/lib/beholder.lua"}, {"audio": 0, "start": 685085, "crunched": 0, "end": 687020, "filename": "/lib/camera.lua"}, {"audio": 0, "start": 687020, "crunched": 0, "end": 697710, "filename": "/lib/colors.lua"}, {"audio": 0, "start": 697710, "crunched": 0, "end": 703433, "filename": "/lib/cron.lua"}, {"audio": 0, "start": 703433, "crunched": 0, "end": 706734, "filename": "/lib/grid.lua"}, {"audio": 0, "start": 706734, "crunched": 0, "end": 712307, "filename": "/lib/inspect.lua"}, {"audio": 0, "start": 712307, "crunched": 0, "end": 718307, "filename": "/lib/love-loader.lua"}, {"audio": 0, "start": 718307, "crunched": 0, "end": 720150, "filename": "/lib/menu.lua"}, {"audio": 0, "start": 720150, "crunched": 0, "end": 725451, "filename": "/lib/middleclass.lua"}, {"audio": 0, "start": 725451, "crunched": 0, "end": 729271, "filename": "/lib/ordered_set.lua"}, {"audio": 0, "start": 729271, "crunched": 0, "end": 731097, "filename": "/lib/priority_queue.lua"}, {"audio": 0, "start": 731097, "crunched": 0, "end": 736656, "filename": "/lib/skiplist.lua"}, {"audio": 0, "start": 736656, "crunched": 0, "end": 743155, "filename": "/lib/stateful.lua"}, {"audio": 0, "start": 743155, "crunched": 0, "end": 755785, "filename": "/lib/tween.lua"}, {"audio": 0, "start": 755785, "crunched": 0, "end": 759233, "filename": "/lib/HardonCollider/class.lua"}, {"audio": 0, "start": 759233, "crunched": 0, "end": 764040, "filename": "/lib/HardonCollider/gjk.lua"}, {"audio": 0, "start": 764040, "crunched": 0, "end": 772766, "filename": "/lib/HardonCollider/init.lua"}, {"audio": 0, "start": 772766, "crunched": 0, "end": 785890, "filename": "/lib/HardonCollider/polygon.lua"}, {"audio": 0, "start": 785890, "crunched": 0, "end": 786008, "filename": "/lib/HardonCollider/README"}, {"audio": 0, "start": 786008, "crunched": 0, "end": 797606, "filename": "/lib/HardonCollider/shapes.lua"}, {"audio": 0, "start": 797606, "crunched": 0, "end": 801860, "filename": "/lib/HardonCollider/spatialhash.lua"}, {"audio": 0, "start": 801860, "crunched": 0, "end": 804927, "filename": "/lib/HardonCollider/vector-light.lua"}, {"audio": 0, "start": 804927, "crunched": 0, "end": 805192, "filename": "/mixins/y_sortable.lua"}, {"audio": 0, "start": 805192, "crunched": 0, "end": 805220, "filename": "/shaders/README.md"}, {"audio": 0, "start": 805220, "crunched": 0, "end": 805253, "filename": "/sounds/README.md"}, {"audio": 0, "start": 805253, "crunched": 0, "end": 805831, "filename": "/states/game/game_loading.lua"}, {"audio": 0, "start": 805831, "crunched": 0, "end": 809229, "filename": "/states/game/game_main.lua"}, {"audio": 0, "start": 809229, "crunched": 0, "end": 809782, "filename": "/states/game/game_menu.lua"}, {"audio": 0, "start": 809782, "crunched": 0, "end": 810384, "filename": "/states/game/game_over.lua"}, {"audio": 0, "start": 810384, "crunched": 0, "end": 813493, "filename": "/states/game/game_platformer.lua"}], "remote_package_size": 813493, "package_uuid": "f6edd500-d494-420d-b58a-e934ad0a92db"});

})();
