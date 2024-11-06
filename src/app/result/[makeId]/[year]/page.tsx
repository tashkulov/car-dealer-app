"use client";

import { useEffect, useState } from "react";
import { use } from 'react';

type TParamsDate = {
    year: string;
    makeId: string;
};

type TParams = {
    params: TParamsDate
};

type TModel = {
    Model_ID: string;
    Model_Name: string;
};

const Page = ({ params }: TParams) => {
    // @ts-ignore
    const { makeId, year }: TParamsDate = use(params);

    const [models, setModels] = useState<TModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchVehicleModels() {
            try {
                const res = await fetch(
                    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
                );
                const data = await res.json();
                setModels(data.Results);
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Failed to fetch vehicle models');
            } finally {
                setLoading(false);
            }
        }
        fetchVehicleModels();
    }, [makeId, year]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Модели для Make ID: {makeId}, Год: {year}</h1>
            <ul>
                {models.map((model) => (
                    <li key={model.Model_ID} className="border p-2 mb-2">
                        {model.Model_Name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Page;