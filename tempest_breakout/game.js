
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
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
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
Module['FS_createPath']('/lib', 'anim8', true, true);
Module['FS_createPath']('/lib/anim8', 'spec', true, true);
Module['FS_createPath']('/lib/anim8/spec', 'anim8', true, true);
Module['FS_createPath']('/lib', 'binser', true, true);
Module['FS_createPath']('/lib/binser', 'rockspecs', true, true);
Module['FS_createPath']('/lib/binser', 'spec', true, true);
Module['FS_createPath']('/lib', 'cron', true, true);
Module['FS_createPath']('/lib/cron', 'spec', true, true);
Module['FS_createPath']('/lib', 'HardonCollider', true, true);
Module['FS_createPath']('/lib/HardonCollider', 'docs', true, true);
Module['FS_createPath']('/lib', 'inspect', true, true);
Module['FS_createPath']('/lib/inspect', 'rockspecs', true, true);
Module['FS_createPath']('/lib/inspect', 'spec', true, true);
Module['FS_createPath']('/lib', 'love-loader', true, true);
Module['FS_createPath']('/lib', 'middleclass', true, true);
Module['FS_createPath']('/lib/middleclass', 'performance', true, true);
Module['FS_createPath']('/lib/middleclass', 'rockspecs', true, true);
Module['FS_createPath']('/lib/middleclass', 'spec', true, true);
Module['FS_createPath']('/lib', 'push', true, true);
Module['FS_createPath']('/lib/push', 'examples', true, true);
Module['FS_createPath']('/lib/push/examples', '1', true, true);
Module['FS_createPath']('/lib/push/examples', '2', true, true);
Module['FS_createPath']('/lib', 'stateful', true, true);
Module['FS_createPath']('/lib/stateful', 'spec', true, true);
Module['FS_createPath']('/lib/stateful/spec', 'lib', true, true);
Module['FS_createPath']('/lib', 'SUIT', true, true);
Module['FS_createPath']('/lib/SUIT', 'docs', true, true);
Module['FS_createPath']('/lib/SUIT/docs', '_static', true, true);
Module['FS_createPath']('/lib', 'tween', true, true);
Module['FS_createPath']('/lib/tween', 'rockspecs', true, true);
Module['FS_createPath']('/lib/tween', 'spec', true, true);
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
      }
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 10244, "filename": "/.DS_Store"}, {"audio": 0, "start": 10244, "crunched": 0, "end": 11293, "filename": "/.travis.yml"}, {"audio": 0, "start": 11293, "crunched": 0, "end": 12010, "filename": "/base.lua"}, {"audio": 0, "start": 12010, "crunched": 0, "end": 15272, "filename": "/conf.lua"}, {"audio": 0, "start": 15272, "crunched": 0, "end": 16628, "filename": "/direction.lua"}, {"audio": 0, "start": 16628, "crunched": 0, "end": 17696, "filename": "/game.lua"}, {"audio": 0, "start": 17696, "crunched": 0, "end": 18777, "filename": "/LICENSE"}, {"audio": 0, "start": 18777, "crunched": 0, "end": 20983, "filename": "/main.lua"}, {"audio": 0, "start": 20983, "crunched": 0, "end": 21126, "filename": "/README.md"}, {"audio": 0, "start": 21126, "crunched": 0, "end": 23016, "filename": "/requirements.lua"}, {"audio": 0, "start": 23016, "crunched": 0, "end": 29164, "filename": "/images/.DS_Store"}, {"audio": 0, "start": 29164, "crunched": 0, "end": 29197, "filename": "/images/README.md"}, {"audio": 0, "start": 29197, "crunched": 0, "end": 30996, "filename": "/lib/astar.lua"}, {"audio": 0, "start": 30996, "crunched": 0, "end": 35864, "filename": "/lib/beholder.lua"}, {"audio": 0, "start": 35864, "crunched": 0, "end": 38940, "filename": "/lib/boid.lua"}, {"audio": 0, "start": 38940, "crunched": 0, "end": 40922, "filename": "/lib/camera.lua"}, {"audio": 0, "start": 40922, "crunched": 0, "end": 51612, "filename": "/lib/colors.lua"}, {"audio": 0, "start": 51612, "crunched": 0, "end": 54908, "filename": "/lib/grid.lua"}, {"audio": 0, "start": 54908, "crunched": 0, "end": 55484, "filename": "/lib/hsl.lua"}, {"audio": 0, "start": 55484, "crunched": 0, "end": 57446, "filename": "/lib/line.lua"}, {"audio": 0, "start": 57446, "crunched": 0, "end": 65672, "filename": "/lib/love_pixlr.lua"}, {"audio": 0, "start": 65672, "crunched": 0, "end": 67984, "filename": "/lib/meshed_batch.lua"}, {"audio": 0, "start": 67984, "crunched": 0, "end": 73275, "filename": "/lib/ordered_set.lua"}, {"audio": 0, "start": 73275, "crunched": 0, "end": 76572, "filename": "/lib/priority_queue.lua"}, {"audio": 0, "start": 76572, "crunched": 0, "end": 82131, "filename": "/lib/skiplist.lua"}, {"audio": 0, "start": 82131, "crunched": 0, "end": 87481, "filename": "/lib/vector.lua"}, {"audio": 0, "start": 87481, "crunched": 0, "end": 87518, "filename": "/lib/anim8/.git"}, {"audio": 0, "start": 87518, "crunched": 0, "end": 88564, "filename": "/lib/anim8/.travis.yml"}, {"audio": 0, "start": 88564, "crunched": 0, "end": 96819, "filename": "/lib/anim8/anim8.lua"}, {"audio": 0, "start": 96819, "crunched": 0, "end": 97196, "filename": "/lib/anim8/CHANGELOG.md"}, {"audio": 0, "start": 97196, "crunched": 0, "end": 98260, "filename": "/lib/anim8/MIT-LICENSE.txt"}, {"audio": 0, "start": 98260, "crunched": 0, "end": 106873, "filename": "/lib/anim8/README.md"}, {"audio": 0, "start": 106873, "crunched": 0, "end": 107534, "filename": "/lib/anim8/spec/love-mocks.lua"}, {"audio": 0, "start": 107534, "crunched": 0, "end": 116407, "filename": "/lib/anim8/spec/anim8/animation_spec.lua"}, {"audio": 0, "start": 116407, "crunched": 0, "end": 121246, "filename": "/lib/anim8/spec/anim8/grid_spec.lua"}, {"audio": 0, "start": 121246, "crunched": 0, "end": 121284, "filename": "/lib/binser/.git"}, {"audio": 0, "start": 121284, "crunched": 0, "end": 121315, "filename": "/lib/binser/.gitignore"}, {"audio": 0, "start": 121315, "crunched": 0, "end": 122438, "filename": "/lib/binser/.travis.yml"}, {"audio": 0, "start": 122438, "crunched": 0, "end": 122910, "filename": "/lib/binser/binser-scm-0.rockspec"}, {"audio": 0, "start": 122910, "crunched": 0, "end": 141768, "filename": "/lib/binser/binser.lua"}, {"audio": 0, "start": 141768, "crunched": 0, "end": 142823, "filename": "/lib/binser/LICENSE.md"}, {"audio": 0, "start": 142823, "crunched": 0, "end": 149485, "filename": "/lib/binser/README.md"}, {"audio": 0, "start": 149485, "crunched": 0, "end": 149957, "filename": "/lib/binser/rockspecs/binser-0.0-1.rockspec"}, {"audio": 0, "start": 149957, "crunched": 0, "end": 150429, "filename": "/lib/binser/rockspecs/binser-0.0-2.rockspec"}, {"audio": 0, "start": 150429, "crunched": 0, "end": 150901, "filename": "/lib/binser/rockspecs/binser-0.0-3.rockspec"}, {"audio": 0, "start": 150901, "crunched": 0, "end": 151389, "filename": "/lib/binser/rockspecs/binser-0.0-4.rockspec"}, {"audio": 0, "start": 151389, "crunched": 0, "end": 160338, "filename": "/lib/binser/spec/binser_spec.lua"}, {"audio": 0, "start": 160338, "crunched": 0, "end": 160374, "filename": "/lib/cron/.git"}, {"audio": 0, "start": 160374, "crunched": 0, "end": 160555, "filename": "/lib/cron/.travis.yml"}, {"audio": 0, "start": 160555, "crunched": 0, "end": 160734, "filename": "/lib/cron/CHANGELOG.md"}, {"audio": 0, "start": 160734, "crunched": 0, "end": 163761, "filename": "/lib/cron/cron.lua"}, {"audio": 0, "start": 163761, "crunched": 0, "end": 164825, "filename": "/lib/cron/MIT-LICENSE.txt"}, {"audio": 0, "start": 164825, "crunched": 0, "end": 167849, "filename": "/lib/cron/README.md"}, {"audio": 0, "start": 167849, "crunched": 0, "end": 171555, "filename": "/lib/cron/spec/cron_spec.lua"}, {"audio": 0, "start": 171555, "crunched": 0, "end": 171601, "filename": "/lib/HardonCollider/.git"}, {"audio": 0, "start": 171601, "crunched": 0, "end": 175047, "filename": "/lib/HardonCollider/class.lua"}, {"audio": 0, "start": 175047, "crunched": 0, "end": 180640, "filename": "/lib/HardonCollider/gjk.lua"}, {"audio": 0, "start": 180640, "crunched": 0, "end": 181206, "filename": "/lib/HardonCollider/HC-0.1-1.rockspec"}, {"audio": 0, "start": 181206, "crunched": 0, "end": 185779, "filename": "/lib/HardonCollider/init.lua"}, {"audio": 0, "start": 185779, "crunched": 0, "end": 199312, "filename": "/lib/HardonCollider/polygon.lua"}, {"audio": 0, "start": 199312, "crunched": 0, "end": 199419, "filename": "/lib/HardonCollider/README"}, {"audio": 0, "start": 199419, "crunched": 0, "end": 211781, "filename": "/lib/HardonCollider/shapes.lua"}, {"audio": 0, "start": 211781, "crunched": 0, "end": 216405, "filename": "/lib/HardonCollider/spatialhash.lua"}, {"audio": 0, "start": 216405, "crunched": 0, "end": 219472, "filename": "/lib/HardonCollider/vector-light.lua"}, {"audio": 0, "start": 219472, "crunched": 0, "end": 219545, "filename": "/lib/HardonCollider/docs/Class.rst"}, {"audio": 0, "start": 219545, "crunched": 0, "end": 228939, "filename": "/lib/HardonCollider/docs/conf.py"}, {"audio": 0, "start": 228939, "crunched": 0, "end": 231738, "filename": "/lib/HardonCollider/docs/index.rst"}, {"audio": 0, "start": 231738, "crunched": 0, "end": 233043, "filename": "/lib/HardonCollider/docs/license.rst"}, {"audio": 0, "start": 233043, "crunched": 0, "end": 240209, "filename": "/lib/HardonCollider/docs/MainModule.rst"}, {"audio": 0, "start": 240209, "crunched": 0, "end": 247602, "filename": "/lib/HardonCollider/docs/Makefile"}, {"audio": 0, "start": 247602, "crunched": 0, "end": 253178, "filename": "/lib/HardonCollider/docs/Polygon.rst"}, {"audio": 0, "start": 253178, "crunched": 0, "end": 253558, "filename": "/lib/HardonCollider/docs/reference.rst"}, {"audio": 0, "start": 253558, "crunched": 0, "end": 260918, "filename": "/lib/HardonCollider/docs/Shapes.rst"}, {"audio": 0, "start": 260918, "crunched": 0, "end": 265591, "filename": "/lib/HardonCollider/docs/SpatialHash.rst"}, {"audio": 0, "start": 265591, "crunched": 0, "end": 265627, "filename": "/lib/HardonCollider/docs/tutorial.rst"}, {"audio": 0, "start": 265627, "crunched": 0, "end": 265711, "filename": "/lib/HardonCollider/docs/Vector.rst"}, {"audio": 0, "start": 265711, "crunched": 0, "end": 265750, "filename": "/lib/inspect/.git"}, {"audio": 0, "start": 265750, "crunched": 0, "end": 266200, "filename": "/lib/inspect/.travis.yml"}, {"audio": 0, "start": 266200, "crunched": 0, "end": 267028, "filename": "/lib/inspect/CHANGELOG.md"}, {"audio": 0, "start": 267028, "crunched": 0, "end": 276285, "filename": "/lib/inspect/inspect.lua"}, {"audio": 0, "start": 276285, "crunched": 0, "end": 277349, "filename": "/lib/inspect/MIT-LICENSE.txt"}, {"audio": 0, "start": 277349, "crunched": 0, "end": 284170, "filename": "/lib/inspect/README.md"}, {"audio": 0, "start": 284170, "crunched": 0, "end": 284783, "filename": "/lib/inspect/rockspecs/inspect-1.2-2.rockspec"}, {"audio": 0, "start": 284783, "crunched": 0, "end": 285396, "filename": "/lib/inspect/rockspecs/inspect-2.0-1.rockspec"}, {"audio": 0, "start": 285396, "crunched": 0, "end": 286024, "filename": "/lib/inspect/rockspecs/inspect-3.0-1.rockspec"}, {"audio": 0, "start": 286024, "crunched": 0, "end": 286652, "filename": "/lib/inspect/rockspecs/inspect-3.0-2.rockspec"}, {"audio": 0, "start": 286652, "crunched": 0, "end": 287280, "filename": "/lib/inspect/rockspecs/inspect-3.0-3.rockspec"}, {"audio": 0, "start": 287280, "crunched": 0, "end": 300434, "filename": "/lib/inspect/spec/inspect_spec.lua"}, {"audio": 0, "start": 300434, "crunched": 0, "end": 301222, "filename": "/lib/inspect/spec/unindent.lua"}, {"audio": 0, "start": 301222, "crunched": 0, "end": 301265, "filename": "/lib/love-loader/.git"}, {"audio": 0, "start": 301265, "crunched": 0, "end": 307709, "filename": "/lib/love-loader/love-loader.lua"}, {"audio": 0, "start": 307709, "crunched": 0, "end": 308790, "filename": "/lib/love-loader/MIT-LICENSE.txt"}, {"audio": 0, "start": 308790, "crunched": 0, "end": 312188, "filename": "/lib/love-loader/README.md"}, {"audio": 0, "start": 312188, "crunched": 0, "end": 312231, "filename": "/lib/middleclass/.git"}, {"audio": 0, "start": 312231, "crunched": 0, "end": 312954, "filename": "/lib/middleclass/.travis.yml"}, {"audio": 0, "start": 312954, "crunched": 0, "end": 314600, "filename": "/lib/middleclass/CHANGELOG.md"}, {"audio": 0, "start": 314600, "crunched": 0, "end": 320573, "filename": "/lib/middleclass/middleclass.lua"}, {"audio": 0, "start": 320573, "crunched": 0, "end": 321637, "filename": "/lib/middleclass/MIT-LICENSE.txt"}, {"audio": 0, "start": 321637, "crunched": 0, "end": 323646, "filename": "/lib/middleclass/README.md"}, {"audio": 0, "start": 323646, "crunched": 0, "end": 326141, "filename": "/lib/middleclass/UPDATING.md"}, {"audio": 0, "start": 326141, "crunched": 0, "end": 326749, "filename": "/lib/middleclass/performance/run.lua"}, {"audio": 0, "start": 326749, "crunched": 0, "end": 326929, "filename": "/lib/middleclass/performance/time.lua"}, {"audio": 0, "start": 326929, "crunched": 0, "end": 327447, "filename": "/lib/middleclass/rockspecs/middleclass-3.0-0.rockspec"}, {"audio": 0, "start": 327447, "crunched": 0, "end": 327965, "filename": "/lib/middleclass/rockspecs/middleclass-3.1-0.rockspec"}, {"audio": 0, "start": 327965, "crunched": 0, "end": 328483, "filename": "/lib/middleclass/rockspecs/middleclass-3.2-0.rockspec"}, {"audio": 0, "start": 328483, "crunched": 0, "end": 329001, "filename": "/lib/middleclass/rockspecs/middleclass-4.0-0.rockspec"}, {"audio": 0, "start": 329001, "crunched": 0, "end": 329850, "filename": "/lib/middleclass/spec/class_spec.lua"}, {"audio": 0, "start": 329850, "crunched": 0, "end": 333135, "filename": "/lib/middleclass/spec/classes_spec.lua"}, {"audio": 0, "start": 333135, "crunched": 0, "end": 340903, "filename": "/lib/middleclass/spec/default_methods_spec.lua"}, {"audio": 0, "start": 340903, "crunched": 0, "end": 342343, "filename": "/lib/middleclass/spec/instances_spec.lua"}, {"audio": 0, "start": 342343, "crunched": 0, "end": 344398, "filename": "/lib/middleclass/spec/metamethods_lua_5_2.lua"}, {"audio": 0, "start": 344398, "crunched": 0, "end": 347335, "filename": "/lib/middleclass/spec/metamethods_lua_5_3.lua"}, {"audio": 0, "start": 347335, "crunched": 0, "end": 356430, "filename": "/lib/middleclass/spec/metamethods_spec.lua"}, {"audio": 0, "start": 356430, "crunched": 0, "end": 357842, "filename": "/lib/middleclass/spec/mixins_spec.lua"}, {"audio": 0, "start": 357842, "crunched": 0, "end": 357878, "filename": "/lib/push/.git"}, {"audio": 0, "start": 357878, "crunched": 0, "end": 358958, "filename": "/lib/push/LICENSE"}, {"audio": 0, "start": 358958, "crunched": 0, "end": 359548, "filename": "/lib/push/main.lua"}, {"audio": 0, "start": 359548, "crunched": 0, "end": 364559, "filename": "/lib/push/push.lua"}, {"audio": 0, "start": 364559, "crunched": 0, "end": 367480, "filename": "/lib/push/README.md"}, {"audio": 0, "start": 367480, "crunched": 0, "end": 368824, "filename": "/lib/push/examples/1/init.lua"}, {"audio": 0, "start": 368824, "crunched": 0, "end": 386990, "filename": "/lib/push/examples/2/background.png"}, {"audio": 0, "start": 386990, "crunched": 0, "end": 389090, "filename": "/lib/push/examples/2/init.lua"}, {"audio": 0, "start": 389090, "crunched": 0, "end": 404253, "filename": "/lib/push/examples/2/mario.png"}, {"audio": 0, "start": 404253, "crunched": 0, "end": 404293, "filename": "/lib/stateful/.git"}, {"audio": 0, "start": 404293, "crunched": 0, "end": 405349, "filename": "/lib/stateful/.travis.yml"}, {"audio": 0, "start": 405349, "crunched": 0, "end": 406413, "filename": "/lib/stateful/MIT-LICENSE.txt"}, {"audio": 0, "start": 406413, "crunched": 0, "end": 408249, "filename": "/lib/stateful/README.md"}, {"audio": 0, "start": 408249, "crunched": 0, "end": 414673, "filename": "/lib/stateful/stateful.lua"}, {"audio": 0, "start": 414673, "crunched": 0, "end": 422350, "filename": "/lib/stateful/spec/acceptance_spec.lua"}, {"audio": 0, "start": 422350, "crunched": 0, "end": 431628, "filename": "/lib/stateful/spec/unit_spec.lua"}, {"audio": 0, "start": 431628, "crunched": 0, "end": 437687, "filename": "/lib/stateful/spec/lib/middleclass.lua"}, {"audio": 0, "start": 437687, "crunched": 0, "end": 437723, "filename": "/lib/SUIT/.git"}, {"audio": 0, "start": 437723, "crunched": 0, "end": 437739, "filename": "/lib/SUIT/.gitignore"}, {"audio": 0, "start": 437739, "crunched": 0, "end": 438437, "filename": "/lib/SUIT/button.lua"}, {"audio": 0, "start": 438437, "crunched": 0, "end": 439260, "filename": "/lib/SUIT/checkbox.lua"}, {"audio": 0, "start": 439260, "crunched": 0, "end": 442986, "filename": "/lib/SUIT/core.lua"}, {"audio": 0, "start": 442986, "crunched": 0, "end": 444324, "filename": "/lib/SUIT/imagebutton.lua"}, {"audio": 0, "start": 444324, "crunched": 0, "end": 446579, "filename": "/lib/SUIT/init.lua"}, {"audio": 0, "start": 446579, "crunched": 0, "end": 450019, "filename": "/lib/SUIT/input.lua"}, {"audio": 0, "start": 450019, "crunched": 0, "end": 450716, "filename": "/lib/SUIT/label.lua"}, {"audio": 0, "start": 450716, "crunched": 0, "end": 458527, "filename": "/lib/SUIT/layout.lua"}, {"audio": 0, "start": 458527, "crunched": 0, "end": 459810, "filename": "/lib/SUIT/license.txt"}, {"audio": 0, "start": 459810, "crunched": 0, "end": 461413, "filename": "/lib/SUIT/README.md"}, {"audio": 0, "start": 461413, "crunched": 0, "end": 463021, "filename": "/lib/SUIT/slider.lua"}, {"audio": 0, "start": 463021, "crunched": 0, "end": 466866, "filename": "/lib/SUIT/theme.lua"}, {"audio": 0, "start": 466866, "crunched": 0, "end": 476202, "filename": "/lib/SUIT/docs/conf.py"}, {"audio": 0, "start": 476202, "crunched": 0, "end": 481856, "filename": "/lib/SUIT/docs/core.rst"}, {"audio": 0, "start": 481856, "crunched": 0, "end": 493831, "filename": "/lib/SUIT/docs/gettingstarted.rst"}, {"audio": 0, "start": 493831, "crunched": 0, "end": 502038, "filename": "/lib/SUIT/docs/index.rst"}, {"audio": 0, "start": 502038, "crunched": 0, "end": 508779, "filename": "/lib/SUIT/docs/layout.rst"}, {"audio": 0, "start": 508779, "crunched": 0, "end": 510079, "filename": "/lib/SUIT/docs/license.rst"}, {"audio": 0, "start": 510079, "crunched": 0, "end": 517480, "filename": "/lib/SUIT/docs/Makefile"}, {"audio": 0, "start": 517480, "crunched": 0, "end": 517532, "filename": "/lib/SUIT/docs/themes.rst"}, {"audio": 0, "start": 517532, "crunched": 0, "end": 523597, "filename": "/lib/SUIT/docs/widgets.rst"}, {"audio": 0, "start": 523597, "crunched": 0, "end": 1847951, "filename": "/lib/SUIT/docs/_static/demo.gif"}, {"audio": 0, "start": 1847951, "crunched": 0, "end": 1896480, "filename": "/lib/SUIT/docs/_static/hello-world.gif"}, {"audio": 0, "start": 1896480, "crunched": 0, "end": 1905773, "filename": "/lib/SUIT/docs/_static/keyboard.gif"}, {"audio": 0, "start": 1905773, "crunched": 0, "end": 1966123, "filename": "/lib/SUIT/docs/_static/layout.gif"}, {"audio": 0, "start": 1966123, "crunched": 0, "end": 2045725, "filename": "/lib/SUIT/docs/_static/mutable-state.gif"}, {"audio": 0, "start": 2045725, "crunched": 0, "end": 2097719, "filename": "/lib/SUIT/docs/_static/options.gif"}, {"audio": 0, "start": 2097719, "crunched": 0, "end": 2097756, "filename": "/lib/tween/.git"}, {"audio": 0, "start": 2097756, "crunched": 0, "end": 2098089, "filename": "/lib/tween/.travis.yml"}, {"audio": 0, "start": 2098089, "crunched": 0, "end": 2099374, "filename": "/lib/tween/.travis_setup.sh"}, {"audio": 0, "start": 2099374, "crunched": 0, "end": 2099939, "filename": "/lib/tween/CHANGELOG.md"}, {"audio": 0, "start": 2099939, "crunched": 0, "end": 2104643, "filename": "/lib/tween/LICENSE.txt"}, {"audio": 0, "start": 2104643, "crunched": 0, "end": 2113265, "filename": "/lib/tween/README.md"}, {"audio": 0, "start": 2113265, "crunched": 0, "end": 2125845, "filename": "/lib/tween/tween.lua"}, {"audio": 0, "start": 2125845, "crunched": 0, "end": 2126416, "filename": "/lib/tween/rockspecs/tween-2.0.0-1.rockspec"}, {"audio": 0, "start": 2126416, "crunched": 0, "end": 2126987, "filename": "/lib/tween/rockspecs/tween-2.1.0-1.rockspec"}, {"audio": 0, "start": 2126987, "crunched": 0, "end": 2143538, "filename": "/lib/tween/spec/tween_spec.lua"}, {"audio": 0, "start": 2143538, "crunched": 0, "end": 2144914, "filename": "/shaders/edge_detection.glsl"}, {"audio": 0, "start": 2144914, "crunched": 0, "end": 2145503, "filename": "/shaders/loading_shader.glsl"}, {"audio": 0, "start": 2145503, "crunched": 0, "end": 2145531, "filename": "/shaders/README.md"}, {"audio": 0, "start": 2145531, "crunched": 0, "end": 2146361, "filename": "/shaders/warp.glsl"}, {"audio": 0, "start": 2146361, "crunched": 0, "end": 2146394, "filename": "/sounds/README.md"}, {"audio": 0, "start": 2146394, "crunched": 0, "end": 2150345, "filename": "/spec/grid_spec.lua"}, {"audio": 0, "start": 2150345, "crunched": 0, "end": 2152592, "filename": "/spec/line_spec.lua"}, {"audio": 0, "start": 2152592, "crunched": 0, "end": 2158740, "filename": "/states/.DS_Store"}, {"audio": 0, "start": 2158740, "crunched": 0, "end": 2164888, "filename": "/states/game/.DS_Store"}, {"audio": 0, "start": 2164888, "crunched": 0, "end": 2168148, "filename": "/states/game/game_loading.lua"}, {"audio": 0, "start": 2168148, "crunched": 0, "end": 2173280, "filename": "/states/game/game_main.lua"}, {"audio": 0, "start": 2173280, "crunched": 0, "end": 2173395, "filename": "/states/game/game_menu.lua"}, {"audio": 0, "start": 2173395, "crunched": 0, "end": 2173510, "filename": "/states/game/game_over.lua"}], "remote_package_size": 2173510, "package_uuid": "51c5d289-d881-4525-b847-92c373323524"});

})();
