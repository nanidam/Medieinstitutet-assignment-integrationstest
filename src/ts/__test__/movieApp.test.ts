/**
 * @jest-environment jsdom
 */

import { getData } from "../services/__mocks__/movieservice";

describe("mock of getData", () => {
  test("should reject when given empty string", async () => {
    await expect(getData("")).rejects.toThrowError("Something went wrong");
  });

  test("should return mock movie", async () => {
    expect(await getData("Lego")).toEqual([
      {
        Poster: "n/a",
        Title: "MovieTitle",
        Type: "horror",
        Year: "2023",
        imdbID: "imdb-id",
      },
    ]);
  });
});

describe("handleSubmit", () => {
  test("", () => {});
});
