(function() {
    'use strict';

    angular
        .module('app')
        .directive('tbIsAlive', tbIsAlive);

    /* @ngInject */
    function tbIsAlive($q, mapserverService){
        // Verifies that a given URL is alive by requesting the url and check for a 200 HTTPResponse
        // Usage:
        //  <input ng-model="vm.url"  tb-is-alive>
        var directive = {
            link: link,
            restrict: 'A',
            require: 'ngModel',
            scope: {}
        };

        return directive;

        /////////////////

        function link(scope, element, attrs, ngModel)
        {
            ngModel.$asyncValidators.alive = function(modelValue) {
                var deferred = $q.defer();

                mapserverService.isAlive(modelValue)
                    .then(function(resp) {
                        if (resp.isAlive){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    .catch(function() {
                        deferred.reject();
                    });

                return deferred.promise;
            };
        }
    }

}());