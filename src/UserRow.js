import React, { useState } from "react";

import "./styles.css";

const UserRow = ({
  user,
  isSelected,
  onSelectUser,
  onDeselectUser,
  onDeleteUser,
  onEditUserInfo,
  canDeselect
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);

  const handleCheckboxChange = () => {
    if (canDeselect && !isSelected) {
      onSelectUser(user.id);
    } else if (isSelected) {
      onDeselectUser(user.id);
    }
  };

  const handleDeleteClick = () => {
    onDeleteUser(user.id);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      ...user,
      name: editedName,
      email: editedEmail,
      role: editedRole
    };
    onEditUserInfo(user.id, updatedUser);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(user.name);
    setEditedEmail(user.email);
    setEditedRole(user.role);
  };

  return (
    <tr
    // className={isSelected ? "selected-row" : ""}
    // onClick={handleRowSelection}
    >
      <td>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{user.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          user.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        ) : (
          user.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editedRole}
            onChange={(e) => setEditedRole(e.target.value)}
          />
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button className="Edit_Save" onClick={handleSaveClick}>
              Save
            </button>
            <button className="Delete_Cancel" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="Edit_Save" onClick={handleEditClick}>
              Edit
            </button>
            <button className="Delete_Cancel" onClick={handleDeleteClick}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
