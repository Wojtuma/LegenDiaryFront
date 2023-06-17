import React, { useState } from 'react';

function MyComponent(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const objectArray = props.legends;

  function similarWord(word) {
    // To be implemented
    return word;
  }

  function handleSearchInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = objectArray.filter(item => {
      const itemValue1 = item.name.toLowerCase();
      const itemValue2 = item.description.toLowerCase();
      const searchTerm = query.toLowerCase();
      return itemValue1.includes(searchTerm) || itemValue2.includes(searchTerm) || itemValue1.includes(similarWord(searchTerm)) || itemValue2.includes(similarWord(searchTerm));
    });

    setFilteredResults(filtered);
  }

  function handleClick(item) {
    /* props.flyToMarker(item.long, item.lat); */
    /* console.log(item); */
  }

  return (
    <div className='searchDiv'>
    <table><th>
      <input
        className='searchBar'
        type="search"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Search..."
      /></th>
      <th>
      {/* <button className='clearSearchBtn' ></button> */}</th></table>
      {searchQuery !== '' && (
      <ul className='resultList'>
        {filteredResults.map(item => (
          <li className="resultItem" id={item.id} key={item.id} onClick={() => handleClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>)}
      
    </div>
  );
}

export default MyComponent;
