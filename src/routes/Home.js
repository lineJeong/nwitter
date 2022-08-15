import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import { collection, onSnapshot } from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            id={nweet.id}
            text={nweet.text}
            isOwner={nweet.creatorId === userObj.uid}
            attachmentUrl={nweet.attachmentUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
