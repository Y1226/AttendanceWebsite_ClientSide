import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import axios from 'axios';
import { FillStaffData } from '../../../Redux/Actions/TableActions/Manager/TeacherTableAction.jsx';

const TeacherTable = () => {

    const dispatch = useDispatch()
    const staff = useSelector(x => x.TeacherTableReducer.StaffList)

    useEffect(() => {
        let currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
        async function fetchData() {
            let s = await axios.get(`https://localhost:44367/api/Staff/GetTheStaffMemberWithMoreDetailsBySeminarCode/${currentUser.seminarCode}`)
            dispatch(FillStaffData(s.data))
        }
        fetchData()
    }, [dispatch])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'staff.userFirstName',
                header: 'First Name',
            },
            {
                accessorKey: 'staff.userLastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'staff.userId',
                header: 'ID',
            },
            {
                accessorFn: (row) => row.staff.staffEmploymentStartDate.split('T')[0],
                id: 'staff.userEnglishDateOfBirth',
                header: 'English Birthday',
            },
            {
                accessorKey: 'staff.userHebrewDateOfBirth',
                header: 'Hebrew Birthday',
            },
            {
                accessorKey: 'staff.userAddress',
                header: 'Address',
            },
            {
                accessorKey: 'staff.userLocationCity',
                header: 'City',
            },
            {
                accessorKey: 'staff.userHomePhoneNumber',
                header: 'Home Phone',
            },
            {
                accessorKey: 'staff.userCellPhoneNumber',
                header: 'Cell Phone',
            },
            {
                accessorKey: 'staff.staffMemberPosition',
                header: 'Status',
            },
            {
                accessorKey: 'staff.userPassword',
                header: 'Password',
            },
            {
                accessorFn: (row) => row.staff.staffEmploymentStartDate.split('T')[0],
                id: 'staff.staffEmploymentStartDate',
                header: 'Start Employment',
            }
        ],
        [],
    );

    return (
        <div id='tableWrapper'>
            <h1>STAFF</h1>
            <MaterialReactTable
                columns={columns}
                data={staff}
                enableRowNumbers
                rowNumberMode="original" //default
                renderDetailPanel={({ row }) => (
                    <Box
                        sx={{
                            display: 'grid',
                            float: 'left',
                            gridTemplateColumns: '1fr 1fr',
                            width: '50%',
                        }}
                    >
                        <table>
                            <thead>
                                <tr>
                                    <th style={{border: '1px solid black'}}>Major</th>
                                    <th style={{border: '1px solid black'}}>Course</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    row.original.majorCourses.map(x => (
                                        <tr>
                                            <td style={{border: '1px solid black'}}>{x.majorName}</td>
                                            <td style={{border: '1px solid black'}}>{x.coursesNames.map(y => (`${y}, `))}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </Box>
                )}
            />
        </div>
    );
};

export default TeacherTable;