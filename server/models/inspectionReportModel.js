const db = require('../db/dbConnection');

const insertInspectionReport = (grNo, poNo, grDate, project, vendor) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO inspection_reports (gr_no, po_no, gr_date, project, vendor) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [grNo, poNo, grDate, project, vendor], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.insertId); // Return the inserted report ID for later use
      }
    });
  });
};

const insertItemDetails = (inspectionReportId, items) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO item_details (inspection_report_id, part_no, description, qty, item_sl_no, make, mpn_sap, mpn_item_label, ds, coc, tmr, inv, boe, awb, po, be_coc) VALUES ?';
    
    const itemValues = items.map(item => [
      inspectionReportId, item.partNo, item.description, item.qty, item.itemSlNo, item.make,
      item.mpnSAP, item.mpnItemLabel, item.ds, item.coc, item.tmr, item.inv, item.boe,
      item.awb, item.po, item.beCoc
    ]);

    db.query(query, [itemValues], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result); // Resolve the insertion of item details
      }
    });
  });
};

const getItemDetails = (reportId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM item_details WHERE inspection_report_id = ?';
    db.query(query, [reportId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results); // Resolve with the list of items
      }
    });
  });
};

module.exports = {
  insertInspectionReport,
  insertItemDetails,
  getItemDetails
};
