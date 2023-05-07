import React from 'react'

const ParticipantItem = ({teamName,teamId, teamLeader,teamMembers,college,email,phone,theme,idea,project}) => {
  return (
    <div className="mx-10">
      <hr></hr>
      <div className="flex  items-center py-2">
        <p className=" w-44 ">{teamName}</p>
        <p className="ml-20 w-44 ">{teamId}</p>
        <p className="ml-20 w-44 ">{teamName}</p>
        <p className="ml-20 w-44 ">{teamLeader}</p>
        <p className="ml-20 w-44 ">{teamMembers.map((item)=>(<p>{item},</p>))}</p>
        <p className="ml-20 w-44 ">{college}</p>
        <p className="ml-20 w-44 ">{email}</p>
        <p className="ml-20 w-44 ">{phone}</p>
        <p className="ml-20 w-44 ">{theme}</p>
        <p className="ml-20 w-44 ">{idea}</p>
        <p className="ml-20 w-44 ">{project}</p>
        
      </div>
    </div>
  )
}

export default ParticipantItem