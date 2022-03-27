import React, {useState} from 'react'
/* import { useHistory } from 'react-router-dom';import "./sidebar.css"
 */import TextField from "@mui/material/TextField"



const Sidebar = ({posts, setPosts}) => {

    const [search, setSearch] = useState('')

/*     const history = useHistory()
 */
/*     const submitHandler = (e) => {
        e.preventDefault()
        history.push(`/search?name=${search}`)
        setSearch('')
    }

 */  return (
    <div className="page-right">
{/*         <form onSubmit={submitHandler}>
        <input 
            id="outlined-basic"
            variant='outlined'
            fullWidth
            label="Search"
            onChange={(e)=> setSearch(e.target.value)}
            value={search}
        />
        <button type="submit">Search</button>
</form>
 */}
    </div>
  )
}

export default Sidebar