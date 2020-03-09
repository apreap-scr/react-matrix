import React from 'react';

import classes from './Cell.module.css'


export default class Cell extends React.Component {
    constructor(props) {
        super(props);
    }


    createTable = () => {
        const id = this.props.cellVal.id
        const nameId = `cell-${id.idRow}-${id.idCol}`
        return <div
            ref={this.props.cellRef}
            id={nameId}
            onClick={() => this.props.cellClick(this.props.cellVal)}

            onMouseOver={() => this.props.mouseOverCell(nameId, this.props.cellVal.val)}
            onMouseOut={() => this.props.mouseOutCell(nameId, this.props.cellVal.val)}
        >
            {this.props.cellVal.val}
        </div>
    }

    render = () => {
        return (
            <div className={`${classes.block}`}>
                {this.createTable()}
            </div>
        );
    }
}


