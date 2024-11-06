import {APIResponse, VehicleMake, VehicleModel} from "@/types/api";

export const fetchVehicleMakes = async (): Promise<APIResponse<VehicleMake>> => {
    const response = await fetch(
        'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
    );

    if (!response.ok) {
        throw new Error('Failed to fetch vehicle makes');
    }

    return response.json();
};

export const fetchVehicleModels = async (makeId: number, year: number): Promise<APIResponse<VehicleModel>> => {
    const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch vehicle models');
    }

    return response.json();
};