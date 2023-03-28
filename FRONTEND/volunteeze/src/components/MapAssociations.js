import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

export default function MapAssociations({ center, zoom, data, location }) {
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
      >
        <div className="marker-associations">
          {data.map((association) => {
            return (
              <MarkerF
                position={{ lat: association.latitude, lng: association.longitude }}
              />
            );
          })}
        </div>
        <MarkerF position={location} />
      </GoogleMap>
    </>
  );
}
