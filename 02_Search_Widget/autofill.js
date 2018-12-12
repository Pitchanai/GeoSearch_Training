let searchWG = new GISC.SearchWidget(document.getElementById('search'), { showFull: true, minChar: 3 })

searchWG.setOnClickItemCallback(clickedItem => {
  console.log('clickedItem', clickedItem)
  document.getElementById('addr01').value = clickedItem.HouseNumber ? clickedItem.HouseNumber : ''
  document.getElementById('addr02').value = clickedItem.PremiseName ? clickedItem.PremiseName : ''
  document.getElementById('addr03').value = clickedItem.SubStreetName ? clickedItem.SubStreetName : ''
  document.getElementById('addr04').value = clickedItem.StreetName ? clickedItem.StreetName : ''
  document.getElementById('addr05').value = clickedItem.SubDistrict ? clickedItem.SubDistrict : ''
  document.getElementById('addr06').value = clickedItem.District ? clickedItem.District : ''
  document.getElementById('addr07').value = clickedItem.Province ? clickedItem.Province : ''
  document.getElementById('addr08').value = clickedItem.PostalCode ? clickedItem.PostalCode : ''

  document.getElementById('res').innerHTML = `<b>ชื่อสถานที่:</b> ${clickedItem.PremiseName}<br><b>ที่อยู่:</b> ${clickedItem.FormattedAddress}<br><b> พิกัด Latitude, Longitude:</b> ${clickedItem.LAT_LON}`
})