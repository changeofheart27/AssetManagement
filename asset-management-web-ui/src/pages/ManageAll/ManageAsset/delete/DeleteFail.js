import React, {useEffect} from 'react';
import {Button, Row} from 'react-bootstrap';

const DeleteFail = props => {
    let {id, close, setDisable} = props
    useEffect(() => {
        setDisable(true);
    })
    return (
        <div>
            <Row className={"justify-content-between align-items-center"}
                 style={{padding: '10px 20px'}}
            >
                <h3 className={"text-danger w-auto m-0 p-0"}>Can not delete asset</h3>
                <Button variant={"outline-danger w-auto"} style={{padding: '3px 6px'}} onClick={() => {
                    setDisable(false);
                    close()
                }}>
                    <i class="bi bi-x-lg"/>
                </Button>
            </Row>
            <hr style={{margin: '0'}}/>
            <p style={{padding: '10px'}}>
                Cannot delete the asset because it belongs to one or more historical
                assignments. If the asset is not able to be used anymore, please
                update its state in <a href={`/editasset/${id}`}> Edit Asset page</a>
            </p>
        </div>
    );
};

export default DeleteFail;