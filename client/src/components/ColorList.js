import React, { useState } from "react";

import { axiosWithAuth } from "../utilities/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};
const addedColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorBeingAdded, setAddedColor] = useState(addedColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        updateColors(res.data);
      });
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/colors", colorBeingAdded)
      .then((res) => {
        updateColors(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddedColorChanges = (e) => {
    setAddedColor({
      ...colorBeingAdded,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
            <button onClick={() => deleteColor(colorToEdit)}>Delete </button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form onSubmit={addColor}>
        <label> Color Name</label>
        <input
          name="color"
          value={colorBeingAdded.name}
          onChange={handleAddedColorChanges}
        />
        <label> Hex Code</label>
        <input
          name="code"
          value={colorBeingAdded.code.hex}
          onChange={(e) =>
            setAddedColor({
              ...colorBeingAdded,
              code: { hex: e.target.value },
            })
          }
        />
      </form>
      <button onClick={addColor}> Add</button>
    </div>
  );
};

export default ColorList;
