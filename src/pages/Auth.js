import React, {useContext, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Card, Form, FormControl} from "react-bootstrap";
import {NavLink, useHistory, useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";

const Auth = observer( () => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(user)
            user.setIsAuth(true)
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">
                    <FormControl className="mt-3" placeholder="Введите ваш email" value={email} onChange={e => setEmail(e.target.value)}/>
                    <FormControl className="mt-3" placeholder="Введите ваш пароль" value={password} onChange={e => setPassword(e.target.value)} type='password'/>
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink></div>
                            :
                            <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти в аккаунт</NavLink></div>
                        }
                        <Button className="align-self-end" variant="outline-success" onClick={click}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;