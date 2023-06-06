import React from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "qtitle", headerName: "Question Title", width: 550 },
  { field: "qinteractions", headerName: "Total Interactions", width: 130 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    cellRender: (params) => {
      return (
        <div className={`cellwithstatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellaction">
          <div className="viewbutton">Edit</div>
          <div className="deletebutton">Delete</div>
        </div>
      );
    },
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  //   },
];

const rows = [
  { id: 1, qtitle: "Question 1", qinteractions: 100, status: "Open" },
  { id: 2, qtitle: "Question 2", qinteractions: 102, status: "Open" },
  { id: 3, qtitle: "Question 3", qinteractions: 103, status: "Open" },
  { id: 4, qtitle: "Question 4", qinteractions: 104, status: "Open" },
  { id: 5, qtitle: "Question 5", qinteractions: 105, status: "Answered" },
];

export default function DataTable() {
  return (
    <div className="datatable">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
