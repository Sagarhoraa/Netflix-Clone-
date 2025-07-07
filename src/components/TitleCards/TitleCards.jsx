import React,{useEffect, useRef, useState}from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'; 


const TitleCards = ({title, category}) => {

  const [apiData, setApiData]= useState([]);

const cardRef= useRef();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjY0YWFkMjdlOWIyMDY2ZjY3MTYwMmFjNjhhZTAwMSIsIm5iZiI6MTc1MTg3NzE3My41ODUsInN1YiI6IjY4NmI4NjM1NjJlNzhjOWU2YzlhNDQ4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KW625ltAOWZnav2c--waoJvnvWx9kzd1c5BynQ_9Pjc'
  }
};



const handleWheel =(e) =>{
   e.preventDefault();
   cardRef.current.scrollLeft += e.deltaY;
}

useEffect(()=> {

  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
  cardRef.current.addEventListener('wheel', handleWheel);
},[])
  return (
    <div className='title-cards' >
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((card, index) =>{
            return <Link to={`/player/${card.id}`} className="card" key=
            {index}>
                <img src={ `https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
                <p>{card.original_title}</p>
            </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards