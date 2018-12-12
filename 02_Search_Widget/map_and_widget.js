let esrimap

require(["esri/map", 
         "esri/geometry/Point", 
         "esri/symbols/PictureMarkerSymbol", 
         "esri/layers/GraphicsLayer", 
         "esri/layers/ArcGISTiledMapServiceLayer", 
         "esri/graphic", 
         "dojo/domReady!"],      
function(Map, Point, PictureMarkerSymbol, GraphicsLayer, ArcGISTiledMapServiceLayer, Graphic) {
  esrimap = new Map("esrimap", {
      center: [100.5416608, 13.7035733],
      zoom: 10,
      basemap: "topo"
  })

  let graphicsLayer = new GraphicsLayer()
  var searchWG1 = new GISC.SearchWidget(document.getElementById('search1'), { showFull: true, minChar: 3 })
  
  searchWG1.setOnClickItemCallback(clickedItem => {
    var lat = parseFloat(clickedItem.LAT_LON.split(", ")[0])
    var long = parseFloat(clickedItem.LAT_LON.split(", ")[1])
    var pt = new Point(long, lat)
    esrimap.centerAndZoom(pt, 17)

    var pictureMarkerSymbol = new PictureMarkerSymbol('map-marker.png', 50, 50)
    var graphic = new Graphic(pt, pictureMarkerSymbol,'','')
    graphicsLayer.clear()
    graphicsLayer.add(graphic)
  })
})