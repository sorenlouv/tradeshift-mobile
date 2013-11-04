angular.module('backendMod', ['ngResource']).service('documentService', function ($resource) {
	return $resource('http://10.0.1.141\\:8081/sendDocument', {}, {
      update: {method:'PUT', params: {json: '@json'}}
    }); 
});