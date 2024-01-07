import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box, Button } from '@mui/material';
// import { GetFullStaffData } from '../../Redux/Axios/Tables/TeacherTableAxios.jsx';
import axios from 'axios';
import { FillMajorData } from '../../../Redux/Actions/TableActions/Manager/ManagerMajorTableAction.jsx';

export const ManagerMajorTable = () => {

    const dispatch = useDispatch()
    const majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem('CurrentUser'))
        async function fetchData() {
            let m = await axios.get(`https://localhost:44367/api/Major/GetTheMajorsWithMoreDetailsBySeminarCode/${currentUser.seminarCode}`)
            dispatch(FillMajorData(m.data))
        }
        fetchData()
    }, [dispatch])

    const columns = useMemo(
        //column definitions...

        () => [
            {
                accessorKey: 'majorName',
                header: 'שם',
            },
            {
                accessorKey: 'nameCoordinator',
                header: 'רכזת',
            },
            {
                accessorKey: 'homePhoneNumberCoordinator',
                header: 'טלפון רכזת',
            },
            {
                accessorKey: 'cellPhoneNumberCoordinator',
                header: 'פלאפון רכזת',
            },
        ],
        //end
        [],
    );

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(majors);
        download(csvConfig)(csv);
    };

    return (
        <div id='tableWrapper'>
            <h1>מסלולים</h1>
            <MaterialReactTable
                columns={columns}
                data={majors} /*x => d(FillStaffData(x.data)));*/
                enableRowNumbers
                rowNumberMode="original" //default
                columnFilterDisplayMode='popover'
                paginationDisplayMode='pages'
                positionToolbarAlertBanner='bottom'
                renderTopToolbarCustomActions={({ table }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '16px',
                            padding: '8px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                            onClick={handleExportData}
                            startIcon={<FileDownloadIcon />}
                        >
                            הורדה לקובץ אקסל
                        </Button>
                    </Box>
                )}
                renderDetailPanel={({ row }) => (
                    <Box
                        sx={{
                            display: 'grid',
                            width: '100%',
                        }}
                    >
                        <h3>קורסים: </h3>
                        <p>{Object.keys(row.original.coursesInMajor).map(x => `${x}, `)}</p>
                    </Box>
                )}
            />
        </div>
    );
};

// export default ManagerMajorTable;