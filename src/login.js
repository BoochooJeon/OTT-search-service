import React, { useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';


function Login() {
    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')	// input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
    const navigate = useNavigate();

    const handleInputId = (e) => {
        setInputId(e.target.value)
    } 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }


	// login 버튼 클릭 이벤트

    const onClickLogin = () => {
        console.log('click login')
        console.log('ID : ', inputId)
        console.log('PW : ', inputPw)
        axios.post('/user_inform/onLogin', null, {
            params: {
            'user_id': inputId,
            'user_pw': inputPw
            }
        })
        .then(res => {
            console.log(res)
            console.log('res.data.userId :: ', res.data.userId)
            console.log('res.data.msg :: ', res.data.msg)
            if(res.data.userId === undefined){
                // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
                console.log('======================',res.data.msg)
                alert('입력하신 id 가 일치하지 않습니다.')
            } else if(res.data.userId === null){
                // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
                console.log('======================','입력하신 비밀번호 가 일치하지 않습니다.')
                alert('입력하신 비밀번호 가 일치하지 않습니다.')
            } else if(res.data.userId === inputId) {
                // id, pw 모두 일치 userId = userId1, msg = undefined
                console.log('======================','로그인 성공')
                sessionStorage.setItem('user_id', inputId)
            }
            // 작업 완료 되면 페이지 이동(새로고침)
            document.location.href = '/'
        })
        .catch()
    }




    return(
        <div class ="container">
            <div class="login-box">
                <h2>Login</h2>
                <div>
                    <label htmlFor='input_id'>ID</label>
                    <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
                </div>
                <div>
                    <label htmlFor='input_pw'>PW</label>
                    <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
                </div>
                <div>
                    <button type='Sign_in' onClick={onClickLogin}>Sign in</button>
                    <button type='Sign_up' onClick={() => { navigate('/signup'); }}>Sign up</button>
                </div>
            </div>
        </div>

    )

}

 

export default Login;