import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
// import { GetFullStaffData } from '../../Redux/Axios/Tables/TeacherTableAxios.jsx';
import { FillMajorData } from '../../../Redux/Actions/TableActions/Manager/ManagerMajorTableAction.jsx';
import DownloadToExcel from './DownloadToExcel.jsx';
import { GetTheMajorsWithMoreDetailsBySeminarCode } from '../../../Redux/Axios/Table/Manager/ManagerMajorTableAxios.jsx';

export const ManagerMajorTable = () => {

    const dispatch = useDispatch()
    const majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)

    useEffect(() => {
        async function fetchData() {
            await GetTheMajorsWithMoreDetailsBySeminarCode(currentSeminarCode).then(x => dispatch(FillMajorData(x.data)))
        }
        fetchData()
    }, [dispatch, currentSeminarCode])

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

    const selectedColumns = [
        'majorName', 
        'nameCoordinator', 
        'homePhoneNumberCoordinator', 
        'cellPhoneNumberCoordinator'
    ];

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
                renderTopToolbarCustomActions={() => (
                    <DownloadToExcel selectedColumns={selectedColumns} table={majors} type={'majorData.xlsx'}></DownloadToExcel>
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