import './Header.scss';

const Header = () => {
  return (
    <>
      <header>        
        <div className="welcome">
            <img className="avtar" src="/Assets/images/avatar.svg" alt="" />
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
