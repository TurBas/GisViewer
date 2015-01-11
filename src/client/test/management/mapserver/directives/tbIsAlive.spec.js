(function() {
    'use strict';

    describe('Directives: tbIsAlive', function(){
        beforeEach(module('app'));

        var $scope,
            $compile,
            $q,
            $httpBackend,
            mapserverService,
            form;

        beforeEach(inject(function ($rootScope, _$compile_, _$q_, _$httpBackend_, _mapserverService_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
            $q = _$q_;
            $httpBackend = _$httpBackend_;
            mapserverService = _mapserverService_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        function createDirective(){
            $scope.url = "http://www.google.nl";

            var template = '<form name="form">' +
                                '<input name="input"' +
                                       'ng-model="url"' +
                                       'tb-is-alive />' +
                           '</form>';

            var element = angular.element(template);
            $compile(element)($scope);
            form = $scope.form;
            $scope.$digest();
        }

        it('should set the input valid if the url exists', function(){
            spyOn(mapserverService, 'isAlive').and.returnValue($q.when({ data: { isAlive: true } }));

            createDirective();

            expect(form.input.$valid).toBe(true);
        });

        it('should set the input invalid if the url does not exists', function(){
            spyOn(mapserverService, 'isAlive').and.returnValue($q.when({ data: { isAlive: false } }));

            createDirective();

            expect(form.input.$invalid).toBe(true);
        });

        it('should set the input invalid if an error occurs', function(){
            $httpBackend.when('POST', '/api/mapserver/isalive').respond(400);

            createDirective();
            $httpBackend.flush();

            expect(form.input.$invalid).toBe(true);
        });

    });

}());
