import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function MapAssociations({
  center,
  zoom,
  data,
  onClickOnMarker,
}) {
  const mapId = "437dae7bd1a133fd";

  const mapOptions = {
    mapId: mapId,
    mapTypeControl: false,
    zoomControl: false,
    fullscreenControl: false,
    fullscreenControl: false,
    streetViewControl: false,
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerClassName="map-container"
        options={mapOptions}
      >
        <div className="marker-associations">
          {data.map((association) => {
            return (
              <MarkerF
                onClick={() => onClickOnMarker()}
                key={association.id}
                position={{
                  lat: association.latitude,
                  lng: association.longitude,
                }}
              />
            );
          })}
        </div>
      </GoogleMap>
    </>
  );
}
