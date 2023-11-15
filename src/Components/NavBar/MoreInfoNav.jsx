import '../../Style/NavBarStyle/MoreInfoNavStyle.scss'
// import $ from 'jquery'
// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const MoreInfoNav = () => {

	// useEffect(() => {
	// 	if(window.location.href === 'http://localhost:3000/moreInfoNav/remainingDetails')
	// 		$('#backButton').css('display', 'none')
	// 	else
	// 		$('#backButton').css('display', 'block')
	// },[])
	

	return <>
		<header id='ManagerNavHeader'>
			<div className="head">
				<p id="backButton" className="tile socialmedia" onClick={()=>window.history.back(1)}>»</p>
			</div>
		</header>
		<Outlet></Outlet>
	</>
}