
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
Module['FS_createPath']('/', 'data', true, true);
Module['FS_createPath']('/data', 'backgrounds', true, true);
Module['FS_createPath']('/data', 'sfx', true, true);
Module['FS_createPath']('/', 'maps', true, true);
Module['FS_createPath']('/maps', 'floors', true, true);
Module['FS_createPath']('/maps', 'room', true, true);
Module['FS_createPath']('/maps/room', '10', true, true);
Module['FS_createPath']('/maps/room', '11', true, true);
Module['FS_createPath']('/maps/room', '17', true, true);
Module['FS_createPath']('/maps/room', '24', true, true);

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
 loadPackage({"files": [{"audio": 0, "start": 0, "crunched": 0, "end": 5658, "filename": "/AnAL.lua"}, {"audio": 0, "start": 5658, "crunched": 0, "end": 5911, "filename": "/boss.lua"}, {"audio": 0, "start": 5911, "crunched": 0, "end": 11285, "filename": "/charcoal.lua"}, {"audio": 0, "start": 11285, "crunched": 0, "end": 12988, "filename": "/coalball.lua"}, {"audio": 0, "start": 12988, "crunched": 0, "end": 14590, "filename": "/conf.lua"}, {"audio": 0, "start": 14590, "crunched": 0, "end": 17296, "filename": "/config.lua"}, {"audio": 0, "start": 17296, "crunched": 0, "end": 19111, "filename": "/door.lua"}, {"audio": 0, "start": 19111, "crunched": 0, "end": 36637, "filename": "/enemy.lua"}, {"audio": 0, "start": 36637, "crunched": 0, "end": 39307, "filename": "/fire.lua"}, {"audio": 0, "start": 39307, "crunched": 0, "end": 41104, "filename": "/gasghost.lua"}, {"audio": 0, "start": 41104, "crunched": 0, "end": 47397, "filename": "/gasleak.lua"}, {"audio": 0, "start": 47397, "crunched": 0, "end": 52426, "filename": "/highscore_entry.lua"}, {"audio": 0, "start": 52426, "crunched": 0, "end": 54249, "filename": "/highscore_list.lua"}, {"audio": 0, "start": 54249, "crunched": 0, "end": 56037, "filename": "/history.lua"}, {"audio": 0, "start": 56037, "crunched": 0, "end": 57641, "filename": "/howto.lua"}, {"audio": 0, "start": 57641, "crunched": 0, "end": 64863, "filename": "/human.lua"}, {"audio": 0, "start": 64863, "crunched": 0, "end": 79446, "filename": "/ingame.lua"}, {"audio": 0, "start": 79446, "crunched": 0, "end": 81112, "filename": "/ingame_menu.lua"}, {"audio": 0, "start": 81112, "crunched": 0, "end": 81995, "filename": "/item.lua"}, {"audio": 0, "start": 81995, "crunched": 0, "end": 84381, "filename": "/joystick.lua"}, {"audio": 0, "start": 84381, "crunched": 0, "end": 86958, "filename": "/keyboard.lua"}, {"audio": 0, "start": 86958, "crunched": 0, "end": 89075, "filename": "/levelselection.lua"}, {"audio": 0, "start": 89075, "crunched": 0, "end": 90601, "filename": "/LICENSE"}, {"audio": 0, "start": 90601, "crunched": 0, "end": 96791, "filename": "/magmahulk.lua"}, {"audio": 0, "start": 96791, "crunched": 0, "end": 103798, "filename": "/main.lua"}, {"audio": 0, "start": 103798, "crunched": 0, "end": 105485, "filename": "/mainmenu.lua"}, {"audio": 0, "start": 105485, "crunched": 0, "end": 120720, "filename": "/map.lua"}, {"audio": 0, "start": 120720, "crunched": 0, "end": 125818, "filename": "/options.lua"}, {"audio": 0, "start": 125818, "crunched": 0, "end": 130640, "filename": "/particles.lua"}, {"audio": 0, "start": 130640, "crunched": 0, "end": 152094, "filename": "/player.lua"}, {"audio": 0, "start": 152094, "crunched": 0, "end": 154085, "filename": "/README.md"}, {"audio": 0, "start": 154085, "crunched": 0, "end": 166512, "filename": "/resources.lua"}, {"audio": 0, "start": 166512, "crunched": 0, "end": 171468, "filename": "/slam.lua"}, {"audio": 0, "start": 171468, "crunched": 0, "end": 173282, "filename": "/splash.lua"}, {"audio": 0, "start": 173282, "crunched": 0, "end": 174163, "filename": "/summary.lua"}, {"audio": 0, "start": 174163, "crunched": 0, "end": 176570, "filename": "/TSerial.lua"}, {"audio": 0, "start": 176570, "crunched": 0, "end": 179738, "filename": "/util.lua"}, {"audio": 0, "start": 179738, "crunched": 0, "end": 180215, "filename": "/data/ashes.png"}, {"audio": 0, "start": 180215, "crunched": 0, "end": 183678, "filename": "/data/awards.png"}, {"audio": 0, "start": 183678, "crunched": 0, "end": 184165, "filename": "/data/black_smoke.png"}, {"audio": 0, "start": 184165, "crunched": 0, "end": 184466, "filename": "/data/black_smoke_small.png"}, {"audio": 0, "start": 184466, "crunched": 0, "end": 184987, "filename": "/data/boldfont.png"}, {"audio": 0, "start": 184987, "crunched": 0, "end": 185381, "filename": "/data/border.png"}, {"audio": 0, "start": 185381, "crunched": 0, "end": 185977, "filename": "/data/boss_health.png"}, {"audio": 0, "start": 185977, "crunched": 0, "end": 186849, "filename": "/data/captain_dialog.png"}, {"audio": 0, "start": 186849, "crunched": 0, "end": 187840, "filename": "/data/captain_dialog_sad.png"}, {"audio": 0, "start": 187840, "crunched": 0, "end": 189366, "filename": "/data/charcoal_bump.png"}, {"audio": 0, "start": 189366, "crunched": 0, "end": 189942, "filename": "/data/charcoal_daze.png"}, {"audio": 0, "start": 189942, "crunched": 0, "end": 190523, "filename": "/data/charcoal_daze_hit.png"}, {"audio": 0, "start": 190523, "crunched": 0, "end": 191108, "filename": "/data/charcoal_daze_rage.png"}, {"audio": 0, "start": 191108, "crunched": 0, "end": 191531, "filename": "/data/charcoal_idle.png"}, {"audio": 0, "start": 191531, "crunched": 0, "end": 192251, "filename": "/data/charcoal_portrait.png"}, {"audio": 0, "start": 192251, "crunched": 0, "end": 192727, "filename": "/data/charcoal_projectile.png"}, {"audio": 0, "start": 192727, "crunched": 0, "end": 193492, "filename": "/data/charcoal_roll.png"}, {"audio": 0, "start": 193492, "crunched": 0, "end": 195052, "filename": "/data/charcoal_roll_rage.png"}, {"audio": 0, "start": 195052, "crunched": 0, "end": 195445, "filename": "/data/charcoal_shards.png"}, {"audio": 0, "start": 195445, "crunched": 0, "end": 196616, "filename": "/data/charcoal_transform.png"}, {"audio": 0, "start": 196616, "crunched": 0, "end": 197339, "filename": "/data/charcoal_transform_hit.png"}, {"audio": 0, "start": 197339, "crunched": 0, "end": 198388, "filename": "/data/charcoal_transform_rage.png"}, {"audio": 0, "start": 198388, "crunched": 0, "end": 199502, "filename": "/data/charcoal_transition.png"}, {"audio": 0, "start": 199502, "crunched": 0, "end": 199787, "filename": "/data/circles.png"}, {"audio": 0, "start": 199787, "crunched": 0, "end": 200817, "filename": "/data/countdown.png"}, {"audio": 0, "start": 200817, "crunched": 0, "end": 201091, "filename": "/data/door.png"}, {"audio": 0, "start": 201091, "crunched": 0, "end": 201814, "filename": "/data/enemy_angryjumper_hit.png"}, {"audio": 0, "start": 201814, "crunched": 0, "end": 203017, "filename": "/data/enemy_angryjumper_jump.png"}, {"audio": 0, "start": 203017, "crunched": 0, "end": 203544, "filename": "/data/enemy_angrynormal_hit.png"}, {"audio": 0, "start": 203544, "crunched": 0, "end": 204191, "filename": "/data/enemy_angrynormal_recover.png"}, {"audio": 0, "start": 204191, "crunched": 0, "end": 204826, "filename": "/data/enemy_angrynormal_run.png"}, {"audio": 0, "start": 204826, "crunched": 0, "end": 205497, "filename": "/data/enemy_angryvolcano_hit.png"}, {"audio": 0, "start": 205497, "crunched": 0, "end": 206085, "filename": "/data/enemy_angryvolcano_run.png"}, {"audio": 0, "start": 206085, "crunched": 0, "end": 206694, "filename": "/data/enemy_angryvolcano_shoot.png"}, {"audio": 0, "start": 206694, "crunched": 0, "end": 206950, "filename": "/data/enemy_fireball.png"}, {"audio": 0, "start": 206950, "crunched": 0, "end": 207182, "filename": "/data/enemy_healthbar.png"}, {"audio": 0, "start": 207182, "crunched": 0, "end": 207610, "filename": "/data/enemy_jumper_hit.png"}, {"audio": 0, "start": 207610, "crunched": 0, "end": 208653, "filename": "/data/enemy_jumper_jump.png"}, {"audio": 0, "start": 208653, "crunched": 0, "end": 209625, "filename": "/data/enemy_jumper_recover.png"}, {"audio": 0, "start": 209625, "crunched": 0, "end": 210120, "filename": "/data/enemy_normal_hit.png"}, {"audio": 0, "start": 210120, "crunched": 0, "end": 210734, "filename": "/data/enemy_normal_recover.png"}, {"audio": 0, "start": 210734, "crunched": 0, "end": 211130, "filename": "/data/enemy_normal_run.png"}, {"audio": 0, "start": 211130, "crunched": 0, "end": 211517, "filename": "/data/enemy_thief_hit.png"}, {"audio": 0, "start": 211517, "crunched": 0, "end": 212010, "filename": "/data/enemy_thief_recover.png"}, {"audio": 0, "start": 212010, "crunched": 0, "end": 212556, "filename": "/data/enemy_thief_run.png"}, {"audio": 0, "start": 212556, "crunched": 0, "end": 213163, "filename": "/data/enemy_volcano_hit.png"}, {"audio": 0, "start": 213163, "crunched": 0, "end": 213540, "filename": "/data/enemy_volcano_run.png"}, {"audio": 0, "start": 213540, "crunched": 0, "end": 214099, "filename": "/data/enemy_volcano_shoot.png"}, {"audio": 0, "start": 214099, "crunched": 0, "end": 214304, "filename": "/data/exclamation.png"}, {"audio": 0, "start": 214304, "crunched": 0, "end": 214622, "filename": "/data/fire_floor.png"}, {"audio": 0, "start": 214622, "crunched": 0, "end": 215344, "filename": "/data/fire_wall.png"}, {"audio": 0, "start": 215344, "crunched": 0, "end": 215867, "filename": "/data/fire_wall_small.png"}, {"audio": 0, "start": 215867, "crunched": 0, "end": 216253, "filename": "/data/gasghost.png"}, {"audio": 0, "start": 216253, "crunched": 0, "end": 216659, "filename": "/data/gasghost_hit.png"}, {"audio": 0, "start": 216659, "crunched": 0, "end": 217208, "filename": "/data/gasleak_angry_idle_shot.png"}, {"audio": 0, "start": 217208, "crunched": 0, "end": 218006, "filename": "/data/gasleak_hit.png"}, {"audio": 0, "start": 218006, "crunched": 0, "end": 218524, "filename": "/data/gasleak_idle.png"}, {"audio": 0, "start": 218524, "crunched": 0, "end": 219044, "filename": "/data/gasleak_idle_shot.png"}, {"audio": 0, "start": 219044, "crunched": 0, "end": 220226, "filename": "/data/gasleak_portrait.png"}, {"audio": 0, "start": 220226, "crunched": 0, "end": 220781, "filename": "/data/gasleak_rage_idle.png"}, {"audio": 0, "start": 220781, "crunched": 0, "end": 221330, "filename": "/data/gasleak_rage_idle_shot.png"}, {"audio": 0, "start": 221330, "crunched": 0, "end": 223708, "filename": "/data/gasleak_rage_shot_walk.png"}, {"audio": 0, "start": 223708, "crunched": 0, "end": 226107, "filename": "/data/gasleak_rage_walk.png"}, {"audio": 0, "start": 226107, "crunched": 0, "end": 228403, "filename": "/data/gasleak_shot_walk.png"}, {"audio": 0, "start": 228403, "crunched": 0, "end": 229694, "filename": "/data/gasleak_transition.png"}, {"audio": 0, "start": 229694, "crunched": 0, "end": 231984, "filename": "/data/gasleak_walk.png"}, {"audio": 0, "start": 231984, "crunched": 0, "end": 232748, "filename": "/data/highscore_panes.png"}, {"audio": 0, "start": 232748, "crunched": 0, "end": 261507, "filename": "/data/howto.png"}, {"audio": 0, "start": 261507, "crunched": 0, "end": 262367, "filename": "/data/hud.png"}, {"audio": 0, "start": 262367, "crunched": 0, "end": 263414, "filename": "/data/hud2.png"}, {"audio": 0, "start": 263414, "crunched": 0, "end": 263679, "filename": "/data/hud_people.png"}, {"audio": 0, "start": 263679, "crunched": 0, "end": 264732, "filename": "/data/human_1_burn.png"}, {"audio": 0, "start": 264732, "crunched": 0, "end": 266133, "filename": "/data/human_1_carry_left.png"}, {"audio": 0, "start": 266133, "crunched": 0, "end": 267244, "filename": "/data/human_1_carry_right.png"}, {"audio": 0, "start": 267244, "crunched": 0, "end": 267953, "filename": "/data/human_1_fly.png"}, {"audio": 0, "start": 267953, "crunched": 0, "end": 268921, "filename": "/data/human_1_panic.png"}, {"audio": 0, "start": 268921, "crunched": 0, "end": 269741, "filename": "/data/human_1_run.png"}, {"audio": 0, "start": 269741, "crunched": 0, "end": 270710, "filename": "/data/human_2_burn.png"}, {"audio": 0, "start": 270710, "crunched": 0, "end": 271754, "filename": "/data/human_2_carry_left.png"}, {"audio": 0, "start": 271754, "crunched": 0, "end": 272686, "filename": "/data/human_2_carry_right.png"}, {"audio": 0, "start": 272686, "crunched": 0, "end": 273373, "filename": "/data/human_2_fly.png"}, {"audio": 0, "start": 273373, "crunched": 0, "end": 274374, "filename": "/data/human_2_panic.png"}, {"audio": 0, "start": 274374, "crunched": 0, "end": 275162, "filename": "/data/human_2_run.png"}, {"audio": 0, "start": 275162, "crunched": 0, "end": 276239, "filename": "/data/human_3_burn.png"}, {"audio": 0, "start": 276239, "crunched": 0, "end": 277155, "filename": "/data/human_3_carry_left.png"}, {"audio": 0, "start": 277155, "crunched": 0, "end": 278063, "filename": "/data/human_3_carry_right.png"}, {"audio": 0, "start": 278063, "crunched": 0, "end": 278762, "filename": "/data/human_3_fly.png"}, {"audio": 0, "start": 278762, "crunched": 0, "end": 279739, "filename": "/data/human_3_panic.png"}, {"audio": 0, "start": 279739, "crunched": 0, "end": 280494, "filename": "/data/human_3_run.png"}, {"audio": 0, "start": 280494, "crunched": 0, "end": 281495, "filename": "/data/human_4_burn.png"}, {"audio": 0, "start": 281495, "crunched": 0, "end": 282419, "filename": "/data/human_4_carry_left.png"}, {"audio": 0, "start": 282419, "crunched": 0, "end": 283307, "filename": "/data/human_4_carry_right.png"}, {"audio": 0, "start": 283307, "crunched": 0, "end": 284048, "filename": "/data/human_4_fly.png"}, {"audio": 0, "start": 284048, "crunched": 0, "end": 285096, "filename": "/data/human_4_panic.png"}, {"audio": 0, "start": 285096, "crunched": 0, "end": 285963, "filename": "/data/human_4_run.png"}, {"audio": 0, "start": 285963, "crunched": 0, "end": 287149, "filename": "/data/item_coolant.png"}, {"audio": 0, "start": 287149, "crunched": 0, "end": 288341, "filename": "/data/item_regen.png"}, {"audio": 0, "start": 288341, "crunched": 0, "end": 289453, "filename": "/data/item_reserve.png"}, {"audio": 0, "start": 289453, "crunched": 0, "end": 289699, "filename": "/data/item_slots.png"}, {"audio": 0, "start": 289699, "crunched": 0, "end": 290988, "filename": "/data/item_suit.png"}, {"audio": 0, "start": 290988, "crunched": 0, "end": 292181, "filename": "/data/item_tank.png"}, {"audio": 0, "start": 292181, "crunched": 0, "end": 294811, "filename": "/data/level_buildings.png"}, {"audio": 0, "start": 294811, "crunched": 0, "end": 296322, "filename": "/data/light_fire.png"}, {"audio": 0, "start": 296322, "crunched": 0, "end": 296738, "filename": "/data/light_fireball.png"}, {"audio": 0, "start": 296738, "crunched": 0, "end": 297899, "filename": "/data/light_player.png"}, {"audio": 0, "start": 297899, "crunched": 0, "end": 300627, "filename": "/data/lovesplashpixel.png"}, {"audio": 0, "start": 300627, "crunched": 0, "end": 301997, "filename": "/data/magmahulk_jump.png"}, {"audio": 0, "start": 301997, "crunched": 0, "end": 303285, "filename": "/data/magmahulk_jump_hit.png"}, {"audio": 0, "start": 303285, "crunched": 0, "end": 305034, "filename": "/data/magmahulk_land.png"}, {"audio": 0, "start": 305034, "crunched": 0, "end": 306744, "filename": "/data/magmahulk_land_hit.png"}, {"audio": 0, "start": 306744, "crunched": 0, "end": 307570, "filename": "/data/magmahulk_portrait.png"}, {"audio": 0, "start": 307570, "crunched": 0, "end": 308842, "filename": "/data/magmahulk_rage_jump.png"}, {"audio": 0, "start": 308842, "crunched": 0, "end": 310600, "filename": "/data/magmahulk_rage_land.png"}, {"audio": 0, "start": 310600, "crunched": 0, "end": 310819, "filename": "/data/menu_box.png"}, {"audio": 0, "start": 310819, "crunched": 0, "end": 311072, "filename": "/data/overloaded_bar.png"}, {"audio": 0, "start": 311072, "crunched": 0, "end": 311773, "filename": "/data/player_climb_down.png"}, {"audio": 0, "start": 311773, "crunched": 0, "end": 312468, "filename": "/data/player_climb_up.png"}, {"audio": 0, "start": 312468, "crunched": 0, "end": 312896, "filename": "/data/player_death.png"}, {"audio": 0, "start": 312896, "crunched": 0, "end": 313579, "filename": "/data/player_gun.png"}, {"audio": 0, "start": 313579, "crunched": 0, "end": 314451, "filename": "/data/player_running.png"}, {"audio": 0, "start": 314451, "crunched": 0, "end": 315347, "filename": "/data/player_throw.png"}, {"audio": 0, "start": 315347, "crunched": 0, "end": 317598, "filename": "/data/popup_text.png"}, {"audio": 0, "start": 317598, "crunched": 0, "end": 318789, "filename": "/data/red_screen.png"}, {"audio": 0, "start": 318789, "crunched": 0, "end": 319060, "filename": "/data/reserve_bar.png"}, {"audio": 0, "start": 319060, "crunched": 0, "end": 319334, "filename": "/data/shards.png"}, {"audio": 0, "start": 319334, "crunched": 0, "end": 320338, "filename": "/data/shockwave.png"}, {"audio": 0, "start": 320338, "crunched": 0, "end": 320614, "filename": "/data/sparkles.png"}, {"audio": 0, "start": 320614, "crunched": 0, "end": 323609, "filename": "/data/splash.png"}, {"audio": 0, "start": 323609, "crunched": 0, "end": 325003, "filename": "/data/stats_screen.png"}, {"audio": 0, "start": 325003, "crunched": 0, "end": 325215, "filename": "/data/stream.png"}, {"audio": 0, "start": 325215, "crunched": 0, "end": 327095, "filename": "/data/tangram.png"}, {"audio": 0, "start": 327095, "crunched": 0, "end": 327350, "filename": "/data/temperature_bar.png"}, {"audio": 0, "start": 327350, "crunched": 0, "end": 327565, "filename": "/data/temperature_bar_blink.png"}, {"audio": 0, "start": 327565, "crunched": 0, "end": 333430, "filename": "/data/tiles.png"}, {"audio": 0, "start": 333430, "crunched": 0, "end": 334257, "filename": "/data/warning_icons.png"}, {"audio": 0, "start": 334257, "crunched": 0, "end": 335601, "filename": "/data/water.png"}, {"audio": 0, "start": 335601, "crunched": 0, "end": 335854, "filename": "/data/water_bar.png"}, {"audio": 0, "start": 335854, "crunched": 0, "end": 338346, "filename": "/data/backgrounds/mountains.png"}, {"audio": 0, "start": 338346, "crunched": 0, "end": 339394, "filename": "/data/backgrounds/night.png"}, {"audio": 1, "start": 339394, "crunched": 0, "end": 346612, "filename": "/data/sfx/blip.wav"}, {"audio": 1, "start": 346612, "crunched": 0, "end": 383360, "filename": "/data/sfx/bossjump.wav"}, {"audio": 1, "start": 383360, "crunched": 0, "end": 2125371, "filename": "/data/sfx/bundesliga.ogg"}, {"audio": 1, "start": 2125371, "crunched": 0, "end": 2153451, "filename": "/data/sfx/confirm.wav"}, {"audio": 1, "start": 2153451, "crunched": 0, "end": 2508561, "filename": "/data/sfx/countdown.wav"}, {"audio": 1, "start": 2508561, "crunched": 0, "end": 2555305, "filename": "/data/sfx/crash.wav"}, {"audio": 1, "start": 2555305, "crunched": 0, "end": 2573429, "filename": "/data/sfx/door.wav"}, {"audio": 1, "start": 2573429, "crunched": 0, "end": 2607063, "filename": "/data/sfx/empty.wav"}, {"audio": 1, "start": 2607063, "crunched": 0, "end": 2646699, "filename": "/data/sfx/endexplosion.wav"}, {"audio": 1, "start": 2646699, "crunched": 0, "end": 2681991, "filename": "/data/sfx/enemydie.wav"}, {"audio": 1, "start": 2681991, "crunched": 0, "end": 2720735, "filename": "/data/sfx/glass.wav"}, {"audio": 1, "start": 2720735, "crunched": 0, "end": 3991971, "filename": "/data/sfx/happyfeerings.ogg"}, {"audio": 1, "start": 3991971, "crunched": 0, "end": 4014799, "filename": "/data/sfx/jump.wav"}, {"audio": 1, "start": 4014799, "crunched": 0, "end": 4735470, "filename": "/data/sfx/menujazz.ogg"}, {"audio": 1, "start": 4735470, "crunched": 0, "end": 6145388, "filename": "/data/sfx/opening.ogg"}, {"audio": 1, "start": 6145388, "crunched": 0, "end": 6203100, "filename": "/data/sfx/powerup.wav"}, {"audio": 1, "start": 6203100, "crunched": 0, "end": 6247340, "filename": "/data/sfx/pss.wav"}, {"audio": 1, "start": 6247340, "crunched": 0, "end": 6325092, "filename": "/data/sfx/rescue.wav"}, {"audio": 1, "start": 6325092, "crunched": 0, "end": 8876059, "filename": "/data/sfx/rockerronni.ogg"}, {"audio": 1, "start": 8876059, "crunched": 0, "end": 10215817, "filename": "/data/sfx/roof.ogg"}, {"audio": 1, "start": 10215817, "crunched": 0, "end": 12097791, "filename": "/data/sfx/scooterfest.ogg"}, {"audio": 1, "start": 12097791, "crunched": 0, "end": 12138233, "filename": "/data/sfx/shoot.wav"}, {"audio": 1, "start": 12138233, "crunched": 0, "end": 12170503, "filename": "/data/sfx/throw.wav"}, {"audio": 1, "start": 12170503, "crunched": 0, "end": 12370783, "filename": "/data/sfx/transform.wav"}, {"audio": 1, "start": 12370783, "crunched": 0, "end": 12485208, "filename": "/data/sfx/victory.ogg"}, {"audio": 0, "start": 12485208, "crunched": 0, "end": 12488620, "filename": "/maps/base.lua"}, {"audio": 0, "start": 12488620, "crunched": 0, "end": 12492518, "filename": "/maps/base.tmx"}, {"audio": 0, "start": 12492518, "crunched": 0, "end": 12495398, "filename": "/maps/top_base.lua"}, {"audio": 0, "start": 12495398, "crunched": 0, "end": 12499296, "filename": "/maps/top_base.tmx"}, {"audio": 0, "start": 12499296, "crunched": 0, "end": 12501725, "filename": "/maps/floors/1-1-1.lua"}, {"audio": 0, "start": 12501725, "crunched": 0, "end": 12504188, "filename": "/maps/floors/1-1-1.tmx"}, {"audio": 0, "start": 12504188, "crunched": 0, "end": 12506224, "filename": "/maps/floors/1-2.lua"}, {"audio": 0, "start": 12506224, "crunched": 0, "end": 12508268, "filename": "/maps/floors/1-2.tmx"}, {"audio": 0, "start": 12508268, "crunched": 0, "end": 12510304, "filename": "/maps/floors/2-1.lua"}, {"audio": 0, "start": 12510304, "crunched": 0, "end": 12512348, "filename": "/maps/floors/2-1.tmx"}, {"audio": 0, "start": 12512348, "crunched": 0, "end": 12514384, "filename": "/maps/floors/2-2.lua"}, {"audio": 0, "start": 12514384, "crunched": 0, "end": 12516428, "filename": "/maps/floors/2-2.tmx"}, {"audio": 0, "start": 12516428, "crunched": 0, "end": 12517461, "filename": "/maps/room/10/1.lua"}, {"audio": 0, "start": 12517461, "crunched": 0, "end": 12518270, "filename": "/maps/room/10/1.tmx"}, {"audio": 0, "start": 12518270, "crunched": 0, "end": 12519303, "filename": "/maps/room/10/2.lua"}, {"audio": 0, "start": 12519303, "crunched": 0, "end": 12520112, "filename": "/maps/room/10/2.tmx"}, {"audio": 0, "start": 12520112, "crunched": 0, "end": 12521145, "filename": "/maps/room/10/3.lua"}, {"audio": 0, "start": 12521145, "crunched": 0, "end": 12521954, "filename": "/maps/room/10/3.tmx"}, {"audio": 0, "start": 12521954, "crunched": 0, "end": 12522987, "filename": "/maps/room/10/4.lua"}, {"audio": 0, "start": 12522987, "crunched": 0, "end": 12523796, "filename": "/maps/room/10/4.tmx"}, {"audio": 0, "start": 12523796, "crunched": 0, "end": 12524829, "filename": "/maps/room/10/5.lua"}, {"audio": 0, "start": 12524829, "crunched": 0, "end": 12525638, "filename": "/maps/room/10/5.tmx"}, {"audio": 0, "start": 12525638, "crunched": 0, "end": 12526670, "filename": "/maps/room/10/6.lua"}, {"audio": 0, "start": 12526670, "crunched": 0, "end": 12527478, "filename": "/maps/room/10/6.tmx"}, {"audio": 0, "start": 12527478, "crunched": 0, "end": 12528531, "filename": "/maps/room/11/1.lua"}, {"audio": 0, "start": 12528531, "crunched": 0, "end": 12529360, "filename": "/maps/room/11/1.tmx"}, {"audio": 0, "start": 12529360, "crunched": 0, "end": 12530413, "filename": "/maps/room/11/2.lua"}, {"audio": 0, "start": 12530413, "crunched": 0, "end": 12531242, "filename": "/maps/room/11/2.tmx"}, {"audio": 0, "start": 12531242, "crunched": 0, "end": 12532295, "filename": "/maps/room/11/3.lua"}, {"audio": 0, "start": 12532295, "crunched": 0, "end": 12533124, "filename": "/maps/room/11/3.tmx"}, {"audio": 0, "start": 12533124, "crunched": 0, "end": 12534177, "filename": "/maps/room/11/4.lua"}, {"audio": 0, "start": 12534177, "crunched": 0, "end": 12535006, "filename": "/maps/room/11/4.tmx"}, {"audio": 0, "start": 12535006, "crunched": 0, "end": 12536057, "filename": "/maps/room/11/5.lua"}, {"audio": 0, "start": 12536057, "crunched": 0, "end": 12536885, "filename": "/maps/room/11/5.tmx"}, {"audio": 0, "start": 12536885, "crunched": 0, "end": 12537938, "filename": "/maps/room/11/6.lua"}, {"audio": 0, "start": 12537938, "crunched": 0, "end": 12538767, "filename": "/maps/room/11/6.tmx"}, {"audio": 0, "start": 12538767, "crunched": 0, "end": 12540029, "filename": "/maps/room/17/1.lua"}, {"audio": 0, "start": 12540029, "crunched": 0, "end": 12541048, "filename": "/maps/room/17/1.tmx"}, {"audio": 0, "start": 12541048, "crunched": 0, "end": 12542310, "filename": "/maps/room/17/2.lua"}, {"audio": 0, "start": 12542310, "crunched": 0, "end": 12543329, "filename": "/maps/room/17/2.tmx"}, {"audio": 0, "start": 12543329, "crunched": 0, "end": 12544502, "filename": "/maps/room/17/3.lua"}, {"audio": 0, "start": 12544502, "crunched": 0, "end": 12545459, "filename": "/maps/room/17/3.tmx"}, {"audio": 0, "start": 12545459, "crunched": 0, "end": 12546628, "filename": "/maps/room/17/4.lua"}, {"audio": 0, "start": 12546628, "crunched": 0, "end": 12547585, "filename": "/maps/room/17/4.tmx"}, {"audio": 0, "start": 12547585, "crunched": 0, "end": 12548758, "filename": "/maps/room/17/5.lua"}, {"audio": 0, "start": 12548758, "crunched": 0, "end": 12549715, "filename": "/maps/room/17/5.tmx"}, {"audio": 0, "start": 12549715, "crunched": 0, "end": 12550964, "filename": "/maps/room/17/6.lua"}, {"audio": 0, "start": 12550964, "crunched": 0, "end": 12551983, "filename": "/maps/room/17/6.tmx"}, {"audio": 0, "start": 12551983, "crunched": 0, "end": 12553474, "filename": "/maps/room/24/1.lua"}, {"audio": 0, "start": 12553474, "crunched": 0, "end": 12554703, "filename": "/maps/room/24/1.tmx"}, {"audio": 0, "start": 12554703, "crunched": 0, "end": 12556194, "filename": "/maps/room/24/2.lua"}, {"audio": 0, "start": 12556194, "crunched": 0, "end": 12557423, "filename": "/maps/room/24/2.tmx"}, {"audio": 0, "start": 12557423, "crunched": 0, "end": 12558825, "filename": "/maps/room/24/3.lua"}, {"audio": 0, "start": 12558825, "crunched": 0, "end": 12559992, "filename": "/maps/room/24/3.tmx"}, {"audio": 0, "start": 12559992, "crunched": 0, "end": 12561383, "filename": "/maps/room/24/4.lua"}, {"audio": 0, "start": 12561383, "crunched": 0, "end": 12562550, "filename": "/maps/room/24/4.tmx"}, {"audio": 0, "start": 12562550, "crunched": 0, "end": 12563952, "filename": "/maps/room/24/5.lua"}, {"audio": 0, "start": 12563952, "crunched": 0, "end": 12565119, "filename": "/maps/room/24/5.tmx"}, {"audio": 0, "start": 12565119, "crunched": 0, "end": 12566503, "filename": "/maps/room/24/6.lua"}, {"audio": 0, "start": 12566503, "crunched": 0, "end": 12567608, "filename": "/maps/room/24/6.tmx"}], "remote_package_size": 12567608, "package_uuid": "5dc128e0-4207-46ba-bbe3-073f83de4637"});

})();
