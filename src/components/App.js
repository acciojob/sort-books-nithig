
import React, { useEffect, useState } from "react";
import './../styles/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from "../Redux.js/BookSlice";

const App = () => {
  const books=useSelector((state)=>state.books.items)
  const dispatch=useDispatch()
  let [sortKey,setSortKey]=useState('title')
  let [sortOrder,setSortOrder]=useState('asc')

  useEffect(()=>{
    fetch('https://www.dbooks.org/api/recent')
    .then((response) => response.json())
    .then((data) => {
      dispatch(setBooks(data.books));
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
  },[dispatch])
  // console.log(books)
  const sortedBooks=[...books].sort((a,b)=>{
    let key=sortKey.toLowerCase()
    const aVal = a[key]?.toLowerCase() || '';
    const bVal = b[key]?.toLowerCase() || '';
    if(sortOrder==='asc')return aVal.localeCompare(bVal)
    else if(sortOrder==='dsc')return bVal.localeCompare(aVal)
  return 0
  })
  .slice(0, 15);
  return (
    <div>
      <h1>Books List</h1>
      <div>
        
        <label htmlFor='sort' >Sort by:
        <select id="sort" onChange={(e)=>{setSortKey(e.target.value)}} >
          <option value="title">Title</option>
          <option value="authors">Author</option>
          <option value="subtitle">Publisher</option>
        </select>
        </label>
        <label htmlFor='orderBy' >Order:
        <select  id="orderBy" onChange={(e)=>{setSortOrder(e.target.value)}}>
          <option value="asc">Ascending</option>
          <option value="dsc">Descending</option>
        </select>
        </label>
      </div>
        <table>
          <thead>
            <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {
              sortedBooks.map((book,i)=>(
                <tr key={i} >
                <td>{book.title}</td>
                <td>{book.authors}</td>
                <td>{book.subtitle}</td>
                <td>{book.id}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default App
