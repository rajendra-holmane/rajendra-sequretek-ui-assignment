import './Header.scss';

const Header: React.FC = () => {
  return (
    <>
      <header>
        <h1>UI Assignment | Rajendra Holmane</h1>        
        <div className="welcome">
            <img className="avtar" src="/Assets/images/linkdin-profile-pic.png" alt="" />
            <div className="welcome-msg">
                <p>Welcome Back!</p>
                <p className="user-name">Rajendra Holmane</p>
            </div>
        </div>
    </header>
    </>
  );
}

export default Header;
