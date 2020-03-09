import React from 'react';

import Cell from './Cell/Cell';
import SumCell from './SumCell/SumCell';
import DeleteRowCell from './DeleteRowCell/DeleteRowCell';
import classes from './Row.module.css'


export default class Row extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        // let table = []

        // for (let j of this.props.row.cellArr) {
        //     table.push(< Cell
        //         cellClick={this.props.cellClick}
        //         cellRef={this.props.cellRef}
        //         cellVal={j} />)
        // }


        let table = this.props.row.cellArr.map((j, index) =>
            < Cell

                mouseOverCell={this.props.mouseOverCell}
                mouseOutCell={this.props.mouseOutCell}

                key={index}
                cellClick={this.props.cellClick}
                cellRef={this.props.cellRef}
                cellVal={j}
            />
        );

        table.push(< SumCell
            mouseOverCellSum={() => this.props.mouseOverCellSum(this.props.row.id)}
            mouseOutCellSum={() => this.props.mouseOutCellSum(this.props.row.id)}
            val={this.props.row.sum} />)
        table.push(< DeleteRowCell
            deleteRow={() => this.props.deleteRow(this.props.row.id)} />)
        return table
    }

    render() {
        return (
            <div className={`${classes.block}`}>
                {this.createTable()}
            </div>
        );
    }
}


