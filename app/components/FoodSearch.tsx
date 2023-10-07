'use client'

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface FoodItem {
    foodName: string;
    foodCals: number;
}

const fetchFoodData = async (query: string, setResults: Dispatch<SetStateAction<FoodItem[]>>): Promise<FoodItem[]> => {
    try {
        const response = await fetch('/api/searchFoodItem', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        console.log(result);
        setResults(result);
        return result;
    } catch (error) {
       console.error('Error fetching data:', error);
       return [];
    }
};

const FoodSearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchFoodData(query, setResults);
      setResults(data);
    };

    fetchData();
  }, [query]);

  const handleSearch = () => {
    setQuery(query);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Food Search Engine</h1>

      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Search for food..."
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{item.foodName}</h2>
            <p>Kcal per 100g: {item.foodCals}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;
