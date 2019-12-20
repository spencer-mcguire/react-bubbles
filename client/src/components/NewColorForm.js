import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialState = {
  color: "",
  code: { hex: "" }
};

export const NewColorForm = ({ setAdd, updateColors }) => {
  const [newColor, setNewColor] = useState(initialState);

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", newColor)
      .then(res => {
        setNewColor(initialState);
        setAdd(false);
        updateColors(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <form onSubmit={handleSubmit}>
      <legend>Add color</legend>
      <label>
        color name:
        <input
          type="text"
          name="color"
          value={newColor.color}
          onChange={e => setNewColor({ ...newColor, color: e.target.value })}
          placeholder="color"
        />
      </label>
      <label>
        hex code:
        <input
          type="text"
          name="hex"
          value={newColor.code.hex}
          onChange={e =>
            setNewColor({ ...newColor, code: { hex: e.target.value } })
          }
          placeholder="hex code"
        />
      </label>
      <div className="button-row">
        <button> Add </button>
        <button onClick={() => setAdd(false)}> Cancel </button>
      </div>
    </form>
  );
};
