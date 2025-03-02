import React from 'react';
import { IonFooter, 
         IonCard, 
         IonCardContent } from '@ionic/react';

const Footer: React.FC = () => {
  return (
    <IonFooter className="footer-tips">
      

      <div className="main-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>TUD Lost & Found</h4>
            <p>Helping students recover lost items across campus.</p>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: lost.found@tudublin.ie</p>
            <p>Phone: (01) 323-5041</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <p><a href="/faq">FAQ</a></p>
            <p><a href="#">Terms of Service</a></p>
            <p><a href="#">Privacy Policy</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2024 TUD Lost & Found. All rights reserved.
        </div>
      </div>
    </IonFooter>
  );
};

export default Footer;
