import React, { useEffect, useState } from 'react';
import ProfileAvatar from '../components/avatar';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Books');
  const [addedBooks, setAddedBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    if (data && data.books) {
      setAllBooks(data.books);
    }
  }, [data]);

  useEffect(() => {
    if (searchTerm) {
      if (selectedCategory === 'All Books') {
        let filteredBooks = allBooks.filter((book) =>
          book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setAllBooks(filteredBooks);
      } else {
        let filteredBooks = addedBooks.filter((book) =>
          book.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setAddedBooks(filteredBooks);
      }
    } else {
      setAllBooks(data ? data.books : []);
    }
  }, [searchTerm, selectedCategory, data]);

  const handleBook = (title) => {
    if (selectedCategory === 'All Books') {
      let selected = allBooks.find((book) => book.title === title);
      setAddedBooks([...addedBooks, selected]);
    } else {
      setAddedBooks((prev) => prev.filter((book) => book.title !== title));
    }
  };

  const isAdded = (title) => {
    return addedBooks.some((book) => book.title === title);
  };

  const categories = {
    'All Books': allBooks,
    'Reading List': addedBooks,
  };

  return (
    <div className="h-full flex flex-col gap-7.5">
      <div className='flex items-center justify-between h-15'>
        <h3 className='text-3xl font-black text-turquoise'>Library</h3>
        <div className='flex items-center gap-2.5'>
          <ProfileAvatar first_name="John" last_name="Doe" />
          <span className='text-sm font-semibold'>Welcome back, Mr. John Doe 😀</span>
        </div>
      </div>
      <div className='flex gap-7.5 h-full'>
        <div className='flex flex-col gap-5 flex-grow shadow-solid-6 bg-white rounded-md w-full'>
          <div className='flex h-10 mt-5 items-center gap-7.5 w-full justify-between p-2.5'>
            <h4 className='text-xl text-turquoise'>Books</h4>
            <input onChange={(e) => setSearchTerm(e.target.value)} className='w-full border border-solid border-bordercolor p-2 rounded-md-min' placeholder='Search...' />
          </div>

          {
            loading?(
                <CircularProgress />
            ):(
                <div className='flex flex-col p-2.5 gap-4'>
                <div className='flex items-center'>
                  {Object.keys(categories).map((category) => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className={`p-2.5 gap-2.5 flex items-center justify-center text-base border-b-2 border-solid ${category === selectedCategory ? 'border-b-turquoise font-bold' : 'border-b-bordercolor'}`}>
                      {category === 'All Books' ? <LibraryBooksIcon /> : <AutoStoriesIcon />}
                      <span>{category} ({categories[category].length})</span>
                    </button>
                  ))}
                </div>
                <div className='block'>
                  <Grid container spacing={2}>
                    {categories[selectedCategory].map((book, index) => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <div className='flex flex-col items-center p-2.5 border border-bordercolor border-solid rounded-md-min'>
                          <img src={book.coverPhotoURL} alt={book.title} />
                          <span className='text-steelblue h-[48px] text-center text-base font-black'>{book.title}</span>
                          <span className='italics text-sm'>by {book.author}</span>
                          {isAdded(book.title) && selectedCategory === 'All Books' ? (
                            <div className='flex items-center gap-2 text-teal mt-2.5'><AutoStoriesIcon /></div>
                          ) : (
                            <button onClick={() => handleBook(book.title)} className='h-10 mt-2.5 w-full flex items-center justify-center rounded-md text-sm font-semibold text-white bg-turquoise hover:bg-turquoiselight hover:text-orange border-none'>
                              {selectedCategory === 'All Books' ? 'Add to Reading List' : 'Remove from Reading List'}
                            </button>
                          )}
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
