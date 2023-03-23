import PageHead from '@/components/snippets/PageHead.js'
import Nav from '@/components/snippets/Nav.js'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, Environment, Html } from '@react-three/drei'

import Suzi from '@/components/r3f/Suzi'

export default function Sample01 () {
  const suziRef = useRef()
  const sphereRef = useRef()

  return (
    <>
      <PageHead title='Sample 01' description='' />
      <Nav/>
      <main>
        <Canvas
          shadows
          camera={{ position: [10, 12, 12], fov: 25 }}
          gl={{ antialias: false }}
          dpr={[1, 1.5]}
        >
          <Suspense
            fallback={
              <Html wrapperClass={'description'}>
                <p>Loading...</p>
              </Html>
            }
          >
            <group position={[0, -0.5, 0]}>
              <Center top ref={suziRef}>
                <Suzi rotation={[-0.63, 0, 0]} scale={2} />
              </Center>
              <Center top position={[-2, 0, 2]} ref={sphereRef}>
                <mesh castShadow>
                  <sphereGeometry args={[0.5, 64, 64]} />
                  <meshStandardMaterial color='#9d4b4b' />
                </mesh>
              </Center>
              <Center top position={[2.5, 0, 1]}>
                <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
                  <boxGeometry args={[0.7, 0.7, 0.7]} />
                  <meshStandardMaterial color='#9d4b4b' />
                </mesh>
              </Center>
              <mesh
                receiveShadow
                position-y={-0.02}
                rotation-x={-Math.PI * 0.5}
                scale={10}
              >
                <planeGeometry />
                <meshStandardMaterial color={'#333333'} />
              </mesh>
            </group>
            <directionalLight
              castShadow
              position={[0, 3, 5]}
              intensity={0.8}
              color={'#FF6666'}
            />
            <OrbitControls makeDefault />
            <Environment preset='city' />
          </Suspense>
        </Canvas>
      </main>
    </>
  )
}
