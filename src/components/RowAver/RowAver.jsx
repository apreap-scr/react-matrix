import React from 'react';
import Cell from './Cell/Cell';
import classes from './RowAver.module.css'


export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        let table = []
        for (let j of this.props.row) {

            table.push(< Cell cellVal={j.val} />)
        }
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


