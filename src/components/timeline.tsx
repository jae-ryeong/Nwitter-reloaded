import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase/firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
    id: string;
    photo: string;
    tweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
    overflow: scroll;
`;

export default function Timeline() {
    const [tweets, setTweet] = useState<ITweet[]>([]);

    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;    // 이 변수의 타입은 Unsubscribe 또는 null일 것이고 처음에는 null 값을 가지고 있는다
        const fetchTweets = async () => {
            const tweetsQuery = query(
                collection(db, "tweets"),
                orderBy("createdAt", "desc"),
                limit(25)
            );
            /*
                    const snapshot = await getDocs(tweetsQuery);
                    const tweets = snapshot.docs.map((doc) => {
                        const { tweet, createdAt, userId, username, photo } = doc.data();
                        return{
                            tweet, createdAt, userId, username, photo, id: doc.id,
                        };
                        
                    });
            */

            // useEffect는 유저가 바라보고있지 않으면 언마운트를 시도하는 성질을 이용
            unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
                const tweets = snapshot.docs.map((doc) => {
                    const { tweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        tweet, createdAt, userId, username, photo, id: doc.id,
                    };
                }
                );
                setTweet(tweets);
            });

        };
        fetchTweets();
        return () => {
            unsubscribe && unsubscribe();
        }
    }, [])

    return (
        <Wrapper>
            {tweets.map(tweet => <Tweet key={tweet.id} {...tweet} />)}
        </Wrapper>
    )
}