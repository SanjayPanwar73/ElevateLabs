const express = require('express');
const app = express();
const PORT = 8000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static('public'));


// In-memory data store
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin" },
  { id: 4, title: "Deep Work", author: "Cal Newport" },
  { id: 5, title: "You Don't Know JS", author: "Kyle Simpson" },
  { id: 6, title: "The Lean Startup", author: "Eric Ries" },
  { id: 7, title: "Refactoring", author: "Martin Fowler" },
  { id: 8, title: "Thinking, Fast and Slow", author: "Daniel Kahneman" },
  { id: 9, title: "The Art of Computer Programming", author: "Donald Knuth" },
  { id: 10, title: "Zero to One", author: "Peter Thiel" },
  { id: 11, title: "The Mythical Man-Month", author: "Frederick P. Brooks Jr." },
  { id: 12, title: "Design Patterns", author: "Erich Gamma" },
  { id: 13, title: "JavaScript: The Good Parts", author: "Douglas Crockford" },
  { id: 14, title: "Don't Make Me Think", author: "Steve Krug" },
  { id: 15, title: "Hooked", author: "Nir Eyal" },
  { id: 16, title: "Grit", author: "Angela Duckworth" },
  { id: 17, title: "The 7 Habits of Highly Effective People", author: "Stephen R. Covey" },
  { id: 18, title: "Eloquent JavaScript", author: "Marijn Haverbeke" },
  { id: 19, title: "Soft Skills", author: "John Sonmez" },
  { id: 20, title: "The Phoenix Project", author: "Gene Kim" }
];


app.get('/books', (req, res) => {
  res.status(200).json(books);
});


app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (author) book.author = author;

  res.status(200).json(book);
});


app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(index, 1);
  res.status(200).json(deletedBook[0]);
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});