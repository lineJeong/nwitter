import React, { useState } from "react";

const Home = () => {
  const [nweet, setNweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const { value } = event.target;
    setNweet(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="What's on your mind"
        maxLength={120}
        value={nweet}
        onChange={onChange}
      />
      <input type="submit" value="Nweet" />
    </form>
  );
};

export default Home;
