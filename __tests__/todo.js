/* eslint-disable no-undef */
const todoList = require("../todo");
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List Test Suite", () => {
  beforeAll(() => {
    const thisday = new Date();
    const sec_in_day = 86400000;
    [
      {
        title: "Prepare for Exam",
        completed: false,
        dueDate: new Date(thisday.getTime() - sec_in_day).toLocaleDateString(
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
        dueDate: new Date(thisday.getTime() + sec_in_day).toLocaleDateString(
          "en-CA"
        ),
      },
    ].forEach(add);
  });
  test("checks creating a new todo", () => {
    expect(all.length).toEqual(3);
    add({
      title: "Go Buy Bred",
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

  test("checks retrieval of due today items", () => {
    expect(dueToday().length).toEqual(2);
  });

  test("checks retrieval of due later items", () => {
    expect(dueLater().length).toEqual(1);
  });
});
