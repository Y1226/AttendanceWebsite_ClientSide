// import { Link, Outlet } from "react-router-dom"
import '../../Style/NavBarStyle/ManagerNavBarStyle.css'
import $ from 'jquery'
// import TeacherTable from "../Tables/TeacherTable"
import { Outlet, useNavigate } from 'react-router-dom';

export const ManagerNav = () => {

	let navigate = useNavigate()

	// $(document).ready(function () {

	// 	$('.burger').click(function () {
	// 		debugger
	// 		$('header').toggleClass('clicked');
	// 	});

	// 	$('nav ul li').click(function () {
	// 		debugger
	// 		$('nav ul li').removeClass('selected');
	// 		$('nav ul li').addClass('notselected');
	// 		$(this).toggleClass('selected');
	// 		$(this).removeClass('notselected');
	// 	});

	// });

	$(document).ready(function () {

		// $('#ManagerNavNav #ManagerNavUl #ManagerNavLi').click(function () {
		// 	debugger
		// 	$('#ManagerNavNav #ManagerNavUl #ManagerNavLi').removeClass('selected');
		// 	$('#ManagerNavNav #ManagerNavUl #ManagerNavLi').addClass('notselected');
		// 	$(this).toggleClass('selected');
		// 	$(this).removeClass('notselected');
		// });

		$('.burger, .ManagerNavA').unbind('click')
		$('.burger, .ManagerNavA').bind('click', function () {
			// debugger
			$('header').toggleClass('clicked');
			$('#tableWrapper').toggleClass('tableContainer');
			$('.tbl').addClass('table');
		});

		// $('.ManagerNavA').click(function () {
		// 	debugger
		// 	$('header').toggleClass('clicked');
		// 	$('.tbl').addClass('table');
		// });

	});
	return <>

		<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

		<header id='ManagerNavHeader' style={{ zIndex: '1' }}>
			<div className="nav-modal">
				<div className="blob"></div>
				<nav id='ManagerNavNav'>
					<ul id='ManagerNavUl'>
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('update') }}>הוספה ועדכון</p></li>
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('attendanceReport') }}>דוחות נוכחות</p></li>
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('managerStudentTable') }}>תלמידות</p></li>
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('managerMajorTable') }}>מסלולים</p></li>
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('teacherTable') }}>צוות</p></li>						
						<li id='ManagerNavLi'><p className='ManagerNavA' onClick={() => { navigate('../') }}>יציאה</p></li>
					</ul>
				</nav>
			</div>
			<div className="head">
				<div className="tile burger">
					<div className="meat">
						<div className="line one"></div>
						<div className="line two"></div>
						<div className="line three"></div>
					</div>
				</div>
			</div>
		</header>
<Outlet></Outlet>
 {/* <TeacherTable className="tbl"></TeacherTable>  */}
{/* <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>  */}


		{/* <link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
		<header>
			<div class="nav-modal">
				<div class="blob"></div>
				<nav>
					<ul>
						<li><a href="#">HOME</a>
							<ul>
								<li><a href="#">STUFF</a></li>
								<li><a href="#">STUFF</a></li>
								<li><a href="#">STUFF</a></li>
							</ul>
						</li>
						<li><a href="#">ABOUT</a>
							<ul>
								<li><a href="#">MORE STUFF</a></li>
								<li><a href="#">OTHER STUFF</a></li>
								<li><a href="#">TEST STUFF</a></li>
							</ul>
						</li>
						<li><a href="#">TRAVELS</a></li>
						<li><a href="#">RECIPES</a>
							<ul>
								<li><a href="#">STUFF</a></li>
								<li><a href="#">STUFF sss</a></li>
								<li><a href="#">STUFF</a></li>
							</ul>
						</li>
						<li><a href="#">CONCEPTS</a></li>
						<li><a href="#">CONTACT</a></li>
						<li><a href="#">SHOP</a></li>
					</ul>
				</nav>
			</div>
			<div class="head">
				<a href="#" class="tile socialmedia"><i class="fa fa-facebook-official"></i></a>
				<a href="#" class="tile socialmedia"><i class="fa fa-instagram"></i></a>
				<a href="#" class="tile socialmedia"><i class="fa fa-twitter-square"></i></a>
				<div class="tile burger">
					<div class="meat">
						<div class="line one"></div>
						<div class="line two"></div>
						<div class="line three"></div>
					</div>
				</div>
			</div>
		</header>
		<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script> */}
		{/* <Outlet></Outlet> */}
	</>
}
