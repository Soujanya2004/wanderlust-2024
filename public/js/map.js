mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12",
  center: list.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 10, // starting zoom
});



// Create a popup, but don't add it to the map yet
const popup = new mapboxgl.Popup({ offset: 25, closeButton: false, closeOnClick: false}).setMaxWidth("300px").setHTML(
  
  `<strong>${list.location}, ${list.country}</strong><p>Exact location provided after booking!</p>`
);




// Create a marker and add it to the map
const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(list.geometry.coordinates)
  .addTo(map);




// Add event listeners to the marker to show and hide the popup
marker.getElement().addEventListener("mouseenter", () => {
  map.getCanvas().style.cursor = "pointer";
  marker.setPopup(popup).togglePopup(); // Show the popup on hover
});



marker.getElement().addEventListener("mouseleave", () => {
  map.getCanvas().style.cursor = "";
  marker.togglePopup(); // Hide the popup when not hovering
});
