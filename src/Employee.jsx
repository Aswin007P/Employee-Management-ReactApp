import "./Employee.css";
import React, { useRef, useState } from "react";

const Employee = () => {
  const idRef = useRef();
  const nameRef = useRef();
  const mailRef = useRef();
  const desigRef = useRef();
  const salaryRef = useRef();

  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const clearForm = () => {
    idRef.current.value = "";
    nameRef.current.value = "";
    mailRef.current.value = "";
    desigRef.current.value = "";
    salaryRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idRef.current.value.trim();
    const name = nameRef.current.value.trim();
    const mail = mailRef.current.value.trim();
    const desig = desigRef.current.value.trim();
    const salary = salaryRef.current.value.trim();

    const reg = /^[a-zA-Z0-9._]{4,25}@gmail\.com$/;
    const reg2 = /^[A-Za-z ]+$/;

    if (!id || isNaN(id) || id.length !== 6 || Number(id) < 0) {
      alert("❌ Enter a valid 6-digit Employee ID");
      return;
    }

    if (!name || name.length < 3 || !reg2.test(name)) {
      alert("❌ Name must be at least 3 characters, alphabets only");
      return;
    }

    if (!mail || !reg.test(mail)) {
      alert("❌ Enter a valid Gmail address");
      return;
    }

    if (!desig || desig.length < 2 || !reg2.test(desig)) {
      alert("❌ Please provide a Valid Designation");
      return;
    }

    if (!salary || isNaN(salary) || Number(salary) <= 0) {
      alert("❌ Salary must be a positive number");
      return;
    }

    const empData = { id, name, mail, desig, salary };
    const alreadyExists = employees.some((emp, i) => emp.id === id && i !== editIndex);
    if (alreadyExists) {
      alert("❌ Employee ID already exists. Please use a unique ID.");
      return;
    }

    if (isEditing) {
      const updatedEmployees = [...employees];
      updatedEmployees[editIndex] = empData;
      setEmployees(updatedEmployees);
      alert(`✅ Employee ${name} updated successfully!`);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEmployees([...employees, empData]);
      alert(`✅ Employee ${name} added successfully!`);
    }

    clearForm();
  };

  const handleCancelUpdate = () => {
    setIsEditing(false);
    setEditIndex(null);
    clearForm();
  };

  const handleDelete = (id) => {
    const emp = employees.find(emp => emp.id === id);
    const confirmDelete = window.confirm(`Are you sure you want to delete employee "${emp.name}"?`);
    if (confirmDelete) {
      const updatedList = employees.filter(emp => emp.id !== id);
      setEmployees(updatedList);
      alert("✅ Employee deleted successfully!");
    }
  };

  const handleUpdate = (index) => {
    const emp = employees[index];

    idRef.current.value = emp.id;
    nameRef.current.value = emp.name;
    mailRef.current.value = emp.mail;
    desigRef.current.value = emp.desig;
    salaryRef.current.value = emp.salary;

    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <div className="main-container">
      <div className="left-panel">
        <div className="form-card">
          <h1>Employee Registration</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Employee ID"
              ref={idRef}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
              required
            />
            <input type="text" placeholder="Full Name" ref={nameRef} required />
            <input type="email" placeholder="Email Address" ref={mailRef} required />
            <input type="text" placeholder="Designation" ref={desigRef} required />
            <input
              type="number"
              placeholder="Salary"
              ref={salaryRef}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 6))}
              required
            />

            <div style={{ width: '100%' }}>
              {isEditing ? (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleCancelUpdate}
                    style={{
                      flex: 1,
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Update
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="right-panel">
        <div id="show-card">
          <h2>🧾 Employee List</h2>
          {employees.length === 0 ? (
            <p>No employee added yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th style={{ borderRadius: '20px 0px 0px 0px' }}>Emp ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Salary</th>
                  <th style={{ borderRadius: '0px 20px 0px 0px' }}></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, index) => (
                  <tr key={index}>
                    <td style={{ color: 'red' }}>{emp.id}</td>
                    <td style={{ color: 'green', fontWeight: 'bold' }}>{emp.name}</td>
                    <td style={{ color: 'green' }}>{emp.mail}</td>
                    <td style={{ color: 'green' }}>{emp.desig}</td>
                    <td style={{ color: 'goldenrod' }}>₹{emp.salary}.00</td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                          onClick={() => handleUpdate(index)}
                          style={{
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            height: '30px'
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
