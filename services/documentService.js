app.service('documentService', function ($http) {
  'use strict';

  this.getUuid = function(json){

  var invoiceIndex = 0;
  var totalPrice = 0;
  var invoiceLines = [];
  _.each(json.invoice, function(line, lineId){
    invoiceIndex++;

    totalPrice += line.product.custom_price * line.product.quantity;

    var invoiceLine = {
    "ID": {
            "value": lineId
            },
            "InvoicedQuantity": {
                "unitCode": "EA",
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
                    "unitCode": "EA",
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
        "ID": {
          "value": "5832d481-2e54-4574-9676-0f51fe6513df",
          "schemeURI": "http://tradeshift.com/api/1.0/userId"
        },
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
      }
    }
  },
  "TaxTotal": [
        {
            "TaxAmount": {
                "value": totalPrice * 0.25,
                "currencyID": "DKK"
            },
            "TaxSubtotal": [
                {
                    "TaxableAmount": {
                        "value": totalPrice,
                        "currencyID": "DKK"
                    },
                    "TaxAmount": {
                        "value": totalPrice * 0.25,
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
      "value": totalPrice,
      "currencyID": "DKK"
    },
    "TaxExclusiveAmount": {
      "value": totalPrice * 0.25,
      "currencyID": "DKK"
    },
    "TaxInclusiveAmount": {
      "value": totalPrice + totalPrice * 0.25,
      "currencyID": "DKK"
    },
    "PayableAmount": {
      "value": totalPrice + totalPrice * 0.25,
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
