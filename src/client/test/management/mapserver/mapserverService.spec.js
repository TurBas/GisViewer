(function() {
    'use strict';

    describe('Service: MapserverService', function () {
        beforeEach(module('app'));

        var mapserverService,
            $httpBackend;

        // Initialize the service
        beforeEach(inject(function (_mapserverService_, _$httpBackend_) {
            mapserverService = _mapserverService_;
            $httpBackend = _$httpBackend_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        describe('when calling isAlive', function() {
            it('should post the given url encoded to the server', function(){
                var url = "http://www.google.com?q=saywhat\\says who";
                var expectedUrl = encodeURI(url);

                mapserverService.isAlive(url);

                $httpBackend.expectPOST('/api/mapserver/isalive', { url: expectedUrl}).respond(200);
                $httpBackend.flush();
            });
        });

    });



}());