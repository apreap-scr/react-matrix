import React from 'react';
import classes from './SumCell.module.css'


export default class SumCell extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        return <div
            onMouseOver={() => this.props.mouseOverCellSum()}
            onMouseOut={() => this.props.mouseOutCellSum()}
        >{this.props.val}
        </div>
    }

    render() {
        return (
            <div className={`${classes.block}`}>
                {this.createTable()}
            </div>
        );
    }
}


