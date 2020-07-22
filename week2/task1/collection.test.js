const Collection = require('./collection');

it('should create collection of numbers', () => {
    const numbers = new Collection();

    numbers.append(10);
    numbers.append(20);

    expect(numbers.values()).toEqual([10, 20]);
});

it('should create collection of letters through Collection.from', () => {
    const letters = Collection.from(['a', 'b', 'c']);

    letters.append('d');

    expect(letters.count()).toEqual(4);
    expect(letters.values()).toEqual(['a', 'b', 'c', 'd']);
});

it('should create mixed collection', () => {
    const items = new Collection();
    const numbers = Collection.from([10, 20]);
    const letters = Collection.from(['a', 'b', 'c', 'd']);

    items.append(numbers);
    items.append(letters);

    expect(items.count()).toEqual(6);
    expect(items.values()).toEqual([10, 20, 'a', 'b', 'c', 'd']);
});

describe('Collection.prototype.at', () => {
    const items = new Collection();
    const numbers = Collection.from([10, 20]);
    const letters = Collection.from(['a', 'b', 'c', 'd']);

    items.append(numbers);
    items.append(letters);

    test('if get zero element', () => {
        expect(items.at(0)).toEqual(null);
    });

    test('if get 1st element', () => {
        expect(items.at(1)).toEqual(10);
    });
});

describe('Collection.prototype.removeAt', () => {
    const items = new Collection();
    const numbers = Collection.from([10, 20]);
    const letters = Collection.from(['a', 'b', 'c', 'd']);

    items.append(numbers);
    items.append(letters);

    test('if remove the 1st element', () => {
        expect(items.removeAt(1)).toEqual(true);
    });

    test('if remove the 4th element', () => {
        expect(items.removeAt(4)).toEqual(true);
    });
});