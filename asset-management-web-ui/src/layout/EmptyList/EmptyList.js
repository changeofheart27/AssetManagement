import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import {Row} from "react-bootstrap";
import {Icon} from "@material-ui/core";

const EmptyList = () => {
    return (
        <>
            <div className={"text-center"}>
                You got no assignment yet
            </div>
            <Row>
               <svg xmlns={"file:///C:/Users/dinhn/Downloads/empty-folder%20.svg"} viewBox="0 0 841.9 595.3"/>
            </Row>
        </>
    );
};

export default EmptyList;