import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Row, FormControl, Dropdown, DropdownButton, SplitButton} from 'react-bootstrap';
import {popper} from "@popperjs/core";
const Manage = () => {
    return (
        <>
            <h1 className={"text-danger"}>User List</h1>
            <Row>
                <Dropdown className={"w-25 m-auto"}>
                    <SplitButton title={"Search by Type"} menuVariant={"dark"} id={""} onSelect={popper.split}>
                        <Dropdown.Item>Type</Dropdown.Item>
                    </SplitButton>
                </Dropdown>
                <FormControl
                 type={"input"}
                 className={"w-25 m-auto"}
                >

                </FormControl>
                <Button variant={"danger"} className={"w-25 m-auto"}>Create new User</Button>
            </Row>
        </>
    );
};

export default Manage;