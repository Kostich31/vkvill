import { CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import type { Feature, Geometry } from 'geojson';
import { FoodMarker } from "@/src/lib/data-contracts";

const MarkerPopup = ({ feature }: { feature: Feature<Geometry, FoodMarker> }) => {
    return (
        <>
            <CardHeader className="pb-0">
                <CardTitle>{feature.properties.attributes.Name}</CardTitle>
                <CardDescription>{feature.properties.attributes.OperatingCompany}</CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <p className="text-sm text-gray-600">
                    <strong>Тип объекта:</strong> {feature.properties.attributes.TypeObject}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Адрес:</strong> {feature.properties.attributes.Address}
                </p>
                <p className="text-sm text-gray-600">
                    <strong>Посадочные места:</strong> {feature.properties.attributes.SeatsCount}
                </p>
            </CardContent>
        </>
    );
};

export default MarkerPopup;
