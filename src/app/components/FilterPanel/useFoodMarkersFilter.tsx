import { useState, useCallback } from 'react';
import { apiClient } from "@/src/lib/api";
import { GetFilteredMarkersParams } from "@/src/lib/data-contracts";

export const useFoodMarkersFilter = () => {
    const [filteredIds, setFilteredIds] = useState<Set<string> | null>(null);
    const [isFiltering, setIsFiltering] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeFilters, setActiveFilters] = useState<GetFilteredMarkersParams["filters"]>({});

    const handleFilter = useCallback(async (filters: GetFilteredMarkersParams["filters"]) => {
        try {
            setIsFiltering(true);
            setError(null);
            setActiveFilters(filters);

            if (!isFilterActive(filters)) {
                setFilteredIds(null);
                return;
            }

            const filteredMarkers = await apiClient.getFilteredFoodMarkers({ filters });
            setFilteredIds(new Set(filteredMarkers.map(m => m.Cells.ID)));
        } catch (err) {
            console.error('Ошибка во время фильтрации');
        } finally {
            setIsFiltering(false);
        }
    }, []);

    const resetFilters = useCallback(() => {
        setFilteredIds(null);
        setActiveFilters({});
        setError(null);
    }, []);

    return {
        filteredIds,
        activeFilters,
        isFiltering,
        error,
        handleFilter,
        resetFilters,
    };
};

const isFilterActive = (filters: GetFilteredMarkersParams["filters"]) => {
    return (
        filters.isNetObject !== undefined ||
        (filters.operatingCompany && filters.operatingCompany.trim() !== '') ||
        (filters.typeObject && filters.typeObject.trim() !== '')
    );
};
