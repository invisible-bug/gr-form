import React, { useState } from 'react';

export default function AccRem() {
  const [remarks, setRemarks] = useState([{ observation: '' }]);

  const [dateOfMfg, setDateOfMfg] = useState('');
  const [dateOfExp, setDateOfExp] = useState('');
  const [shelfLife, setShelfLife] = useState('');

  // Handle input changes for remarks
  const handleRemarkInputChange = (index, value) => {
    const updatedRemarks = [...remarks];
    updatedRemarks[index].observation = value;
    setRemarks(updatedRemarks);
  };

  // Add new row for remarks
  const addRemarkRow = () => {
    setRemarks([...remarks, { observation: '' }]);
  };

  // Delete row for remarks
  const deleteRemarkRow = (index) => {
    const updatedRemarks = remarks.filter((_, idx) => idx !== index);
    setRemarks(updatedRemarks);
  };

  return (
    <>
      <div className="p-10">
        {/* Remarks Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-6 text-center">REMARKS</h2>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1">Sl No.</th>
                <th className="border px-2 py-1">Observation</th>
                <th className="border w-10 px-2 py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {remarks.map((row, index) => (
                <tr key={index} className="bg-white">
                  <td className="border text-center px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={row.observation}
                      onChange={(e) => handleRemarkInputChange(index, e.target.value)}
                      className="w-full p-1 border rounded"
                      placeholder="Enter Observation"
                    />
                  </td>
                  <td className="border text-center px-2 py-1">
                    <button
                      onClick={() => deleteRemarkRow(index)}
                      className="text-red-500 text-center w-10"
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <button
              type="button"
              onClick={addRemarkRow}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
            >
              Add
            </button>
          </div>
        </section>

        {/* New Inputs for Date of Mfg, Date of Exp, Shelf Life */}
        <div className="mt-10">
          <div className='text-center mt-16 mb-10'>
            <span className='font-bold text-2xl'>Additional Information</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <label htmlFor="dateOfMfg" className="block mb-2 text-sm font-semibold">
                Date of Mfg
              </label>
              <input
                type="date"
                id="dateOfMfg"
                value={dateOfMfg}
                onChange={(e) => setDateOfMfg(e.target.value)}
                className="w-28 p-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="dateOfExp" className="block mb-2 text-sm font-semibold">
                Date of Exp
              </label>
              <input
                type="date"
                id="dateOfExp"
                value={dateOfExp}
                onChange={(e) => setDateOfExp(e.target.value)}
                className="w-28 p-2 border rounded-md"
              />
            </div>

            <div>
              <label htmlFor="shelfLife" className="block mb-2 text-sm font-semibold">
                Shelf Life (months)
              </label>
              <input
                type="text"
                id="shelfLife"
                value={shelfLife}
                onChange={(e) => setShelfLife(e.target.value)}
                className="w-32 p-2 text-center border rounded-md"
                placeholder="Enter Shelf Life"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
