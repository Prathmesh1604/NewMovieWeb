import React from "react"
import "./CastMember.css"

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w185"

function CastMember({ member }) {
  return (
    <div className="cast-member">
      <img
        src={member.profile_path ? `${IMAGE_BASE_URL}${member.profile_path}` : "/placeholder.png"}
        alt={member.name}
        className="cast-member-image"
      />
      <div className="cast-member-info">
        <h3 className="cast-member-name">{member.name}</h3>
        <p className="cast-member-character">{member.character}</p>
      </div>
    </div>
  )
}

export default CastMember

