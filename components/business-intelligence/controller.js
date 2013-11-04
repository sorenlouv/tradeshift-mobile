app.controller('BusinessIntelligenceController', ['$scope', 'angularFire', '$rootScope', 'documentService', function ($scope, angularFire, $rootScope, documentService) {
  'use strict';

  // Companies
  var companiesRef = new Firebase($rootScope.fireBaseUrl + "/companies"),
      currentUserCompany    = $rootScope.currentUser.company;

  $scope.companies = {};
  angularFire(companiesRef, $scope, 'companies');

  $scope.currentUserCompany = currentUserCompany;

  $scope.addCompany = function() {
    console.log("hmm");
  };

  var businessData = {
    "AccountingSupplierParty": {
        "Party": {
            "PartyName": [{
                "Name": {
                    "value": "Innocent Supplier"
                }
            }],
            "PostalAddress": {
                "StreetName": {
                    "value": "Søper Street"
                },
                "AdditionalStreetName": {
                    "value": ""
                },
                "BuildingNumber": {
                    "value": "5"
                },
                "MarkAttention": {
                    "value": ""
                },
                "CityName": {
                    "value": "København"
                },
                "PostalZone": {
                    "value": "1337"
                },
                "CountrySubentity": {
                    "value": ""
                },
                "Country": {
                    "IdentificationCode": {
                        "value": "DK"
                    }
                }
            }
        }
    },
    "AccountingCustomerParty": {
        "Party": {
            "PartyName": [{
                "Name": {
                    "value": "Blue Beard Pirates"
                }
            }],
            "PostalAddress": {
                "AddressFormatCode": {
                    "value": "StructuredDK",
                    "listID": "urn:oioubl:codelist:addressformatcode-1.1",
                    "listAgencyID": "320"
                },
                "StreetName": {
                    "value": ""
                },
                "AdditionalStreetName": {
                    "value": ""
                },
                "BuildingNumber": {
                    "value": ""
                },
                "MarkAttention": {
                    "value": ""
                },
                "CityName": {
                    "value": ""
                },
                "PostalZone": {
                    "value": ""
                },
                "CountrySubentity": {
                    "value": ""
                },
                "Country": {
                    "IdentificationCode": {
                        "value": "DK"
                    }
                }
            }
        }
    },
    "InvoiceLine": [{
        "ID": {
            "value": "1"
        },
        "InvoicedQuantity": {
            "value": 50,
            "unitCode": "EA"
        },
        "LineExtensionAmount": {
            "value": 5000,
            "currencyID": "DKK"
        },
        "TaxTotal": [{
            "TaxAmount": {
                "value": 1250,
                "currencyID": "DKK"
            },
            "TaxSubtotal": [{
                "TaxableAmount": {
                    "value": 5000,
                    "currencyID": "DKK"
                },
                "TaxAmount": {
                    "value": 1250,
                    "currencyID": "DKK"
                },
                "TaxCategory": {
                    "ID": {
                        "value": "StandardRated",
                        "schemeID": "urn:oioubl:id:taxcategoryid-1.1",
                        "schemeAgencyID": "320"
                    },
                    "Percent": {
                        "value": 25
                    },
                    "TaxScheme": {
                        "ID": {
                            "value": "63",
                            "schemeID": "urn:oioubl:id:taxschemeid-1.1",
                            "schemeAgencyID": "320"
                        },
                        "Name": {
                            "value": "Moms"
                        }
                    }
                }
            }]
        }],
        "Item": {
            "Description": [{
                "value": "Pirate Soup"
            }],
            "Name": {
                "value": "Pirate Soup"
            },
            "SellersItemIdentification": {
                "ID": {
                    "value": "1",
                    "schemeID": "GTIN",
                    "schemeAgencyID": "9"
                }
            }
        },
        "Price": {
            "PriceAmount": {
                "value": 100,
                "currencyID": "DKK"
            },
            "BaseQuantity": {
                "value": 1,
                "unitCode": "EA"
            },
            "OrderableUnitFactorRate": {
                "value": 1
            }
        }
    }]
};
  documentService.update(businessData, function(uuid) {
    console.log(uuid);
  });

}]);