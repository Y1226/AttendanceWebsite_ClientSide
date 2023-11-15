// import { Link, Outlet } from "react-router-dom"
import axios from 'axios';
import '../../Style/NavBarStyle/UserNavBarStyle.scss'
import $ from 'jquery'
// import TeacherTable from "../Tables/TeacherTable"
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const UserNav = () => {

	const [CurrentUser, setCurrentUser] = useState({})
	const [CurrentSeminar, setCurrentSeminar] = useState({})

	let navigate = useNavigate()

	$(document).ready(function () {

		$('.burger').click(function () {
			debugger
			$('header').toggleClass('clicked');
			$('.tbl').addClass('table');
		});

		$('nav ul li').click(function () {
			$('nav ul li').removeClass('selected');
			$('nav ul li').addClass('notselected');
			$(this).toggleClass('selected');
			$(this).removeClass('notselected');
		});

		// $('.accountTextContainer').hover(function() {
		// 	debugger
		// 	$('#a').addClass('logoutText')
		// })

	});

	useEffect(() => {
		debugger
		let storageUser = JSON.parse(localStorage.getItem('CurrentUser'))
		axios.get(`https://localhost:44367/api/User/GetUserByUserID/${storageUser.userName}`).then(x => { setCurrentUser(x.data) })
		axios.get(`https://localhost:44367/api/Seminar/GetSeminarBySeminarCode/${storageUser.seminarCode}`).then(x => { setCurrentSeminar(x.data) })

	}, [])

	if (window.location.href === 'http://localhost:3000/teacherNav/majorTable')
		$('#backButton').css('display', 'none')
	// alert('')
	else
		$('#backButton').css('display', 'block')

	return <>
		<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css' />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />


		{/* <img className='img' src="https://localhost:44367/Logos/LogoSharansky.gif" alt="LogoSharansky"/> */}

		<header id='ManagerNavHeader'>
			<div className='imgDiv'>
				<img className='img' src="https://localhost:44367/Logos/LogoSharansky.gif" alt="LogoSharansky" />
			</div>
			{/* <div className="nav-modal">
				<div className="blob"></div>
				<nav>
					<ul>
						<li><a href="/#">SEMINARS</a>
							<ul>
						<li><a href="/#">STUFF</a></li>
						<li><a href="/#">STUFF</a></li>
						<li><a href="/#">STUFF</a></li>
					</ul>
						</li>
						<li><a href="/#">MAJORS</a>
							<ul>
								<li><a href="/#">VIEW MAJORS</a></li>
								<li><a href="/#">VIEW MAJOR COURSES</a></li>
								<li><a href="/#">ADD MAJOR</a></li>
							</ul>
						</li>
						<li><a href="/#">COURSES</a>
							<ul>
								<li><a href="/#">VIEW MAJORS</a></li>
								<li><a href="/#">VIEW MAJOR COURSES</a></li>
								<li><a href="/#">ADD MAJOR</a></li>
							</ul>
						</li>
						<li><a href="/#">TEACHERS</a>
							<ul>
								<li><a href="/#">VIEW TEACHERS</a></li>
								<li><a href="/#">VIEW MAJOR COURSES</a></li>
								<li><a href="/#">ADD TEACHER</a></li>
							</ul>
						</li>
						<li><a href="/#">STUDENTS</a>
							<ul>
								<li><a href="/#">VIEW STUDENTS</a></li>
								<li><a href="/#">ADD STUDENT</a></li>
								<li><a href="/#">VIEW STUDENTS COURSES</a></li>
							</ul>
						</li>
						<li><a href="/#">ATTENDENCE</a></li>
						<li><a href="/#">CONTACT</a></li>
						<li><a href="/#">LOGOUT</a></li>
					</ul>
				</nav>
			</div> */}
			<div className='profile'>
				<table className='accountTextContainer' /*style={{backgroundColor: '#497081',color: '#b0bec5'}}*/>
					<tbody>
						{/* <img className='img' src="https://localhost:44367/Logos/LogoSharansky.gif" alt="LogoSharansky"/> */}
						{/* <tr className="accountText"> */}
						{/* <td><img src="file:///C:/Users/YEP/Desktop/SeminarWebsite/WebAPI/SeminarWebsite/wwwroot/Logos/LogoSharansky.gif"></img></td> */}
						{/* </tr> */}
						<tr className="accountText">
							<td>{CurrentUser.userFirstName} {CurrentUser.userLastName}</td>
						</tr>
						<tr className='accountText' style={{ fontSize: 'large' }}>
							<td>{CurrentSeminar.seminarName}</td>
						</tr>
						{/* <tr className='logoutText' style={{ fontSize: 'medium' }} onClick={() => { localStorage.clear(); navigate('../') }}>
							<td>logout</td>
						</tr> */}
					</tbody>
				</table>
				<table className='accountTextContainer'>
					<tbody>
						<tr className='logoutText' onClick={() => navigate('../')}><td>יציאה</td></tr>
					</tbody>
				</table>
			</div>
			<div className="head">
				<p id="backButton" className="tile socialmedia" onClick={() => window.history.back(1)} /*style={{'display':'none'}}*/>»</p>
				<div className="tile burger">
					<div className="meat">

					</div>
				</div>
			</div>
		</header>
		<Outlet></Outlet>
	</>
}