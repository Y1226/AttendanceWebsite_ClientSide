import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
// import { GetFullStaffData } from '../../Redux/Axios/Tables/TeacherTableAxios.jsx';
import axios from 'axios';
import { FillStudentData } from '../../../Redux/Actions/TableActions/Manager/ManagerStudentTableAction.jsx';
import DownloadToExcel from './DownloadToExcel.jsx';

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
                header: 'שם פרטי',
            },
            {
                accessorKey: 'userLastName',
                header: 'שם משפחה',
            },
            {
                accessorKey: 'userId',
                header: 'תעודת זהות',
            },
            {
                accessorFn: (row) => (row.userEnglishDateOfBirth).toString().split('T')[0],
                id: 'userEnglishDateOfBirth',
                header: 'תאריך לידה לועזי',
            },
            {
                accessorKey: 'userHebrewDateOfBirth',
                header: 'תאריך לידה עברי',
            },
            {
                accessorKey: 'userAddress',
                header: 'כתובת',
            },
            {
                accessorKey: 'userLocationCity',
                header: 'עיר',
            },
            {
                accessorKey: 'userHomePhoneNumber',
                header: 'טלפון',
            },
            {
                accessorKey: 'studentFatherCellPhoneNumber',
                header: 'פלאפון אב',
            },
            {
                accessorKey: 'studentMotherCellPhoneNumber',
                header: 'פלאפון אם',
            },
            {
                accessorKey: 'userCellPhoneNumber',
                header: 'פלאפון',
            },
            {
                accessorKey: 'studentGrade',
                header: 'שנתון',
            },
            {
                accessorKey: 'studentClassNumber',
                header: 'מספר כיתה',
            },
            {
                accessorKey: 'studentFirstMajorName',
                header: 'מסלול #1',
            },
            {
                accessorKey: 'studentSecondMajorName',
                header: 'מסלול #2',
            },
            {
                accessorKey: 'userPassword',
                header: 'סיסמא',
            },
        ],
        //end
        [],
    );

    const selectedColumns = [
        'userFirstName', 
        'userLastName', 
        'userId', 
        'userEnglishDateOfBirth', 
        'userHebrewDateOfBirth', 
        'userAddress', 
        'userLocationCity', 
        'userHomePhoneNumber', 
        'studentFatherCellPhoneNumber', 
        'studentMotherCellPhoneNumber', 
        'userCellPhoneNumber', 
        'studentGrade',
        'studentClassNumber',
        'studentFirstMajorName',
        'studentSecondMajorName',
        'userPassword',
    ];

    return (
        <div id='tableWrapper'>
            <h1>תלמידות</h1>

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
                columnFilterDisplayMode='popover'
                paginationDisplayMode='pages'
                positionToolbarAlertBanner='bottom'
                renderTopToolbarCustomActions={() => (
                    <DownloadToExcel selectedColumns={selectedColumns} table={students} type={'studentData.xlsx'}></DownloadToExcel>
                )}


            />
        </div>
    );
};

// export default ManagerMajorTable;