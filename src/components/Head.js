import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice'
import { YOUTUBE_SEARCH_API } from '../utils/constants'
import { json } from 'react-router-dom'
import store from '../utils/store'
import { chacheResults } from '../utils/searchSlice'
const Head = () => {

  const[searchQuery,setSearchQuery]=useState("")
  const[suggestions,setSuggestions]=useState([])
  const[showSuggestions,setShowSuggestions]=useState(false)

  const searchCache=useSelector((store)=>store.search);
  const dispatch=useDispatch();
  useEffect(()=>{
    //API CALL
    console.log(searchQuery)


    //make an api call after every key press
    //but if difference between 2 API call is less than 200ms
    //decline API call



    const timer=setTimeout(()=>
    {
    if(searchCache[searchQuery]){
      setSuggestions(searchCache[searchQuery])
    }else{
      getSearchSuggestions()
    }
  },200);

    return()=>{
      clearTimeout(timer)
    }
  },[searchQuery])

  const getSearchSuggestions =async()=>{
    const data=await fetch(YOUTUBE_SEARCH_API+ searchQuery)
    const json=await data.json()
    // console.log(json[1])
    setSuggestions(json[1])

    //update cache
    dispatch(chacheResults() )
  }

  const toggleMenuHandler=()=>{
    dispatch(toggleMenu());
  }
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
    <div className='flex col-span-1' >
      <img className='h-8 cursor-pointer' src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Hamburger_icon.svg" alt="menu" onClick={()=>toggleMenuHandler()}/>

      <img className='h-8 mx-2' src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/2560px-Logo_of_YouTube_%282015-2017%29.svg.png"  alt="youtube-logo"/>
    </div>
    <div className='col-span-10 px-10'>
      <div>
      <input className='px-5 w-1/2 border border-gray-400 p-2 rounded-l-full' type="text" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}} 
      onFocus={()=>{setShowSuggestions(true)}}
      onBlur={()=>{setShowSuggestions(false)}}/>
      <button className='border border-gray-400 p-2 rounded-r-full bg-gray-100'
      >Search</button>
    </div>
 { showSuggestions &&  (<div className='fixed bg-white py-2 px-5 w-[27rem] rounded-lg border-gray-100'>
      <ul>
        {suggestions.map((s)=>
           <li key={s} className='py-2 hover:bg-gray-100' >{s}</li>
        )}
      
      </ul>
    </div>)}
    </div>
   
    
    <div className='flex col-span-1'>
      <img src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="user-icon" className='h-8' />
    </div>

    </div>
  )
}

export default Head
