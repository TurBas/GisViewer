(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapServer', MapServer);

    /* @ngInject */
    function MapServer(mapserverService, $log) {

        var vm = this;
        vm.addKeyword = addKeyword;
        vm.deleteKeyword = deleteKeyword;
        vm.getCapabilities = getCapabilities;
        vm.keyword = '';
        vm.mapserver = { version: '1.3.0', keywords: [] };
        vm.save = save;
        vm.wmsVersions = ['1.3.0','1.1.1','1.1.0'];

        activate();

        function activate() {

        }

        function addKeyword(){
            var keywords = vm.mapserver.keywords;
            var keyword = vm.keyword.trim();
            if (keyword !== '') {
                if (keywords.indexOf(keyword) === -1) {
                    vm.mapserver.keywords.push(keyword);
                    vm.keyword = '';
                } else {
                    $log.warn('Keyword already present.');
                }
            }
        }

        function deleteKeyword(keyword){
            var keywords = vm.mapserver.keywords;
            var index = keywords.indexOf(keyword);
            if (index !== -1)
            {
                keywords.splice(index, 1);
            } else {
                $log.warn('Keyword not present.');
            }
        }

        function getCapabilities(){
            mapserverService.getCapabilities(vm.mapserver.url, vm.mapserver.version).then(function(capabilities){
                vm.mapserver.title = capabilities.title;
                vm.mapserver.abstract = capabilities.abstract;
                vm.mapserver.keywords = capabilities.keywords;
            }).catch(function(){
                $log.warn('Error while retrieving capabilities.');
            });
        }

        function save(){
            console.log('save');
        }
    }
}());