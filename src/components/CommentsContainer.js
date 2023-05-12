import React from 'react'

const commentData = [
    {
        name:'abc',
        text: 'lorem ipsum dolor sit amet, consectet',
        replies:[]
    },
    {
        name:'abc',
        text: 'lorem ipsum dolor sit amet, consectet',
        replies:[
            {
                name:'abc',
                text: 'lorem ipsum dolor sit amet, consectet',
                replies:[]
            },
            {
                name:'abc',
                text: 'lorem ipsum dolor sit amet, consectet',
                replies:[]
            },]
    },
    {
        name:'abc',
        text: 'lorem ipsum dolor sit amet, consectet',
        replies:[]
    },
    {
        name:'abc',
        text: 'lorem ipsum dolor sit amet, consectet',
        replies:[ {
            name:'abc',
            text: 'lorem ipsum dolor sit amet, consectet',
            replies:[]
        },
        {
            name:'abc',
            text: 'lorem ipsum dolor sit amet, consectet',
            replies:[]
        },
        {
            name:'abc',
            text: 'lorem ipsum dolor sit amet, consectet',
            replies:[]
        },]
    },
    {
        name:'abc',
        text: 'lorem ipsum dolor sit amet, consectet',
        replies: [ {
            name:'abc',
            text: 'lorem ipsum dolor sit amet, consectet',
            replies:[]
        },]
    }
]



const Comment=({data})=>{
    const {name, text,replies} = data
    return (
        <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
            <img className='w-12 h-12' src="https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg" alt="user" />

            <div className="px-3">
            <p className='font-bold'>{name}</p>
            <p>{text}</p>
            </div>
        </div>
    )
}

const CommentsList=({comments})=>{

    return comments.map((comment,index)=>
    (
        <div key={index}><Comment data={comment}/>
        <div className="pl-5 border border-l-black ml-5">
            {/* <Comment key={index} data={comment}/>
            <Comment key={index} data={comment}/>
            <Comment key={index} data={comment}/> */}
            <CommentsList comments={comment.replies}/>

        </div>
        </div>
    
))}

const CommentsContainer = () => {
  return (
    <div className='m-5 p-2'>
        <h1 className='font-bold text-2xl'>Comments..</h1>
        {/* <Comment data={commentData[0]}/> */}
        <CommentsList comments={commentData}/>
    </div>
  )
}

export default CommentsContainer
