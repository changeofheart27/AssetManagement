import React, {useEffect, useState, useMemo} from 'react';
import axios from "axios";
import {Button, Container, Form, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import '../../ManageAll/ManageAsset/manage/Manage.css'

const SearchAsset = ({setAssetSelect,close}) => {
    const rootAPI = process.env.REACT_APP_SERVER_URL;
    const [sortConfig, setSortConfig] = useState(null);
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
        axios.get(rootAPI+'/assets?searchTerm='+searchTerm)
            .then(response => {
                setAsset(response.data);
            })
    },[searchTerm])

    const sortingData = useMemo(() => {
        if (sortConfig !== null) {
            asset.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key] ||
                a.categoryDTO.name < b.categoryDTO.name
                ) {
              return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key] ||
                a.categoryDTO.name > b.categoryDTO.name
                ) {
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
                    <th className={"border-bottom"}
                        className={getClassNamesFor("assetCode")}
                        onClick={() => requestSort("assetCode")}
                    >Asset Code</th>
                    <th className={"border-bottom"}
                        className={getClassNamesFor("assetName")}
                        onClick={() => requestSort("assetName")}
                    >Asset Name</th>
                    <th className={"border-bottom"}
                        className={getClassNamesFor("categoryDTO.name")}
                        onClick={() => requestSort("categoryDTO.name")}
                    >Category</th>
                    </thead>
                    <tbody>
                    {asset.map(asset => (
                        asset.state === 0 ?
                        <tr key={asset.id}>
                            <td><Form.Check name={"singleUser"}
                                            color={"red"}
                                            type={"radio"}
                                            onChange={()=> setAssetSelect({id: asset.id,
                                                                            assetCode: asset.assetCode,
                                                                            assetName: asset.assetName})}
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
                    <Button variant={"secondary"} className={"w-25"} onClick={()=>{
                        setAssetSelect({id:null, assetCode:"", assetName:""})
                        close()
                    }} >Cancel</Button>
                </Row>

            </Container>
        </>
    );
};

export default SearchAsset;