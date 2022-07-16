import React from "react";
import "./Footer.css";
import logoblack from "./images/BERLYWUD.png";

function Footer() {
  return (
    // <div className="footer">
    //     <div className="footer__links">
    //         <h3>FOLLOW US</h3>
    //         <a href="#"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg></a>
    //         <a href="#"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" className="svg-inline--fa fa-facebook fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg></a>
    //         <a href="#"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg></a>
    //         <a href="#"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></a>
    //     </div>

    //     <div className="footer__info">
    //         <div className="footer__img">
    //             <img src={logoblack} alt=""/>
    //         </div>
    //         <div className="footer__categories">
    //             <h3>THE CATEGORIES</h3>
    //             <a href="#men">MEN</a>
    //             <a href="#women">WOMEN</a>
    //             <a href="#unisex">UNISEX</a>
    //             <a href="#decantssplits">DECANTS & SPLITS</a>
    //             <a href="#miniatures">MINIATURES</a>
    //         </div>
    //         <div>
    //             <h3>ABOUT US</h3>

    //         </div>
    //         <div>
    //             <h3>CONTACT US</h3>
    //             <a href="mailto:mannyvirdi98@gmail.com?subject=Reaching%20Out">Email Me</a>
    //             <p>Contact no.- 99999999999</p>
    //         </div>
    //     </div>
    // </div>
    <div className="pg-footer">
      <footer className="footer">
        <svg
          className="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            className="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>
        <div className="footer-content">
          <div className="footer-content-column">
            <div className="footer-logo">
              <a className="footer-logo-link" href="#">
                <span className="hidden-link-text">LOGO</span>
                <img src={logoblack} style={{ maxWidth: "160px" }} alt="" />
              </a>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Contact Us</h2>
              <ul id="menu-get-started" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#">Start</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#">Documentation</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-product">
                  <a href="#">Installation</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Company</h2>
              <ul id="menu-company" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Contact</a>
                </li>
                <li className="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="#">News</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <h2 className="footer-menu-name"> Legal</h2>
              <ul id="menu-legal" className="footer-menu-list">
                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-170434">
                  <a href="#">Privacy Notice</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-menu">
              <h2 className="footer-menu-name">Information</h2>
              <ul id="menu-quick-links" className="footer-menu-list">
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    Support Center
                  </a>
                </li>
                <li className="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">
                    Service Status
                  </a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Security</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Blog</a>
                </li>
                <li className="menu-item menu-item-type-post_type_archive menu-item-object-customer">
                  <a href="#">Customers</a>
                </li>
                <li className="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Reviews</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-content-column">
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> Let's Chat</h2>
              <p className="footer-call-to-action-description">
                {" "}
                Have a support question?
              </p>
              <a
                className="footer-call-to-action-button button"
                href="#"
                target="_self"
              >
                {" "}
                Get in Touch{" "}
              </a>
            </div>
            <div className="footer-call-to-action">
              <h2 className="footer-call-to-action-title"> You Call Us</h2>
              <p className="footer-call-to-action-link-wrapper">
                {" "}
                <a
                  className="footer-call-to-action-link"
                  href="tel:0124-64XXXX"
                  target="_self"
                >
                  {" "}
                  0124-64XXXX{" "}
                </a>
              </p>
            </div>
          </div>
          <div className="footer-social-links">
            {" "}
            <svg
              className="footer-social-amoeba-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 236 54"
            >
              <path
                className="footer-social-amoeba-path"
                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
              ></path>
            </svg>
            <a className="footer-social-link linkedin" href="#" target="_blank">
              <span className="hidden-link-text">Linkedin</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  className="footer-social-icon-path"
                  d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link twitter" href="#" target="_blank">
              <span className="hidden-link-text">Twitter</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 25.855469 5.574219 C 24.914063 5.992188 23.902344 6.273438 22.839844 6.402344 C 23.921875 5.75 24.757813 4.722656 25.148438 3.496094 C 24.132813 4.097656 23.007813 4.535156 21.8125 4.769531 C 20.855469 3.75 19.492188 3.113281 17.980469 3.113281 C 15.082031 3.113281 12.730469 5.464844 12.730469 8.363281 C 12.730469 8.773438 12.777344 9.175781 12.867188 9.558594 C 8.503906 9.339844 4.636719 7.246094 2.046875 4.070313 C 1.59375 4.847656 1.335938 5.75 1.335938 6.714844 C 1.335938 8.535156 2.261719 10.140625 3.671875 11.082031 C 2.808594 11.054688 2 10.820313 1.292969 10.425781 C 1.292969 10.449219 1.292969 10.46875 1.292969 10.492188 C 1.292969 13.035156 3.101563 15.15625 5.503906 15.640625 C 5.0625 15.761719 4.601563 15.824219 4.121094 15.824219 C 3.78125 15.824219 3.453125 15.792969 3.132813 15.730469 C 3.800781 17.8125 5.738281 19.335938 8.035156 19.375 C 6.242188 20.785156 3.976563 21.621094 1.515625 21.621094 C 1.089844 21.621094 0.675781 21.597656 0.265625 21.550781 C 2.585938 23.039063 5.347656 23.90625 8.3125 23.90625 C 17.96875 23.90625 23.25 15.90625 23.25 8.972656 C 23.25 8.742188 23.246094 8.515625 23.234375 8.289063 C 24.261719 7.554688 25.152344 6.628906 25.855469 5.574219 "
                ></path>
              </svg>
            </a>
            <a className="footer-social-link youtube" href="#" target="_blank">
              <span className="hidden-link-text">Youtube</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"
                ></path>
              </svg>
            </a>
            <a className="footer-social-link github" href="#" target="_blank">
              <span className="hidden-link-text">Github</span>
              <svg
                className="footer-social-icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  className="footer-social-icon-path"
                  d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z "
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="footer-copyright-wrapper">
            <p className="footer-copyright-text">
              <a className="footer-copyright-link" href="#" target="_self">
                {" "}
                ©2020. | Designed By: Pooja Nahelia. | All rights reserved.{" "}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
