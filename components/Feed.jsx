'use client';

// use client import statement here

import { useState, useRef, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
let data = [];

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);
  const searchParams = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase();

  const fetchPost = async () => {
    try {
      const res = await fetch('/api/prompt');
      data = await res.json();
      setPosts(data);
    } catch (error) {
      // handle fetch error
      console.error('Error fetching data:', error);
    }
  };

  const updatePosts = () => {
    if (search && search.length > 0) {
      const newdata = data.filter((post) => {
        return post && post.tag &&
          post.tag.toLowerCase().includes(search) ||
          post.prompt.toLowerCase().includes(search) ||
          post.creator.username.toLowerCase().includes(search)
      });
      setPosts(newdata);
    } else {
      setPosts(data);
    }
  }


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchPost();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    updatePosts();
    if (!searchText || searchText.length === 0 || searchText === null) {
      return router.push('/');
    }
    else {
      router.push(`/?search=${searchText}`)
    }
  }, [router, searchText, search]);


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          ref={inputRef}
          name="search"
          className="search_input peer"
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList
        data={posts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  );
};

export default Feed;