import { Link } from "react-router-dom";
import { PawPrint } from "lucide-react";
import '../../assets/css/layout/base.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footerBrand">
        <span className="logoDot"><PawPrint/></span>
        <h2>PetWalker</h2>
      </div>

      <nav className="footerLinks">
        <Link to="/">Terms</Link>
        <Link to="/">Privacy</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Careers</Link>
      </nav>

      <p className="footerCopy">
        @for business:7987725298
      </p>
    </footer>
  );
}

export default Footer;
