import './register.css';
export default function Register() {

    return (
        <>
            <div className="main">
                <h1>Register</h1>
                <br/>
                <br/>
                <form>
                    <div className="row mb-3">
                        <label htmlFor="userName" className="col-sm-2 col-form-label">User name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="userName"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="confirmPassword"/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone number</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="phoneNumber"/>
                        </div>
                    </div>
                    <br/>
                    <br/>

                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
            </div>
        </>
    );

}