
import React, {useState, useEffect, useParams} from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "./DeleteAsset.css";
import { Link, useHistory } from "react-router-dom";

const DeleteAsset = () => {
  const rootAPI = process.env.REACT_APP_SERVER_URL;
  let {id} = useParams();
  const history = useHistory();
  const [list, setList] = useState([
    {
      id: null,
      assetCode: null,
      assetName: null,
      specification: null,
      category: null,
      state: null,
      categoryDTO: {
        name: null,
      },
    },
  ]);
  useEffect(() => {
    axios
      .delete(rootAPI+`/assets/${id}`)
      .then(function (response) {
        setList(response.data);
        console.log(response.data);
      });
  }, [id]);

  return (
    <Card style={{ width: "30rem" }}>
      <Card.Header>
        <p>Cannot delete asset</p>
        <i className="bi bi-x-square"/>
      </Card.Header>
      <Card.Body className={"p-4"}>
        <Card.Text>
          Cannot delete the asset because it belongs to one or more historical
          assignments
        </Card.Text>
        <Card.Text>
          If the asset is not able to be used anymore, please update its state
          in <Link onClick={() => history.push(`/editasset/${id}`)}>Edit Asset page</Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DeleteAsset;
