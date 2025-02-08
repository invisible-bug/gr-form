"use client";

import React, { useState, useEffect } from "react";
import { use } from "react"; // Import `use` from React
import AccRem from "@/components/component/AccRem";

// For the Accessories and Remarks section
export default function InspectionPage({ params }) {
  const { reportId } = use(params);

  // Dimension Table related states
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dimensionRows, setDimensionRows] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!reportId) {
          console.error("No report ID provided");
          return;
        }

        const response = await fetch(`/api/getItems?reportId=${reportId}`);
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          return;
        }

        setItems(data.items);
        generateDimensionRows(data.items); // Generate rows once data is fetched
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (reportId) {
      fetchItems();
    }
  }, [reportId]);

  // Generate Dimension Rows
  const generateDimensionRows = (items) => {
    let serialNumbers = {};
    const rows = [];

    items.forEach((item) => {
      const serialNumber =
        serialNumbers[item.part_no] ||
        (serialNumbers[item.part_no] = Object.keys(serialNumbers).length + 1);

      for (let i = 0; i < item.qty; i++) {
        rows.push({
          ...item,
          serialNumber,
        });
      }
    });

    setDimensionRows(rows);
  };

  const deleteDimensionRow = (index) => {
    const updatedRows = dimensionRows.filter(
      (_, rowIndex) => rowIndex !== index
    );
    setDimensionRows(updatedRows);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AccRem />
      <section className="mt-10">
        {/* Dimension Check Table */}
        <h1 className="text-2xl font-semibold text-center mb-6">
          Inspection Report: {reportId}
        </h1>
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Serial No</th>
              <th className="border px-2 py-1">Part No</th>
              <th className="border px-2 py-1">Dimn Toll (mm)</th>
              <th className="border px-2 py-1">Measured Toll (mm)</th>
              <th className="border px-2 py-1">Dimn Toll (mm)</th>
              <th className="border px-2 py-1">Measured mm</th>
              <th className="border px-2 py-1">Dimn Toll (mm)</th>
              <th className="border px-2 py-1">Measured Toll (mm)</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {dimensionRows.map((row, index) => (
              <tr key={index} className="text-center">
                <td>{row.serialNumber}</td>
                <td>{row.part_no}</td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll"
                    className="w-40"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured Toll"
                    className="w-40"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll"
                    className="w-40"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured mm"
                    className="w-40"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Dimn Toll"
                    className="w-40"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Measured Toll"
                    className="w-40"
                  />
                </td>
                <td>
                  <button onClick={() => deleteDimensionRow(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
