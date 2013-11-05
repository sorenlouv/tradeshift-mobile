app.service('documentService', function ($http) {
  'use strict';

  this.getUuid = function(json){
    return $http({
      method: 'PUT',
      url: 'http://10.0.1.141:8081/sendDocument',
      data: json
    });
  };
});