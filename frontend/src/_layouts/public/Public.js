import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

function Public({children}) {
	return(
		<Fragment>
			{children}
		</Fragment>
	)
}

export default Public

Public.propTypes = {
	children: PropTypes.element.isRequired
}