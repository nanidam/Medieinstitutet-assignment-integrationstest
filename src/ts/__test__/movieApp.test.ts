/**
 * @jest-environment jsdom
 */
import axios from "axios";

// import { handleSubmit } from "../movieApp";
import { movies } from "../services/__mocks__/movieservice";
import * as movieApp from "../movieApp";
import { getData } from "../services/movieservice";
// import { handleSubmit } from "../movieApp";
import mockAxios from "axios";
import { IMovie } from "../models/Movie";

describe("init", () => {
  it("should add a submit event listener to the form element", () => {
    const form = document.createElement("form");
    form.id = "searchForm";
    document.body.appendChild(form);

    const spyOnHandleSubmit = jest
      .spyOn(movieApp, "handleSubmit")
      .mockReturnValue(Promise.resolve());

    movieApp.init();
    form.dispatchEvent(new Event("submit"));

    expect(spyOnHandleSubmit).toHaveBeenCalledTimes(1);
  });
});

// describe("handleSubmit", () => {
//   test("", async () => {
//     //arrange
//     const searchText = "test";
//     const movies = await getData(searchText);
//     document.body.innerHTML = `
//     <input type="text" id="searchText" placeholder="Skriv titel här" />
//     <div id="movie-container"></div>
//     `;
//     const spy1 = jest.spyOn(movieApp, "createHtml").mockReturnValue;
//     const spy2 = jest.spyOn(movieApp, "displayNoResult").mockReturnValue;

//     //act
//     await movieApp.handleSubmit();

//     //assert
//     expect(spy1).toHaveBeenCalled();
//   });
// });

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
    const container: HTMLDivElement = document.createElement("div");
    movieApp.displayNoResult(container);
    expect(container.children[0].tagName).toBe("P");
    expect(container.children[0].innerHTML).toBe("Inga sökresultat att visa");
    expect(container.children.length).toBe(1);
  });
});
