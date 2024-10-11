import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { DrugInfo } from '../types/DrugInfo';

interface DrugSearchProps {
  onDrugSelect: (drug: DrugInfo) => void;
}

const DrugSearch: React.FC<DrugSearchProps> = ({ onDrugSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DrugInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDrugs = async () => {
      if (searchTerm.length < 2) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`https://www.drug-do.se/dedgrl?drug_name_like=${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: DrugInfo[] = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching drug data:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchDrugs();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleDrugSelect = async (drugName: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.drug-do.se/dedgrl?drug_name=${encodeURIComponent(drugName)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: DrugInfo[] = await response.json();
      if (data.length > 0) {
        onDrugSelect(data[0]); // Select the first item from the array
      } else {
        throw new Error('No drug information found');
      }
    } catch (error) {
      console.error('Error fetching drug details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <Search size={24} className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a substance..."
          className="search-input"
        />
      </div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((drug) => (
            <li
              key={drug.drug_name}
              onClick={() => handleDrugSelect(drug.drug_name)}
            >
              <strong>{drug.drug_name}</strong> ({drug.chemical_class})
            </li>
          ))}
        </ul>
      )}
      {!isLoading && searchTerm.length >= 2 && searchResults.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default DrugSearch;