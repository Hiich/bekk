import "./footer.css";
import LouisBekk from "../../images/LouisBekk.png";

export const Footer = () => {
  return (
    <footer className="background footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-12">
          <img className="footerLogo" src={LouisBekk} alt="Logo" />
          </div>
          <div className="col-md-4 col-6">
            <ul>
              <li><a href="https://www.instagram.com/louis.bekk/">INSTAGRAM</a></li>
            </ul>
          </div>
          <div className="col-md-3 col-6">
            <ul>
              <li><a href="https://twitter.com/louis_bekk">TWITTER</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
