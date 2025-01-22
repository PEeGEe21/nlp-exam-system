import React, { useState, useEffect } from 'react';
import { State } from 'country-state-city';

const StateSelect = ({selectedState, setSelectedState}) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const nigeriaStates = State.getStatesOfCountry('NG');
    setStates(nigeriaStates);
  }, []);

  const handleChange = (event) => {
    setSelectedState(event.target.value);
  };

  return (
        <div>
            <select
                id="state-select"
                value={selectedState}
                onChange={handleChange}
                className="h-11 w-full rounded-[7px] border border-border-100/50 focus:border focus:border-border-100 bg-white px-3 py-2.5 font-sans text-sm font-normal outline outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                >
                <option value="" disabled>
                    Select a state
                </option>
                {states.map((state) => (
                    <option key={state.isoCode} value={state.name}>
                    {state.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StateSelect;
    