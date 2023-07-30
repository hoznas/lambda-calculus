var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Cell = /** @class */ (function () {
    function Cell(value, next) {
        this.value = value;
        this.next = next;
    }
    return Cell;
}());
var getTopValue = function (cell) {
    if (cell)
        return cell.value;
    else
        return 0;
};
var getNext = function (cell) {
    if (cell)
        return cell.next || new Cell(0);
    else
        return new Cell(0);
};
var reduceList = function (f, init, list) {
    if (list) {
        return reduceList(f, f(init, list.value), list.next);
    }
    else {
        return init;
    }
};
var toArray = function (cell) {
    return reduceList(function (x, y) {
        x.push(y);
        return x;
    }, [], cell);
};
var TuringMachine = /** @class */ (function () {
    function TuringMachine(current, left, right) {
        if (current === void 0) { current = 0; }
        if (left === void 0) { left = undefined; }
        if (right === void 0) { right = undefined; }
        this.current = current;
        this.left = left;
        this.right = right;
        this.left = left;
        this.right = right;
    }
    TuringMachine.prototype.moveRight = function () {
        var newCurrent = getTopValue(this.right);
        var newRight = this.right && getNext(this.right);
        var newLeft = new Cell(this.current, this.left && this.left);
        return new TuringMachine(newCurrent, newLeft, newRight);
    };
    TuringMachine.prototype.moveLeft = function () {
        var newCurrent = getTopValue(this.left);
        var newLeft = this.left && getNext(this.left);
        var newRight = new Cell(this.current, this.right && this.right);
        return new TuringMachine(newCurrent, newLeft, newRight);
    };
    TuringMachine.prototype.increment = function () {
        var newCurrent = this.current + 1;
        return new TuringMachine(newCurrent, this.left, this.right);
    };
    TuringMachine.prototype.decrement = function () {
        var newCurrent = this.current - 1;
        return new TuringMachine(newCurrent, this.left, this.right);
    };
    TuringMachine.prototype.output = function () {
        console.log(this.current);
        return this;
    };
    TuringMachine.prototype.Input = function (value) {
        return new TuringMachine(value, this.left, this.right);
    };
    TuringMachine.prototype.getCurrent = function () {
        return this.current;
    };
    TuringMachine.prototype.printAll = function () {
        console.log(__spreadArray(__spreadArray(__spreadArray([], toArray(this.left).reverse(), true), [
            [this.current]
        ], false), toArray(this.right), true));
        return this;
    };
    TuringMachine.prototype.evalCommands = function (commands) {
        var tm = this;
        commands.forEach(function (command) {
            tm = tm.evalCommand(command);
            console.log(tm);
        });
        return tm;
    };
    TuringMachine.prototype.evalCommand = function (command) {
        if (command === '>') {
            return this.moveRight();
        }
        else if (command === '<') {
            return this.moveLeft();
        }
        else if (command === '+') {
            return this.increment();
        }
        else if (command === '-') {
            return this.decrement();
        }
        else if (command === '.') {
            return this.output();
        }
        else if (command === ',') {
            return this.Input(0);
        }
        else if (Array.isArray(command)) {
            return this.evalLoop(command);
        }
        throw new Error('Invalid command');
    };
    TuringMachine.prototype.evalLoop = function (commands) {
        var tm = this;
        while (tm.getCurrent() !== 0) {
            tm = tm.evalCommands(commands);
        }
        return tm;
    };
    return TuringMachine;
}());
var tm = new TuringMachine();
tm.printAll();
tm.increment().printAll();
tm.increment().increment().moveRight().printAll();
tm.increment().increment().moveRight().increment().printAll();
tm.increment().increment().moveRight().increment().moveRight().printAll();
tm.increment().increment().moveLeft().increment().moveLeft().printAll();
console.log('--------------------');
var input = [0, 1, 2, 3, 4, 5];
var commands = ['+', '+', '+', ['-', '>', '+', '+', '<'], '>', '.'];
tm.evalCommands(commands).printAll();
