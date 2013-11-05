app.factory('helpers', function() {
  'use strict';

  return {
    getFeedId: function(company1, company2) {
      return (company1 < company2 ? company1 + "-" + company2 : company2 + "-" + company1);
    },
    getCompany: function(companyId){

    }
  };
});