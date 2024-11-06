export interface VehicleMake {
    MakeId: number;
    MakeName: string;
}

export interface VehicleModel {
    Make_ID: number;
    Make_Name: string;
    Model_ID: number;
    Model_Name: string;
}

export interface APIResponse<T> {
    Count: number;
    Message: string;
    SearchCriteria: string;
    Results: T[];
}