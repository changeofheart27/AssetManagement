import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";
import { Button, Container, InputGroup, Row, Table } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ExportFile from "./ExportFile";

const Report = () => {
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  const [list, setList] = useState([]);
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
              <th className={"border-bottom"}>
                Category
                <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Total <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Assigned <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Available
                <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Not Available
                <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Waiting for recycling
                <i className="bi bi-caret-down-fill" />
              </th>
              <th className={"border-bottom"}>
                Recycled
                <i className="bi bi-caret-down-fill" />
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
