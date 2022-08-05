import React from 'react';
import {Field, reduxForm} from "redux-form";
import {createField, Input} from "../commons/FormsControls/FormControls";
import {required} from "../../utils/validation/validator";
import {connect} from "react-redux";
import {login} from "../../redux/authReducer.tsx";
import {Navigate} from "react-router-dom";
import style from './../commons/FormsControls/FormControls.module.css'

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input)}
            {createField("Password", "password", [required], Input, {type:"password"})}
            {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {})}

            {error ? <div className={style.formSummaryError}>
                {error}
            </div>: null}
            <div>
                <button>
                    Submit
                </button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    };

    if (props.isAuth) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );
};

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);

