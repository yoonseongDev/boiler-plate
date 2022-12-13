import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

const Auth = (SpecificComponent, option, adminRoute = null) => {
  //null => 아무나 출입이 가능한 페이지
  //true => 로그인한 유저만 출입이 가능한 페이지
  //false => 로그인한 유저는 출입 불가능한 페이지
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log("auth? ", response);

        if (!response.payload.isAuth) {
          // login yet
          if (option) {
            navigate("/login");
          }
        } else {
          // login
          if (adminRoute && !response.payload.isAdmin) {
            navigate("/");
          } else {
            if (option === false) {
              navigate("/");
            }
          }
        }
      });
    }, []);

    return (
      <SpecificComponent /> // component return이 없으면 React 실행이 안됨.
    );
  }

  return AuthenticationCheck;
};
export default Auth;
