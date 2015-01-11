(function() {
    'use strict';

    angular
        .module('app')
        .factory('mapserverService', mapserverService);

    /* @ngInject */
    function mapserverService($http){
        var service = {
            isAlive: isAlive
        };
        return service;

        function isAlive(url){
            return $http.post('/api/mapserver/isalive', {url: encodeURI(url)});
        }
    }

}());