// pages/result/[makeId]/[year].tsx
import { Suspense } from 'react';
import { fetchVehicleModels } from '@/api/vehicles';
import { fetchVehicleMakes } from '@/api/vehicles'; // функция для получения всех доступных makeId
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ResultPageProps {
    params: {
        makeId: string;
        year: string;
    };
}

export async function generateStaticParams() {
    const makes = await fetchVehicleMakes();
    const years = Array.from({ length: new Date().getFullYear() - 2015 + 1 }, (_, i) => 2015 + i);

    const paths = makes.Results.flatMap((make) =>
        years.map((year) => ({
            makeId: make.MakeId.toString(),
            year: year.toString(),
        }))
    );

    return paths;
}

async function VehicleResults({ makeId, year }: { makeId: string; year: string }) {
    try {
        const models = await fetchVehicleModels(parseInt(makeId), parseInt(year));
        if (!models.Results.length) {
            return <div className="text-gray-600">No models found for this make and year.</div>;
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {models.Results.map((model) => (
                    <div
                        key={model.Model_ID}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                        <h3 className="font-semibold text-lg">{model.Model_Name}</h3>
                        <p className="text-gray-600">{model.Make_Name}</p>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error("Failed to fetch vehicle models:", error);
        return <div className="text-red-500">Failed to load vehicle models. Please try again.</div>;
    }
}

export default function ResultPage({ params }: ResultPageProps) {
    return (
        <main className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Vehicle Models</h1>
                    <Link href="/">
                        <Button variant="outline">Back to Search</Button>
                    </Link>
                </div>

                <Suspense fallback={<div>Loading vehicle models...</div>}>
                    <VehicleResults makeId={params.makeId} year={params.year} />
                </Suspense>
            </div>
        </main>
    );
}
