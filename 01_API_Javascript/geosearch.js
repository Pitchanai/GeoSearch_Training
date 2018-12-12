const apiKey = "8e2c08edfe420b05209980ff3fbc0aaeea2ab9e89b68109126c66780d4db7b136dd07fd0ac2cd5fd"
const autocompleteUrl = "https://geosearch.cdg.co.th/g/search/autocomplete"
const locationDetailUrl = "https://geosearch.cdg.co.th/g/search/details"
const batchUrl = "https://geosearch.cdg.co.th/g/search/batch"

function autocomplete() {
  $.post(autocompleteUrl,
    {
      keyword: $('#search-address').val(),
      key: apiKey,
      maxResult: 5
    }, result => {
      console.log(result)
      var display = ""
      for (let adr of result.data) {
        display += `<p><b>${adr.FormattedAddress}</b><br>${adr.LocationID}</p>`
      }
      $('#search-address-result').html(display)
    }, "json")
}

function locationDetail() {
  $.post(locationDetailUrl,
    {
      locationid: $('#locationId').val(),
      key: apiKey
    }, result => {
      console.log(result)
      var display = "<p>"
      if (result.success) {
        for (let key in result.data) {
          if (result.data.hasOwnProperty(key)) {
            display += `<b>${key} : </b>${result.data[key] == null ? "" : result.data[key]}<br>`
          }
        }
        display += "</p>"
        $('#search-address-result').html(display)
      }
    }, "json")
}

function batchAddress() {
  let addressInput = []
  for (var i = 0; i < 5; i++) {
    const addr = $('#address'+(i+1)).val()
    if (addr != "") {
      addressInput.push({
        input: addr
      })
    }
  }
  console.log(addressInput)
  
  $.post(batchUrl,
    {
      data: addressInput,
      key: apiKey
    }, result => {
      console.log(result)
    display = ""
    if (result.success) {
      for (let res of result.data) {
        display += `<p><b>Input : ${res.input}</b><br>Grade : ${res.result.grade}<br>Match Address : ${res.result.match[0].FormattedAddress}<br>Latitude-Longitude : ${res.result.match[0].LAT_LON}</p>`
      }
    }
    $('#search-address-result').html(display)
  }, "json")
}