'use client';

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    // fetch data
    const fetchPost = async () => {
      const res = await fetch('/api/prompt');
      const data = await res.json();
      setPosts(data);
    }
    fetchPost();
  }, []);

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className="prompt_layout mt-16" key={Math.random()}>
         {data.map((post) => ( 
          <PromptCard 
            key={post.id}
            post={post}
            handleTagClick={handleTagClick}
          />
         ))}
      </div>
    )
  }

  const handleSearchChange = (e) => {

  }

  return (
    <section className="feed" key={Math.random()}>
      <form className="relative w-full flex-center">

        <input className="search_input peer"
          type="text" placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList 
        data={posts}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed