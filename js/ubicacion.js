function initMap() {
  const myLatLng = {
    lat: 10.356647,
    lng: -83.920565
  };
  const map = new google.maps.Map(document.getElementById("gmp-map"), {
    zoom: 14,
    center: myLatLng,
    fullscreenControl: false, 
    zoomControl: true, 
    streetViewControl: false
  });
 
  new google.maps.Marker({
    position: myLatLng, 
    map,
    title: "Sazon de Finca SA"
  });
}