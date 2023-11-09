import React, { useState } from 'react';

const GenderSelector = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <div className="gender-selector">
      <p>Preferred type:</p>
      <div className="bathroom-buttons">
        <button
          className={`bathroom-button ${selectedGender === 'male' ? 'selected' : ''}`}
          onClick={() => handleGenderSelection('male')}
        >
          Male
        </button>
        <button
          className={`bathroom-button ${selectedGender === 'female' ? 'selected' : ''}`}
          onClick={() => handleGenderSelection('female')}
        >
          Female
        </button>
      </div>
    </div>
  );
};

export default GenderSelector;