import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function MapAssociations({ center, zoom, data }) {

  const mapId = "437dae7bd1a133fd";

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
        options = {{ mapId : mapId }}
      >
        <div className="marker-associations">
          {data.map((association) => {
            return (
              <MarkerF
                key = {association.id} position={{ lat: association.latitude, lng: association.longitude }}
              />
            );
          })}
        </div>
      </GoogleMap>
    </>
  );
}
