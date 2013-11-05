app.service('documentService', function ($http) {
  'use strict';

  this.getUuid = function(json){

  var invoiceIndex = 0;
  var invoiceLines = [];
  _.each(json.invoice, function(line, lineId){
    invoiceIndex++;

    var invoiceLine = {
    "ID": {
            "value": lineId
            },
            "InvoicedQuantity": {
                "value": line.product.quantity
            },
            "LineExtensionAmount": {
                "value": line.product.custom_price,
                "currencyID": line.product.currency
            },
            "TaxTotal": [
                {
                    "TaxAmount": {
                        "value": line.product.custom_price * 0.25
                    },
                    "TaxSubtotal": [
                        {
                            "TaxableAmount": {
                                "value": line.product.custom_price
                            },
                            "TaxAmount": {
                                "value": line.product.custom_price * 0.25
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
                        }
                    ]
                }
            ],
            "Item": {
                "Description": [
                    {
                        "value": line.product.title
                    }
                ],
                "Name": {
                    "value": line.product.title
                },
            },
            "Price": {
                "PriceAmount": {
                    "value": line.product.price,
                    "currencyID": line.product.currency
                },
                "BaseQuantity": {
                    "value": line.product.quantity
                }
            }
        };

        invoiceLines.push(invoiceLine);
  });

var invoiceMeta = {
  "AccountingSupplierParty": {
    "Party": {
      "PartyName": [{
        "Name": {
          "value": json.senderCompany.name
        }
      }],
      "PostalAddress": {
        "StreetName": {
          "value": json.senderCompany.address.street
        },
        "CityName": {
          "value": json.senderCompany.address.city
        },
        "PostalZone": {
          "value": json.senderCompany.address.zip
        },
      },
      "Contact": {
        "Name": {
          "value": json.senderCompany.name
        }
      }
    }
  },
  "AccountingCustomerParty": {
    "Party": {
      "PartyName": [{
        "Name": {
          "value": json.receiverCompany.name
        }
      }],
      "PostalAddress": {
        "StreetName": {
          "value": json.receiverCompany.address.street
        },
        "CityName": {
          "value": json.receiverCompany.address.city
        },
        "PostalZone": {
          "value": json.receiverCompany.address.zip
        },
      },
      "Contact": {
        "Name": {
          "value": json.receiverCompany.name
        }
      }
    }
  },
  "TaxTotal": [
        {
            "TaxAmount": {
                "value": 30.75,
                "currencyID": "DKK"
            },
            "TaxSubtotal": [
                {
                    "TaxableAmount": {
                        "value": 123.00,
                        "currencyID": "DKK"
                    },
                    "TaxAmount": {
                        "value": 30.75,
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
                }
            ]
        }
    ],

  "LegalMonetaryTotal": {
    "LineExtensionAmount": {
      "value": 123.00,
      "currencyID": "DKK"
    },
    "TaxExclusiveAmount": {
      "value": 30.75,
      "currencyID": "DKK"
    },
    "TaxInclusiveAmount": {
      "value": 153.75,
      "currencyID": "DKK"
    },
    "PayableAmount": {
      "value": 153.75,
      "currencyID": "DKK"
    }
  },
  "InvoiceLine": invoiceLines
};

    return $http({
      method: 'PUT',
      url: 'http://10.0.1.141:8081/sendDocument',
      data: invoiceMeta
    });
  };
});
