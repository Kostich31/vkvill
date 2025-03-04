"use client";
import { Button } from "../../../components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../components/ui/collapsible";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react"

import { useState } from 'react';
import { GetFilteredMarkersParams } from "@/src/lib/data-contracts";

type FilterFields = keyof GetFilteredMarkersParams["filters"];

interface FilterPanelProps {
    onFilter: (filters: GetFilteredMarkersParams["filters"]) => void;
    onReset: () => void;
}

const defaultFiltersState = {
    isNetObject: "", "operatingCompany": "", "typeObject": ""
}

const FilterPanel = ({
    onFilter,
    onReset,
}: FilterPanelProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<Record<FilterFields, string>>(defaultFiltersState);

    const handleApply = () => {
        onFilter({ ...filters, isNetObject: filters.isNetObject ? filters.isNetObject === "true" : undefined });
    };

    const handleFilterChange = (value: string, field: FilterFields) => {
        setFilters(prev => ({ ...prev, [field]: value }))
    }

    const handleReset = () => {
        setFilters(defaultFiltersState);
        onReset();
    };

    return (
        <div className="fixed right-0 top-0 bg-white shadow-lg transition-transform duration-300" style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)', zIndex: 9999 }}>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute -left-8 p-2 rounded-l-full bg-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Сетевая/Несетевая</label>
                        <Select value={filters.isNetObject} onValueChange={(value) => handleFilterChange(value, "isNetObject")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Выберите" />
                            </SelectTrigger>
                            <SelectContent style={{ zIndex: 10000 }}>
                                <SelectItem value="true">Сетевая</SelectItem>
                                <SelectItem value="false">Несетевая</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Название компании</label>
                        <Input
                            type="text"
                            placeholder="Введите название компании"
                            value={filters.operatingCompany}
                            onChange={(e) => handleFilterChange(e.target.value, "operatingCompany")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Тип объекта</label>
                        <Input
                            type="text"
                            placeholder="Введите тип объекта"
                            value={filters.typeObject}
                            onChange={(e) => handleFilterChange(e.target.value, "typeObject")}
                        />
                    </div>

                    <Button onClick={handleApply} className="w-full">
                        Применить фильтр
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="w-full">
                        Сбросить
                    </Button>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};

export default FilterPanel
