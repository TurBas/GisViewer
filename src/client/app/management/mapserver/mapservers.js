(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapServers', MapServers);

    /* @ngInject */
    function MapServers(mapserverService, $log) {

        var vm = this;
        vm.mapservers = [];

        activate();

        /////////////////

        function activate() {
            loadMapServers();
        }

        function loadMapServers() {
            mapserverService.getAll().then(function(mapservers){
                vm.mapservers = mapservers;
            }).catch(function(err){
                $log.error(err);
            });
        }
    }
}());
