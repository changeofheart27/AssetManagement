import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";
import { Button, Container, InputGroup, Row, Table } from "react-bootstrap";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ExportFile from "./ExportFile";

const Report = () => {
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  const [list, setList] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const fileName = "AssetManagement";

  useEffect(() => {
    axios.get(rootAPI + "/assets/report").then(function (response) {
      let newList = [];

      response.data.map(row => {
        let obj = {
          category: row[0],
          total: row[1],
          assigned: row[2],
          available: row[3],
          notAvailable: row[4],
          waitingForRecycling: row[5],
          recycled: row[6],
        };
        newList.push(obj);
      })
      console.log(newList);
      setList(newList);
      // setList(response.data);
      // console.log("-------------------------------------");
      // console.log(response.data);
      // console.log("-------------------------------------");
      // console.log(response.data[0]);
      // console.log(response.data[0][0]);
    });
  }, []);

  const sortingData = useMemo(() => {
    if (sortConfig !== null) {
      list.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
  }, [sortConfig]);
  const requestSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <Container fluid className={"d-block ps-5"}>
      <h1 className={"text-danger mb-3"}>Report</h1>
      <InputGroup>
        <div className={"col-12 d-flex justify-content-end"}>
          {/* <Button variant={"danger"} className={"mx-5"}>
            Export
          </Button> */}
          <ExportFile apiData={list} fileName={fileName} />
        </div>
      </InputGroup>
      <Row className={"mt-5"}>
        <Table>
          <thead>
            <tr>
              <th className={"border-bottom"}
                  className={getClassNamesFor("category")}
                  onClick={() => requestSort("category")}
              >
                Category
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("total")}
                  onClick={() => requestSort("total")}
              >
                Total
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("assigned")}
                  onClick={() => requestSort("assigned")}
              >
                Assigned
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("available")}
                  onClick={() => requestSort("available")}
              >
                Available
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("notAvailable")}
                  onClick={() => requestSort("notAvailable")}
              >
                Not Available
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("waitingForRecycling")}
                  onClick={() => requestSort("waitingForRecycling")}
              >
                Waiting for recycling
              </th>
              <th className={"border-bottom"}
                  className={getClassNamesFor("recycled")}
                  onClick={() => requestSort("recycled")}
              >
                Recycled
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {list.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
                <td>{row[4]}</td>
                <td>{row[5]}</td>
                <td>{row[6]}</td>
              </tr> */}
              {list.map((row) => (
              <tr key={row.category}>
                <td>{row.category}</td>
                <td>{row.total}</td>
                <td>{row.assigned}</td>
                <td>{row.available}</td>
                <td>{row.notAvailable}</td>
                <td>{row.waitingForRecycling}</td>
                <td>{row.recycled}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default Report;
