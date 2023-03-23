import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import Suzi from '../components/Suzi'

export default function MouseToy(props) {

    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()

    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if (hovered) {
            ref.current.rotation.y += delta
        }
    })

    return (
        <group {...props}
            ref={ref}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => {
                hover(true)
                document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(event) => {
                hover(false)
                document.body.style.cursor = 'default'
            }}>
            <mesh visible={!clicked}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
            </mesh>
            <Suzi position={[0, -0.7, 0.5]}
                rotation={[-0.63, 0, 0]}
                visible={clicked} />
        </group >
    )

}
