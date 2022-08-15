import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div key={id} className="nweet">
      {editing ? (
        <>
          {
            <>
              {isOwner && (
                <form onSubmit={onSubmit} className="container nweetEdit">
                  <input
                    type={text}
                    value={newNweet}
                    onChange={onChange}
                    placeholder="Edit your nweet"
                    required
                    autoFocus
                    className="formInput"
                  />
                  <input
                    type="submit"
                    value="Updata Nweet"
                    className="formBtn"
                  />
                </form>
              )}
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          }
        </>
      ) : (
        <>
          <h4>{text}</h4>
          {attachmentUrl && <img src={attachmentUrl} alt="attachment_url" />}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
