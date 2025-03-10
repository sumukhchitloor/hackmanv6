import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import eva_bg_small_lef from "../assets/images/eva_bg_small_lef.png";
import taranaQR from "../assets/images/taranaQR.jpeg";
import termsconditions from "../assets/documents/T&C - HACKMAN.pdf";
import codeofconduct from "../assets/documents/COC - HACKMAN.pdf";
import instructions from "../assets/documents/Instructions- HACKMAN.pdf";
import Navbar from '../components/Navbar';
import Registeration from '../components/Registeration';
import Registeration2 from '../components/Registeration2';
import '../App.css';
import Axios from "axios";

function RegisterationPage() {
  const [page, setPage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [showError, setShowError] = useState('');

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleOkError() {
    setShowError('');
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    teamName: "",
    teamMembers: [],
    theme: "",
    transactionID: "",
    upiID: "",
    teamPhone: [],
    teamEmail: []
  });

    function handleClick() {
    const regData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      college: formData.college,
      teamName: formData.teamName,
      teamMembers: formData.teamMembers,
      theme: formData.theme,
      transactionID: formData.transactionID,
      upiID: formData.upiID,
      teamPhone: formData.teamPhone,
      teamEmail: formData.teamEmail
    }
    if(isChecked) {
      setFormErrors(validate2(formData));
      setIsSubmit(true);
      // console.log(regData);
      Axios.post("https://hackmanv6.onrender.com/api/v1/registration",regData)
      // Axios.post("http://localhost:4000/api/v1/registration",regData)
      // setData(response.data)
        .then((res)=>{
          const response = res.data.registeration;
          // registeration
          setShowPopup(true)
          console.log("dineh")
          sendMail(response)
          // console.log(data)
          })
        
          //  Axios.post("http://localhost:4000/api/v1/sendMail",email)

          
      .catch((err)=>{setShowError(err)})
    }
  }

  function sendMail(response){
    const emails=response.teamEmail;
    emails.push(response.email)
    const teamId =response.teamId
    const teamName=response.teamName
    Axios.post("https://hackmanv6.onrender.com/api/v1/sendMail",{email:emails,teamId:teamId,teamName:teamName})
    .then((res)=>{
      console.log(res);
    }).catch((error)=>{
      console.log(error)
    })
  }

  function handleNext(event) {
    event.preventDefault();
    setFormErrors(validate(formData));
    // setPage((curPage) => curPage+1);
    if(Object.keys(validate(formData)).length===0) {
      setPage((curPage) => curPage+1);
    }
  }

  const handleOk = () => {
    navigate('/');
  }

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit){
      // console.log(formData);
    }
  }, [formErrors, isSubmit, formData]);

  const validate = (formData) => {
    const errors = {};
    const regexemail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const regexphone = /^[0-9]{10}$/;
    if(!formData.name){
      errors.name = "Name is required!!";
    }
    if(!formData.email){
      errors.email = "Email is required!!";
    }else if(!regexemail.test(formData.email)){
      errors.email = "Invalid email!!";
    }
    if(!formData.phone){
      errors.phone = "Phone is required!!";
    }else if(!regexphone.test(formData.phone)){
      errors.phone = "Invalid phone number!!";
    }
    if(!formData.college){
      errors.college = "College is required!!";
    }
    return errors;
  }

  const validate2 = (formData, errors=validate(formData)) => {
    if(!formData.teamName){
      errors.teamName = "Team name is required!!";
    }
    if(formData.teamMembers.length === 0){
      errors.teamMembers = "Minimum 2 members in a team!!";
    }
    if(!formData.transactionID){
      errors.transactionID = "Transaction ID is required!!";
    }
    if(!formData.upiID){
      errors.upiID = "UPI ID is required!!";
    }
    return errors;
  }

  const ButtonDisplay = () => {
    if (page === 0){
      return (
        <div className="lg:mx-96 md:mx-48 mx-8">
          <div className="flex justify-center">
            <button onClick={(event) => {
              handleNext(event);
              }} className="lg:text-xl shadow bg-[#22C3FF] hover:bg-[#D4DFC7] hover:text-black focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded text-sm" type="submit">
              Next
            </button>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="lg:mx-96 md:mx-48 mx-8">
          <div className='pb-4'>
          <input type="checkbox" className='form-checkbox text-[#22C3FF]' id='agree' checked={isChecked} onChange={handleCheckboxChange}/>
          <label className='text-[#D4DFC7] pl-2 justify-center'>By registering you agree to our <a href={instructions} rel='noreferrer noopener' target="_blank" className='text-green-300 text-decoration-line: underline'>Instructions</a> , <a href={termsconditions} rel='noreferrer noopener' target="_blank" className='text-green-300 text-decoration-line: underline'>Terms & Conditions</a> and <a href={codeofconduct} rel='noreferrer noopener' target="_blank" className='text-green-300 text-decoration-line: underline'>Code of Conduct</a></label>
          </div>
          <div className="">
            <div className="flex justify-center float-left">
              <button onClick={() => {setPage((curPage) => curPage-1);}} className="lg:text-xl shadow bg-[#22C3FF] hover:bg-[#D4DFC7] hover:text-black focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded text-sm" type="button">
                Back
              </button>              
            </div>
          </div>
                  
          <div className="">
            <div className="flex justify-center float-right">
              <button onClick={handleClick} className="lg:text-xl shadow bg-[#22C3FF] hover:bg-[#D4DFC7] hover:text-black focus:shadow-outline focus:outline-none text-black font-bold py-2 px-2 rounded text-sm" type="submit">
                Submit
              </button>
            </div>
          </div>

          <div className="">
            <p className="font-poppins text-[#ffffff] text-center lg:pt-16 lg:text-2xl pt-24 font-semibold text-2xl">Scan for Payment</p>
            <div className='lg:mx-auto'>
              <img className="lg:mt-4 lg:w-60 md:mt-6 md:w-40 mt-4 w-56 mx-auto" src={taranaQR} alt="QR Code 2" />
              <p className="pt-2 font-poppins text-sm text-[#ffffff] text-center font-semibold">UPI ID: taranashetty2002@oksbi</p>
              <p className="pt-2 font-poppins text-sm text-[#22C3FF] text-center font-semibold">Pay ₹600 per team</p>

            </div>
          </div>
        </div>
      )
    }
  }

  const PageDisplay = () => {
    if (page === 0){
      return (
        <div>
          <Registeration formData={formData} setFormData={setFormData} formErrors={formErrors} />
        </div>
      );
    }
    else {
      return (
      <Registeration2 formData={formData} setFormData={setFormData} formErrors={formErrors} />
      );
    }
  }

    return (
      <div>
        <Navbar currentPage='registration'/>
        {PageDisplay(page)}
        <div className='bg-[#24263B] lg:pb-56 md:pb-16 pb-24'>{ButtonDisplay(page)}</div>
        {showPopup && (
        <div className="popup bg-[#23354E] lg:w-[540px] lg:pt-12 md:w-[480px] md:pt-8 w-[320px] pt-0 rounded-xl">
            <img className="lg:float-left lg:w-48 lg:h-auto md:float-left md:w-40 md:h-auto justify-center w-20 h-auto" src={eva_bg_small_lef} alt="Registration eva" />
          <div>
            <p className="font-poppins lg:text-2xl md:text-xl text-md text-center">Registration Successful !!</p>
            <p className="font-poppins lg:text-sm md:text-sm text-xs text-center">Check your mail for further updates.</p>
          </div>
          <div className='lg:pt-20 lg:pb-8 md:pt-16 md:pb-6 pt-2'>
            <button onClick={handleOk} className="lg:text-xl shadow hover:bg-[#D4DFC7] hover:text-black focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded text-sm" type="button">
              OK
            </button>
          </div>
        </div>
      )}

        {showError && (
        <div className="popup bg-[#23354E] lg:w-[580px] lg:pt-12 md:w-[480px] md:pt-8 w-[320px] pt-0 rounded-xl">
            <img className="lg:float-left lg:w-48 lg:h-auto md:float-left md:w-40 md:h-auto justify-center w-20 h-auto" src={eva_bg_small_lef} alt="Registration eva" />
          <div>
            <p className="font-poppins mt-4 lg:text-2xl md:text-xl text-md text-red-500 text-center">Team Name already Exists !!</p>
          </div>
          <div className='lg:pt-20 lg:pb-8 md:pt-16 md:pb-6 pt-2'>
            <button onClick={handleOkError} className="lg:text-xl shadow hover:bg-[#D4DFC7] hover:text-black focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded text-sm" type="button">
              OK
            </button>
          </div>
        </div>
      )}

      </div>
    )
  }

export default RegisterationPage;