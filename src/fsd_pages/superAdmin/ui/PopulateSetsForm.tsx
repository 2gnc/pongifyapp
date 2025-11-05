'use client';

import { useState } from 'react';
import { populateSetsAction } from '@/entities/set/api/populate-sets.action';

export function PopulateSetsForm() {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{success: boolean, message: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRunning(true);
    setResult(null);

    try {
      const response = await populateSetsAction();
      setResult(response);
    } catch (error) {
      setResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-600">MTG Sets Population</h2>
      <p className="text-gray-600 mb-4">
        This action will fetch all Magic: The Gathering sets from the Scryfall API and populate the database.
        Existing sets will be skipped.
      </p>
      
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={isRunning}
          className={`px-6 py-3 rounded-md text-white font-medium ${
            isRunning 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
          }`}
        >
          {isRunning ? 'Populating...' : 'Populate Sets'}
        </button>
      </form>
      
      {result && (
        <div className={`mt-4 p-3 rounded-md ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <p className="font-medium">{result.message}</p>
        </div>
      )}
    </div>
  );
}
