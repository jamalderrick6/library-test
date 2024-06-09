import Avatar from "@mui/material/Avatar";
import React from "react";

const getInitials = (f, l) => {
    let name = `${f} ${l}`;
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
    let initials = [...name.matchAll(rgx)] || [];
    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    return initials;
  };

const ProfileAvatar = ({first_name, last_name, profile_image}) => {
    return first_name && last_name ? (
      <Avatar
        src={profile_image}
      >
        {getInitials(first_name, last_name)}
      </Avatar>
    ) : (
      <Avatar
        src={profile_image}
      />
    );
}

export default ProfileAvatar;
