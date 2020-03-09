import React from 'react';

import classes from './Cell.module.css'


class Cell extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        // console.log("cellVal: ", this.props)
        return <div>{this.props.cellVal}</div>
    }

    render() {
        return (
            <div className={`${classes.block}`}>
                {this.createTable()}
            </div>
        );
    }
}


export default Cell;
