/**
 * @jest-environment jsdom
 */

import { getData } from "../services/movieservice";
import { movies } from "../services/__mocks__/movieservice";

jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (!url.endsWith("error")) {
        resolve({ data: { Search: movies } });
      } else {
        reject([]);
      }
    });
  },
}));

describe("getData", () => {
  test("should return empty []", async () => {
    const result = await getData("error");
    expect(result.length).toBe(0);
  });

  test("should get mock data", async () => {
    const result = await getData("Allstar");

    expect(result).toEqual([
      {
        Poster: "n/a",
        Title: "MovieTitle1",
        Type: "horror",
        Year: "2023",
        imdbID: "imdb-1337",
      },
      {
        Poster: "n/a",
        Title: "MovieTitle2",
        Type: "drama",
        Year: "1650",
        imdbID: "imdb-0000",
      },
    ]);
  });
});
