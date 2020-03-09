import React from 'react';
import classes from './Matrix.module.css'
import Row from './Row/Row';
import RowAver from './RowAver/RowAver';
import Button from '@material-ui/core/Button';


class MatrixData {

    constructor() {
    }

    _amountCell = () => Math.floor(Math.random() * 1000)

    _row = (id, cellArr, sum = false) => {
        return { id, cellArr, sum }
    }

    colAver = (id, val) => {
        return { id, val }
    }

    _cell = (id, val) => {
        return { id, val }
    }

    _cellId = (idRow, idCol) => {
        return { idRow, idCol }
    }

    createNewRow = (idRow) => {
        let rowValue = []
        for (let idxIdCol = 0; idxIdCol < this.dataCol; idxIdCol++) {
            const cellId = this._cellId(idRow, idxIdCol)
            const cell = this._cell(cellId, this._amountCell())
            rowValue.push(cell)
        }
        return this._row(idRow, rowValue)
    }
}


class MatrixMain extends MatrixData {

    constructor(dataCol, dataRow, dataXNearVal) {
        super();
        this.idRowUnique = 0;
        this.dataRow = dataRow;
        this.dataCol = dataCol;
        this.matrix = {
            rowArr: [],
            colAverArr: null,
            arrAllValues: null,
            dataXNearVal
        }
    }

    getIdRowUnique() {
        return this.idRowUnique++;
    }

    calcSumAll() {
        for (let i of this.matrix.rowArr) {
            i.sum = i.cellArr.reduce((sum, current) => sum + current.val, 0)
        }
    }

    calcAver(colName) {
        let sum = 0
        let countIter = 0
        for (let i of this.matrix.rowArr) {
            sum += i.cellArr[colName].val
            countIter++
        }
        return Math.round(sum / countIter)
    }

    calcAverAll() {
        this.matrix.colAverArr = []
        if (this.matrix.rowArr[0].cellArr.length < 1) {
            return false
        }
        for (let i of this.matrix.rowArr[0].cellArr) {
            this.matrix.colAverArr.push(this.colAver(i.id.idCol, this.calcAver(i.id.idCol)))
        }
    }

    createMatrixAtTheBegin() {
        for (let i = 0; i < this.dataRow; i++) {
            this.matrix.rowArr.push(this.createNewRow(this.getIdRowUnique()))
        }
        this.dynamicAll()
    }

    pushArrAllValues() {
        this.matrix.arrAllValues = []
        for (let i of this.matrix.rowArr) {
            for (let j of i.cellArr) {
                this.matrix.arrAllValues.push(j.val)
            }
        }
    }

    // -------------- dynamic ---------------//
    createMatrixAddNewRow() {
        this.matrix.rowArr.push(this.createNewRow(this.getIdRowUnique()))
        this.dynamicAll()
    }

    deleteRow(id) {
        if (this.matrix.rowArr.length <= 1) {
            return false
        }
        for (let i in this.matrix.rowArr) {
            if (this.matrix.rowArr[i].id == id) {
                this.matrix.rowArr.splice(i, 1);
                break
            }
        }
        this.dynamicAll()
    }

    dynamicAll() {
        this.calcSumAll()
        this.calcAverAll()
        this.pushArrAllValues()
    }

    // ----------------------------------------//

    get matrixReady() {
        return this.matrix
    }
}


export default class MatrixComponent extends React.Component {
    constructor(props) {
        super(props);
        this.cellRef = React.createRef();
        // ****************** matrix ********************* //
        this.matrix = new MatrixMain(20, 15, 8);
        this.matrix.createMatrixAtTheBegin()
        this.state = { matrixReady: this.matrix.matrixReady }
        // ********************************************** //
    }
    // ----------------------- Row ------------------------//
    addNewRow = () => {
        this.matrix.createMatrixAddNewRow()
        this.state = { matrixReady: this.matrix.matrixReady }
        this.setState({});
    }

    deleteRow = (e) => {
        this.matrix.deleteRow(e)
        this.state = { matrixReady: this.matrix.matrixReady }
        this.setState({});
    }
    // ----------------------- Cell Sum ------------------------//
    mouseOverCellSum = (e) => {
        for (let i in this.state.matrixReady.rowArr) {
            if (this.state.matrixReady.rowArr[i].id == e) {
                const sum = this.state.matrixReady.rowArr[i].sum
                const len = this.state.matrixReady.rowArr[i].cellArr.length
                const averSum = sum / len;
                for (let j of this.state.matrixReady.rowArr[i].cellArr) {
                    const id = `cell-${j.id.idRow}-${j.id.idCol}`
                    const node = document.getElementById(id);
                    const aver = (j.val * 100) / averSum;
                    node.style.background = 'linear-gradient(to top, #3437eb ' + aver + '%, #eb4034 ' + aver + '%)';
                }
            }
        }
    }
    mouseOutCellSum = (e) => {
        for (let i in this.state.matrixReady.rowArr) {
            if (this.state.matrixReady.rowArr[i].id == e) {
                for (let j of this.state.matrixReady.rowArr[i].cellArr) {
                    const id = `cell-${j.id.idRow}-${j.id.idCol}`
                    const node = document.getElementById(id);
                    node.style.background = "#000";
                }
            }
        }
    }

    // ----------------------- cell ------------------------//
    mouseOverCell = (id, val) => {
        //-------------- AverageSort -----------------
        let arr = this.state.matrixReady.arrAllValues
        // let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        let num = val // num in arr, position
        let m = this.state.matrixReady.dataXNearVal; // number of final machines to find

        // Create an array of objects storing the original arr + diff from `num`
        const diff = arr.map(item => {
            return { id: item, diff: Math.abs(+item - +num) };
        });

        // Sort by difference from `num` (lowest to highest)
        diff.sort((a, b) => a.diff - b.diff);

        // Get the first m entries
        const filteredArr = diff.slice(0, m).map(item => item.id).sort();

        // Log
        // console.log(filteredArr);
        //------------------------------------------------
        for (let i of this.state.matrixReady.rowArr) {
            for (let j of i.cellArr) {
                for (let x of filteredArr) {
                    if (x == j.val) {
                        let cell = document.getElementById(`cell-${j.id.idRow}-${j.id.idCol}`);
                        cell.style.backgroundColor = "red";
                    }
                }
            }
        }
    }

    mouseOutCell = (e) => {
        for (let i of this.state.matrixReady.rowArr) {
            for (let j of i.cellArr) {
                let cell = document.getElementById(`cell-${j.id.idRow}-${j.id.idCol}`);
                cell.style.backgroundColor = "#000000";
            }
        }
    }

    cellClick = (e) => {
        for (let i in this.state.matrixReady.rowArr) {
            if (this.state.matrixReady.rowArr[i].id == e.id.idRow) {
                this.state.matrixReady.rowArr[i].cellArr[e.id.idCol].val++
                this.matrix.dynamicAll()
                this.setState({});
                break
            }
        }
    }
    // ---------------------------------------------------- //

    createTable = () => {
        let table = []
        for (let i of this.state.matrixReady.rowArr) {
            table.push(< Row
                cellRef={this.cellRef}
                cellClick={this.cellClick}
                mouseOverCellSum={this.mouseOverCellSum}
                mouseOutCellSum={this.mouseOutCellSum}
                mouseOverCell={this.mouseOverCell}
                mouseOutCell={this.mouseOutCell}
                deleteRow={this.deleteRow}
                row={i} />)
        }
        table.push(< RowAver row={this.state.matrixReady.colAverArr} />)
        return table
    }

    render() {
        return (
            <div className={`${classes.wrapper}`}>

                <Button
                    onClick={() => this.addNewRow()}
                    variant="contained" color="primary"
                    className={classes.addNewRow}>
                    Add New Row
                </Button>

                <div className={`${classes['block-matrix']}`}>
                    {this.createTable()}
                </div>
            </div>
        );
    }
}

