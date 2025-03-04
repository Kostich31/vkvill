"use client";

import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { Feature, Geometry } from 'geojson';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useCallback, useMemo, } from "react";
import MarkerClusterGroup from 'react-leaflet-cluster';
import './index.css'
import L from 'leaflet';
import MarkerPopup from "./MarkerPopup";
import FilterPanel from "./FilterPanel/FilterPanel";
import { FoodMarker, GetMarkersResponse } from "@/src/lib/data-contracts";
import { renderToString } from 'react-dom/server';
import { createClusterCustomIcon, singleMarkerIcon } from "./icons/icons";
import { useFoodMarkersFilter } from "./FilterPanel/useFoodMarkersFilter";

const pointToLayer = (_: any, latlng: L.LatLngExpression) => {
    return L.marker(latlng, { icon: singleMarkerIcon });
};

const DEFAULT_CENTER: [number, number] = [55.7522, 37.6156];
const DEFAULT_ZOOM = 12;
const DEFAULT_MAX_ZOOM = 18;

const Map = ({ initialMarkers }: { initialMarkers: GetMarkersResponse }) => {
    const {
        filteredIds,
        handleFilter,
        resetFilters,
    } = useFoodMarkersFilter();

    const handleFeature = useCallback((feature: Feature<Geometry, FoodMarker>, layer: L.Layer) => {
        layer.bindPopup(renderToString(<MarkerPopup feature={feature} />));
    }, []);

    const geoJSONData = useMemo(() => {
        return filteredIds
            ? {
                ...initialMarkers,
                features: initialMarkers.features.filter(feature =>
                    filteredIds.has(feature.properties.attributes.ID))
            } : initialMarkers;
    }, [filteredIds, initialMarkers]);

    const markersKey = useMemo(() => {
        return String(filteredIds?.size) + String(initialMarkers.features.length)
    }, [filteredIds, initialMarkers.features.length])

    return (
        <>
            <FilterPanel
                onFilter={handleFilter}
                onReset={resetFilters}
            />
            <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} maxZoom={DEFAULT_MAX_ZOOM} style={{ height: '100vh', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createClusterCustomIcon}
                >
                    <GeoJSON key={markersKey} data={geoJSONData} onEachFeature={handleFeature}
                        pointToLayer={pointToLayer}
                    />
                </MarkerClusterGroup>
            </MapContainer>
        </>
    );
};

export default Map;
