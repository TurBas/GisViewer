describe('Controller: MapServer', function(){
    beforeEach(module('app'));

    var $controller,
        $log,
        vm;
    beforeEach(inject(function(_$controller_, _$log_) {
        $controller = _$controller_;
        $log = _$log_;
    }));

    function createController(){
        vm = $controller('MapServer');
    }

    describe('when adding a keyword', function(){
        it('the new keyword should be added to the mapservers list of keywords', function(){
            createController();
            expect(vm.mapserver.keywords.length).toBe(0);
            var keyword ='New Keyword'
            vm.keyword = keyword;

            vm.addKeyword();

            expect(vm.mapserver.keywords.length).toBe(1);
            expect(vm.mapserver.keywords[0]).toEqual(keyword);
        });

        it('the should clear the keyword after adding it to the list of keywords', function(){
            createController();
            vm.keyword = 'New Keyword';

            vm.addKeyword();

            expect(vm.keyword).toEqual('');
        });

        it('should trim the keyword before adding it to the list of keywords', function(){
            createController();
            var keyword = '     New Keyword      ';
            var expectedKeyword = 'New Keyword';
            vm.keyword = keyword;

            vm.addKeyword();

            expect(vm.mapserver.keywords[0]).toEqual(expectedKeyword);
        });

        it('should only add a keyword if it is not empty', function(){
            createController();
            expect(vm.mapserver.keywords.length).toBe(0);
            vm.keyword = '';

            vm.addKeyword();

            expect(vm.mapserver.keywords.length).toBe(0);
        });

        it('should only add a keyword if it is not present in the list of keywords', function(){
            createController();
            var alreadyPresentKeyword = 'Keyword 3';
            vm.mapserver.keywords = [ 'Keyword 1', 'Keyword 2', alreadyPresentKeyword]
            expect(vm.mapserver.keywords.length).toBe(3);
            vm.keyword = alreadyPresentKeyword;

            vm.addKeyword();

            expect(vm.mapserver.keywords.length).toBe(3);
        });

        it('should send a message to the logger if a keyword is already present in the list of keywords', function(){
            createController();
            spyOn($log, 'warn');
            var alreadyPresentKeyword = 'Keyword 3';
            vm.mapserver.keywords = [ alreadyPresentKeyword]
            vm.keyword = alreadyPresentKeyword;

            vm.addKeyword();

            expect($log.warn).toHaveBeenCalledWith('Keyword already present.');
        });
    });

    describe('when deleting a keyword', function(){
        it('should remove the keyword from the list of keywords', function(){
            createController();
            var key1 = 'Key 1';
            var key2 = 'Key 2';
            vm.mapserver.keywords = [key1, key2];
            expect(vm.mapserver.keywords.length).toBe(2);

            vm.deleteKeyword(key1);

            expect(vm.mapserver.keywords.length).toBe(1);
            expect(vm.mapserver.keywords[0]).toBe(key2);
        });

        it('should log a warning when a key is removed which is not present in the list of keywords', function(){
            createController();
            spyOn($log, 'warn');
            var key1 = 'Key 1';
            var key2 = 'Key 2';
            var notPresentkey = 'Key 3';
            vm.mapserver.keywords = [key1, key2];
            expect(vm.mapserver.keywords.length).toBe(2);

            vm.deleteKeyword(notPresentkey);

            expect(vm.mapserver.keywords.length).toBe(2);
            expect($log.warn).toHaveBeenCalledWith('Keyword not present.');
        });
    });

    describe('when getting the capabilities', function(){
        var $rootScope,
            $httpBackend,
            $q,
            mapserverService;

        beforeEach(inject(function(_$rootScope_, _$httpBackend_, _$q_, _mapserverService_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            mapserverService = _mapserverService_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should send the url and version of the mapserver to the service', function(){
            spyOn(mapserverService, 'getCapabilities').and.returnValue($q.when({}));
            createController();
            var expectedUrl = 'some url';
            var expectedVersion = '1.0';
            vm.mapserver.url = expectedUrl;
            vm.mapserver.version = expectedVersion;

            vm.getCapabilities();

            expect(mapserverService.getCapabilities).toHaveBeenCalledWith(expectedUrl, expectedVersion);
        });

        it('should set the capabilities on the mapserver', function(){
            var fakeCapabilities = {
                title: 'Fake Title',
                abstract: 'Fake abstract',
                keywords: ['key 1', 'key2']
            };
            spyOn(mapserverService, 'getCapabilities').and.returnValue($q.when(fakeCapabilities));
            createController();

            vm.getCapabilities();
            $rootScope.$apply();

            expect(vm.mapserver.title).toBe(fakeCapabilities.title);
            expect(vm.mapserver.abstract).toBe(fakeCapabilities.abstract);
            expect(vm.mapserver.keywords.length).toBe(fakeCapabilities.keywords.length);
        });

        it('should log a warning when an error occurs while retrieving the capabilities', function(){
            $httpBackend.when('POST').respond(400);
            spyOn($log, 'warn');
            createController();

            vm.getCapabilities();
            $httpBackend.flush();

            expect($log.warn).toHaveBeenCalledWith('Error while retrieving capabilities.');
        });
    });
});