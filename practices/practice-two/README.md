# Shopping Carts

### Overview

- This is a website that allows users to make purchases. Here users can search for the products they like on the website.
- Design:
  - Book Marker [here](https://www.figma.com/file/csmgT3kp1rqDqO5IkZnq5A/Book-Marker-v1---Javascript-practice?node-id=0-1&t=fdLZzp2GKNADTxtB-0)
- Plan: [here](https://docs.google.com/document/d/1L8bW_gIywHV7WLzioBdiIE2B84k7C-ftIM69KlJyE7g/edit?usp=sharing)

### Targets

- Apply HTML/CSS/TypeScript/ReactJs trained knowledge to build a website
- Unit test
- Storybook

### Requirements

- Use basic hooks
- Custom hooks
- Json server
- Users can view the list of books available in the system.
- For each book, users can see some information about the book such as: Book title, author, publication date.
- User can view details of any book when clicking (/books/id_of_book)
- Users can search by all the above fields, filter A-Z, Z-A by name.
- Add new book: User can create a new book with Name, Author, Publication Date, Image.
- Edit Book:
  - User can edit any book.
  - Entering the name will show a list of recommendations about the book, if the user clicks on it, it will apply the book to the necessary fields
- Delete Book: User can delete any book, and will display a confirmation dialog to confirm deletion.
- Use unit tests with 90% coverage.
- Use Storybook for components/hooks/layouts/utils.
- Use 3rd party to upload photos (Imgur/ImgBB)

### Information

- Timeline
  - Estimate day: 5 days
  - Actual time: Update to late
- Techniques:
  - HTML5/CSS [last version](https://html.spec.whatwg.org/multipage/)
  - TypeScript [v4.9.5](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - React [v18.2.0](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)
  - JSON server [v0.17.3](https://www.npmjs.com/package/json-server)
  - localStorage
  - Vite [v4.2.0](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)
  - Eslint [v8.0.1](https://eslint.org/docs/latest/use/getting-started#quick-start)
  - Prettier [v2.8.7](https://prettier.io/docs/en/install.html)
  - Jest [v29.5.0](https://jestjs.io/docs/getting-started)
  - Ts-jest [v29.0.5](https://kulshekhar.github.io/ts-jest/docs/getting-started/installation)
  - React-testing [v14.0.0](https://testing-library.com/docs/react-testing-library/intro/)
- Editor: Visual Studio Code.

### Development Environment

- Node [v16.19.1](https://nodejs.org/en/)
- pnpm [v7.24.0](https://pnpm.io/installation)

### Main App Features

- Home:
  - View all books
  - Search and filter books
  - Create a new book
  - Delete books
- Detail:
  - View detail books
  - Update book
  - Delete books

### Getting Started

- Step 1: Clone repository
  - With HTTPS :
    ```
    git clone https://gitlab.asoft-python.com/duong.pham/reactjs-training.git
    ```
  - With SSH:
    ```
    git clone git@gitlab.asoft-python.com:duong.pham/reactjs-training.git
    ```
- Step 2: Move to folder
  ```
  cd reactjs-training
  ```
- Step 3: Move to branch feature/practice-two
  ```
  git checkout feature/practice-two
  ```
- Step 4: Move to folder
  ```
  cd  practices/practice-two
  ```
- Step 5: Now you need to install packages
  ```
  pnpm install
  ```
- Step 6: After installing the packages
  ```
  pnpm start
  ```
- Step 7: Open [localhost](http://localhost:5173/books) to see the website
