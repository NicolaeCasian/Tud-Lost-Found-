import React from 'react';
import { IonFooter, 
         IonCard, 
         IonCardContent } from '@ionic/react';

import './css/Footer.css';

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
            <p>Email: studenthubdesk.blanchardstown@tudublin.ie</p>
            <p>Phone: +353 1 220 8088</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <p><a href="/faq">FAQ</a></p>
            <p><a href="https://www.tudublin.ie/for-students/student-services-and-support/student-policies-regulations/">Terms of Service</a></p>
            <p><a href="https://www.tudublin.ie/explore/gdpr/data-protection-policy/">Privacy Policy</a></p>
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
