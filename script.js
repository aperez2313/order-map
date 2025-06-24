// Initialize map
const map = L.map('map').setView([25.7617, -80.1918], 10); // Miami center

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to get color by channel
function getColor(channel) {
  switch (channel) {
    case "Uber": return "red";
    case "Doordash": return "blue";
    case "Sedanos": return "green";
    default: return "gray";
  }
}

// Load and parse CSV
Papa.parse('data.csv', {
  download: true,
  header: true,
  complete: function(results) {
    results.data.forEach(row => {
      if (!row.Zip || !row.Order) return;

      // Use a basic ZIP centroid lookup using a free API or placeholder
      // For now, we use a fake lat/lng offset from Miami for demo purposes
      let zipOffset = parseInt(row.Zip) % 100 / 10;
      let lat = 25.7617 + zipOffset * 0.1;
      let lng = -80.1918 + zipOffset * 0.1;

      const marker = L.circleMarker([lat, lng], {
        radius: 8,
        fillColor: getColor(row.Channel),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(
        `<b>ZIP:</b> ${row.Zip}<br>
         <b>Orders:</b> ${row.Order}<br>
         <b>Store:</b> ${row.Store}<br>
         <b>Channel:</b> ${row.Channel}`
      );
    });
  }
});
