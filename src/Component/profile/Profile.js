import React from "react";

import profilecls from "./profile.module.css";
import sampath from "../../Assets/sampath.png";
import sampath1 from "../../Assets/sampath1.png";
const Profile = () => {
  return (
    <div className={profilecls.container}>
      <section className={profilecls.main}>
        <div className={profilecls.info}>
          <h3>Details</h3>
          <p></p>
          <p>
            <span>Name:</span> B.Sampath
          </p>
          <p>
            <span>age:</span>32
          </p>
          <p>
            <span>Education:</span>Diploma in Mechanical engineering
          </p>
          <p>
            <span>place :</span>Bangalore
          </p>
          <p>
            <span>Email:</span>bsampath11790@gmail.com{" "}
          </p>
          <p>
            <span>phone:</span>6381991250
          </p>

          <div>
            {/* //onClick="/update" */}
            <button>Update Profile</button>
          </div>
        </div>
        <div className={profilecls.photo}>
          {/* //photo */}
          <img src={sampath1} alt=""></img>
          {/* <img
            src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            alt=""
          ></img> */}
        </div>
        <div className={profilecls.about}>
          {/* about */}
          <h3>About</h3>
          <p>
            I am proficient in full stack web development, with expertise in
            HTML, CSS, React, JavaScript, and Material-UI for building intuitive
            user interfaces. Additionally, I have experience working with
            Node.js, Express, and databases like MySQL and MongoDB, along with
            cloud platforms like AWS. My skills in these technologies enable me
            to create robust and scalable web applications while ensuring a
            seamless user experience.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
