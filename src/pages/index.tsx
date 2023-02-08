import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'

let socket: Socket;

export default function Home() {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {

    const fetchScore = async () => {
      const res = await fetch('/api/score');
      const data = await res.json();
      console.log('fetchScore', data);
      setLeftScore(data.score.leftScore);
      setRightScore(data.score.rightScore);
      setFlipped(data.score.flipped);
    }

    const socketInitialize = async () => {
      // if (socket) return;
      socket = io();
      socket.on('connect', async () => {
        console.log('connected');
        await fetchScore();
      });
      socket.on('updateScore', async () => {
        console.log('updateScore', leftScore, rightScore);
        await fetchScore();
      });
    }

    socketInitialize();

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    }
  }, [])

  return (
    <>
      <Head>
        <title>Iron Skillet Scoreboard</title>
        <meta name="description" content="Scoreboard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box position="absolute">
          <Image src={flipped ? "/TCU_SMU GAME SCORE.png" : "/SMU_TCU GAME SCORE.png"} alt="SMU TCU Game Score" width={1920} height={1080} />
        </Box>
        <Text pos="absolute" translateX="270px" translateY="6px" transform="auto-gpu" variant="score" w="100%" >{flipped ? rightScore : leftScore}</Text>
        <Text pos="absolute" translateX="1630px" translateY="6px" transform="auto-gpu" textAlign="right" variant="score" >{flipped ? leftScore : rightScore}</Text>
      </main>
    </>
  )
}
