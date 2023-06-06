import "./style.css";
import { useState } from "react";

const defaultvalue = {
  email: "",
  subject: "",
  details: "",
};

//every object has a key value pair.
//in this the object key value pair , both are variables therefore
//enclose it in the [] brackets to indicate one of them is a key..
const RegisterComplaint = () => {
  const [complaint, setcomplaint] = useState(defaultvalue);
  const onvalueChange = (e) => {
    //console.log( e.target.name , e.target.value);
    setcomplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  async function onclickregistercomplaint(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/support/addnew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(complaint),
    });
    return (
      <div className="container">
        <div className="content">
          <div className="image-box">
            <img
              src="https://images.theconversation.com/files/372928/original/file-20201203-13-12sn39w.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=900.0&fit=crop"
              alt="images"
            />
          </div>

          <form onSubmit={onclickregistercomplaint}>
            <div className="topic">Send us a Message</div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                onChange={(e) => onvalueChange(e)}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-box">
              <input
                type="text"
                name="subject"
                onChange={(e) => onvalueChange(e)}
                required
              />
              <label>Subject</label>
            </div>

            <div className="message-box">
              <textarea
                name="details"
                id=""
                cols="30"
                rows="10"
                onChange={(e) => onvalueChange(e)}
                required
              ></textarea>
              <label>Your Message</label>
            </div>
            <div className="input-box">
              <input type="submit" value="Register Complaint" />
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default RegisterComplaint;
