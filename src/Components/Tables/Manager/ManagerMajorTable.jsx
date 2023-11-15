import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
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
                header: 'Name',
            },
            {
                accessorKey: 'nameCoordinator',
                header: 'Coordinator',
            },
            {
                accessorKey: 'homePhoneNumberCoordinator',
                header: 'Coordinator Home Phone',
            },
            {
                accessorKey: 'cellPhoneNumberCoordinator',
                header: 'Coordinator Cell Phone',
            },
        ],
        //end
        [],
    );
    
    return (
        <div id='tableWrapper'>
            <h1>MAJORS</h1>
            <MaterialReactTable
                columns={columns}
                data={majors} /*x => d(FillStaffData(x.data)));*/
                enableRowNumbers
                rowNumberMode="original" //default
                renderDetailPanel={({ row }) => (
                    <Box
                        sx={{
                            display: 'grid',
                            width: '100%',
                        }}
                    >
                        <h3>Courses: </h3>
                        <p>{Object.keys(row.original.coursesInMajor).map(x => `${x}, `)}</p>
                    </Box>
                )}
            />
        </div>
    );
};

// export default ManagerMajorTable;