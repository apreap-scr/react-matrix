import React from 'react';

import classes from './DeleteRowCell.module.css'

import BackspaceIcon from '@material-ui/icons/Backspace';

export default class DeleteRowCell extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${classes.block}`}
                onClick={() => this.props.deleteRow(this.props)}>
                <BackspaceIcon />
            </div>
        );
    }
}


