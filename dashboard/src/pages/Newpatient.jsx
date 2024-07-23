import React, { useState, useEffect, useRef } from 'react';
import './CSS/Newpatient.css';

const Newpatient = () => {
  const [testName, setTestName] = useState('');
  const [tests, setTests] = useState([]);
  const [patient, setPatient] = useState({
    name: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    date: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submittedPatient, setSubmittedPatient] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const popupRef = useRef(null);

  const [sequenceNumber, setSequenceNumber] = useState(() => {
    const savedSequenceNumber = localStorage.getItem('sequenceNumber');
    return savedSequenceNumber ? parseInt(savedSequenceNumber, 10) : 1;
  });

  useEffect(() => {
    const resetTime = localStorage.getItem('resetTime');
    if (resetTime && new Date().getTime() > new Date(resetTime).getTime()) {
      setSequenceNumber(1);
      updateResetTime();
    }
  }, []);

  const updateResetTime = () => {
    const newResetTime = new Date().getTime() + 24 * 60 * 60 * 1000;
    localStorage.setItem('resetTime', new Date(newResetTime).toString());
  };

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  const addTestToBilling = () => {
    if (testName.trim() !== '') {
      setTests([...tests, { name: testName, price: 0 }]);
      setTestName('');
    }
  };

  const removeTest = (index) => {
    const updatedTests = [...tests];
    updatedTests.splice(index, 1);
    setTests(updatedTests);
  };

  const applyDiscount = (index) => {
    const updatedTests = [...tests];
    const discountAmount = 10;
    updatedTests[index].price -= discountAmount;
    setTests(updatedTests);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const generatePatientId = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2);
    const dateString = `${day}${month}${year}`;
    const patientId = `${sequenceNumber}${dateString}`;
    return patientId;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!patient.name) newErrors.name = 'Name is required';
    if (!patient.phone) newErrors.phone = 'Phone is required';
    if (!patient.address) newErrors.address = 'Address is required';
    if (!patient.age) newErrors.age = 'Age is required';
    if (!patient.gender) newErrors.gender = 'Gender is required';
    if (!patient.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const submittedData = { ...patient, id: generatePatientId() };
      console.log('Submitted Patient Data:', submittedData);
      setSubmittedPatient(submittedData);
      setPatient({
        name: '',
        phone: '',
        address: '',
        age: '',
        gender: '',
        date: ''
      });
      setSubmitted(true);
      setShowPopup(true);

      setSequenceNumber(prev => {
        const newSequenceNumber = prev + 1;
        localStorage.setItem('sequenceNumber', newSequenceNumber);
        return newSequenceNumber;
      });

      updateResetTime();
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handlePrint = () => {
    const popupContent = popupRef.current;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Patient Data</title></head><body>');
    printWindow.document.write(popupContent.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div className="test-name">
        <input type="text" className="form-control" id="testName" placeholder="Enter your Test Name" value={testName} onChange={handleTestNameChange} />
        <button type="button" className="btn btn-primary btn-sm mt-2" onClick={addTestToBilling}>Add Test</button>
      </div>

      <div className="billing-section">
        <div className="mt-5">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Test Name</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test, index) => (
                <tr key={index}>
                  <td>{test.name}</td>
                  <td>
                    ${test.price}
                    <div className="btn-group" style={{ marginLeft: '50px' }}>
                      <button className="btn btn-danger" onClick={() => removeTest(index)}>Remove</button>
                      <button className="btn btn-warning" onClick={() => applyDiscount(index)}>Discount</button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td className="text-end">Total: {tests.reduce((acc, curr) => acc + curr.price, 0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className='Patient-Form'>
        <form onSubmit={handleSubmit}>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Name"
                    name="name"
                    value={patient.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <small className="text-danger">{errors.name}</small>}
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Phone"
                    name="phone"
                    value={patient.phone}
                    onChange={handleInputChange}
                  />
                  {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Address"
                    name="address"
                    value={patient.address}
                    onChange={handleInputChange}
                  />
                  {errors.address && <small className="text-danger">{errors.address}</small>}
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Age"
                    name="age"
                    value={patient.age}
                    onChange={handleInputChange}
                  />
                  {errors.age && <small className="text-danger">{errors.age}</small>}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <select className="form-control" id="inlineFormCustomSelect" name="gender" value={patient.gender} onChange={handleInputChange}>
                    <option value="">Select your Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Enter Date"
                    name="date"
                    value={patient.date}
                    onChange={handleInputChange}
                  />
                  {errors.date && <small className="text-danger">{errors.date}</small>}
                </td>
              </tr>
              <tr>
                <td className="submit-cell" colSpan="2">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '20px', maxWidth: '400px', width: '90%', position: 'relative' }} ref={popupRef}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4>Patient Data</h4>
              <button style={{ fontSize: '24px', fontWeight: 'bold', color: '#888', backgroundColor: 'transparent', border: 'none', outline: 'none', cursor: 'pointer' }} onClick={handleClosePopup}>
                &times;
              </button>
            </div>
            {submittedPatient && (
              <>
                <p><strong>ID:</strong> {submittedPatient.id}</p>
                <p><strong>Name:</strong> {submittedPatient.name}</p>
                <p><strong>Phone:</strong> {submittedPatient.phone}</p>
                <p><strong>Address:</strong> {submittedPatient.address}</p>
                <p><strong>Age:</strong> {submittedPatient.age}</p>
                <p><strong>Gender:</strong> {submittedPatient.gender}</p>
                <p><strong>Date:</strong> {submittedPatient.date}</p>
              </>
            )}
            <button style={{ display: 'block', width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handlePrint}>
              Print
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Newpatient;
