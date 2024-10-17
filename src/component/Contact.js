import Header from "./layout/Header";


export default function Contact(){
    return(
        <div>
 
  <section className="inner-banner py-5">
    <div className="w3l-breadcrumb py-lg-5">
      <div className="container pt-5 pb-sm-4 pb-2">
        <h4 className="inner-text-title font-weight-bold pt-5">
          Contact Us
        </h4>
        <ul className="breadcrumbs-custom-path">
          <li>
            <a href="">
              Home
            </a>
          </li>
          <li className="active">
            <i className="fas fa-angle-right mx-2" />
            Contact
          </li>
        </ul>
      </div>
    </div>
  </section>
  <section className="w3l-w3l-contacts-12 py-5">
    <div className="contact-top py-lg-5 py-md-4 py-2">
      <div className="container">
        <div
          className="title-main text-center mx-auto mb-md-5 mb-4"
          style={{
            maxWidth: '500px'
          }}
        >
          <h5 className="sub-title">
            Get In Touch
          </h5>
          <h3 className="title-style">
            Contact Us
          </h3>
        </div>
        <div className="row">
          <div className="col-md-8 contacts12-main">
            <form
              action="https://sendmail.w3layouts.com/submitForm"
              className="main-input"
              method="post"
            >
              <div className="row top-inputs">
                <div className="col-md-6">
                  <input
                    id="w3lName"
                    name="w3lName"
                    placeholder="Name"
                    required
                    type="text"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    id="w3lSender"
                    name="email"
                    placeholder="Email"
                    required
                    type="email"
                  />
                </div>
              </div>
              <input
                id="w3lName"
                name="w3lName"
                placeholder="Phone Number"
                required
                type="text"
              />
              <textarea
                id="w3lMessage"
                name="w3lMessage"
                placeholder="Message"
                required
              />
              <div className="text-end">
                <button
                  className="btn btn-style"
                  type="submit"
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-4 ps-lg-5 mt-md-0 mt-4">
            <h3 className="title-style mb-4">
              Contact Info
            </h3>
            <div className="contact">
              <a href="mailto:hello@example.com">
                <p className="contact-text-sub">
                  Yourname@gmail.com
                </p>
              </a>
              <a href="tel:+7-800-999-800">
                <p className="contact-text-sub">
                  +91 908765431
                </p>
              </a>
              <p className="contact-text-sub">
                badwal road
                <br />
                Jalandhar
              </p>
              <div className="buttons-teams">
                <a href="#team">
                  <span
                    aria-hidden="true"
                    className="fab fa-facebook-square"
                  />
                </a>
                <a href="#team">
                  <span
                    aria-hidden="true"
                    className="fab fa-twitter-square"
                  />
                </a>
                <a href="#team">
                  <span
                    aria-hidden="true"
                    className="fab fa-google-plus-square"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section className="w3l-contacts-1">
    <div className="contacts">
      <div className="contacts-content">
        <iframe
          allowFullScreen
          frameBorder="0"
          height="650"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109066.42893264956!2d75.49101774058892!3d31.3223714360371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5a5747a9eb91%3A0xc74b34c05aa5b4b8!2sJalandhar%2C%20Punjab!5e0!3m2!1sen!2sin!4v1721023799255!5m2!1sen!2sin"
          style={{
            border: '0'
          }}
          width="100%"
        />
        <address>
          <h4>
            Jalandhar
          </h4>
          <a href="mailto:hello@w3layouts.com">
            Email: hello@w3layouts.com
          </a>
          <a href="tel:8-800-999-800">
            Tel: 8-800-999-800
          </a>
        </address>
      </div>
    </div>
  </section>

</div>
    )
}