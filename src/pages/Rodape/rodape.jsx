import {Link} from 'react-router-dom';
import '../css/style.css';



function Rodape(){
    return(
       
        <footer>
            <nav>
        <div class="social-icons">
            
            <a href="https://www.facebook.com/seu-perfil" target="_blank" aria-label="Facebook">
                
                <i class="fab fa-facebook-f"></i>
            </a>
            
           
            <a href="https://twitter.com/seu-perfil" target="_blank" aria-label="Twitter">
                
                <i class="fab fa-twitter"></i>
            </a>
            
           
            <a href="https://www.instagram.com/seu-perfil" target="_blank" aria-label="Instagram">
              
                <i class="fab fa-instagram"></i>
            </a>
            
           
            <a href="https://www.linkedin.com/in/seu-perfil" target="_blank" aria-label="LinkedIn">
                
                <i class="fab fa-linkedin-in"></i>
            </a>
        </div>
        </nav>
            </footer>
        
    )
    
        


}

export default Rodape;