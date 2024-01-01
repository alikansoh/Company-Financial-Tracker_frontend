import React from "react";
import ProfileGoalImage from "../../images/ProfileImage.png";
import "./UserRecent.css";
const UserRecent = ({ userRecent, userRole }) => {
  return (
    <tr>
      <td className="profileImage">
        <img src={ProfileGoalImage} alt="profileImage" />
      </td>

      <td className="userRecentName">
        
          {userRecent}
    
      </td>
      <td className="userRecentRole">
        {userRole}
      </td>
    </tr>
  );
};

export default UserRecent;
