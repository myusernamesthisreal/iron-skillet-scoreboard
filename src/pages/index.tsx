import { Box, Text } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client'

let socket: Socket;

export default function Home() {

  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);

  useEffect(() => {
    const socketInitialize = async () => {
      // if (socket) return;
      socket = io();
      socket.on('connect', () => {
        console.log('connected');
      });
      socket.on('incLeftScore', (callback) => {
        console.log('incLeftScore', leftScore);
        setLeftScore(leftScore + 1);
        callback({
          score: leftScore + 1
        })
      });
      socket.on('incRightScore', (callback) => {
        console.log('incLeftScore', rightScore);
        setRightScore(rightScore + 1);
        callback({
          score: rightScore + 1
        })
      });
    }

    socketInitialize();

    return () => {
      socket.removeAllListeners();
    }
  }, [leftScore, rightScore])

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
          <Image src="/SMU_TCU GAME SCORE.png" alt="SMU TCU Game Score" width={1920} height={1080} />
        </Box>
        <Text pos="absolute" translateX="270px" translateY="6px" transform="auto-gpu" variant="score" w="100%" >{leftScore}</Text>
        <Text pos="absolute" translateX="-390px" translateY="6px" transform="auto-gpu" textAlign="right" variant="score" w="100%" >{rightScore}</Text>
      </main>
    </>
  )
}
