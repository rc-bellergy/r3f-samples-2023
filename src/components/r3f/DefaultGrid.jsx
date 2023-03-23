import { Grid } from '@react-three/drei'

export default function DefaultGrid(props) {
    return <Grid
        position={[0, -0.01, 0]}
        cellThickness={1}
        cellColor={'#6f6f6f'}
        cellSize={0.5}
        sectionThickness={1.5}
        sectionColor={'#9d4b4b'}
        sectionSize={5}
        fadeDistance={40}
        fadeStrength={0.5}
        infiniteGrid={true}
        {...props}
    />
}