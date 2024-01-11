import React from "react";

const Header = ({ children }) => {
  return (
    <div>
      <div style={{height:"64px",backgroundColor:"#fff",display:"flex",alignItems:"center",position:"sticky",top:0,zIndex:10}}>
        <img style={{width:"7%",mixBlendMode:"multiply",marginLeft:"20px"}} src="https://i.ibb.co/nDfZRcd/Screenshot-from-2024-01-11-11-45-11.png" alt="logo"/>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Header;
