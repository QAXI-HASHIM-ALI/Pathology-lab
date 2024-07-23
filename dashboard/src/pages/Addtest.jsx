import React, { useState } from 'react';
import './CSS/Addtest.css';

const Addtest = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showQuantitative, setShowQuantitative] = useState(false);
  const [showEnumerable, setShowEnumerable] = useState(false);
  const [enumerableValues, setEnumerableValues] = useState([]);
  const [enumerableInput, setEnumerableInput] = useState('');

  const handleResultTypeChange = (e) => {
    const selectedValue = e.target.value;
    setShowDescription(selectedValue === "2");
    setShowQuantitative(selectedValue === "4");
    setShowEnumerable(selectedValue === "3");
    if (selectedValue !== "3") {
      setEnumerableValues([]);
    }
  };

  const handleAddValue = () => {
    if (enumerableInput.trim() !== "") {
      setEnumerableValues([...enumerableValues, enumerableInput.trim()]);
      setEnumerableInput('');
    }
  };

  const renderEnumerableInputs = () => {
    return (
      <>
        {enumerableValues.map((value, index) => (
          <div key={index} className="mb-3 enumerable">
            <label htmlFor={`enumerableValue${index}`} className="form-label">Value {index + 1}:</label>
            <input type="text" className="form-control" id={`enumerableValue${index}`} value={value} readOnly />
          </div>
        ))}
        <div className="mb-3 input-group">
          <input type="text" className="form-control" value={enumerableInput} onChange={(e) => setEnumerableInput(e.target.value)} />
          <button type="button" className="btn btn-primary" onClick={handleAddValue}>Add</button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="form-body">
        <div className="login-form">
          <h2 className="text-center mb-1">Add Test</h2>
          <form>
          <div className="mb-3">
              <label for="username" className="form-label">Test Name:</label>
              <input type="text" className="form-control" id="username" placeholder="Enter your Test Name" />
            </div>
            <div className="mb-3">
              <label for="username" className="form-label">Test Fee:</label>
              <input type="text" className="form-control" id="username" placeholder="Enter Test Fees" />
            </div>
            <div className="mb-3">
              <label htmlFor="select" className="form-label">Result Type:</label>
              <select className="form-select" onChange={handleResultTypeChange}>
                <option disabled value="">Select Result Type</option>
                <option value="1">Positive/Negative</option>
                <option value="2">Descriptive</option>
                <option value="3">Enumerable</option>
                <option value="4">Quantitative</option>
              </select>
            </div>

            {showDescription && (
              <div className="mb-3 descriptive">
                <label htmlFor="txtDescriptive" className="form-label">Description:</label>
                <textarea name="txtDescriptive" id="txtDescriptive" cols="30" rows="5" className='form-control'></textarea>
              </div>
            )}

            {showQuantitative && (
              <div className="mb-3 quantitative">
                <label htmlFor="minValue" className="form-label">Min Value:</label>
                <input type="text" className="form-control" id="minValue" placeholder="Enter Min Value" />
                <label htmlFor="maxValue" className="form-label">Max Value:</label>
                <input type="text" className="form-control" id="maxValue" placeholder="Enter Max Value" />
                <button type="button" className="btn btn-primary mt-3">Save</button>
              </div>
            )}

            {showEnumerable && renderEnumerableInputs()}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Remarks:</label>
              <textarea name="" id="" cols="30" rows="5" className="form-control"></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addtest;
