import React, { useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import '../../../Style/Tables/Manager/TeacherTableStyle.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';
import { FillStaffData } from '../../../Redux/Actions/TableActions/Manager/TeacherTableAction.jsx';
import DownloadToExcel from './DownloadToExcel.jsx';
import { getTheStaffMemberWithMoreDetailsBySeminarCode } from '../../../Redux/Axios/Tables/TeacherTableAxios.jsx';
// import {
//     MaterialReactTable,
//     useMaterialReactTable,
//   } from 'material-react-table';

const TeacherTable = () => {

  const dispatch = useDispatch()
  const staff = useSelector(x => x.TeacherTableReducer.StaffList)
  const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)

  useEffect(() => {
    // let currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
    async function fetchData() {
      await getTheStaffMemberWithMoreDetailsBySeminarCode(currentSeminarCode).then(x => dispatch(FillStaffData(x.data)));
      // let s =
      // dispatch(FillStaffData(s.data))
      debugger
    }
    fetchData()
  }, [dispatch, currentSeminarCode])

  const columns = useMemo(

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
        accessorKey: 'userEnglishDateOfBirth',
        accessorFn: (row) => row.userEnglishDateOfBirth.split('T')[0],
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
        accessorKey: 'userCellPhoneNumber',
        header: 'פלאפון',
      },
      {
        accessorKey: 'staffMemberPosition',
        header: 'סטטוס',
      },
      {
        accessorKey: 'userPassword',
        header: 'סיסמא',
      },
      {
        accessorKey: 'staffEmploymentStartDate',
        accessorFn: (row) => row.staffEmploymentStartDate.split('T')[0],
        id: 'staffEmploymentStartDate',
        header: 'תאריך תחילת עבודה',
      }
    ],
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
    'userCellPhoneNumber', 
    'staffMemberPosition', 
    'userPassword', 
    'staffEmploymentStartDate'
  ];

  return (
    <div id='tableWrapper'>
      <h1>צוות</h1>
      <MaterialReactTable
        columns={columns}
        data={staff}
        //enableRowSelection
        enableRowNumbers
        rowNumberMode="original" //default
        columnFilterDisplayMode='popover'
        paginationDisplayMode='pages'
        positionToolbarAlertBanner='bottom'
        renderTopToolbarCustomActions={() => (
          <DownloadToExcel selectedColumns={selectedColumns} table={staff} type={'staffData.xlsx'}></DownloadToExcel>
        )}
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
                  <th style={{ border: '1px solid black' }}>Major</th>
                  <th style={{ border: '1px solid black' }}>Course</th>
                </tr>
              </thead>
              <tbody>
                {
                  row.original.majorCourses.map(x => (
                    <tr>
                      <td style={{ border: '1px solid black' }}>{x.majorName}</td>
                      <td style={{ border: '1px solid black' }}>{x.coursesNames.map(y => (`${y}, `))}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </Box>
        )}
      />;
    </div>
  );

  // return (
  //     <div id='tableWrapper'>
  //         <h1>צוות</h1>
  //         <MaterialReactTable
  //             columns={columns}
  //             data={staff}
  //             enableRowNumbers
  //             rowNumberMode="original" //default

  //         // renderDetailPanel={({ row }) => (
  //         //     <Box
  //         //         sx={{
  //         //             display: 'grid',
  //         //             float: 'left',
  //         //             gridTemplateColumns: '1fr 1fr',
  //         //             width: '50%',
  //         //         }}
  //         //     >
  //         //         <table>
  //         //             <thead>
  //         //                 <tr>
  //         //                     <th style={{border: '1px solid black'}}>Major</th>
  //         //                     <th style={{border: '1px solid black'}}>Course</th>
  //         //                 </tr>
  //         //             </thead>
  //         //             <tbody>
  //         //                 {
  //         //                     row.original.majorCourses.map(x => (
  //         //                         <tr>
  //         //                             <td style={{border: '1px solid black'}}>{x.majorName}</td>
  //         //                             <td style={{border: '1px solid black'}}>{x.coursesNames.map(y => (`${y}, `))}</td>
  //         //                         </tr>
  //         //                     ))
  //         //                 }
  //         //             </tbody>
  //         //         </table>
  //         //     </Box>
  //         // )}
  //         />
  //     </div>
  // );
};

export default TeacherTable;