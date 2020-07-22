/**
 * Constructor of collection
 * @constructor
 */
function Collection() {
    this._data = [];
}

/**
 * Create collection from array
 * @param {Array} arr - Array of elements
 * @method
 * @return Collection
 */
Collection.from = function(arr) {
    const inst = new Collection();

    for (let val of arr) {
        inst.append(val);
    }

    return inst;
};

/**
 * Append element to collection
 * @param {Array} val - new element of collection
 * @method
 * @return void
 */
Collection.prototype.append = function(val) {
    if (val instanceof Collection) {
        this._data.push(...val._data);
    } else {
        this._data.push(val);
    }
};

/**
 * Return length of collection
 * @method
 * @return number
 */
Collection.prototype.count = function() {
    return this._data.length;
}

/**
 * Return array of elements
 * @method
 * @return Array
 */
Collection.prototype.values = function() {
    return [...this._data];
}

/**
 * Returns the element at the given position.
 * @param {number} pos - position
 * @method
 * @return any
 */
Collection.prototype.at = function(pos) {
    return pos >= 1 && pos <= this.count() ? this._data[pos - 1] : null;
}

/**
 * Remove the element at the given position.
 * @param {number} pos - position
 * @method
 * @return any
 */
Collection.prototype.removeAt = function(pos) {
    return pos >= 1 && pos <= this.count() && this._data.splice(pos - 1, 1).length === 1;
}

module.exports = Collection;