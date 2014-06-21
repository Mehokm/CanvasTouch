Array.prototype.equals = function(array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = this.length - 1; i >= 0; i--) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        } else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

Array.prototype.contains = function(a) {
    if (!a instanceof Array) {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] === a) {
                return true;
            }
        }
        return false;
    } else {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i].equals(a)) {
                return true;
            }
        }
        return false;
    }
};
