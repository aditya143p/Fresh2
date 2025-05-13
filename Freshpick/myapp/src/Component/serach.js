import React from 'react'
import './search.css'
import empty from './empty.gif'
import { all_data } from './search_data'
import { useSelector } from 'react-redux'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { mycategorydataredux } from './store/category_slice'
import './personal_care.css'
const Search= () => {
     const dispatch=useDispatch()
  let navigate= useNavigate()
  let [searchdata,setsearchdata]=useState("")
  let [err2,seterr2]=useState(false)
  let data=useSelector((state)=>state.search)
  console.log(typeof(data), "type")
  if(data.length>=1)
  {
    localStorage.setItem('searchdata',  data)
  }
  let [err,seterr]=useState(false)
  // console.log("search data",data)
  // setsearchdata(data)
  useEffect(()=>
  {
    if(data.length<1)
    {
      let a=localStorage.getItem('searchdata')
      console.log("a" ,a)
      setsearchdata(a)
    }
    else if(data.length>=1)
    {
      setsearchdata(data)
    }
   
  },[data])
  let getproduct=(element)=>
  {
             navigate('/AddCategory/'+element.id)
                   dispatch( mycategorydataredux(element))  
  }
  return <>
  <div className='row mobliee-c'>
      <div className='col-3 col-md-2 d-flex justify-content-center mt-5 pos12 p-2'>
   

<div className='catrgory-items'>
   Showing results for <span style={{color:'red'}}>{searchdata}</span>
</div>
      </div>

      <div className='col-9 col-md-9 p-0'>
      <div className='row d-flex justify-content-evenly mobile-row'>

  
{
  all_data.filter((element)=>
  {

          if(element.cat.toLowerCase()===searchdata.toLowerCase())
          {
            return element
          }
          // else
          // {
          //   seterr2(true)
          //   return
          // }
  }).map((element)=>
  {
    console.log('element', element)
    console.log('element1', typeof(element))

    return <>
    {console.log("element",element)}
    <div className='col-5 col-md-3 data-col p-2 ' onClick={()=>{getproduct(element)}}>
    <img src={element.image} className='mobile-img'></img>
    <div className='mo-name'>{element.name}</div>
    <div className='mobile-text'>
              <div>
                {element.name}
              </div>
              <div>
               price: {element.price}
              </div>
              <div>
                weight: {element.weight}
              </div>
            </div>
    </div>
    </>
  })
}
{/* {
  err2 ? <>
<img src={empty}></img>
  </>:null
} */}
</div>

</div>
</div>

     
  </>
}
export default Search

