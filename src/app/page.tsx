import { apiClient } from "../lib/api";
import Map from "./components/Map";

export default async function Home() {
  const initialMarkers = await apiClient.getFoodMarkers();

  return (
    <div style={{ position: "relative" }}>
      <Map initialMarkers={initialMarkers} />
    </div>
  );
}
