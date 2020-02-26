import { OrderByDatePipe } from "./order-by-date.pipe";

describe("OrderByDatePipe", () => {
  it("create an instance", () => {
    const pipe = new OrderByDatePipe();
    expect(pipe).toBeTruthy();
  });
});
