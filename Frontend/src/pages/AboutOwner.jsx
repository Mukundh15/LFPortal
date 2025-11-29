function AboutOwner(){
    return <div className="container">
        <div className="row mt-5 mb-5 p-2 x">
            <div className="col mb-5">
                <img src="mukundh.jpg" style={{width:"60%",borderRadius:'50%',marginLeft:"6rem"}} className="ownimg" />
            </div>
            <div className="col mt-5">
                <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
                Hello! I'm <strong>Mukundh</strong>, the creator of <strong>LFPortal</strong>. I'm currently a Computer Science Engineering student passionate about solving real-life problems with the help of technology.
                <br /><br />
                I built this platform to help people find and report lost or found items easily and securely. I enjoy working on full-stack web development, especially using the MERN stack (MongoDB, Express, React, Node.js).
                <br /><br />
                My goal is to create user-friendly applications that can make a meaningful impact. Thank you for visiting LFPortal – I hope it helps you!
                </p>
            </div>
        </div>
    </div>
}
export default AboutOwner;