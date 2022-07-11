import { NavLink } from "react-router-dom";
import { ICategory } from "../../../types";
import Logo from '../../../assets/img/header_logo.png';
import './Header.scss'
import { SelectCurrency } from "../../componentsUI/selectCurrency/SelectCurrency";
import { Basket } from "../basket/Basket";

interface IHeader {
    categoryLinks: ICategory[]
}

export const Header: React.FC <IHeader> = ({categoryLinks}) => {

    const category:JSX.Element[] = categoryLinks.map((category:ICategory)=> {
        return ( <li className="header__link">
                            <NavLink 
                                key={`/${ category.name }`} 
                                to={`/${ category.name }`} 
                                > 
                                {category.name}
                            </NavLink>
                    </li>   
                )
        })
    
  return (
    <header className='header'> 
        <nav className='header__categories'>
             <ul>
                {category}
             </ul>
        </nav>
        <div className="header__logo">
           <NavLink to='/'><img src={Logo} alt="Shop logo"/> </NavLink> 
        </div>
        <div className="header__actions">
        <SelectCurrency/>
        <Basket/>
        </div>
    </header>
  )
}
