import React from 'react';

import { CircularProgress } from '@material-ui/core'

import './Loading.scss'

const Loading = () => (
    <>
        <div className="loading">
            <CircularProgress />
        </div>

    </>
)

export default Loading