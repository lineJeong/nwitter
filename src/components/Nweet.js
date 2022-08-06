import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "fbase";

const Nweet = ({ id, text, isOwner, attachmentUrl }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNeNweet] = useState(text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      const desertRef = ref(storageService, attachmentUrl);
      if (attachmentUrl !== "") {
        await deleteObject(desertRef);
      }
      await deleteDoc(doc(dbService, "nweets", id));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const { value } = event.target;
    setNeNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(doc(dbService, "nweets", id), { text: newNweet });
    setEditing(false);
  };

  return (
    <div key={id}>
      {editing ? (
        <>
          {
            <>
              isOwner &&
              <form onSubmit={onSubmit}>
                <input
                  type={text}
                  value={newNweet}
                  onChange={onChange}
                  placeholder="Edit your nweet"
                  required
                />
                <input type="submit" value="Updata Nweet" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          }
        </>
      ) : (
        <>
          <h4>{text}</h4>
          {attachmentUrl && (
            <img
              src={attachmentUrl}
              alt="attachment_url"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
