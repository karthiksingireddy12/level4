/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, duethis_day, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const this_day = new Date();
    const daysec = 86400000;
    [
      {
        title: "Prepare for Exam",
        completed: false,
        dueDate: new Date(this_day.getTime() - daysec).toLocaleDateString(
          "en-CA"
        ),
      },
      {
        title: "Pay rent",
        completed: false,
        dueDate: new Date().toLocaleDateString("en-CA"),
      },
      {
        title: "Submit assignment",
        completed: false,
        dueDate: new Date(this_day.getTime() + daysec).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("checks creating a new todo", () => {
    expect(all.length).toEqual(3);
    add({
      title: "Go Buy Bread",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toEqual(4);
  });

  test("checks marking a todo as completed", () => {
    expect(all[0].completed).toEqual(false);
    markAsComplete(0);
    expect(all[0].completed).toEqual(true);
  });

  test("checks retrieval of overdue items", () => {
    expect(overdue().length).toEqual(1);
  });

  test("checks retrieval of due this_day items", () => {
    expect(duethis_day().length).toEqual(2);
  });

  test("checks retrieval of due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});