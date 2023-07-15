import React, { useEffect, useState } from "react";
import "./popupform.css";
import { useStateValue } from "../StateProvider";

const PopupForm = ({ open, closePopup, func }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [pbno, setPbno] = useState();
  const [address, setAddress] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const [number, setPhoneNumber] = useState();
  const [complaint, setComplaint] = useState();

  // closePopup is a function in Chat which makes the variable isOpen false, used in modal

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleSubmit = (event) => {
    console.log(user);
    event.preventDefault();
    const mssgs =
      "Pb no: " +
      pbno +
      "\n" +
      "Name: " +
      user.displayName +
      "\n" +
      "Phone Number: " +
      number +
      "\n" +
      "Address: " +
      address +
      "\n" +
      "Complaint: " +
      complaint;

    func(mssgs);
    closePopup();
  };

  return (
    <div>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h3 className="popup-title">Complaint Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="pbno" className="label">
                  PB No
                </label>
                <input
                  type="number"
                  id="pbno"
                  className="input"
                  placeholder="Enter your PB Number"
                  value={pbno}
                  onChange={(e) => setPbno(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number" className="label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input"
                  placeholder="Enter phone number"
                  pattern="[0-9]{10}"
                  required
                  value={number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="input"
                  placeholder="Enter your Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="comaplain" className="label">
                  Complaint
                </label>
                <textarea
                  value={complaint}
                  className="input"
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder="Enter your Complaint"
                  rows={4}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button onClick={closePopup} className="btn btn-secondary">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
