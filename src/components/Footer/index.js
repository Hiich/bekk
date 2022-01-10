import "./footer.css";
import LouisBekk from "../../images/LouisBekk.png";

export const Footer = () => {
  return (
    <footer className="background">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-12">
          <img className="footerLogo" src={LouisBekk} alt="Logo" />
          </div>
          <div className="col-md-4 col-6">
            <ul>
              <li>Privacy Policy</li>
              <li>Terms of services</li>
              <li>Legal overview</li>
            </ul>
          </div>
          <div className="col-md-3 col-6">
            <ul>
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Youtube</li>
              <li>Tiktok</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
