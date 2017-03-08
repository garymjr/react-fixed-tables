import { FixedTable } from './components/FixedTable'
import { FixedTableColumn } from './components/FixedTableColumn'
import { FixedTableCell } from './components/FixedTableCell'

export class DataStore {
  constructor (data = [], indexMap = null) {
    this._data = data
    this._indexMap = indexMap
  }

  getSize () {
    if (this._indexMap) {
      return this._indexMap.length
    } else {
      return this._data.length
    }
  }

  getObjectAt (index) {
    if (this._indexMap) {
      return this._data[this._indexMap[index]]
    } else {
      return this._data[index]
    }
  }

  getAll () {
    if (this._indexMap) {
      let data = []
      for (let i = 0; i < this.getSize(); i++) {
        data.push(this.getObjectAt(i))
      }
      return data
    } else {
      return this._data
    }
  }
}

export { FixedTable, FixedTableColumn, FixedTableCell }
