import { FixedTable } from "./components/FixedTable";
import { FixedTableColumn } from "./components/FixedTableColumn";
import { FixedTableCell } from "./components/FixedTableCell";

export class DataStore {
    constructor(data) {
        if (data) {
            this._data = data;
        } else {
            this._data = [];
        }
    }

    getSize() {
        return this._data.length;
    }

    getObjectAt(index) {
        if (index >= this._data.length) {
            return undefined;
        }
        return this._data[index];
    }

    getAll() {
        return this._data;
    }

    sortBy(key, reversed = false, isNum = false) {
        let sortedData = this._data.slice();
        sortedData.sort((objA, objB) => {
            let sortVal;
            if (typeof key === "object") {
                for (let i = 0; i < key.length; i++) {
                    sortVal = 0;
                    let valueA = isNum ? parseFloat(objA[key[i]]) : objA[key[i]];
                    let valueB = isNum ? parseFloat(objB[key[i]]) : objB[key[i]];
                    if (valueA > valueB) {
                        sortVal = 1;
                    }
                    if (valueA < valueB) {
                        sortVal = -1;
                    }
                    if (i === 0 && (sortVal !== 0 && reversed === true)) {
                        sortVal = sortVal * -1;
                    }
                    if (sortVal !== 0) break;
                }
            } else {
                sortVal = 0;
                let valueA = isNum ? parseFloat(objA[key]) : objA[key];
                let valueB = isNum ? parseFloat(objB[key]) : objB[key];
                if (valueA > valueB) {
                    sortVal = 1;
                }
                if (valueA < valueB) {
                    sortVal = -1;
                }
                if (sortVal !== 0 && reversed === true) {
                    sortVal = sortVal * -1;
                }
            }
            return sortVal;
        });

        return new DataStore(sortedData);
    }
}

export class DataListWrapper {
    constructor(indexMap, data) {
        this._indexMap = indexMap;
        this._data = data;
    }

    getSize() {
        return this._indexMap.length;
    }

    getObjectAt(index) {
        return this._data[this._indexMap[index]];
    }

    getAll() {
        let data = [];
        for (let i = 0; i < this.getSize(); i++) {
            data.push(this.getObjectAt(i));
        }
        return data;
    }

    sortBy(key, reversed = false, isNum = false) {
        let sortedIndexMap = this._indexMap.slice();
        sortedIndexMap.sort((indexA, indexB) => {
            let valueA = isNum ? parseFloat(this._data[indexA][key]) : this._data[indexA][key];
            let valueB = isNum ? parseFloat(this._data[indexB][key]) : this._data[indexB][key];
            let sortVal = 0;
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
            if (sortVal !== 0 && reversed === true) {
                sortVal = sortVal * -1;
            }
            return sortVal;
        });

        return new DataListWrapper(sortedIndexMap, this._data);
    }
}

export { FixedTable, FixedTableColumn, FixedTableCell };