import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
// import { GetFullStaffData } from '../../Redux/Axios/Tables/TeacherTableAxios.jsx';
import axios from 'axios';
import { FillStudentData } from '../../../Redux/Actions/TableActions/Manager/ManagerStudentTableAction.jsx';
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import { mkConfig, generateCsv, download } from 'export-to-csv';

export const ManagerStudentTable = () => {

    const dispatch = useDispatch()
    const students = useSelector(x => x.ManagerStudentTableReducer.StudentList)

    useEffect(() => {
        debugger
        let currentUser = JSON.parse(localStorage.getItem('CurrentUser'))
        async function fetchData() {
            let s = await axios.get(`https://localhost:44367/api/Students/GetFullStudentsDataBySeminarCode/${currentUser.seminarCode}`)
            dispatch(FillStudentData(s.data))
        }
        fetchData()
    }, [dispatch])

    const columns = useMemo(
        //column definitions...

        () => [
            {
                accessorKey: 'userFirstName',
                header: 'First Name',
            },
            {
                accessorKey: 'userLastName',
                header: 'Last Name',
            },
            {
                accessorKey: 'userId',
                header: 'Id',
            },
            {
                accessorFn: (row) => (row.userEnglishDateOfBirth).toString().split('T')[0],
                id: 'userEnglishDateOfBirth',
                header: 'English Birthday',
            },
            {
                accessorKey: 'userHebrewDateOfBirth',
                header: 'Hebrew Birthday',
            },
            {
                accessorKey: 'userAddress',
                header: 'Address',
            },
            {
                accessorKey: 'userLocationCity',
                header: 'City',
            },
            {
                accessorKey: 'userHomePhoneNumber',
                header: 'Home Phone',
            },
            {
                accessorKey: 'studentFatherCellPhoneNumber',
                header: 'Father Cell Phone',
            },
            {
                accessorKey: 'studentMotherCellPhoneNumber',
                header: 'Mother Cell Phone',
            },
            {
                accessorKey: 'userCellPhoneNumber',
                header: 'Cell Phone',
            },
            {
                accessorKey: 'studentGrade',
                header: 'Grade',
            },
            {
                accessorKey: 'studentClassNumber',
                header: 'Class Number',
            },
            {
                accessorKey: 'studentFirstMajorName',
                header: 'Major #1',
            },
            {
                accessorKey: 'studentSecondMajorName',
                header: 'Major #2',
            },
            {
                accessorKey: 'userPassword',
                header: 'Password',
            },
        ],
        //end
        [],
    );

    // const handleExportData = () => {
    //     const csv = generateCsv(csvConfig)(data);
    //     download(csvConfig)(csv);
    // };

    // let d = useDispatch()
    return (
        <div id='tableWrapper'>
            <h1>STUDENTS</h1>

            {/* <ReactHTMLTableToExcel
                table="managerStudentTable"
                filename="ReportExcel"
                sheet="Sheet"
                buttonText="Export excel" /> */}

            <MaterialReactTable 
                // id={'managerStudentTable'}
                columns={columns}
                // data={useSelector(x => x.TeacherTableReducer.StaffList)}
                data={students} // x => d(FillStaffData(x.data)));
                enableRowNumbers
                rowNumberMode="original" //default
            />
        </div>
    );
};

// export default ManagerMajorTable;