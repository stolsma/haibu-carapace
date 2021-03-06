/*
 * use-test.js: Basic tests for the carapace module
 *
 * (C) 2011 Nodejitsu Inc
 * MIT LICENCE
 *
 */
 
var assert = require('assert'),
    vows = require('vows'),
    helper = require('../helper/macros.js'),
    carapace = require('../../lib/carapace');

var PORT = 5050;
    
vows.describe('carapace/simple/use-plugins').addBatch({
  "When using haibu-carapace":  helper.assertListen(PORT, {
    "load up chdir, chroot, heartbeat plugins" : helper.assertUse(['chdir', 'chroot', 'heartbeat'], {
      "and running the heartbeat plugin" : {
        topic : function () {
          carapace.on('carapace::heartbeat', this.callback.bind(carapace, null));
          carapace.heartbeat();
        },
        "should see a carapace::heartbeat event" : function (_, event, data) {
          assert.isString(carapace.event);
          assert.equal(carapace.event, 'carapace::heartbeat');
        }
      }
    })
  })
}).export(module);
