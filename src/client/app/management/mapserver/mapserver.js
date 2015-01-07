(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapServer', MapServer);

    /* @ngInject */
    function MapServer() {

        var vm = this;
        vm.message = 'Bye World';

        activate();

        function activate() {
            vm.message = 'Hello World';
        }
    }
}());