describe('Controller: MapServer', function(){
    beforeEach(module('app'));

    var $controller,
        vm;
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    function createController(){
        vm = $controller('MapServer');
    }

    it('should say Hello World', function(){
        createController();

        expect(vm.message).toBe('Hello World');
    });
});