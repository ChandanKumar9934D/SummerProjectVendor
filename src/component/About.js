import Header from "./layout/Header";
import StatsCounter from "./Statscounter";

export default function About() {
    return (
        <div>
           
            <section className="inner-banner py-5">
                <div className="w3l-breadcrumb py-lg-5">
                    <div className="container pt-5 pb-sm-4 pb-2">
                        <h4 className="inner-text-title font-weight-bold pt-5">
                            About Us
                        </h4>
                        <ul className="breadcrumbs-custom-path">
                            <li>
                                <a href="">
                                    Home
                                </a>
                            </li>
                            <li className="active">
                                <i className="fas fa-angle-right mx-2" />
                                About
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <section className="w3l-about-2 py-5">
        <div className="container py-lg-5 py-md-4 py-2">
          <div className="row justify-content-between align-items-center pb-lg-5">
            <div className="col-lg-6 about-2-secs-right mb-lg-0 mb-5">
              <div className="image-box inverse position-relative">
                <div className="image-box__static">
                  <img
                    alt=""
                    height="459"
                    src="assets/images/ac.avif"
                    width="364"
                  />
                </div>
                <div className="image-box__float">
                  <img
                    alt=""
                    height="459"
                    src="assets/images/plumbing.jpg"
                    width="364"
                  />
                </div>

              </div>
            </div>
            <div className="col-lg-6 about-2-secs-left ps-lg-5 mt-lg-4 mt-5">
              <h5 className="sub-title">
                More than 25 Years of Experience
              </h5>
              <h3 className="title-style">
                We are passionate about our services
              </h3>
              <p className="mt-4">
                We uphold and practice the highest standards, free from any blame or fault, committed to delivering exceptional and reliable home services
              </p>
              <ul className="mt-4 list-style-lis">
                <li>
                  <i className="fas fa-check-circle" />
                  100% Customer Satisfaction
                </li>
                <li>
                  <i className="fas fa-check-circle" />
                  Free Collection & Delivery
                </li>
                <li>
                  <i className="fas fa-check-circle" />
                  Affordable Prices
                </li>
              </ul>
              <a
                className="btn btn-style mt-5"
                href="about.html"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </section>
            <StatsCounter/>
            <section className="home-block-3 py-xl-4 py-2">
                <div className="row m-0 align-items-center">
                    <div className="col-lg-6 left-w3l-img p-0">
                        <img
                            alt="card-image"
                            className="img-fluid"
                            src="assets/images/worj.avif"
                        />
                    </div>
                    <div className="col-lg-6 right-w3l-img mt-lg-0 mt-sm-4 mt-5">
            <div className="p-xl-5 p-sm-4 mx-xl-3">
              <h5 className="sub-title">
                Get 30% Discount
              </h5>
              <h3 className="title-style">
                Book Our Home Services
              </h3>
              <p className="sub-title mt-3">
              Our home services offer dependable and trustworthy solutions tailored to meet your needs. Whether it's cleaning, maintenance, or repairs, we ensure top-quality results with every visit.
              </p>
              <div className="row mt-5 pt-xl-4">
                <div className="col-sm-6 icon-style">
                  <i className="fas fa-tshirt" />
                  <div className="ab-detail">
                    <h4 className="title-head mb-sm-3 mb-2">
                      <a href="services.html">
                      Thorough Home Care
                      </a>
                    </h4>
                    <p>
                    Our team provides comprehensive home care services, ensuring every corner of your house is spotless and well-maintained. 
                    </p>
                  </div>
                </div>
                <div className="col-sm-6 icon-style mt-sm-0 mt-4">
                  <i className="fas fa-shipping-fast" />
                  <div className="ab-detail">
                    <h4 className="title-head mb-sm-3 mb-2">
                      <a href="services.html">
                        Fast Delivery
                      </a>
                    </h4>
                    <p>
                    Our skilled professionals are committed to completing tasks efficiently, ensuring minimal disruption to your daily routine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
                </div>
            </section>
            <section className="w3l-content-11-main py-5">
                <div className="container py-lg-5 py-md-4 py-2">
                    <div
                        className="title-main text-center mx-auto mb-md-5 mb-4"
                        style={{
                            maxWidth: '500px'
                        }}
                    >
                        <h5 className="sub-title">
                            Meet Our Team
                        </h5>
                        <h3 className="title-style">
                            Professional Staff
                        </h3>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-4 col-sm-6">
                            <div className="position-relative">
                                <img
                                    alt="image"
                                    className="img-fluid"
                                    src="assets/images/team1.jpg"
                                />
                                <div className="text-position">
                                    <h4>
                                        <a href="about.html">
                                            Aida Bugg
                                        </a>
                                    </h4>
                                    <p>
                                        Subtitle
                                    </p>
                                    <div className="social-team">
                                        <ul className="list-inline">
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mt-sm-0 mt-4">
                            <div className="position-relative">
                                <img
                                    alt="image"
                                    className="img-fluid"
                                    src="assets/images/team2.jpg"
                                />
                                <div className="text-position">
                                    <h4>
                                        <a href="about.html">
                                            Jimic Nasium
                                        </a>
                                    </h4>
                                    <p>
                                        Subtitle
                                    </p>
                                    <div className="social-team">
                                        <ul className="list-inline">
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mt-md-0 mt-4">
                            <div className="position-relative">
                                <img
                                    alt="image"
                                    className="img-fluid"
                                    src="assets/images/team3.jpg"
                                />
                                <div className="text-position">
                                    <h4>
                                        <a href="about.html">
                                            Henry Itondo
                                        </a>
                                    </h4>
                                    <p>
                                        Subtitle
                                    </p>
                                    <div className="social-team">
                                        <ul className="list-inline">
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-facebook-f" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#url">
                                                    <i className="fab fa-linkedin-in" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="w3l-clients pb-5"
                id="testimonials"
            >
                <div className="container py-lg-5 py-md-4 pt-2">
                    <div className="row w3-testimonial-grids align-items-center">
                        <div className="col-lg-6 w3-testimonial-content-top">
                            <div className="title-main mb-4">
                                <h5 className="sub-title">
                                    Tesimonials
                                </h5>
                                <h3 className="title-style">
                                    What our Customers think about us
                                </h3>
                            </div>
                            <div
                                className="owl-carousel owl-theme py-sm-2 mb-4"
                                id="owl-demo1"
                            >
                                <div className="item">
                                    <div className="testimonial-content">
                                        <div className="testimonial">
                                            <blockquote>
                                                <q>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit beatae                                            laudantium                                            voluptate rem ullam dolore nisi voluptatibus esse quasi, doloribus tempora.                                            Dolores molestias adipisci dolor sit amet! by the Desire to achieve                                            Success.
                                                </q>
                                            </blockquote>
                                            <div className="testi-des">
                                                <div className="test-img">
                                                    <img
                                                        alt="client-img"
                                                        className="img-fluid"
                                                        src="assets/images/testi1.jpg"
                                                    />
                                                </div>
                                                <div className="peopl align-self">
                                                    <h3>
                                                        John wilson
                                                    </h3>
                                                    <p className="indentity">
                                                        Subtitle goes here
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial-content">
                                        <div className="testimonial">
                                            <blockquote>
                                                <q>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit beatae                                            laudantium                                            voluptate rem ullam dolore nisi voluptatibus esse quasi, doloribus tempora.                                            Dolores molestias adipisci dolor sit amet! by the Desire to achieve                                            Success.
                                                </q>
                                            </blockquote>
                                            <div className="testi-des">
                                                <div className="test-img">
                                                    <img
                                                        alt="client-img"
                                                        className="img-fluid"
                                                        src="assets/images/testi2.jpg"
                                                    />
                                                </div>
                                                <div className="peopl align-self">
                                                    <h3>
                                                        Julia sakura
                                                    </h3>
                                                    <p className="indentity">
                                                        Subtitle goes here
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial-content">
                                        <div className="testimonial">
                                            <blockquote>
                                                <q>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit beatae                                            laudantium                                            voluptate rem ullam dolore nisi voluptatibus esse quasi, doloribus tempora.                                            Dolores molestias adipisci dolor sit amet! by the Desire to achieve                                            Success.
                                                </q>
                                            </blockquote>
                                            <div className="testi-des">
                                                <div className="test-img">
                                                    <img
                                                        alt="client-img"
                                                        className="img-fluid"
                                                        src="assets/images/testi3.jpg"
                                                    />
                                                </div>
                                                <div className="peopl align-self">
                                                    <h3>
                                                        Roy Mmdson
                                                    </h3>
                                                    <p className="indentity">
                                                        Subtitle goes here
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimonial-content">
                                        <div className="testimonial">
                                            <blockquote>
                                                <q>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit beatae                                            laudantium                                            voluptate rem ullam dolore nisi voluptatibus esse quasi, doloribus tempora.                                            Dolores molestias adipisci dolor sit amet! by the Desire to achieve                                            Success.
                                                </q>
                                            </blockquote>
                                            <div className="testi-des">
                                                <div className="test-img">
                                                    <img
                                                        alt="client-img"
                                                        className="img-fluid"
                                                        src="assets/images/testi2.jpg"
                                                    />
                                                </div>
                                                <div className="peopl align-self">
                                                    <h3>
                                                        Mike Thyson
                                                    </h3>
                                                    <p className="indentity">
                                                        Subtitle goes here
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative ps-lg-5 mt-lg-0 mt-5">
                            <img
                                alt=""
                                className="radius-image img-fluid"
                                src="assets/images/testimonials.jpg"
                            />
                        </div>
                    </div>
                </div>
            </section>
            
        
        </div>
    )
}