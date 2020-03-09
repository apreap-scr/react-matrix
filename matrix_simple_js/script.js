

const M = 20;
const N = 20;
const X = 8;


const RowM = M;
const ColN = N;
const NearAmountX = X;


let Matrix = {
    Cell: [],
    Sum: [],
    Average: [],
    AverageSort: [],
    lastId: null,

};


document.addEventListener('DOMContentLoaded', function () {
    initStart()
});


function initStart() {
    document.getElementById("add-new-row").addEventListener("click", () => addNewRow());

    createMatrix()
    matrixViewComplex()
}


function matrixViewComplex() {
    AverageSort()
    matrixSum()
    matrixAverage()
    matrixView()
}


function obCell(ID) {
    Matrix.lastId = ID;
    return { ID, Amount: Math.floor(Math.random() * 1000) }
}


function matrixSum() {
    //=============< Sum >================//
    Matrix.Sum = [];
    for (let i in Matrix.Cell) {
        Matrix.Sum[i] = {
            value: Matrix.Cell[i].reduce((sum, current) => sum + current.Amount, 0),
            idCell: Matrix.Cell[i][0].ID.split("-")[0]
        }
    }
}


function matrixAverage() {
    Matrix.Average = [];
    for (let i in Matrix.Cell[0]) {
        let sum = 0
        for (let j = 0; j < Matrix.Cell.length; j++) {
            sum += Matrix.Cell[j][i].Amount;
        }
        Matrix.Average[i] = Math.round(sum / Matrix.Cell.length)
    }
}


function createMatrix() {
    //----------------< column >-------------------//
    for (let iterRowM = 0; iterRowM < RowM; iterRowM++) {
        Matrix.Cell[iterRowM] = [];
        //---------------< row >---------------// 
        for (let iterColN = 0; iterColN < ColN; iterColN++) {
            Matrix.Cell[iterRowM][iterColN] = obCell(`${iterRowM}-${iterColN}`)
        }
    }
}


function AverageSort() {
    Matrix.AverageSort = []
    for (let i of Matrix.Cell) {
        for (let j of i) {
            Matrix.AverageSort.push(j.Amount)
        }
    }
}


function matrixView() {

    let mainElemMatrix = document.getElementById("matrix");
    mainElemMatrix.innerHTML = '';

    //==============< cell >=============//
    (function () {
        //----------------< column >-------------------//
        let elemColum = document.createElement("div");
        elemColum.setAttribute("class", "matrix__cell");
        let countRowM = 0;
        for (let arrRowM of Matrix.Cell) {
            let elemRow = document.createElement("div");
            elemRow.setAttribute("class", "matrix__cell_row");
            for (let i of arrRowM) {
                let elemCell = document.createElement("div");
                elemCell.setAttribute("id", `matrix__cell_${i.ID}`);
                elemCell.addEventListener("click", () => this.clickCell());
                elemCell.addEventListener("mouseover", () => this.hoverCellMouseover());
                elemCell.addEventListener("mouseout", () => this.hoverCellMouseout());
                elemCell.innerHTML = i.Amount;
                elemRow.appendChild(elemCell);
            }

            //--------  elemDelete ---------
            let elemDelete = document.createElement("div");
            elemDelete.setAttribute("class", "matrix__cell_delete");

            elemDelete.setAttribute("id", `matrix__cell_delete_${arrRowM[0].ID.split("-")[0]}`);
            elemDelete.setAttribute("role", "buttom");
            // img
            let elemImgDelete = document.createElement("i");
            elemImgDelete.setAttribute("class", "fa fa-times");
            elemImgDelete.setAttribute("id", `matrix__cell_deletefa_${arrRowM[0].ID.split("-")[0]}`);
            elemDelete.appendChild(elemImgDelete);
            //---
            elemDelete.addEventListener("click", () => this.deleteRow());

            elemRow.insertBefore(elemDelete, elemRow.childNodes[0]);

            //------------------------------
            elemColum.appendChild(elemRow);
            countRowM++;
        }

        mainElemMatrix.appendChild(elemColum);

    }());

    //==============< sum >=============//
    (function () {
        let elemWrap = document.createElement("div");
        elemWrap.setAttribute("class", "matrix__sum");
        for (let i of Matrix.Sum) {
            let elemRow = document.createElement("div");
            elemRow.innerHTML = i.value;
            elemRow.setAttribute("id", `matrix__sum_${i.idCell}`);
            elemRow.addEventListener("mouseover", () => this.hoverSumMouseover());
            elemRow.addEventListener("mouseout", () => this.hoverSumMouseout());
            elemWrap.appendChild(elemRow);
        }
        mainElemMatrix.appendChild(elemWrap);
    }());

    //==============< average >=============//
    (function () {
        let elemWrap = document.createElement("div");
        elemWrap.setAttribute("class", "matrix__average");
        let idxId = 0;
        for (let i of Matrix.Average) {
            let elemRow = document.createElement("div");
            elemRow.innerHTML = i;
            elemRow.setAttribute("id", `matrix__average_${idxId}`);
            elemWrap.appendChild(elemRow);
            idxId++;
        }
        mainElemMatrix.appendChild(elemWrap);
    }());
}


function addNewRow() {
    Matrix.Cell.unshift(new Array);
    //---------------< row >---------------// 
    const partIdRow = ++Matrix.lastId.split("-")[0]

    for (let iterColN = 0; iterColN < ColN; iterColN++) {
        Matrix.Cell[0][iterColN] = obCell(`${partIdRow}-${iterColN}`)
    }
    matrixViewComplex()
}


function hoverCellMouseout() {
    for (let i of Matrix.Cell) {
        for (let j of i) {
            let cell = document.getElementById(`matrix__cell_${j.ID}`);
            cell.style.background = "#000";
        }
    }
}

function hoverSumMouseout() {
    hoverCellMouseout()
}


function hoverSumMouseover() {

    function visualPercent(e, sum, len) {
        const averSum = sum / len;
        const aver = (e.Amount * 100) / averSum;
        const elemCell = document.getElementById(`matrix__cell_${e.ID}`)
        const pctCell = aver;
        elemCell.style.background = 'linear-gradient(to top, #3437eb ' + pctCell + '%, #eb4034 ' + pctCell + '%)';
    }

    var targetElement = event.target || event.srcElement;
    const ID = targetElement.id.match(/\d+$/)[0] || false;
    const posCell = findArrElemById(`${ID}-0`)
    const sum = document.getElementById(targetElement.id).innerText;
    for (let i of Matrix.Cell[posCell.i]) {
        visualPercent(i, sum, Matrix.Cell[posCell.i].length)
    }
}

function hoverCellMouseover() {
    var targetElement = event.target || event.srcElement;
    const ID = targetElement.id.match(/\d+\-\d+$/)[0] || false;

    //-------------- AverageSort -----------------
    let arr = Matrix.AverageSort;

    let num = targetElement.innerText;
    let m = X; // number of final machines to find

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
    for (let iLog of filteredArr) {
        for (let i of Matrix.Cell) {
            for (let j of i) {
                if (iLog == j.Amount) {
                    let cell = document.getElementById(`matrix__cell_${j.ID}`);
                    cell.style.backgroundColor = "red";
                }
            }
        }
    }
}


function findArrElemById(ID) {
    const x = ID.split("-")[0]
    const y = ID.split("-")[1]
    for (let i in Matrix.Cell) {
        if (Matrix.Cell[i][0].ID.split("-")[0] == x) {
            for (let j in Matrix.Cell[i]) {
                if (Matrix.Cell[i][j].ID == ID) {
                    return { i, j }
                }
            }
        }
    }
}


function clickCell() {
    var targetElement = event.target || event.srcElement;
    const ID = targetElement.id.match(/\d+\-\d+$/)[0] || false;
    const x = ID.split("-")[0]
    const y = ID.split("-")[1]
    let elemInArr = findArrElemById(ID)
    ++Matrix.Cell[elemInArr.i][elemInArr.j].Amount
    matrixViewComplex()
}


function deleteRow() {
    var targetElement = event.target || event.srcElement;
    const numRowDelete = targetElement.id.match(/\d+$/)[0] || [];
    for (let i in Matrix.Cell) {
        if (Matrix.Cell[i][0].ID.split("-")[0] == numRowDelete) {
            Matrix.Cell.splice(i, 1);
            matrixViewComplex()
            return true
        }
    }
}









