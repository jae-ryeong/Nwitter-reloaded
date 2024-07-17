import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/github-btn";

export default function CreateAccount(){
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        
        if(name==="email"){
            setEmail(value);
        }
        else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 이게 있어야 새로고침XXX
        setError("");
        if(isLoading || email === "" || password === "") return;
        try{
            setLoading(true);
            
        await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                setError(e.message)
            }

        } finally{
            setLoading(false);
        }
    }

    return (
    <Wrapper>
        <Title>Log into X</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required/>
            <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required/>
            <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}

        <Switcher>
            Don't have an account?  <Link to="/create-account">Create one &rarr;</Link>
            {/* rarr은 오른쪽 화살표이다. */}
        </Switcher>
        <GithubButton />
    </Wrapper>
    );
}