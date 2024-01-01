import React from 'react';
import './forbidden.css'; 
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <>
    <div className="maincontainer-container">
      <div className="bat">
        <img className="wing leftwing" 
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
        <img className="body"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png" alt="bat body"/>
        <img className="wing rightwing"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
      </div>
      <div className="bat">
        <img className="wing leftwing" 
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
        <img className="body"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png" alt="bat body"/>
        <img className="wing rightwing"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
      </div>
      <div className="bat">
        <img className="wing leftwing" 
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
        <img className="body"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-body.png" alt="bat body"/>
        <img className="wing rightwing"
             src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/bat-wing.png" alt="bat wing"/>
      </div>
      <img className="foregroundimg" 
           src="https://aimieclouse.com/Media/Portfolio/Error403Forbidden/HauntedHouseForeground.png" 
           alt="haunted house"/>
    </div>
    <h1 className="errorcode">ERROR 403</h1>
    <div className="errortext">This area is forbidden. Turn back now!</div>
    <Link to="/Login">
    <button className='button-f'>Go Back</button>
    </Link>
  </>
);

export default ErrorPage;
