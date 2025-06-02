import {Link} from 'react-router-dom';
import '../css/style.css';
import Logo from '../img/logo.png'


function Header(){
    return(

        <header>
            <div>
                <img src={Logo} alt='Logo' title='Logo GreenCode'/>
            </div>
            <nav>
                <a href='/home' className='abas'>Gerenciar</a>
                <span className='separador'>|</span> 
                <a href='/crudCategoria' className='abas'>Categoria</a>
                <span className='separador'>|</span> 
                <a href='/crudMaterial' className='abas'>Material</a>
                <span className='separador'>|</span> 
                <a href='/agendamento' className='abas'>Agendamento</a>
                <span className='separador'>|</span> 
                <a href='/login' className='abas'>Login</a>
                <span className='separador'>|</span> 
               
                </nav>
        </header>
    )
    
        


}

export default Header;