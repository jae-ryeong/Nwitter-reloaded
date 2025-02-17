import styled from "styled-components"
import gitlog from '../assects/github-mark.svg'
import { GithubAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
margin-top: 50px;
background-color:white;
font-weight: 500;
width: 100%;
color:black;
padding: 10px 20px;
border-radius: 50px;
display: flex;
gap:5px;
align-items: center;
justify-content: center;
cursor: pointer;
`;

const Logo = styled.img`
    height: 25px;
`

export default function GithubButton() {
    const navigate = useNavigate();
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();  // provider은 github에서 로그인한다라는 의미
            await signInWithPopup(auth, provider)
            navigate("/");
        } catch (error){
            console.error(error);
        }
    }
    return (
    <Button onClick={onClick}>
        <Logo src={gitlog} />
        Continue With Github
    </Button>
    )
}