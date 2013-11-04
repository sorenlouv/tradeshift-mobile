angular.module('backendMod').service('documentService', function ($json) {
	return $json('http://10.0.1.141\\:8081/sendDocument', {}, {
      update: {method:'PUT', params: {json: '@json'}}
    }); 
});