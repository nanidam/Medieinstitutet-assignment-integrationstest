/**
 * @jest-environment jsdom
 */
import axios from "axios";

// import { handleSubmit } from "../movieApp";
import { movies } from "../services/__mocks__/movieservice";
import * as movieApp from "../movieApp";
import { getData } from "../services/movieservice";
// import { handleSubmit } from "../movieApp";
import { IMovie } from "../models/Movie";

// jest.mock("./../services/movieservice.ts");
jest.mock("axios", () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (!url.endsWith("error")) {
        resolve({ data: { Search: movies } });
      } else {
        reject();
      }
    });
  },
}));

beforeEach(() => {
  document.body.innerHTML = "";
});

describe("init", () => {
  test("should add a submit event listener to the form element", () => {
    const form = document.createElement("form");
    form.id = "searchForm";
    document.body.appendChild(form);

    const spyOnHandleSubmit = jest
      .spyOn(movieApp, "handleSubmit")
      .mockReturnValue(Promise.resolve());

    movieApp.init();
    form.dispatchEvent(new Event("submit"));

    expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
    spyOnHandleSubmit.mockRestore();
  });
});

describe("handleSubmit", () => {
  test("should call on createHtml", async () => {
    //arrange
    const searchText = "SomeRandomMovie";
    // const movies = await getData(searchText);

    const spyOnCreateHtml = jest
      .spyOn(movieApp, "createHtml")
      .mockImplementation();
    document.body.innerHTML = `
      <input type="text" id="searchText" value="${searchText}" /> 
      <div id="movie-container"></div>`;

    //act
    await movieApp.handleSubmit();

    //assert
    expect(spyOnCreateHtml).toHaveBeenCalled();
    spyOnCreateHtml.mockRestore();
  });

  test("should call on displayNoResult", async () => {
    //arrange
    const searchText = "error";
    const spyOnDisplayNoResult = jest
      .spyOn(movieApp, "displayNoResult")
      .mockImplementation();

    document.body.innerHTML = `
    <input type="text" id="searchText" value="${searchText}" /> 
    <div id="movie-container"></div>`;

    //act
    await movieApp.handleSubmit();

    //assert
    expect(spyOnDisplayNoResult).toHaveBeenCalled();
    spyOnDisplayNoResult.mockRestore();
  });

  test("should call displayNoResult when getData fails", async () => {
    // Arrange
    const searchText = "error";
    const spyOnDisplayNoResult = jest
      .spyOn(movieApp, "displayNoResult")
      .mockImplementation();

    document.body.innerHTML = `
      <input type="text" id="searchText" value="${searchText}" />
      <div id="movie-container"></div>`;

    // Act
    await movieApp.handleSubmit();

    // Assert
    // expect(spyOnDisplayNoResult).toHaveBeenCalledWith(
    //   document.getElementById("movie-container")
    // );
    expect(spyOnDisplayNoResult).toHaveBeenCalled();
    spyOnDisplayNoResult.mockRestore();
  });
});

describe("createHtml", () => {
  test("creates elements for each movie and adds them to the container", () => {
    const container: HTMLDivElement = document.createElement("div");

    movieApp.createHtml(movies, container);

    expect(container.children.length).toBe(movies.length);

    for (let i = 0; i < container.children.length; i++) {
      const movie = container.children[i];
      expect(movie.classList.contains("movie")).toBe(true);
      expect(movie.tagName).toBe("DIV");
      expect(movie.children[0].tagName).toBe("H3");
      expect(movie.children[0].innerHTML).toBe(movies[i].Title);
      expect(movie.children[1].tagName).toBe("IMG");
      expect(movie.children[1].getAttribute("src")).toBe(movies[i].Poster);
      expect(movie.children[1].getAttribute("alt")).toBe(movies[i].Title);
    }
  });
});

describe("displayNoResult", () => {
  test("should display no result", () => {
    let container: HTMLDivElement = document.createElement("div");

    movieApp.displayNoResult(container);

    expect(container.children[0].tagName).toBe("P");
    expect(container.children[0].innerHTML).toBe("Inga sökresultat att visa");
    expect(container.children.length).toBe(1);
  });
});
