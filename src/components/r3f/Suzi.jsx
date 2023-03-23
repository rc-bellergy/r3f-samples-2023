import { useGLTF } from '@react-three/drei'

export default function Suzi(props) {
    const { nodes } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/suzanne-high-poly/model.gltf')
    return (
        <mesh castShadow receiveShadow geometry={nodes.Suzanne.geometry} {...props}>
            <meshStandardMaterial color="#9d4b4b" />
        </mesh>
    )
}