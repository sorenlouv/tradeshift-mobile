app.service('documentService', function ($http) {
  'use strict';

  this.getUuid = function(json){

{
  "invoice": {
    "-J7aT6WWR2t98sz1hqIL": {
      "description": "",
      "product": {
        "currency": "DKK",
        "custom_price": "433",
        "price": "433",
        "quantity": 4,
        "tax": "23",
        "title": "Sko"
      },
      "user": "641870264"
    }
  },
  "senderCompany": {
    "address": {
      "city": "København S",
      "country": "Denmark",
      "street": "Parosvej 7",
      "zip": 2300
    },
    "name": "Konscript",
    "products": {
      "-J7aM-GjoHGjxBySWSh1": {
        "currency": "DKK",
        "price": "433",
        "tax": "23",
        "title": "Sko"
      }
    }
  },
  "receiverCompany": {
    "address": {
      "city": "Copenhagen",
      "country": "Denmark",
      "street": "Rådhusstræde 4C",
      "zip": 1466
    },
    "name": "YayArt",
    "products": {
      "-J7aNfEoNXv_0i_dycXU": {
        "currency": "USD",
        "price": "1000",
        "tax": "25",
        "title": "Design"
      }
    }
  }
}


  var invoiceIndex = 0;
  _.each(json.invoice, function(line, lineId){
    invoiceIndex++;

    line.product.currency


    line.product.tax


    var invoiceLine = {
      "ID": {
        "value": invoiceIndex
      },
      "InvoicedQuantity": {
        "value": line.product.quantity
      },
      "LineExtensionAmount": {
        "value": line.product.custom_price,
        "currencyID": "DKK"
      },
      "TaxTotal": [{
        "TaxAmount": {
          "value": 0,
          "currencyID": "DKK"
        },
        "TaxSubtotal": [{
          "TaxableAmount": {
            "value": line.product.custom_price,
            "currencyID": "DKK"
          },
          "TaxAmount": {
            "value": 0,
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
          "value": line.product.title
        }],
        "Name": {
          "value": line.product.title
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
    };
  });



var invoiceMeta = {
  "AccountingSupplierParty": {
    "Party": {
      "PartyName": [{
        "Name": {
          "value": senderCompany.name
        }
      }],
      "PostalAddress": {
        "StreetName": {
          "value": senderCompany.address.street
        },
        "CityName": {
          "value": senderCompany.address.city
        },
        "PostalZone": {
          "value": senderCompany.address.zip
        },
      },
      "Contact": {
        "Name": {
          "value": senderCompany.name
        }
      }
    }
  },
  "AccountingCustomerParty": {
    "Party": {
      "PartyName": [{
        "Name": {
          "value": receiverCompany.name
        }
      }],
      "PostalAddress": {
        "StreetName": {
          "value": receiverCompany.address.street
        },
        "CityName": {
          "value": receiverCompany.address.city
        },
        "PostalZone": {
          "value": receiverCompany.address.zip
        },
      },
      "Contact": {
        "Name": {
          "value": receiverCompany.name
        }
      }
    }
  },
  "LegalMonetaryTotal": {
    "LineExtensionAmount": {
      "value": totalMinusTax,
      "currencyID": "DKK"
    },
    "TaxExclusiveAmount": {
      "value": totalTax,
      "currencyID": "DKK"
    },
    "TaxInclusiveAmount": {
      "value": totalWithTax,
      "currencyID": "DKK"
    },
    "PayableAmount": {
      "value": totalWithTax,
      "currencyID": "DKK"
    }
  };


  "invoice": {
    "-J7aT6WWR2t98sz1hqIL": {
      "description": "",
      "product": {
        "currency": "DKK",
        "custom_price": "433",
        "price": "433",
        "quantity": 4,
        "tax": "23",
        "title": "Sko"
      },
      "user": "641870264"
    }
  },
  "InvoiceLine": invoiceLines
};


    return $http({
      method: 'PUT',
      url: 'http://10.0.1.141:8081/sendDocument',
      data: json
    });
  };
});