import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

function Private({children}) {
	return(
		<Fragment>
			<Header/>
			{children}
		</Fragment>
	)
}

export default Private

Private.propTypes = {
	children: PropTypes.element.isRequired
}