import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import Session from '../Sessions/Session'
import Public from '../_layouts/public/Public'
import Private from '../_layouts/private/Private'

const MyRoute = ({
	component: Component,
	isPrivate,
	...rest
}) => {
	const signed = Session.validSession()

	if (isPrivate && !signed) {
		return <Redirect to="/login" />
	}

	if (!isPrivate && signed) {
		return <Redirect to="/" />
	}

	const Layout = signed ? Private : Public

	return(
		<Route 
			{...rest}
			render={props => (
				<Layout>
					<Component {...props} />
				</Layout>
			)}
		/>
	)
}

export default MyRoute

MyRoute.propTypes = {
	isPrivate: PropTypes.bool,
	component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

MyRoute.defaultProps = {
	isPrivate: false
}