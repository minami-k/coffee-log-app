import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { db, auth } from "../../firebase-config";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { Paper, Button } from "@mui/material";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";
import Hit from "../Hit/Hit"

const Search = ({ isLoggedIn, getPostId, hit }) => {
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);

  /*   const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  let search = query.get("name");
 */

  const searchClient = algoliasearch(
    "K11WRSYGH1",
    "4aeb3b14da8cb259a517fa672c667bd7"
  );

  return (
    <div className="main-box">
        <InstantSearch searchClient={searchClient} indexName={"coffee-log"}>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </div>
  );
};

export default Search;
