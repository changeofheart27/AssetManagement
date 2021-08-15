import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";

const SearchAsset = ({setAssetSelect,close}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [searchTerm, setSearchTerm] = useState("");
    const [asset, setAsset] = useState([{
        id:null,
        assetCode:null,
        assetName:null,
        categoryDTO:{
            name: null
        },
        state:null

    }]);
    useEffect(() => {
        axios.get(rootAPI + '/assets')
            .then(response => {
                setAsset(response.data)
            })
    }, [])
    useEffect(()=>{
        axios.get(rootAPI+'/assets/search?keyword='+searchTerm)
            .then(response => {
                setAsset(response.data);
            })
    },[searchTerm])
    return (
        <>
            <Container fluid>
                <Row>
                    <h3 className={"text-danger"}>Select Asset</h3>
                    <InputGroup className={"w-50"}>
                        <FormControl
                            type={"input"}
                            className={"w-50"}
                            name={"searchTerm"}
                            onChange={evt=>{setSearchTerm(evt.target.value)}}
                        >
                        </FormControl>
                        <Button variant={"outline-secondary"}
                                className={"me-5"}
                        ><i className="bi bi-search"/>
                        </Button>
                    </InputGroup>
                </Row>
                <Table>
                    <thead>
                    <th/>
                    <th className={"border-bottom"}>Asset Code</th>
                    <th className={"border-bottom"}>Asset Name</th>
                    <th className={"border-bottom"}>Category</th>
                    </thead>
                    <tbody>
                    {asset.map(asset => (
                        asset.state === 0 ?
                        <tr key={asset.id}>
                            <td><Form.Check name={"singleUser"}
                                            color={"red"}
                                            type={"radio"}
                                            onChange={()=> setAssetSelect({id: asset.id, assetCode: asset.assetCode})}
                            /></td>
                            <td>{asset.assetCode}</td>
                            <td>{asset.assetName}</td>
                            <td>{asset.categoryDTO.name}</td>
                        </tr>
                            : null
                    ))}
                    </tbody>
                </Table>
                <Row className={"justify-content-end"}>
                    <Button variant={"danger"} className={"w-25 mx-5"} onClick={()=> close()}>Save</Button>
                    <Button variant={"danger"} className={"w-25"} onClick={()=>{
                        setAssetSelect({id:"", assetCode:""})
                        close()
                    }} >Cancel</Button>
                </Row>

            </Container>
        </>
    );
};

export default SearchAsset;