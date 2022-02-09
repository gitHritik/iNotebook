import React,{useState} from "react";
import { useHistory } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:""});
  const history = useHistory();
  const handleSubmit = async (e)=>{
      e.preventDefault();
      const {name,email,password} = credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password}) 
           
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
             //Send the token and redirect to page
             localStorage.setItem('token',json.authtoken)
             history.push('/');
             props.showAlert("Successfully created new account" ,"success")
        }else{
            props.showAlert("Invalid details","danger");
        }
  }
  const onChange = (e) => {
      setcredentials({...credentials, [e.target.name]: e.target.value });
    };
  return (
  <div>
      <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                       Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        onChange={onChange}
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                        minLength={5}
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
  </div>
  )
};

export default Signup;
