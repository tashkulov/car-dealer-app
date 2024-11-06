'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { fetchVehicleMakes } from '@/api/vehicles';
import type { VehicleMake } from '@/types/api';

export default function Home() {
    const [makes, setMakes] = useState<VehicleMake[]>([]);
    const [selectedMake, setSelectedMake] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Generate years from 2015 to current year
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, i) => (currentYear - i).toString()
    );

    useEffect(() => {
        const loadMakes = async () => {
            try {
                const response = await fetchVehicleMakes();
                setMakes(response.Results);
            } catch (error) {
                console.error('Failed to fetch makes:', error);
            } finally {
                setLoading(false);
            }
        };

        loadMakes();
    }, []);

    const isNextDisabled = !selectedMake || !selectedYear;

    return (
        <main className="min-h-screen p-8">
            <div className="max-w-md mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-center">Car Dealer App</h1>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Make</label>
                        <Select
                            disabled={loading}
                            onValueChange={setSelectedMake}
                            value={selectedMake}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a make" />
                            </SelectTrigger>
                            <SelectContent>
                                {makes.map((make) => (
                                    <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                                        {make.MakeName}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Select Year</label>
                        <Select
                            onValueChange={setSelectedYear}
                            value={selectedYear}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a year" />
                            </SelectTrigger>
                            <SelectContent>
                                {years.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Link
                        href={isNextDisabled ? '#' : `/result/${selectedMake}/${selectedYear}`}
                        className="w-full block"
                    >
                        <Button
                            className="w-full"
                            disabled={isNextDisabled}
                        >
                            Next
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}