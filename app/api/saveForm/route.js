import { NextResponse } from 'next/server';
import { insertInspectionReport, insertItemDetails } from '@/server/models/inspectionReportModel';

// POST handler to save form data
export async function POST(request) {
  try {
    // Get form data from the request body
    const { grNo, poNo, grDate, project, vendor, items } = await request.json();

    // Step 1: Insert the inspection report into the database
    const inspectionReportId = await insertInspectionReport(grNo, poNo, grDate, project, vendor);

    // Step 2: Insert item details associated with the inspection report
    await insertItemDetails(inspectionReportId, items);

    // Send a successful response with the reportId
    return NextResponse.json({ message: 'Data saved successfully', reportId: inspectionReportId }, { status: 200 });
  } catch (err) {
    console.error('Error saving form data:', err);
    // Send an error response
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}





