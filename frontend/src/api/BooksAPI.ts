import { Book } from "../types/Books";

const API_URL = `https://mission13.azurewebsites.net/books`;

interface FetchBooksResponse {
  books: Book[];
  booksCount: number;
  sortBy: string;
  sortDirection: string;
}

export const fetchBooks = async (
  rowNum: number,
  pageNum: number,
  sortBy: string,
  sortDirection: string,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `categoryTypes=${encodeURIComponent(cat)}`)
      .join("&");

    const response = await fetch(
      `${API_URL}?rownum=${rowNum}&pagenum=${pageNum}&sortBy=${sortBy}&sortDirection=${sortDirection}${selectedCategories.length ? "&" + categoryParams : ""}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Books:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add Book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding book", error);
    throw error;
  }
};

export const updateBook = async (
  bookId: number,
  updateBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBook),
    });
    if (!response.ok) {
      throw new Error("Failed to updating Book");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating book", error);
    throw error;
  }
};

export const deleteBook = async (bookId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete Book");
    }
    // return await response.json();
  } catch (error) {
    console.error("Error deleting book", error);
    throw error;
  }
};
