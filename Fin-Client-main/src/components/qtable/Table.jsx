import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const List = () => {
  const rows = [
    {
      id: 1143155,
      fname: "How to Create React Project",
      int_count: 29210,
      rank: 1,
      link: "/topics/react",
    },
    {
      id: 3155,
      fname: "Project Can't be Started? Error",
      int_count: 20450,
      rank: 2,
      link: "/topics/angular",
    },
    {
      id: 1155,
      fname: "Is Vue Js Good for Frontend?",
      int_count: 19302,
      rank: 3,
      link: "/topics/vuejs",
    },
    {
      id: 1152,
      fname: "Front end from scratch",
      int_count: 17290,
      rank: 4,
      link: "/topics/vuejs",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell nmb">Field Name</TableCell>
            <TableCell className="tableCell nmb">Interactions</TableCell>
            <TableCell className="tableCell nmb">Rank</TableCell>
            <TableCell className="tableCell nmb">See Questions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.fname}</TableCell>
              <TableCell className="tableCell">{row.int_count}</TableCell>
              <TableCell className="tableCell">{row.rank}</TableCell>
              <TableCell className="tableCell">
                <Link to={row.link} style={{ textDecoration: "none" }}>
                  See More
                </Link>
              </TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;