import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  color: "",
  code: { hex: "" }
};

export const NewColorForm = ({ setAdd, updateColors }) => {
  const [newColor, setNewColor] = useState(initialState);
  console.log(newColor);
  const handleChanges = e => {
    setNewColor({
      ...newColor,
      color: e.target.value,
      code: { hex: e.target.value }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="color"
        value={newColor.color}
        onChange={e => setNewColor({ ...newColor, color: e.target.value })}
        placeholder="color"
      />
      <input
        type="text"
        name="hex"
        value={newColor.code.hex}
        onChange={e =>
          setNewColor({ ...newColor, code: { hex: e.target.value } })
        }
        placeholder="hex code"
      />
      <button> Add New Color</button>
      <button onClick={() => setAdd(false)}> Cancel </button>
    </form>
  );
};
