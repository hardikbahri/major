import React, { useEffect } from "react"
import { useState } from "react";
import { ethers } from "ethers";
import "./Feed.css";
import "./TweetBox.css";
import { Button } from "@material-ui/core";


const Social = ({ contract, account, provider }) => {
    const [metamaskUserName, setMetamaskUserName] = useState('');
    const [data, setData] = useState([]);

    const fetchData =  async () => {
        try{
            let dataArray = await contract.viewPosts();

            if (dataArray.length > 0) {
                const listItems = dataArray.map((item, i) => {
                item = item.toString();
                const str_array = item.split(",");

                //console.log(str_array);
                return (
                    <div>
                     
                    <p style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold' }}>
                      Author: {str_array[1]}
                    </p>
                    <p style={{ fontFamily: 'Arial', fontSize: '14px', fontStyle: 'italic' }}>
                      Title: {str_array[2]}
                    </p>
                    <div style={{ 
                      backgroundColor: '#f0f0f0', 
                      border: '1px solid #ccc', 
                      borderRadius: '5px', 
                      padding: '10px', 
                      marginTop: '10px' 
                    }}>
                      <p style={{ fontFamily: 'Arial', fontSize: '14px' }}>
                        {str_array[3]}
                      </p>
                    </div>
                  </div>
                  
                )
                });
                setData(listItems);
                console.log("yamete",listItems);
            } else {
                console.log("No data");
            }
        } catch(error){
            console.log("Error fetching data", error);
        }
    };

    const handleSubmit = async (e) => {
        let v1 = document.querySelector("#authorname").value;
        let v2 = document.querySelector("#title").value;
        let v3 = document.querySelector("#content").value;
        await contract.addPosts("abc", v1, v2, v3);
    }
    
  useEffect(() => {
    const fetchMetamaskUserInfo = async () => {
        if (window.ethereum) {
          try {
            // Request access to the user's accounts from MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            // Get the user's Ethereum address
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const userAddress = accounts; // Assuming the first address is the user's
            // Set the user's address as the MetaMask user name
            setMetamaskUserName(userAddress);
          } catch (error) {
            console.error('Error retrieving MetaMask user information:', error);
          }
        }
      };
      fetchMetamaskUserInfo();
    fetchData(); // Fetch data when the component mounts
  }, []);

    return (
    <>
<div class="tweet-box">
    <div class="tweet-header">
        <img src="https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg" alt="Profile Picture" class="profile-picture"/>
        <textarea placeholder="name" id="authorname" class="tweet-text"/>
        <textarea placeholder="title" id="title" class="tweet-text"/>
        <textarea placeholder="What's happening?" id="content" class="tweet-text"/>
    </div>
    <div class="tweet-footer">
        <button class="tweet-button" type="submit" onClick={handleSubmit}>Tweet</button>
    </div>

</div>
<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <Button class="tweet-button" onClick={fetchData}>
    Get Information
    </Button>
</div>

        <div className="posts">
        <link href="https://fonts.googleapis.com/css?family=Asap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"/>



<div class="tweet-wrap">
{data.map((tweetData, index) => (
  <div key={index} class="tweet-header">
    <img src="https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg" alt="" class="avator" />
    <div class="tweet-header-info">
        {console.log("yadav randi",data)}
        {metamaskUserName[index]}
      <span>{data[index]}</span><span></span>
      <p>🔥</p> 
    </div>
  </div>
))}

  <div class="tweet-img-wrap">
  
  </div>
  {/* <div class="tweet-info-counts">
    
    <div class="comments">
      
      <svg class="feather feather-message-circle sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
      <div class="comment-count">33</div>
    </div>
    
    <div class="retweets">
      <svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
      <div class="retweet-count">397</div>
    </div>
    
    <div class="likes">
      <svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      <div class="likes-count">
        2.6k
      </div>
    </div>
    
    <div class="message">
      <svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
    </div>
  </div> */}
</div>
            
          </div>
          </>
    )
};



export default Social;