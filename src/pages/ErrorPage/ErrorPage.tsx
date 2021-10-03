import React from 'react';
import PropTypes from 'prop-types';
import './ErrorPage.css';


function ErrorPage({ message }) {
    return (
        <div className="errorWrapper">
            <div>
                <h1 className="errorTitle">An Error has occurred</h1>
                <p className="errorMessage">{message}</p>
            </div>
        </div>
    )
}

ErrorPage.propTypes = {
    error: PropTypes.object
}



export default ErrorPage

