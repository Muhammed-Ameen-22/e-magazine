import React, { useState, useEffect } from 'react';
import './cards.css';
import CardItem from '../carditem/CardItem';
// import { Card } from "react-bootstrap";
// import imageDataURI from 'image-data-uri';
import PostView from '../../pages/user/PostView';
import { CardActionArea } from '@mui/material';
export default function Cards() {
  var posts;

  const [content, setContent] = useState([]);
  const fetchPosts = async () => {
    let res = await fetch(process.env.REACT_APP_SERVER_URL + "/fetchPost/getApprovedPosts", {
      // mode: 'no-cors',
      credentials: 'include',
    });
    res = await res.json();
    console.log("this is res", res);
    res = res.map(({ content_Id: id, ...rest }) => ({ id, ...rest }));


    posts = res;

    console.log('posts', posts)
    //     for(var i=0;i<6;i++)
    //     {
    //  getTitle(posts[i].content)
    //     }

    // res.forEach((item, i) => { item.id = i + 1; });
    // console.log('res', res) 
    setContent(res)
    console.log(content)
  };
  
  useEffect(() => {
    fetchPosts();

  }, []);
  const [id, setId] = useState('');

  var printId=(id)=>{
    console.log("This is id ",id)
  }
  const renderCard = (card, index) => {
  

    // let dataBuffer = new Buffer(card.content_Image);
    // let mediaType = 'PNG';
    return (




      <div className='cards' >

        <CardItem
      
          src=''
          id={card.id}
          text={card.content}
          label={card.content_Title}
          path='/PostView'
          
         
        />
         
      </div>

     

    );

  };


  // <Card style={{ width: "18rem" }} key={index} className="box">
  //   {/* <Card.Img variant="top" src="holder.js/100px180" src={card.image} /> */}
  //   <Card.Body>
  //     <Card.Title>{card.content_Title}</Card.Title>
  //     <Card.Text>{card.content}</Card.Text>
  //   </Card.Body>
  // </Card>


  return <div className="grid" 
  style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    {content.map(renderCard)}</div>;



  // var[title,getTitle]=useState([])

  // for(var i=0;i<10;i++)
  // {
  //   getTitle(posts[i].content);
  //   console.log('title',title)
  // }



  // return (
  //   <div className="grid">{posts.map(renderCard)}</div>);

  //   <div className='cards'>
  //     <h1>Check out these new posts!</h1>
  //     <div className='cards__container'>
  //       <div className='cards__wrapper'>
  //         <ul className='cards__items'>
  //           <CardItem
  //             src='images/img-9.jpg'
  //             text={title}
  //             label='Adventure'

  //             path='/services'
  //           />
  //           <CardItem
  //             src='images/img-2.jpg'
  //             text={title}
  //             label='Luxury'
  //             path='/services'
  //           />
  //         </ul>
  //         <ul className='cards__items'>
  //           <CardItem
  //             src='images/img-3.jpg'
  //             text={title}
  //             label='Mystery'
  //             path='/services'
  //           />
  //           <CardItem
  //             src='images/img-4.jpg'
  //             text='Experience Football on Top of the Himilayan Mountains'
  //             label='Adventure'
  //             path='/products'
  //           />
  //           <CardItem
  //             src='images/img-8.jpg'
  //             text='Ride through the Sahara Desert on a guided camel tour'
  //             label='Adrenaline'
  //             path='/sign-up'
  //           />
  //         </ul>
  //       </div>
  //     </div>
  //   </div>

  // );

};


