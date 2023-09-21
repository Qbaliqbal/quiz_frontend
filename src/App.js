import React, { useState } from "react";

function App() {
  const [rows, setRows] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  const addRow = () => {
    const newRow = { productName: "", productPrice: 0, quantity: 1 };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const updateRow = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const calculateTotal = (index) => {
    const row = rows[index];
    return row.productPrice * row.quantity;
  };

  const calculateGrandTotal = () => {
    return rows.reduce((total, _, index) => total + calculateTotal(index), 0);
  };

  const handleQuantityChange = (index, value) => {
    if (value < 1) {
      alert("Quantity cannot be less than 1");
      return;
    }
    updateRow(index, "quantity", value);
  };

  const handlePriceChange = (index, value) => {
    updateRow(index, "productPrice", value);
  };

  React.useEffect(() => {
    setGrandTotal(calculateGrandTotal());
  }, [rows]);

  return (
    <div>
      <button onClick={addRow}>New</button>
      {rows.map((row, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Product Name"
            value={row.productName}
            onChange={(e) => updateRow(index, "productName", e.target.value)}
          />
          <input
            type="number"
            placeholder="Product Price"
            value={row.productPrice}
            onChange={(e) => handlePriceChange(index, +e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={row.quantity}
            onChange={(e) => handleQuantityChange(index, +e.target.value)}
          />
          <span>Total: {calculateTotal(index)}</span>
          {rows.length > 1 && (
            <button onClick={() => deleteRow(index)}>Delete</button>
          )}
        </div>
      ))}
      <div>
        <strong>Grand Total: {grandTotal}</strong>
      </div>
    </div>
  );
}

export default App;