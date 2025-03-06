import { apiClient } from "../lib/api";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default async function Home() {
  const initialMarkers = await apiClient.getFoodMarkers();

  return (
    <div style={{ position: "relative" }}>
      <Map initialMarkers={initialMarkers} />
    </div>
  );
}
