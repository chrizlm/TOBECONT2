import React, { useMemo, useState, useCallback, useEffect } from 'react';

import DataTable from 'react-data-table-component';
import axios from "axios";

export default function PTable(){

        const [parkLot, setParkLot] = useState([]);

    const retrieveAllParkingLots = () =>{

        axios.get(`http://localhost:8080/apiv1/parkingLot/all`).then(response => {
            setParkLot(response.data);
            console.log(response);
        }).catch(error => {
            console.log(error)
        })
    }

        const [selectedRows, setSelectedRows] = useState([]);

        useEffect(() => {

            console.log('state', selectedRows);
        }, [selectedRows]);

        const handleButtonClick = () => {

            console.log('clicked');
        };

        const handleChange = useCallback(state => {
            setSelectedRows(state.selectedRows);
        }, []);

        /*
        private Long parkingLotId;
    private String parkingRegNo;
    private String parkingLotLocation;
    private String parkingLotName;
    private int totalParkingSpaces;
         */

        const columns = useMemo(
            () => [
                {

                    cell: () => <button onClick={handleButtonClick}>Action</button>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                },
                {
                    name: 'parkingLotId',
                    selector: row => row.parkingLotId,
                    sortable: true,
                    grow: 2,
                },
                {
                    name: 'parkingRegNo',
                    selector: row => row.parkingRegNo,
                    sortable: true,
                },
                {
                    name: 'parkingLotLocation',
                    selector: row => row.parkingLotLocation,
                    sortable: true,
                    right: true,
                },
                {
                    name: 'parkingLotName',
                    selector: row => row.parkingLotName,
                    sortable: true,
                    right: true,
                },
                {
                    name: 'totalParkingSpaces',
                    selector: row => <row className="totalParkingSpaces"></row>,
                    sortable: true,
                    right: true,
                },

            ],
            [],
        );

        return (
            <DataTable
                title="Desserts"
                data={retrieveAllParkingLots}
                columns={columns}
                selectableRows
                onSelectedRowsChange={handleChange}
            />
        );


}