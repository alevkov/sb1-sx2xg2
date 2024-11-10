import React from 'react';
import { DrugInfo as DrugInfoType } from '../types/DrugInfo';
import { AlertTriangle, Info } from 'lucide-react';
import InfoRating from './InfoRating';
import CompactRating from './CompactInfoRating';

interface DrugInfoProps {
  drug: DrugInfoType;
}

const handleVote = async (sectionId: string, vote: boolean | null) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  console.log(`Vote recorded for section ${sectionId}:`, vote);
  // In real implementation, make API call here
  return true;
};


const DrugInfo: React.FC<DrugInfoProps> = ({ drug }) => {
  if (!drug) {
    return <div>Loading drug information...</div>;
  }

  return (
    <div className="drug-info">
      <h1>{drug.drug_name}</h1>
      <div className="grid">
      <div>
          <h2><strong>Chemical Class:</strong> {drug.chemical_class}</h2>
          <h2><strong>Psychoactive Class:</strong> {drug.psychoactive_class}</h2>
          <h2><strong>Addiction Potential:</strong> {drug.addiction_potential}</h2>
          <h2><strong>Half-life:</strong> {drug.half_life}</h2>
          <InfoRating 
            sectionId="general-info" 
            initialUpvotes={45} 
            initialDownvotes={2}
            onVote={handleVote}
          />
        </div>

        <div>
        <h2>Dosage:</h2>
  {drug.dosages && drug.dosages.routes_of_administration ? (
    drug.dosages.routes_of_administration.map((route, routeIndex) => (
      <div key={routeIndex} className="mb-4">
        <table className="w-full">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>{route.route}</th>
              <th style={{ width: '60%' }}>Amount ({route.units})</th>
              <th style={{ width: '20%', textAlign: 'right', paddingRight: '1ch' }}>Consensus</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(route.dose_ranges).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
                <td style={{ 
  textAlign: 'right', 
  paddingRight: '1ch',
  position: 'relative',
  height: 'var(--line-height)',
  overflow: 'visible' // Important to allow hover elements to show
}}>
  <CompactRating 
    sectionId={`${route.route}-${key}`}
    initialUpvotes={Math.floor(Math.random() * 100)} 
    initialDownvotes={Math.floor(Math.random() * 20)}
    onVote={handleVote}
  />
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  ) : (
    <p>Dosage information not available.</p>
  )}
        </div>


      </div>
      <div className="drug-info">
        <h2>Duration</h2>
        {drug.duration ? (
          <ul>
            {Object.entries(drug.duration).map(([key, value]) => (
              <li key={key}><strong>{key.replace('_', ' ')}:</strong> {value}</li>
            ))}
          </ul>
        ) : (
          <p>Duration information not available.</p>
        )}
      </div>
      <div className="drug-info">
        <h2>Interactions</h2>
        {drug.interactions ? (
          <div className="grid">
            {Object.entries(drug.interactions).map(([key, value]) => (
              <div key={key}>
                <h3>{key}</h3>
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>Interaction information not available.</p>
        )}
      </div>
      <div className="drug-info">
        <h2>Notes</h2>
        <p>{drug.notes || 'No additional notes available.'}</p>
      </div>
      <div className="drug-info">
        <h2>Subjective Effects</h2>
        {drug.subjective_effects && drug.subjective_effects.length > 0 ? (
          <ul className="grid">
            {drug.subjective_effects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </ul>
        ) : (
          <p>Subjective effects information not available.</p>
        )}
      </div>
      <div className="drug-info">
        <h2>Tolerance</h2>
        {drug.tolerance ? (
          <ul>
            {Object.entries(drug.tolerance).map(([key, value]) => (
              <li key={key}><strong>{key.replace('_', ' ')}:</strong> {Array.isArray(value) ? value.join(', ') : value}</li>
            ))}
          </ul>
        ) : (
          <p>Tolerance information not available.</p>
        )}
      </div>
      <div className="drug-info">
        <h2>Citations</h2>
        {drug.citations && drug.citations.length > 0 ? (
          <ul>
            {drug.citations.map((citation, index) => (
              <li key={index}>
                <a href={citation.reference} target="_blank" rel="noopener noreferrer">
                  {citation.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No citations available.</p>
        )}
      </div>
      <div className="warning">
        <div className="grid">
          <AlertTriangle size={24} />
          <p><strong>Always consult with a healthcare professional before using any substance.</strong></p>
        </div>
      </div>
    </div>
  );
};

export default DrugInfo;