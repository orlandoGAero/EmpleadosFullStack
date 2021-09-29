import React from 'react'
import { Redirect } from 'react-router-dom'

const Session = (() => {
	const logout = () => {
		localStorage.removeItem('usuario')
		return <Redirect to="/login" />
	}
	  
	const validSession = () => {
		let isValid = false
		if (localStorage.getItem('usuario')){
			isValid = true
		}
		return isValid
	}

	return {
		logout: logout,
		validSession: validSession
	}
  
})();
  
export default Session;