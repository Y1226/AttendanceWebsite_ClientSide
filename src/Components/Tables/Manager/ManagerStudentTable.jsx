import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
// import { GetFullStaffData } from '../../Redux/Axios/Tables/TeacherTableAxios.jsx';
import { FillStudentData } from '../../../Redux/Actions/TableActions/Manager/ManagerStudentTableAction.jsx';
import DownloadToExcel from './DownloadToExcel.jsx';
import { GetFullStudentsDataBySeminarCode } from '../../../Redux/Axios/Table/Manager/ManagerStudentTableAxios.jsx';

export const ManagerStudentTable = () => {

    const dispatch = useDispatch()
    const students = useSelector(x => x.ManagerStudentTableReducer.StudentList)
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)

    useEffect(() => {
        async function fetchData() {
            await GetFullStudentsDataBySeminarCode(currentSeminarCode).then(x => dispatch(FillStudentData(x.data)))
        }
        fetchData()
    }, [dispatch, currentSeminarCode])

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

    const csvConfig = mkConfig({
        fieldSeparator: ',',
        decimalSeparator: '.',
        useKeysAsHeaders: true,
    });

    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(students);
        download(csvConfig)(csv);
    };

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
            />
        </div>
    );
};

// export default ManagerMajorTable;