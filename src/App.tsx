import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import DrugSearch from './components/DrugSearch';
import DrugInfo from './components/DrugInfo';
import { DrugInfo as DrugInfoType } from './types/DrugInfo';

function App() {
  const [selectedDrug, setSelectedDrug] = useState<DrugInfoType | null>(null);

  return (
    <div className="app">
      <div className="warning">
        <div className="grid">
          <AlertTriangle size={24} />
          <p><strong>Harm Reduction Notice:</strong> This information is provided for educational purposes only. Always consult with a healthcare professional before using any substance. Substance use carries inherent risks, and this resource aims to promote safer practices, not to encourage use.</p>
        </div>
      </div>
      
      {!selectedDrug ? (
        <div>
          <div className="header">
            <h1>THEDRUG.WIKI</h1>
            <DrugSearch onDrugSelect={setSelectedDrug} />
          </div>
        </div>
      ) : (
        <>
          <button
            onClick={() => setSelectedDrug(null)}
            className="back-button"
          >
            Back to Search
          </button>
          <DrugInfo drug={selectedDrug} />
        </>
      )}
    </div>
  );
}

export default App;