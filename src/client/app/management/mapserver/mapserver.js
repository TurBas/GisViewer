(function() {
    'use strict';

    angular
        .module('app')
        .controller('MapServer', MapServer);

    /* @ngInject */
    function MapServer() {

        var vm = this;
        vm.mapserver = {};

        activate();

        function activate() {

        }
    }
}());