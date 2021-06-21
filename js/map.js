
let html_map = document.querySelector('#map')
class GoogleMap{
    /** Charge la carte sur un élément HTML */
    load (element){
$script('https://maps.googleapi.com/maps/api/js', function(){   
    let center = {lat: -34.397, lng: 150.644};
    let map = new google.maps.Map(element, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
})
    }
}
if(html_map !== null){
    let map = new GoogleMap()
    map.load(html_map)


}