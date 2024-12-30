import { useState, useEffect } from 'react';
import { UserDetailsApi } from '../../services/api';
import { Authenticated, logout } from '../../services/auth';
import SideBar from '../../components/sideBar/SideBar';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ displayName:"",email: "", localId: "" });

  useEffect(() => {
    if(Authenticated()){

      UserDetailsApi().then((response) => {
        console.log("dash",response.data.users[0].displayName)
        setUser({
          
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logoutUser = () => {
    logout();
    navigate('/');
  };

  if (!Authenticated()) {
    navigate('/');
    return null; // Prevent rendering while redirecting
  }

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <SideBar logoutUser={logoutUser} />

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <div className="container">
          <div className="text-center mt-5">
            <h3 className="mb-4">Welcome</h3>
            {user.email && user.localId ? (
              <div>
                <p className="font-weight-bold">
                   
                  <p>your Email ID is <strong>{user.email}</strong> </p> 
                  <p>your Firebase ID is <strong>{user.localId}</strong>.</p>
                   
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
