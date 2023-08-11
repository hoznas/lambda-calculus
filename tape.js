const GET_VALUE = (cell) => IF(IS_NIL(CELL))(ZERO)(LEFT(CELL));

console.log('--GET_VALUE--');
console.log(TO_INT(GET_VALUE(NIL)));
console.log(TO_INT(GET_VALUE(CELL(ONE)(TWO))));
