$("#consultarAPI").click(function () {
    $.ajax({
        url: "https://nhorenstein.com/Coordenada/GetConPunto",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (result) {
            if (result.ok) {
                var latitud = result.return.latitud;
                var longitud = result.return.longitud;
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "La ubicacion proveniente de la API se ha cargado correctamente",
                    showConfirmButton: false,
                    timer: 2500
                });
                mostrarMapa(latitud, longitud);
            }
            else {
                var latitud =  -31.439149307349908;
                var longitud = -64.19523179681565;
                Swal.fire({
                    icon: "error",
                    title: "La ubicacion no se ha cargado",
                    text: result.error,
                })
                mostrarMapa(latitud, longitud);
            }
        },
        error: function (error) {
            var latitud =  -31.439149307349908;
            var longitud = -64.19523179681565;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error, consulte con el dueño del servidor"
            })
            mostrarMapa(latitud, longitud);
        }
    })
});

$("#ubicacionIngresada").click(function () {
    var latitud = $("#inputLatitud").val();
    var longitud = $("#inputLongitud").val();

    if ($("#inputLatitud").val() == "") {
        Swal.fire({
            icon: "warning",
            title: "Ingrese la latitud por favor"
        })
        return false;
    }
    if ($("#inputLongitud").val() == "") {
        Swal.fire({
            icon: "warning",
            title: "Ingrese la longitud por favor"
        })
        return false;
    }
    mostrarMapa(latitud, longitud);
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Ubicacion cargada correctamente",
        showConfirmButton: false,
        timer: 2000
    });
});

function mostrarMapa(latitudd, longitudd) {
    $("#mapContainer").empty();  // CON ESTO EVITAMOS QUE EL MAPA SE CARGUE VARIAS VECES, BORRA Y VUELVE A CARGAR

    //Step 1: initialize communication with the platform
    // Replace variable YOUR_API_KEY with your own apikey
    var platform = new H.service.Platform({
        apikey: '_HV8dBY3T5xrreVsR2c7XI2zuB_RgPpJZ-9yQC6CUYY'   // INGRESAMOS NUESTRA API KEY
    });
    var defaultLayers = platform.createDefaultLayers();
    //Step 2: initialize a map - this map is centered over Europe
    var map = new H.Map(document.getElementById("mapContainer"),
        defaultLayers.vector.normal.map,
        {
            center: { lat: 50, lng: 5 },
            zoom: 4,
            pixelRatio: window.devicePixelRatio || 1
        }
    );
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());
    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    // Marker code goes here
    var LocationOfMarker = { lat: latitudd, lng: longitudd };

    // optionally - resize a larger PNG image to a specific size
    var pngIcon = new H.map.Icon("https://cdn2.iconfinder.com/data/icons/social-18/512/YouTube-2-256.png", { size: { w: 30, h: 30 } });

    // Create a marker using the previously instantiated icon:
    var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });

    // Add the marker to the map:
    map.addObject(marker);

    // Optionally, 
    //Show the marker in the center of the map
    map.setCenter(LocationOfMarker)

    //Zooming so that the marker can be clearly visible
    map.setZoom(8)
}