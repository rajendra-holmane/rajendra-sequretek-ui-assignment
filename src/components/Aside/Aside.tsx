import { Link } from 'react-router-dom';
import './Aside.scss';

const menuItems = [
  {
    label: "Dashboard",
    icon: "/Assets/images/overview-icon.svg",
    link: "",
    active: true
  }
];

const Aside = () => {
  return (
    <aside>
      <div className="logo">
        <Link to="/">
          <img src="logo192.png" alt="Logo" />
        </Link>
      </div>
      <ul>      
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link className={item.active ? "active" : ""} to={item.link}>  
              <img src={item.icon} alt={`${item.label} icon`} />
              <span>{item.label}</span> 
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Aside;
