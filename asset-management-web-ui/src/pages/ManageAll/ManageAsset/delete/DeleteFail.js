import React from 'react';
import { Button, Row } from 'react-bootstrap';

const DeleteFail = props => {
    let {id, close} =props
    return (
      <div>
        <Row className={"justify-content-between align-items-center"}>
          <h3 className={"text-danger w-auto"}>Cannot delete asset</h3>
          <Button
            variant={"danger"}
            className={"btn-close"}
            onClick={() => close()}
          ></Button>
        </Row>
        <hr />
        <p>
          Cannot delete the asset because it belongs to one or more historical
          assignments. If the asset is not able to be used anymore, please
          update its state in <a href={`/editasset/${id}`}> Edit Asset page</a>
        </p>
      </div>
    );
};

export default DeleteFail;