"use client"

import { useState, useEffect } from 'react';
import {getVehicleMakes} from "../shared/api/vehicleApi.js";
import Link from 'next/link.js';

type TModel = {
    MakeId: string;
    MakeName: string;
};

function FilterPage() {
  const [vehicleMakes, setVehicleMakes] = useState<TModel[]>([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i);

  useEffect(() => {
    async function fetchVehicleMakes() {
      const data = await getVehicleMakes();
      setVehicleMakes(data);
    }
    fetchVehicleMakes();
  }, []);


  return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Car Dealer Filter</h1>
        <div className="flex space-x-4">
          <select
              className="border p-2 text-black"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select Vehicle Make</option>
            {vehicleMakes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
            ))}
          </select>
          <select
              className="border p-2 text-black"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
            ))}
          </select>
        </div>
        <Link
            href={`/result/${selectedMake}/${selectedYear}`}
            className={`block mt-4 p-2 text-center bg-blue-500 text-white rounded ${!selectedMake || !selectedYear ? 'opacity-50' : ''}`}
            style={{ pointerEvents: !selectedMake || !selectedYear ? 'none' : 'auto' }}
        >
          Next
        </Link>
      </div>
  );
}

export default FilterPage;
