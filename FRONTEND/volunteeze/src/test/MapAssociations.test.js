import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'
import MapAssociations from "../components/MapAssociations";

describe("MapAssociations", () => {
  const center = { lat: 37.7749, lng: -122.4194 };
  const zoom = 12;
  const data = [
    { id: 1, latitude: 37.7749, longitude: -122.4194 },
    { id: 2, latitude: 37.7739, longitude: -122.4134 },
  ];

  it("renders without crashing", () => {
    render(<MapAssociations center={center} zoom={zoom} data={data} />);
  });

  it("displays a loading message while loading the Google Maps API", () => {
    const { getByText } = render(
      <MapAssociations center={center} zoom={zoom} data={data} />
    );
    expect(getByText("Loading...")).toBeInTheDocument();
  });
});