export async function getVehicleMakes() {
    try {
        const response = await fetch(
            'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        const data = await response.json();
        return data.Results;
    } catch (error) {
        console.error('Failed to fetch vehicle makes', error);
        return [];
    }
}
