const apiKey = "YOUR-ACCESS-TOKEN"
const autocompleteUrl = "https://geosearch.cdg.co.th/g/search/autocomplete"
const locationDetailUrl = "https://geosearch.cdg.co.th/g/search/details"
const locationDetailWithLanguageUrl = "https://geosearch.cdg.co.th/g/search/detailsLanguage"
const batchUrl = "https://geosearch.cdg.co.th/g/search/batch"

let feedbackType = []
const feedbackGetTypeListUrl = "https://geosearch.cdg.co.th/g/feedback/getTypeList"
const feedbackCreateUrl = "https://geosearch.cdg.co.th/g/feedback/create"

// GeoSearch API

function autocomplete() {
  $.post(autocompleteUrl,
    {
      keyword: $('#search-address').val(),
      key: apiKey,
      maxResult: 5
    }, result => {
      console.log(result)
      autoCompleteResult = result
      var display = ""
      for (let adr of result.data) {
        display += `<p style="cursor: pointer;" onclick="selectLocationId('${adr.LocationID}')"><b>${adr.FormattedAddress}</b><br>${adr.LocationID}</p>`
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
        locationResult = result.data
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

function locationDetailWithLanguage(language) {
  $.post(locationDetailWithLanguageUrl,
    {
      locationid: $('#locationId').val(),
      key: apiKey,
      language: language
    }, result => {
      console.log(result)
      var display = "<p>"
      if (result.success) {
        locationResult = result.data
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

// Feedback API

const allFields = ["key", "FeedbackTypeID", "FID", "BusinessName", "PremiseName", "HouseNumber", "Moo", 
                  "Room", "Floor", "SubStreetName", "StreetName", "SubDistrict", "District",
                  "Province", "PostalCode", "X", "Y", "OtherInfo"]
const addFields = ["key", "FeedbackTypeID", "BusinessName", "PremiseName", "HouseNumber", "Moo", 
                  "Room", "Floor", "SubStreetName", "StreetName", "SubDistrict", "District",
                  "Province", "PostalCode", "X", "Y"]
const informFields = ["key", "FeedbackTypeID", "FID"]
const editFields = ["key", "FeedbackTypeID", "FID", "BusinessName", "PremiseName", "HouseNumber", "Moo", 
                  "Room", "Floor", "SubStreetName", "StreetName", "SubDistrict", "District",
                  "Province", "PostalCode", "X", "Y"]
const otherFields = ["key", "FeedbackTypeID", "OtherInfo"]

function getTypeList() {
  if (feedbackType.length) {
    $('#feedbacktype-result').removeClass("hide")
    return
  }
  $('#get-typelist-button').html('Show')
  $.post(feedbackGetTypeListUrl,
    {
    
    }, result => {
      console.log(result)
    display = ""
    if (result.success) {
      feedbackType = result.data
      for (let res of result.data) {
        display += `<p onclick="copyClipboard('${res.FeedbackTypeID}')">
                      <b>Type : <a class="${getClassFromType(res.Type)}">${res.Type}</b></a>
                      <br>Description : <b>${res.Description}</b>
                      <br>FeedbackTypeID : <b style="cursor: pointer;">${res.FeedbackTypeID}</b>
                    </p>`
      }
    }
    $('#typelist-group').removeClass("hide")
    $('#feedbacktype-result').removeClass("hide")
    $('#feedbacktype-result').html(display)
  }, "json")
}

function createFeedback() {
  let feedbackTypeId = $('#input-FeedbackTypeID').val()
  if (!feedbackTypeId) {
    alert("No FeedbackTypeID")
    return
  }
  
  let selectedFeedbackType = feedbackType.find(x => x.FeedbackTypeID == feedbackTypeId)
  if (!selectedFeedbackType) {
    alert("FeedbackType not found.")
  }
  
  let data = {}
  switch (selectedFeedbackType.Type) {
    case 'add':
      for (let field of addFields) {
        if (!$(`#input-${field}`).val()) continue
        data[field] = $(`#input-${field}`).val()
      }
    case 'inform':
      for (let field of informFields) {
        if (!$(`#input-${field}`).val()) continue
        data[field] = $(`#input-${field}`).val()
      }
    case 'other':
      for (let field of otherFields) {
        if (!$(`#input-${field}`).val()) continue
        data[field] = $(`#input-${field}`).val()
      }
    case 'edit':
      for (let field of editFields) {
        if (!$(`#input-${field}`).val()) continue
        data[field] = $(`#input-${field}`).val()
      }
  }
  
  $.post(feedbackCreateUrl, data, result => {
    console.log(result)
    alert(result.success ? "success" : "failed")
  })
}

// Functions

function selectLocationId(locationId) {
  $('#locationId').val(locationId)
}

function copyClipboard(text) {
  var textArea = document.createElement("textarea")
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    var successful = document.execCommand('copy')
    success = successful ? true : false
  } catch (err) {
    console.error(`Can't copy`, err)
  }

  if (success) {

  } else {

  }

  document.body.removeChild(textArea)
}

// Feedback Functions
function getClassFromType(type) {
  switch (type) {
    case "add":
      return "text-primary"
    case "inform":
      return "text-success"
    case "other":
      return "text-warning"
    case "edit":
      return "text-info"
    default:
      return "text-danger"
  }
}

function hideTypeList() {
  $('#feedbacktype-result').removeClass("hide").addClass("hide")
}

function showInput(type) {
  switch (type) {
    case 'Add':
      hideTypeList()
      $(`#input-FeedbackTypeID`).val(feedbackType.find(x => x.Type == 'add').FeedbackTypeID)
      $(`#input-FeedbackTypeID`).prop('readonly', true)
      for (let field of allFields) {
        if (addFields.some(x => x == field)) {
          $(`#container-${field}`).removeClass('hide')
        } else {
          $(`#container-${field}`).addClass('hide')
        }
      }
      break
    case 'Inform':
      getTypeList()
      $(`#input-FeedbackTypeID`).val('')
      $(`#input-FeedbackTypeID`).prop('readonly', false)
      for (let field of allFields) {
        if (informFields.some(x => x == field)) {
          $(`#container-${field}`).removeClass('hide')
        } else {
          $(`#container-${field}`).addClass('hide')
        }
      }
      break
    case 'Edit':
      hideTypeList()
      $(`#input-FeedbackTypeID`).val(feedbackType.find(x => x.Type == 'edit').FeedbackTypeID)
      $(`#input-FeedbackTypeID`).prop('readonly', true)
      for (let field of allFields) {
        if (editFields.some(x => x == field)) {
          $(`#container-${field}`).removeClass('hide')
        } else {
          $(`#container-${field}`).addClass('hide')
        }
      }
      break
    case 'Other':
      hideTypeList()
      $(`#input-FeedbackTypeID`).val(feedbackType.find(x => x.Type == 'other').FeedbackTypeID)
      $(`#input-FeedbackTypeID`).prop('readonly', true)
      for (let field of allFields) {
        if (otherFields.some(x => x == field)) {
          $(`#container-${field}`).removeClass('hide')
        } else {
          $(`#container-${field}`).addClass('hide')
        }
      }
      break
  }
}