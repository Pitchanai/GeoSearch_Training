# GeoSearch
Our [GeoSearch](https://geosearch.cdg.co.th) API helps turn your addresses in Thailand into geographic coordinates.
  
## Installation
You must run webpage on a webserver (nginx, apache or Brackets live preview).
Then change `apiKey` to your access token from [GeoSearch](https://geosearch.cdg.co.th) account page.  
```
const apiKey = "YOUR-ACCESS-TOKEN"
```  
Make sure you set website referrer correctly.

## GeoSearch Widget
You have to change `YOUR-ACCESS-TOKEN` to your access token in all html file.
```
<script src="https://geosearch.cdg.co.th/g/sdk/1.0.3?key=YOUR-ACCESS-TOKEN"></script>
```  
