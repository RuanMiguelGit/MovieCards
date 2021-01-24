import React from 'react';
import PropTypes from 'prop-types';
import AddMovie from './AddMovie';
import MovieList from './MovieList';
import SearchBar from './SearchBar';

class MovieLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.onBookmarkedChange = this.onBookmarkedChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.onSelectedGenreChange = this.onSelectedGenreChange.bind(this);
    this.searchOn = this.searchOn.bind(this);
  }

  onAddItem(newMovie) {
    const { movies } = this.state;
    const film = movies;
    const newItem = newMovie;
    const newItems = [...film, newItem];
    this.setState({
      movies: newItems,
    });
  }

  onSearchTextChange(event) {
    this.setState({
      searchText: event.target.value,
    });
  }

  onBookmarkedChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      bookmarkedOnly: value,
    });
  }

  onSelectedGenreChange(event) {
    this.setState({
      selectedGenre: event.target.value,
    });
  }

  searchOn() {
    let searchFor;
    const { movies } = this.props;
    const { bookmarkedOnly, selectedGenre, searchText } = this.state;

    if (selectedGenre !== '') {
      searchFor = movies.filter((movie) => movie.genre === selectedGenre);
    } else if (selectedGenre === '') {
      searchFor = movies;
    }
    if (bookmarkedOnly === true) {
      searchFor = movies.filter((film) => film.bookmarked === true);
    }
    if (searchText !== '') {
      searchFor = movies.filter((movie) => movie.title.includes(searchText)
       || movie.subtitle.includes(searchText) || movie.storyline.includes(searchText));
    }
    return searchFor;
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre } = this.state;
    return (
      <div>
        <MovieList movies={ this.searchOn() } />
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.onSearchTextChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.onBookmarkedChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.onSelectedGenreChange }
        />
        <AddMovie onClick={ this.onAddItem } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieLibrary;
