import { FixedTable } from './components/FixedTable'
import { FixedTableColumn } from './components/FixedTableColumn'
import { FixedTableCell } from './components/FixedTableCell'

export class DataStore {
  constructor (data = [], indexMap = null) {
    this._data = data
    if (indexMap) {
      this._indexMap = indexMap
    } else {
      this._indexMap = Array.apply(null, {length: data.length}).map(Number.call, Number)
    }
  }

  getSize () {
    return this._indexMap.length
  }

  getObjectAt (index) {
    index = this._indexMap[index]
    return this._data[index]
  }

  getAll () {
    let data = []
    for (let i = 0; i < this.getSize(); i++) {
      data.push(this.getObjectAt(i))
    }
    return data
  }

  sortBy (key, reversed = false) {
    let sortedIndexMap = this._indexMap.slice()

    sortedIndexMap.sort((indexA, indexB) => {
      let sortVal
      if (typeof key === 'object') {
        for (let i = 0; i < key.length; i++) {
          sortVal = 0
          let valueA = !isNaN(parseFloat(this._data[indexA][key[i]])) ? parseFloat(this._data[indexA][key[i]]) : this._data[indexA][key[i]]
          let valueB = !isNaN(parseFloat(this._data[indexB][key[i]])) ? parseFloat(this._data[indexB][key[i]]) : this._data[indexB][key[i]]
          if (valueA > valueB) {
            sortVal = 1
          }
          if (valueA < valueB) {
            sortVal = -1
          }
          if (i === 0 && (sortVal !== 0 && reversed === true)) {
            sortVal = sortVal * -1
          }
          if (sortVal !== 0) break
        }
      } else {
        sortVal = 0
        let valueA = !isNaN(parseFloat(this._data[indexA][key])) ? parseFloat(this._data[indexA][key]) : this._data[indexA][key]
        let valueB = !isNaN(parseFloat(this._data[indexB][key])) ? parseFloat(this._data[indexB][key]) : this._data[indexB][key]
        if (valueA > valueB) {
          sortVal = 1
        }
        if (valueA < valueB) {
          sortVal = -1
        }
        if (sortVal !== 0 && reversed === true) {
          sortVal = sortVal * -1
        }
      }
      return sortVal
    })

    return new DataStore(this._data, sortedIndexMap)
  }
}

export { FixedTable, FixedTableColumn, FixedTableCell }
