
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
Module['FS_createPath']('/', '.git', true, true);
Module['FS_createPath']('/.git', 'hooks', true, true);
Module['FS_createPath']('/.git', 'info', true, true);
Module['FS_createPath']('/.git', 'logs', true, true);
Module['FS_createPath']('/.git/logs', 'refs', true, true);
Module['FS_createPath']('/.git/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git', 'modules', true, true);
Module['FS_createPath']('/.git/modules', 'lib', true, true);
Module['FS_createPath']('/.git/modules/lib', 'caternary', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary', 'hooks', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary', 'info', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary', 'logs', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/logs', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary', 'objects', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '00', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '29', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '2a', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '3c', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '3e', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '55', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '5c', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '6c', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '6f', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '75', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '7b', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '82', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', '90', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', 'c4', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', 'c7', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/objects', 'fe', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/caternary/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib', 'HardonCollider', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider', 'hooks', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider', 'info', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider', 'logs', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/logs', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider', 'objects', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/objects', 'pack', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/HardonCollider/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib', 'lovebird', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird', 'hooks', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird', 'info', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird', 'logs', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/logs', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird', 'objects', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/objects', 'pack', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/lovebird/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib', 'LoveFrames', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames', 'hooks', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames', 'info', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames', 'logs', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/logs', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/logs/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/logs/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/logs/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames', 'objects', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/objects', 'pack', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames', 'refs', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/refs', 'heads', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/modules/lib/LoveFrames/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/.git', 'objects', true, true);
Module['FS_createPath']('/.git/objects', '2c', true, true);
Module['FS_createPath']('/.git/objects', '6b', true, true);
Module['FS_createPath']('/.git/objects', 'e6', true, true);
Module['FS_createPath']('/.git/objects', 'pack', true, true);
Module['FS_createPath']('/.git', 'refs', true, true);
Module['FS_createPath']('/.git/refs', 'heads', true, true);
Module['FS_createPath']('/.git/refs', 'remotes', true, true);
Module['FS_createPath']('/.git/refs/remotes', 'origin', true, true);
Module['FS_createPath']('/', 'fonts', true, true);
Module['FS_createPath']('/', 'images', true, true);
Module['FS_createPath']('/', 'levels', true, true);
Module['FS_createPath']('/levels', 'triggers', true, true);
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'caternary', true, true);
Module['FS_createPath']('/lib', 'HardonCollider', true, true);
Module['FS_createPath']('/lib', 'lovebird', true, true);
Module['FS_createPath']('/lib', 'LoveFrames', true, true);
Module['FS_createPath']('/lib/LoveFrames', 'libraries', true, true);
Module['FS_createPath']('/lib/LoveFrames', 'objects', true, true);
Module['FS_createPath']('/lib/LoveFrames/objects', 'internal', true, true);
Module['FS_createPath']('/lib/LoveFrames/objects/internal', 'columnlist', true, true);
Module['FS_createPath']('/lib/LoveFrames/objects/internal', 'multichoice', true, true);
Module['FS_createPath']('/lib/LoveFrames/objects/internal', 'scrollable', true, true);
Module['FS_createPath']('/lib/LoveFrames', 'skins', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins', 'Blue', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins/Blue', 'images', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins/Blue/images', 'gradients', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins', 'Orange', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins/Orange', 'images', true, true);
Module['FS_createPath']('/lib/LoveFrames/skins/Orange/images', 'gradients', true, true);
Module['FS_createPath']('/lib/LoveFrames', 'templates', true, true);
Module['FS_createPath']('/lib/LoveFrames', 'third-party', true, true);
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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 6148, "filename": "/.DS_Store"}, {"audio": 0, "start": 6148, "crunched": 0, "end": 6158, "filename": "/.gitignore"}, {"audio": 0, "start": 6158, "crunched": 0, "end": 6583, "filename": "/.gitmodules"}, {"audio": 0, "start": 6583, "crunched": 0, "end": 7632, "filename": "/.travis.yml"}, {"audio": 0, "start": 7632, "crunched": 0, "end": 8349, "filename": "/base.lua"}, {"audio": 0, "start": 8349, "crunched": 0, "end": 10752, "filename": "/conf.lua"}, {"audio": 0, "start": 10752, "crunched": 0, "end": 12112, "filename": "/direction.lua"}, {"audio": 0, "start": 12112, "crunched": 0, "end": 13975, "filename": "/game.lua"}, {"audio": 0, "start": 13975, "crunched": 0, "end": 16001, "filename": "/goal.lua"}, {"audio": 0, "start": 16001, "crunched": 0, "end": 16604, "filename": "/hazard.lua"}, {"audio": 0, "start": 16604, "crunched": 0, "end": 18320, "filename": "/main.lua"}, {"audio": 0, "start": 18320, "crunched": 0, "end": 24530, "filename": "/map_loader.lua"}, {"audio": 0, "start": 24530, "crunched": 0, "end": 26775, "filename": "/player_character.lua"}, {"audio": 0, "start": 26775, "crunched": 0, "end": 26918, "filename": "/README.md"}, {"audio": 0, "start": 26918, "crunched": 0, "end": 29059, "filename": "/requirements.lua"}, {"audio": 0, "start": 29059, "crunched": 0, "end": 29111, "filename": "/.git/COMMIT_EDITMSG"}, {"audio": 0, "start": 29111, "crunched": 0, "end": 29750, "filename": "/.git/config"}, {"audio": 0, "start": 29750, "crunched": 0, "end": 29823, "filename": "/.git/description"}, {"audio": 0, "start": 29823, "crunched": 0, "end": 29864, "filename": "/.git/HEAD"}, {"audio": 0, "start": 29864, "crunched": 0, "end": 39390, "filename": "/.git/index"}, {"audio": 0, "start": 39390, "crunched": 0, "end": 39497, "filename": "/.git/packed-refs"}, {"audio": 0, "start": 39497, "crunched": 0, "end": 39975, "filename": "/.git/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 39975, "crunched": 0, "end": 40871, "filename": "/.git/hooks/commit-msg.sample"}, {"audio": 0, "start": 40871, "crunched": 0, "end": 41060, "filename": "/.git/hooks/post-update.sample"}, {"audio": 0, "start": 41060, "crunched": 0, "end": 41484, "filename": "/.git/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 41484, "crunched": 0, "end": 43126, "filename": "/.git/hooks/pre-commit.sample"}, {"audio": 0, "start": 43126, "crunched": 0, "end": 44474, "filename": "/.git/hooks/pre-push.sample"}, {"audio": 0, "start": 44474, "crunched": 0, "end": 49425, "filename": "/.git/hooks/pre-rebase.sample"}, {"audio": 0, "start": 49425, "crunched": 0, "end": 50664, "filename": "/.git/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 50664, "crunched": 0, "end": 54275, "filename": "/.git/hooks/update.sample"}, {"audio": 0, "start": 54275, "crunched": 0, "end": 54515, "filename": "/.git/info/exclude"}, {"audio": 0, "start": 54515, "crunched": 0, "end": 55102, "filename": "/.git/logs/HEAD"}, {"audio": 0, "start": 55102, "crunched": 0, "end": 55506, "filename": "/.git/logs/refs/heads/master"}, {"audio": 0, "start": 55506, "crunched": 0, "end": 55707, "filename": "/.git/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 55707, "crunched": 0, "end": 55865, "filename": "/.git/logs/refs/remotes/origin/master"}, {"audio": 0, "start": 55865, "crunched": 0, "end": 56223, "filename": "/.git/modules/lib/caternary/config"}, {"audio": 0, "start": 56223, "crunched": 0, "end": 56296, "filename": "/.git/modules/lib/caternary/description"}, {"audio": 0, "start": 56296, "crunched": 0, "end": 56315, "filename": "/.git/modules/lib/caternary/gitdir"}, {"audio": 0, "start": 56315, "crunched": 0, "end": 56356, "filename": "/.git/modules/lib/caternary/HEAD"}, {"audio": 0, "start": 56356, "crunched": 0, "end": 56717, "filename": "/.git/modules/lib/caternary/index"}, {"audio": 0, "start": 56717, "crunched": 0, "end": 56824, "filename": "/.git/modules/lib/caternary/packed-refs"}, {"audio": 0, "start": 56824, "crunched": 0, "end": 57302, "filename": "/.git/modules/lib/caternary/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 57302, "crunched": 0, "end": 58198, "filename": "/.git/modules/lib/caternary/hooks/commit-msg.sample"}, {"audio": 0, "start": 58198, "crunched": 0, "end": 58387, "filename": "/.git/modules/lib/caternary/hooks/post-update.sample"}, {"audio": 0, "start": 58387, "crunched": 0, "end": 58811, "filename": "/.git/modules/lib/caternary/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 58811, "crunched": 0, "end": 60453, "filename": "/.git/modules/lib/caternary/hooks/pre-commit.sample"}, {"audio": 0, "start": 60453, "crunched": 0, "end": 61801, "filename": "/.git/modules/lib/caternary/hooks/pre-push.sample"}, {"audio": 0, "start": 61801, "crunched": 0, "end": 66752, "filename": "/.git/modules/lib/caternary/hooks/pre-rebase.sample"}, {"audio": 0, "start": 66752, "crunched": 0, "end": 67991, "filename": "/.git/modules/lib/caternary/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 67991, "crunched": 0, "end": 71602, "filename": "/.git/modules/lib/caternary/hooks/update.sample"}, {"audio": 0, "start": 71602, "crunched": 0, "end": 71842, "filename": "/.git/modules/lib/caternary/info/exclude"}, {"audio": 0, "start": 71842, "crunched": 0, "end": 72264, "filename": "/.git/modules/lib/caternary/logs/HEAD"}, {"audio": 0, "start": 72264, "crunched": 0, "end": 72470, "filename": "/.git/modules/lib/caternary/logs/refs/heads/master"}, {"audio": 0, "start": 72470, "crunched": 0, "end": 72676, "filename": "/.git/modules/lib/caternary/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 72676, "crunched": 0, "end": 73064, "filename": "/.git/modules/lib/caternary/objects/00/73a98386d388c347e1e3b7cf98a78a47b2e6fc"}, {"audio": 0, "start": 73064, "crunched": 0, "end": 73643, "filename": "/.git/modules/lib/caternary/objects/29/3bc24f3314c2bb8b0fa97cd8542b968c3842ad"}, {"audio": 0, "start": 73643, "crunched": 0, "end": 73730, "filename": "/.git/modules/lib/caternary/objects/2a/a962c460e80c1037a92fc9ac6145147616aa4e"}, {"audio": 0, "start": 73730, "crunched": 0, "end": 73816, "filename": "/.git/modules/lib/caternary/objects/3c/b937581b85e90d3105a7a170633c15a9caeb42"}, {"audio": 0, "start": 73816, "crunched": 0, "end": 75707, "filename": "/.git/modules/lib/caternary/objects/3e/5f6e7e112caf4823e0b56c1e339e883c3eac9b"}, {"audio": 0, "start": 75707, "crunched": 0, "end": 77566, "filename": "/.git/modules/lib/caternary/objects/55/04a4a0f905286750c3dbfdc327ff3eb611e410"}, {"audio": 0, "start": 77566, "crunched": 0, "end": 77703, "filename": "/.git/modules/lib/caternary/objects/5c/88fee011d468d88ad83bb2e9800ee360a5c97a"}, {"audio": 0, "start": 77703, "crunched": 0, "end": 77856, "filename": "/.git/modules/lib/caternary/objects/6c/6ff0b4af1bf2e5640b13454a4a0a5e69b0d89d"}, {"audio": 0, "start": 77856, "crunched": 0, "end": 78088, "filename": "/.git/modules/lib/caternary/objects/6f/d0a376decfbf0a7be87fdc75d5109da72a7d17"}, {"audio": 0, "start": 78088, "crunched": 0, "end": 78221, "filename": "/.git/modules/lib/caternary/objects/75/c18b9a9c5e6d3e962aebc239473ddd2ff7567a"}, {"audio": 0, "start": 78221, "crunched": 0, "end": 78396, "filename": "/.git/modules/lib/caternary/objects/7b/73ca5c39c373620df5f255bd5346d96dabee98"}, {"audio": 0, "start": 78396, "crunched": 0, "end": 79060, "filename": "/.git/modules/lib/caternary/objects/82/5ad342a6965830ad99f5a0ec98b0f6a9455392"}, {"audio": 0, "start": 79060, "crunched": 0, "end": 79289, "filename": "/.git/modules/lib/caternary/objects/90/6cbef4fa377b481af32f2237e099cbb31d691d"}, {"audio": 0, "start": 79289, "crunched": 0, "end": 79459, "filename": "/.git/modules/lib/caternary/objects/c4/e5369c827f7e79ecca49fac8b404ca1bbc32ff"}, {"audio": 0, "start": 79459, "crunched": 0, "end": 79612, "filename": "/.git/modules/lib/caternary/objects/c7/2aaac042250a68b09568c27ea1b669a82a4fb1"}, {"audio": 0, "start": 79612, "crunched": 0, "end": 79764, "filename": "/.git/modules/lib/caternary/objects/fe/13f4ef246530c6d8d4a54cb2d92850fb4991dd"}, {"audio": 0, "start": 79764, "crunched": 0, "end": 79805, "filename": "/.git/modules/lib/caternary/refs/heads/master"}, {"audio": 0, "start": 79805, "crunched": 0, "end": 79837, "filename": "/.git/modules/lib/caternary/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 79837, "crunched": 0, "end": 80192, "filename": "/.git/modules/lib/HardonCollider/config"}, {"audio": 0, "start": 80192, "crunched": 0, "end": 80265, "filename": "/.git/modules/lib/HardonCollider/description"}, {"audio": 0, "start": 80265, "crunched": 0, "end": 80289, "filename": "/.git/modules/lib/HardonCollider/gitdir"}, {"audio": 0, "start": 80289, "crunched": 0, "end": 80330, "filename": "/.git/modules/lib/HardonCollider/HEAD"}, {"audio": 0, "start": 80330, "crunched": 0, "end": 81003, "filename": "/.git/modules/lib/HardonCollider/index"}, {"audio": 0, "start": 81003, "crunched": 0, "end": 81180, "filename": "/.git/modules/lib/HardonCollider/packed-refs"}, {"audio": 0, "start": 81180, "crunched": 0, "end": 81658, "filename": "/.git/modules/lib/HardonCollider/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 81658, "crunched": 0, "end": 82554, "filename": "/.git/modules/lib/HardonCollider/hooks/commit-msg.sample"}, {"audio": 0, "start": 82554, "crunched": 0, "end": 82743, "filename": "/.git/modules/lib/HardonCollider/hooks/post-update.sample"}, {"audio": 0, "start": 82743, "crunched": 0, "end": 83167, "filename": "/.git/modules/lib/HardonCollider/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 83167, "crunched": 0, "end": 84809, "filename": "/.git/modules/lib/HardonCollider/hooks/pre-commit.sample"}, {"audio": 0, "start": 84809, "crunched": 0, "end": 86157, "filename": "/.git/modules/lib/HardonCollider/hooks/pre-push.sample"}, {"audio": 0, "start": 86157, "crunched": 0, "end": 91108, "filename": "/.git/modules/lib/HardonCollider/hooks/pre-rebase.sample"}, {"audio": 0, "start": 91108, "crunched": 0, "end": 92347, "filename": "/.git/modules/lib/HardonCollider/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 92347, "crunched": 0, "end": 95958, "filename": "/.git/modules/lib/HardonCollider/hooks/update.sample"}, {"audio": 0, "start": 95958, "crunched": 0, "end": 96198, "filename": "/.git/modules/lib/HardonCollider/info/exclude"}, {"audio": 0, "start": 96198, "crunched": 0, "end": 96612, "filename": "/.git/modules/lib/HardonCollider/logs/HEAD"}, {"audio": 0, "start": 96612, "crunched": 0, "end": 96810, "filename": "/.git/modules/lib/HardonCollider/logs/refs/heads/master"}, {"audio": 0, "start": 96810, "crunched": 0, "end": 97008, "filename": "/.git/modules/lib/HardonCollider/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 97008, "crunched": 0, "end": 114572, "filename": "/.git/modules/lib/HardonCollider/objects/pack/pack-e59747dca1d5f2dea4f372843a3d6cc50b35c06c.idx"}, {"audio": 0, "start": 114572, "crunched": 0, "end": 1179438, "filename": "/.git/modules/lib/HardonCollider/objects/pack/pack-e59747dca1d5f2dea4f372843a3d6cc50b35c06c.pack"}, {"audio": 0, "start": 1179438, "crunched": 0, "end": 1179479, "filename": "/.git/modules/lib/HardonCollider/refs/heads/master"}, {"audio": 0, "start": 1179479, "crunched": 0, "end": 1179511, "filename": "/.git/modules/lib/HardonCollider/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 1179511, "crunched": 0, "end": 1179853, "filename": "/.git/modules/lib/lovebird/config"}, {"audio": 0, "start": 1179853, "crunched": 0, "end": 1179926, "filename": "/.git/modules/lib/lovebird/description"}, {"audio": 0, "start": 1179926, "crunched": 0, "end": 1179944, "filename": "/.git/modules/lib/lovebird/gitdir"}, {"audio": 0, "start": 1179944, "crunched": 0, "end": 1179985, "filename": "/.git/modules/lib/lovebird/HEAD"}, {"audio": 0, "start": 1179985, "crunched": 0, "end": 1180274, "filename": "/.git/modules/lib/lovebird/index"}, {"audio": 0, "start": 1180274, "crunched": 0, "end": 1180381, "filename": "/.git/modules/lib/lovebird/packed-refs"}, {"audio": 0, "start": 1180381, "crunched": 0, "end": 1180859, "filename": "/.git/modules/lib/lovebird/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 1180859, "crunched": 0, "end": 1181755, "filename": "/.git/modules/lib/lovebird/hooks/commit-msg.sample"}, {"audio": 0, "start": 1181755, "crunched": 0, "end": 1181944, "filename": "/.git/modules/lib/lovebird/hooks/post-update.sample"}, {"audio": 0, "start": 1181944, "crunched": 0, "end": 1182368, "filename": "/.git/modules/lib/lovebird/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 1182368, "crunched": 0, "end": 1184010, "filename": "/.git/modules/lib/lovebird/hooks/pre-commit.sample"}, {"audio": 0, "start": 1184010, "crunched": 0, "end": 1185358, "filename": "/.git/modules/lib/lovebird/hooks/pre-push.sample"}, {"audio": 0, "start": 1185358, "crunched": 0, "end": 1190309, "filename": "/.git/modules/lib/lovebird/hooks/pre-rebase.sample"}, {"audio": 0, "start": 1190309, "crunched": 0, "end": 1191548, "filename": "/.git/modules/lib/lovebird/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 1191548, "crunched": 0, "end": 1195159, "filename": "/.git/modules/lib/lovebird/hooks/update.sample"}, {"audio": 0, "start": 1195159, "crunched": 0, "end": 1195399, "filename": "/.git/modules/lib/lovebird/info/exclude"}, {"audio": 0, "start": 1195399, "crunched": 0, "end": 1195806, "filename": "/.git/modules/lib/lovebird/logs/HEAD"}, {"audio": 0, "start": 1195806, "crunched": 0, "end": 1195997, "filename": "/.git/modules/lib/lovebird/logs/refs/heads/master"}, {"audio": 0, "start": 1195997, "crunched": 0, "end": 1196188, "filename": "/.git/modules/lib/lovebird/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 1196188, "crunched": 0, "end": 1205352, "filename": "/.git/modules/lib/lovebird/objects/pack/pack-316c153dae27ea3da01647ed16e86fade6dcd0be.idx"}, {"audio": 0, "start": 1205352, "crunched": 0, "end": 1253498, "filename": "/.git/modules/lib/lovebird/objects/pack/pack-316c153dae27ea3da01647ed16e86fade6dcd0be.pack"}, {"audio": 0, "start": 1253498, "crunched": 0, "end": 1253539, "filename": "/.git/modules/lib/lovebird/refs/heads/master"}, {"audio": 0, "start": 1253539, "crunched": 0, "end": 1253571, "filename": "/.git/modules/lib/lovebird/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 1253571, "crunched": 0, "end": 1253928, "filename": "/.git/modules/lib/LoveFrames/config"}, {"audio": 0, "start": 1253928, "crunched": 0, "end": 1254001, "filename": "/.git/modules/lib/LoveFrames/description"}, {"audio": 0, "start": 1254001, "crunched": 0, "end": 1254021, "filename": "/.git/modules/lib/LoveFrames/gitdir"}, {"audio": 0, "start": 1254021, "crunched": 0, "end": 1254062, "filename": "/.git/modules/lib/LoveFrames/HEAD"}, {"audio": 0, "start": 1254062, "crunched": 0, "end": 1262182, "filename": "/.git/modules/lib/LoveFrames/index"}, {"audio": 0, "start": 1262182, "crunched": 0, "end": 1262790, "filename": "/.git/modules/lib/LoveFrames/packed-refs"}, {"audio": 0, "start": 1262790, "crunched": 0, "end": 1263268, "filename": "/.git/modules/lib/LoveFrames/hooks/applypatch-msg.sample"}, {"audio": 0, "start": 1263268, "crunched": 0, "end": 1264164, "filename": "/.git/modules/lib/LoveFrames/hooks/commit-msg.sample"}, {"audio": 0, "start": 1264164, "crunched": 0, "end": 1264353, "filename": "/.git/modules/lib/LoveFrames/hooks/post-update.sample"}, {"audio": 0, "start": 1264353, "crunched": 0, "end": 1264777, "filename": "/.git/modules/lib/LoveFrames/hooks/pre-applypatch.sample"}, {"audio": 0, "start": 1264777, "crunched": 0, "end": 1266419, "filename": "/.git/modules/lib/LoveFrames/hooks/pre-commit.sample"}, {"audio": 0, "start": 1266419, "crunched": 0, "end": 1267767, "filename": "/.git/modules/lib/LoveFrames/hooks/pre-push.sample"}, {"audio": 0, "start": 1267767, "crunched": 0, "end": 1272718, "filename": "/.git/modules/lib/LoveFrames/hooks/pre-rebase.sample"}, {"audio": 0, "start": 1272718, "crunched": 0, "end": 1273957, "filename": "/.git/modules/lib/LoveFrames/hooks/prepare-commit-msg.sample"}, {"audio": 0, "start": 1273957, "crunched": 0, "end": 1277568, "filename": "/.git/modules/lib/LoveFrames/hooks/update.sample"}, {"audio": 0, "start": 1277568, "crunched": 0, "end": 1277808, "filename": "/.git/modules/lib/LoveFrames/info/exclude"}, {"audio": 0, "start": 1277808, "crunched": 0, "end": 1278228, "filename": "/.git/modules/lib/LoveFrames/logs/HEAD"}, {"audio": 0, "start": 1278228, "crunched": 0, "end": 1278432, "filename": "/.git/modules/lib/LoveFrames/logs/refs/heads/master"}, {"audio": 0, "start": 1278432, "crunched": 0, "end": 1278636, "filename": "/.git/modules/lib/LoveFrames/logs/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 1278636, "crunched": 0, "end": 1347972, "filename": "/.git/modules/lib/LoveFrames/objects/pack/pack-b185e4c94f66fd1740881715c891d624093a94ab.idx"}, {"audio": 0, "start": 1347972, "crunched": 0, "end": 2579157, "filename": "/.git/modules/lib/LoveFrames/objects/pack/pack-b185e4c94f66fd1740881715c891d624093a94ab.pack"}, {"audio": 0, "start": 2579157, "crunched": 0, "end": 2579198, "filename": "/.git/modules/lib/LoveFrames/refs/heads/master"}, {"audio": 0, "start": 2579198, "crunched": 0, "end": 2579230, "filename": "/.git/modules/lib/LoveFrames/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 2579230, "crunched": 0, "end": 2579966, "filename": "/.git/objects/2c/5e2d01e596855d690b5c95967c426d96143fbf"}, {"audio": 0, "start": 2579966, "crunched": 0, "end": 2580148, "filename": "/.git/objects/6b/67affcc354862d8fc4954049d9f4cc363918a3"}, {"audio": 0, "start": 2580148, "crunched": 0, "end": 2580343, "filename": "/.git/objects/e6/09946a89fdfcaf1607923947bc925db2b02c1c"}, {"audio": 0, "start": 2580343, "crunched": 0, "end": 2619439, "filename": "/.git/objects/pack/pack-8d278a0ac5ff0991d981510847690a7947af2014.idx"}, {"audio": 0, "start": 2619439, "crunched": 0, "end": 8649838, "filename": "/.git/objects/pack/pack-8d278a0ac5ff0991d981510847690a7947af2014.pack"}, {"audio": 0, "start": 8649838, "crunched": 0, "end": 8649879, "filename": "/.git/refs/heads/master"}, {"audio": 0, "start": 8649879, "crunched": 0, "end": 8649911, "filename": "/.git/refs/remotes/origin/HEAD"}, {"audio": 0, "start": 8649911, "crunched": 0, "end": 8649952, "filename": "/.git/refs/remotes/origin/master"}, {"audio": 0, "start": 8649952, "crunched": 0, "end": 8669444, "filename": "/fonts/04b03.TTF"}, {"audio": 0, "start": 8669444, "crunched": 0, "end": 8669476, "filename": "/fonts/README.md"}, {"audio": 0, "start": 8669476, "crunched": 0, "end": 8671032, "filename": "/images/beam_pi.png"}, {"audio": 0, "start": 8671032, "crunched": 0, "end": 8672598, "filename": "/images/beam_rec.png"}, {"audio": 0, "start": 8672598, "crunched": 0, "end": 8676956, "filename": "/images/bg.png"}, {"audio": 0, "start": 8676956, "crunched": 0, "end": 8678166, "filename": "/images/cloud1.png"}, {"audio": 0, "start": 8678166, "crunched": 0, "end": 8679411, "filename": "/images/cloud2.png"}, {"audio": 0, "start": 8679411, "crunched": 0, "end": 8680699, "filename": "/images/cloud3.png"}, {"audio": 0, "start": 8680699, "crunched": 0, "end": 8689977, "filename": "/images/friendshape.png"}, {"audio": 0, "start": 8689977, "crunched": 0, "end": 8700130, "filename": "/images/friendshape_controls.png"}, {"audio": 0, "start": 8700130, "crunched": 0, "end": 8701706, "filename": "/images/gradient.png"}, {"audio": 0, "start": 8701706, "crunched": 0, "end": 8708435, "filename": "/images/lose.png"}, {"audio": 0, "start": 8708435, "crunched": 0, "end": 8710167, "filename": "/images/pi_blink.png"}, {"audio": 0, "start": 8710167, "crunched": 0, "end": 8711934, "filename": "/images/pi_idle.png"}, {"audio": 0, "start": 8711934, "crunched": 0, "end": 8713351, "filename": "/images/player_circle.png"}, {"audio": 0, "start": 8713351, "crunched": 0, "end": 8714768, "filename": "/images/player_square.png"}, {"audio": 0, "start": 8714768, "crunched": 0, "end": 8714801, "filename": "/images/README.md"}, {"audio": 0, "start": 8714801, "crunched": 0, "end": 8716579, "filename": "/images/rec_blink.png"}, {"audio": 0, "start": 8716579, "crunched": 0, "end": 8718419, "filename": "/images/rec_idle.png"}, {"audio": 0, "start": 8718419, "crunched": 0, "end": 8841228, "filename": "/images/spritesheet.png"}, {"audio": 0, "start": 8841228, "crunched": 0, "end": 8841415, "filename": "/images/tiles.tsx"}, {"audio": 0, "start": 8841415, "crunched": 0, "end": 8848216, "filename": "/images/win.png"}, {"audio": 0, "start": 8848216, "crunched": 0, "end": 8884631, "filename": "/levels/Costanza.lua"}, {"audio": 0, "start": 8884631, "crunched": 0, "end": 8892240, "filename": "/levels/Costanza.tmx"}, {"audio": 0, "start": 8892240, "crunched": 0, "end": 8949828, "filename": "/levels/Friends Fall-Ever.lua"}, {"audio": 0, "start": 8949828, "crunched": 0, "end": 8970035, "filename": "/levels/Friends Fall-Ever.tmx"}, {"audio": 0, "start": 8970035, "crunched": 0, "end": 9010998, "filename": "/levels/Friends On The Edge.lua"}, {"audio": 0, "start": 9010998, "crunched": 0, "end": 9016974, "filename": "/levels/Friends On The Edge.tmx"}, {"audio": 0, "start": 9016974, "crunched": 0, "end": 9034174, "filename": "/levels/Lever 9000.lua"}, {"audio": 0, "start": 9034174, "crunched": 0, "end": 9041403, "filename": "/levels/Lever 9000.tmx"}, {"audio": 0, "start": 9041403, "crunched": 0, "end": 9041621, "filename": "/levels/list.lua"}, {"audio": 0, "start": 9041621, "crunched": 0, "end": 9080080, "filename": "/levels/One Step At A Time.lua"}, {"audio": 0, "start": 9080080, "crunched": 0, "end": 9083999, "filename": "/levels/One Step At A Time.tmx"}, {"audio": 0, "start": 9083999, "crunched": 0, "end": 9135138, "filename": "/levels/Right And Back Again.lua"}, {"audio": 0, "start": 9135138, "crunched": 0, "end": 9148899, "filename": "/levels/Right And Back Again.tmx"}, {"audio": 0, "start": 9148899, "crunched": 0, "end": 9170656, "filename": "/levels/Scorn Sandwich.lua"}, {"audio": 0, "start": 9170656, "crunched": 0, "end": 9176683, "filename": "/levels/Scorn Sandwich.tmx"}, {"audio": 0, "start": 9176683, "crunched": 0, "end": 9219360, "filename": "/levels/Separated At Birth.lua"}, {"audio": 0, "start": 9219360, "crunched": 0, "end": 9227351, "filename": "/levels/Separated At Birth.tmx"}, {"audio": 0, "start": 9227351, "crunched": 0, "end": 9282643, "filename": "/levels/Taste Delta.lua"}, {"audio": 0, "start": 9282643, "crunched": 0, "end": 9295190, "filename": "/levels/Taste Delta.tmx"}, {"audio": 0, "start": 9295190, "crunched": 0, "end": 9307393, "filename": "/levels/The Longshot.lua"}, {"audio": 0, "start": 9307393, "crunched": 0, "end": 9309599, "filename": "/levels/The Longshot.tmx"}, {"audio": 0, "start": 9309599, "crunched": 0, "end": 9311079, "filename": "/levels/triggers/common.lua"}, {"audio": 0, "start": 9311079, "crunched": 0, "end": 9311783, "filename": "/levels/triggers/Costanza.lua"}, {"audio": 0, "start": 9311783, "crunched": 0, "end": 9312488, "filename": "/levels/triggers/Lever 9000.lua"}, {"audio": 0, "start": 9312488, "crunched": 0, "end": 9313193, "filename": "/levels/triggers/Scorn Sandwich.lua"}, {"audio": 0, "start": 9313193, "crunched": 0, "end": 9313897, "filename": "/levels/triggers/Taste Delta.lua"}, {"audio": 0, "start": 9313897, "crunched": 0, "end": 9320462, "filename": "/lib/AnAL.lua"}, {"audio": 0, "start": 9320462, "crunched": 0, "end": 9322261, "filename": "/lib/astar.lua"}, {"audio": 0, "start": 9322261, "crunched": 0, "end": 9327129, "filename": "/lib/beholder.lua"}, {"audio": 0, "start": 9327129, "crunched": 0, "end": 9330183, "filename": "/lib/boid.lua"}, {"audio": 0, "start": 9330183, "crunched": 0, "end": 9332321, "filename": "/lib/camera.lua"}, {"audio": 0, "start": 9332321, "crunched": 0, "end": 9343011, "filename": "/lib/colors.lua"}, {"audio": 0, "start": 9343011, "crunched": 0, "end": 9348734, "filename": "/lib/cron.lua"}, {"audio": 0, "start": 9348734, "crunched": 0, "end": 9349515, "filename": "/lib/dict_grid.lua"}, {"audio": 0, "start": 9349515, "crunched": 0, "end": 9352811, "filename": "/lib/grid.lua"}, {"audio": 0, "start": 9352811, "crunched": 0, "end": 9358384, "filename": "/lib/inspect.lua"}, {"audio": 0, "start": 9358384, "crunched": 0, "end": 9360346, "filename": "/lib/line.lua"}, {"audio": 0, "start": 9360346, "crunched": 0, "end": 9366191, "filename": "/lib/love-loader.lua"}, {"audio": 0, "start": 9366191, "crunched": 0, "end": 9372252, "filename": "/lib/middleclass.lua"}, {"audio": 0, "start": 9372252, "crunched": 0, "end": 9376072, "filename": "/lib/ordered_set.lua"}, {"audio": 0, "start": 9376072, "crunched": 0, "end": 9377898, "filename": "/lib/priority_queue.lua"}, {"audio": 0, "start": 9377898, "crunched": 0, "end": 9383457, "filename": "/lib/skiplist.lua"}, {"audio": 0, "start": 9383457, "crunched": 0, "end": 9389956, "filename": "/lib/stateful.lua"}, {"audio": 0, "start": 9389956, "crunched": 0, "end": 9402586, "filename": "/lib/tween.lua"}, {"audio": 0, "start": 9402586, "crunched": 0, "end": 9407936, "filename": "/lib/vector.lua"}, {"audio": 0, "start": 9407936, "crunched": 0, "end": 9407977, "filename": "/lib/caternary/.git"}, {"audio": 0, "start": 9407977, "crunched": 0, "end": 9408301, "filename": "/lib/caternary/.gitignore"}, {"audio": 0, "start": 9408301, "crunched": 0, "end": 9412601, "filename": "/lib/caternary/init.lua"}, {"audio": 0, "start": 9412601, "crunched": 0, "end": 9413683, "filename": "/lib/caternary/LICENSE"}, {"audio": 0, "start": 9413683, "crunched": 0, "end": 9414693, "filename": "/lib/caternary/readme.md"}, {"audio": 0, "start": 9414693, "crunched": 0, "end": 9414739, "filename": "/lib/HardonCollider/.git"}, {"audio": 0, "start": 9414739, "crunched": 0, "end": 9418185, "filename": "/lib/HardonCollider/class.lua"}, {"audio": 0, "start": 9418185, "crunched": 0, "end": 9423778, "filename": "/lib/HardonCollider/gjk.lua"}, {"audio": 0, "start": 9423778, "crunched": 0, "end": 9432759, "filename": "/lib/HardonCollider/init.lua"}, {"audio": 0, "start": 9432759, "crunched": 0, "end": 9446292, "filename": "/lib/HardonCollider/polygon.lua"}, {"audio": 0, "start": 9446292, "crunched": 0, "end": 9446410, "filename": "/lib/HardonCollider/README"}, {"audio": 0, "start": 9446410, "crunched": 0, "end": 9458772, "filename": "/lib/HardonCollider/shapes.lua"}, {"audio": 0, "start": 9458772, "crunched": 0, "end": 9463170, "filename": "/lib/HardonCollider/spatialhash.lua"}, {"audio": 0, "start": 9463170, "crunched": 0, "end": 9466237, "filename": "/lib/HardonCollider/vector-light.lua"}, {"audio": 0, "start": 9466237, "crunched": 0, "end": 9466277, "filename": "/lib/lovebird/.git"}, {"audio": 0, "start": 9466277, "crunched": 0, "end": 9467326, "filename": "/lib/lovebird/LICENSE"}, {"audio": 0, "start": 9467326, "crunched": 0, "end": 9482824, "filename": "/lib/lovebird/lovebird.lua"}, {"audio": 0, "start": 9482824, "crunched": 0, "end": 9485103, "filename": "/lib/lovebird/README.md"}, {"audio": 0, "start": 9485103, "crunched": 0, "end": 9485145, "filename": "/lib/LoveFrames/.git"}, {"audio": 0, "start": 9485145, "crunched": 0, "end": 9528504, "filename": "/lib/LoveFrames/changelog.txt"}, {"audio": 0, "start": 9528504, "crunched": 0, "end": 9541966, "filename": "/lib/LoveFrames/init.lua"}, {"audio": 0, "start": 9541966, "crunched": 0, "end": 9559668, "filename": "/lib/LoveFrames/license.txt"}, {"audio": 0, "start": 9559668, "crunched": 0, "end": 9560343, "filename": "/lib/LoveFrames/readme.md"}, {"audio": 0, "start": 9560343, "crunched": 0, "end": 9563732, "filename": "/lib/LoveFrames/libraries/debug.lua"}, {"audio": 0, "start": 9563732, "crunched": 0, "end": 9569529, "filename": "/lib/LoveFrames/libraries/skins.lua"}, {"audio": 0, "start": 9569529, "crunched": 0, "end": 9574872, "filename": "/lib/LoveFrames/libraries/templates.lua"}, {"audio": 0, "start": 9574872, "crunched": 0, "end": 9585127, "filename": "/lib/LoveFrames/libraries/util.lua"}, {"audio": 0, "start": 9585127, "crunched": 0, "end": 9612722, "filename": "/lib/LoveFrames/objects/base.lua"}, {"audio": 0, "start": 9612722, "crunched": 0, "end": 9618308, "filename": "/lib/LoveFrames/objects/button.lua"}, {"audio": 0, "start": 9618308, "crunched": 0, "end": 9628235, "filename": "/lib/LoveFrames/objects/checkbox.lua"}, {"audio": 0, "start": 9628235, "crunched": 0, "end": 9636722, "filename": "/lib/LoveFrames/objects/collapsiblecategory.lua"}, {"audio": 0, "start": 9636722, "crunched": 0, "end": 9654157, "filename": "/lib/LoveFrames/objects/columnlist.lua"}, {"audio": 0, "start": 9654157, "crunched": 0, "end": 9661880, "filename": "/lib/LoveFrames/objects/form.lua"}, {"audio": 0, "start": 9661880, "crunched": 0, "end": 9691505, "filename": "/lib/LoveFrames/objects/frame.lua"}, {"audio": 0, "start": 9691505, "crunched": 0, "end": 9701134, "filename": "/lib/LoveFrames/objects/grid.lua"}, {"audio": 0, "start": 9701134, "crunched": 0, "end": 9710897, "filename": "/lib/LoveFrames/objects/image.lua"}, {"audio": 0, "start": 9710897, "crunched": 0, "end": 9718473, "filename": "/lib/LoveFrames/objects/imagebutton.lua"}, {"audio": 0, "start": 9718473, "crunched": 0, "end": 9737304, "filename": "/lib/LoveFrames/objects/list.lua"}, {"audio": 0, "start": 9737304, "crunched": 0, "end": 9744789, "filename": "/lib/LoveFrames/objects/menu.lua"}, {"audio": 0, "start": 9744789, "crunched": 0, "end": 9755646, "filename": "/lib/LoveFrames/objects/multichoice.lua"}, {"audio": 0, "start": 9755646, "crunched": 0, "end": 9768324, "filename": "/lib/LoveFrames/objects/numberbox.lua"}, {"audio": 0, "start": 9768324, "crunched": 0, "end": 9772089, "filename": "/lib/LoveFrames/objects/panel.lua"}, {"audio": 0, "start": 9772089, "crunched": 0, "end": 9780209, "filename": "/lib/LoveFrames/objects/progressbar.lua"}, {"audio": 0, "start": 9780209, "crunched": 0, "end": 9793466, "filename": "/lib/LoveFrames/objects/slider.lua"}, {"audio": 0, "start": 9793466, "crunched": 0, "end": 9812697, "filename": "/lib/LoveFrames/objects/tabs.lua"}, {"audio": 0, "start": 9812697, "crunched": 0, "end": 9832592, "filename": "/lib/LoveFrames/objects/text.lua"}, {"audio": 0, "start": 9832592, "crunched": 0, "end": 9882629, "filename": "/lib/LoveFrames/objects/textinput.lua"}, {"audio": 0, "start": 9882629, "crunched": 0, "end": 9886862, "filename": "/lib/LoveFrames/objects/internal/closebutton.lua"}, {"audio": 0, "start": 9886862, "crunched": 0, "end": 9890999, "filename": "/lib/LoveFrames/objects/internal/linenumberspanel.lua"}, {"audio": 0, "start": 9890999, "crunched": 0, "end": 9896962, "filename": "/lib/LoveFrames/objects/internal/menuoption.lua"}, {"audio": 0, "start": 9896962, "crunched": 0, "end": 9899420, "filename": "/lib/LoveFrames/objects/internal/modalbackground.lua"}, {"audio": 0, "start": 9899420, "crunched": 0, "end": 9905787, "filename": "/lib/LoveFrames/objects/internal/sliderbutton.lua"}, {"audio": 0, "start": 9905787, "crunched": 0, "end": 9911236, "filename": "/lib/LoveFrames/objects/internal/tabbutton.lua"}, {"audio": 0, "start": 9911236, "crunched": 0, "end": 9920789, "filename": "/lib/LoveFrames/objects/internal/tooltip.lua"}, {"audio": 0, "start": 9920789, "crunched": 0, "end": 9930263, "filename": "/lib/LoveFrames/objects/internal/columnlist/columnlistarea.lua"}, {"audio": 0, "start": 9930263, "crunched": 0, "end": 9934491, "filename": "/lib/LoveFrames/objects/internal/columnlist/columnlistheader.lua"}, {"audio": 0, "start": 9934491, "crunched": 0, "end": 9940827, "filename": "/lib/LoveFrames/objects/internal/columnlist/columnlistrow.lua"}, {"audio": 0, "start": 9940827, "crunched": 0, "end": 9951033, "filename": "/lib/LoveFrames/objects/internal/multichoice/multichoicelist.lua"}, {"audio": 0, "start": 9951033, "crunched": 0, "end": 9955270, "filename": "/lib/LoveFrames/objects/internal/multichoice/multichoicerow.lua"}, {"audio": 0, "start": 9955270, "crunched": 0, "end": 9960794, "filename": "/lib/LoveFrames/objects/internal/scrollable/scrollarea.lua"}, {"audio": 0, "start": 9960794, "crunched": 0, "end": 9969275, "filename": "/lib/LoveFrames/objects/internal/scrollable/scrollbar.lua"}, {"audio": 0, "start": 9969275, "crunched": 0, "end": 9974730, "filename": "/lib/LoveFrames/objects/internal/scrollable/scrollbody.lua"}, {"audio": 0, "start": 9974730, "crunched": 0, "end": 9978495, "filename": "/lib/LoveFrames/objects/internal/scrollable/scrollbutton.lua"}, {"audio": 0, "start": 9978495, "crunched": 0, "end": 10036022, "filename": "/lib/LoveFrames/skins/Blue/skin.lua"}, {"audio": 0, "start": 10036022, "crunched": 0, "end": 10036366, "filename": "/lib/LoveFrames/skins/Blue/images/arrow-down.png"}, {"audio": 0, "start": 10036366, "crunched": 0, "end": 10036703, "filename": "/lib/LoveFrames/skins/Blue/images/arrow-left.png"}, {"audio": 0, "start": 10036703, "crunched": 0, "end": 10037039, "filename": "/lib/LoveFrames/skins/Blue/images/arrow-right.png"}, {"audio": 0, "start": 10037039, "crunched": 0, "end": 10037405, "filename": "/lib/LoveFrames/skins/Blue/images/arrow-up.png"}, {"audio": 0, "start": 10037405, "crunched": 0, "end": 10037657, "filename": "/lib/LoveFrames/skins/Blue/images/close.png"}, {"audio": 0, "start": 10037657, "crunched": 0, "end": 10037856, "filename": "/lib/LoveFrames/skins/Blue/images/collapse.png"}, {"audio": 0, "start": 10037856, "crunched": 0, "end": 10038077, "filename": "/lib/LoveFrames/skins/Blue/images/expand.png"}, {"audio": 0, "start": 10038077, "crunched": 0, "end": 10038361, "filename": "/lib/LoveFrames/skins/Blue/images/multichoice-arrow.png"}, {"audio": 0, "start": 10038361, "crunched": 0, "end": 10038601, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/button-down.png"}, {"audio": 0, "start": 10038601, "crunched": 0, "end": 10038841, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/button-hover.png"}, {"audio": 0, "start": 10038841, "crunched": 0, "end": 10039059, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/button-nohover.png"}, {"audio": 0, "start": 10039059, "crunched": 0, "end": 10039278, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/button-unclickable.png"}, {"audio": 0, "start": 10039278, "crunched": 0, "end": 10039513, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/frame-body.png"}, {"audio": 0, "start": 10039513, "crunched": 0, "end": 10039754, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/frame-topbar.png"}, {"audio": 0, "start": 10039754, "crunched": 0, "end": 10039953, "filename": "/lib/LoveFrames/skins/Blue/images/gradients/progressbar.png"}, {"audio": 0, "start": 10039953, "crunched": 0, "end": 10040922, "filename": "/lib/LoveFrames/skins/Orange/skin.lua"}, {"audio": 0, "start": 10040922, "crunched": 0, "end": 10041266, "filename": "/lib/LoveFrames/skins/Orange/images/arrow-down.png"}, {"audio": 0, "start": 10041266, "crunched": 0, "end": 10041603, "filename": "/lib/LoveFrames/skins/Orange/images/arrow-left.png"}, {"audio": 0, "start": 10041603, "crunched": 0, "end": 10041939, "filename": "/lib/LoveFrames/skins/Orange/images/arrow-right.png"}, {"audio": 0, "start": 10041939, "crunched": 0, "end": 10042305, "filename": "/lib/LoveFrames/skins/Orange/images/arrow-up.png"}, {"audio": 0, "start": 10042305, "crunched": 0, "end": 10042557, "filename": "/lib/LoveFrames/skins/Orange/images/close.png"}, {"audio": 0, "start": 10042557, "crunched": 0, "end": 10042754, "filename": "/lib/LoveFrames/skins/Orange/images/collapse.png"}, {"audio": 0, "start": 10042754, "crunched": 0, "end": 10042955, "filename": "/lib/LoveFrames/skins/Orange/images/expand.png"}, {"audio": 0, "start": 10042955, "crunched": 0, "end": 10043239, "filename": "/lib/LoveFrames/skins/Orange/images/multichoice-arrow.png"}, {"audio": 0, "start": 10043239, "crunched": 0, "end": 10043479, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/button-down.png"}, {"audio": 0, "start": 10043479, "crunched": 0, "end": 10043719, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/button-hover.png"}, {"audio": 0, "start": 10043719, "crunched": 0, "end": 10043937, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/button-nohover.png"}, {"audio": 0, "start": 10043937, "crunched": 0, "end": 10044156, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/button-unclickable.png"}, {"audio": 0, "start": 10044156, "crunched": 0, "end": 10044391, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/frame-body.png"}, {"audio": 0, "start": 10044391, "crunched": 0, "end": 10044605, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/frame-topbar.png"}, {"audio": 0, "start": 10044605, "crunched": 0, "end": 10044804, "filename": "/lib/LoveFrames/skins/Orange/images/gradients/progressbar.png"}, {"audio": 0, "start": 10044804, "crunched": 0, "end": 10045994, "filename": "/lib/LoveFrames/templates/base.lua"}, {"audio": 0, "start": 10045994, "crunched": 0, "end": 10052052, "filename": "/lib/LoveFrames/third-party/middleclass.lua"}, {"audio": 1, "start": 10052052, "crunched": 0, "end": 10755565, "filename": "/music/intromusic.ogg"}, {"audio": 1, "start": 10755565, "crunched": 0, "end": 11263447, "filename": "/music/music1.ogg"}, {"audio": 0, "start": 11263447, "crunched": 0, "end": 11263475, "filename": "/shaders/README.md"}, {"audio": 1, "start": 11263475, "crunched": 0, "end": 11289372, "filename": "/sounds/block1.ogg"}, {"audio": 1, "start": 11289372, "crunched": 0, "end": 11314404, "filename": "/sounds/block2.ogg"}, {"audio": 1, "start": 11314404, "crunched": 0, "end": 11341875, "filename": "/sounds/cjump.ogg"}, {"audio": 1, "start": 11341875, "crunched": 0, "end": 11400297, "filename": "/sounds/failuresound.ogg"}, {"audio": 1, "start": 11400297, "crunched": 0, "end": 11487214, "filename": "/sounds/friend.ogg"}, {"audio": 1, "start": 11487214, "crunched": 0, "end": 11515740, "filename": "/sounds/goalsound3a.ogg"}, {"audio": 1, "start": 11515740, "crunched": 0, "end": 11543041, "filename": "/sounds/jumppad.ogg"}, {"audio": 0, "start": 11543041, "crunched": 0, "end": 11543074, "filename": "/sounds/README.md"}, {"audio": 1, "start": 11543074, "crunched": 0, "end": 11570290, "filename": "/sounds/sjump.ogg"}, {"audio": 1, "start": 11570290, "crunched": 0, "end": 11682924, "filename": "/sounds/victorysound.ogg"}, {"audio": 0, "start": 11682924, "crunched": 0, "end": 11686875, "filename": "/spec/grid_spec.lua"}, {"audio": 0, "start": 11686875, "crunched": 0, "end": 11689122, "filename": "/spec/line_spec.lua"}, {"audio": 0, "start": 11689122, "crunched": 0, "end": 11691316, "filename": "/states/game/game_loading.lua"}, {"audio": 0, "start": 11691316, "crunched": 0, "end": 11692280, "filename": "/states/game/game_lose.lua"}, {"audio": 0, "start": 11692280, "crunched": 0, "end": 11700641, "filename": "/states/game/game_main.lua"}, {"audio": 0, "start": 11700641, "crunched": 0, "end": 11704017, "filename": "/states/game/game_menu.lua"}, {"audio": 0, "start": 11704017, "crunched": 0, "end": 11704132, "filename": "/states/game/game_over.lua"}, {"audio": 0, "start": 11704132, "crunched": 0, "end": 11705043, "filename": "/states/game/game_title.lua"}, {"audio": 0, "start": 11705043, "crunched": 0, "end": 11705978, "filename": "/states/game/game_win.lua"}], "remote_package_size": 11705978, "package_uuid": "d1c026e0-125f-46cd-a7eb-87834866d29f"});

})();
