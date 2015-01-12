(function() {
    'use strict';

    angular
        .module('app')
        .factory('mapserverService', mapserverService);

    /* @ngInject */
    function mapserverService($http){
        var service = {
            getCapabilities: getCapabilities,
            isAlive: isAlive
        };
        return service;

        function getCapabilities(url, version){
            var data = {
                url: encodeURI(url),
                version: version
            };
            var promise = $http.post('/api/mapserver/capabilities', data).then(function(response){
                return response.data;
            });
            return promise;
        }

        function isAlive(url){
            return $http.post('/api/mapserver/isalive', {url: encodeURI(url)}).then(function(response){
                return response.data;
            });
        }
    }

}());