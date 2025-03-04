import type { FeatureCollection } from 'geojson';

type IsNetType = "да" | "нет";

export type Cells = {
    ID: string;
    Name: string;
    global_id: number;
    IsNetObject: IsNetType;
    OperatingCompany: string;
    TypeObject: string;
    AdmArea: string;
    District: string;
    Address: string;
    SeatsCount: number;
    SocialPrivileges: string;
}

export type FoodMarkerFiltered = {
    global_id: number;
    Number: number;
    Cells: Cells;
};

export type Attributes = {
    is_deleted: number;
    ID: string;
    Name: string;
    global_id: number;
    IsNetObject: IsNetType;
    OperatingCompany: string;
    TypeObject: string;
    AdmArea: string;
    District: string;
    Address: string;
    SeatsCount: number;
    SocialPrivileges: string;
    Longitude_WGS84: string;
    Latitude_WGS84: string;
};

export type FoodMarker = {
    datasetId: number;
    attributes: Attributes;
    rowId: null | number;
    releaseNumber: number;
    versionNumber: number;
}

export type GetFilteredMarkersParams = { filters: { isNetObject?: boolean, operatingCompany?: string, typeObject?: string } };
export type GetFilteredMarkersResponse = FoodMarkerFiltered[];


export type GetMarkersResponse = FeatureCollection<null, FoodMarker>;
