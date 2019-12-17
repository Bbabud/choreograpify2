import React from "react";

describe("Map method", () => {
  it("should add upp all integers", () => {
    const array = [
      { id: 1, x: 1 },
      { id: 2, x: 2 },
      { id: 3, x: 3 }
    ];
    let sum = 0;
    array.map(number => (sum = sum + number.x));
    expect(sum).toBe(6);
  });
});

describe("Filter method", () => {
  it("should remove all but third", () => {
    const array = [
      { id: 1, x: false },
      { id: 2, x: false },
      { id: 3, x: true },
      { id: 4, x: false }
    ];
    const result = array.filter(number => number.x);
    expect(result[0].id).toBe(3);
  });
});
