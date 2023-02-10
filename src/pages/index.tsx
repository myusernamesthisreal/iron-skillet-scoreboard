import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'

let socket: Socket;

export default function Home() {

  const [score, setScore] = useState({ flipped: false, leftScore: 0, rightScore: 0, leftGameScore: 0, rightGameScore: 0, match: 1 });

  useEffect(() => {

    const fetchScore = async () => {
      const res = await fetch('/api/score');
      const data = await res.json();
      console.log('fetchScore', data);
      setScore(data.score);
    }

    const socketInitialize = async () => {
      // if (socket) return;
      socket = io();
      socket.on('connect', async () => {
        console.log('connected');
        await fetchScore();
      });
      socket.on('updateScore', async () => {
        console.log('updateScore');
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
        <Box position="absolute" display="block">
          <Image src={score.flipped ? "/TCU_SMU GAME SCORE.png" : "/SMU_TCU GAME SCORE.png"} alt="SMU TCU Game Score" width={1920} height={1080} />
        </Box>
        <Box zIndex={1} w="1920px" position="absolute">
          <Text pos="absolute" translateX="260px" translateY="6px" transform="auto-gpu" variant="score" >{score.flipped ? score.rightScore : score.leftScore}</Text>
          <Text pos="relative" textAlign="right" translateX="-260px" translateY="6px" transform="auto-gpu" variant="score">{score.flipped ? score.leftScore : score.rightScore}</Text>

          <Text pos="absolute" translateX="915px" translateY="862px" fontSize="26px" transform="auto-gpu" variant="score" >0{score.match}</Text>

          <Text pos="absolute" translateX="905px" translateY="925px" transform="auto-gpu" variant="score"  >{score.flipped ? score.leftGameScore : score.rightGameScore}</Text>
          <Text pos="relative" textAlign="right" translateX="-1055px" translateY="925px" transform="auto-gpu" variant="score"  >{score.flipped ? score.rightGameScore : score.leftGameScore}</Text>
        </Box>
      </main>
    </>
  )
}
