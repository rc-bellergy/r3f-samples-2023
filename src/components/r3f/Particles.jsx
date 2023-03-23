// Read here for more information:
// https://github.com/rc-bellergy/threejs-particles-from-png

import * as THREE from 'three'
import { FileLoader } from 'three'
import { useLoader, useFrame } from '@react-three/fiber'

import DecodePNG from '../utils/decode_png'
import vertexShader from '../shaders/pointcloud/vertex.glsl'
import fragmentShader from '../shaders/pointcloud/fragment.glsl'


export default function Particles(props) {

    const settings = {
        particlesSize: props.particlesSize ? props.particlesSize : 60,
        fogNear: props.fogNear ? props.fogNear : 0,
        fogFar: props.fogFar ? props.fogFar : 40,
        blending: props.blending ? props.blending : THREE.AdditiveBlending
    }

    const shaderMaterial = new THREE.ShaderMaterial({
        vertexColors: true,
        blending: settings.blending,
        transparent: true,
        depthWrite: false,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms:
        {
            uSize: { value: settings.particlesSize * Math.min(window.devicePixelRatio, 2) },
            uTime: { value: 0 },
            uFogNear: { value: settings.fogNear },
            uFogFar: { value: settings.fogFar }
        },
    })

    /**
     * 
     * @param {ImageData} positionsData The data of particles position
     * @param {ImageData} colorsData The data of particles color
     * [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
     * @returns {particles}
     */
    const getParticles = (positionsData, colorsData) => {

        const startPoints = [] // random start points
        const points = [] // points destination
        const colors = []
        const pscale = [] // particle scale
        const durations = [] // durations move pront from start to destination
        const jumps = [] // a movement of the point in the destinationwsada

        // Get the distortion scale from the last pixel of colorData
        let ds = positionsData.getVector(positionsData.getLength() - 1)
        ds = ds.divideScalar(65535) // normalize
        const scale = [ds.x, ds.y, ds.z]

        // console.log("Correct distortion:", scale)

        for (let i = 0; i < positionsData.getLength() - 1; i++) {

            let c = colorsData.getVector(i)
            // Skip black colour particles
            if (c.equals(new THREE.Vector4(0, 0, 0, 255))) {
                // console.log("skipped", i)
                continue
            }
            // Set colors
            c = c.divideScalar(255)
            colors.push(c.x, c.y, c.z)

            // Set start position (random points in the sphere)
            const randomPoint = getSpherePoint(0.5);
            startPoints.push(randomPoint.x, randomPoint.y, randomPoint.z)

            // Set final positions
            let p = positionsData.getVector(i);
            p = p.divideScalar(65535) // normalize (0-1)
            p = p.sub(new THREE.Vector4(0.5, 1, 0.5, 0)) // center
            p = p.multiply(new THREE.Vector4(scale[0], scale[1], scale[2], 0)) // correct distortion 
            points.push(p.x, p.y, p.z)

            // Random duration and jumping noise
            let d = Math.random() + 2; // 2.x sec.
            let j = Math.random() * 0.03;
            // 5% particles will move more slowly and far than others
            if (Math.random() > 0.8) {
                d = d * 2;
                j = j * 10;
            }
            durations.push(d);
            jumps.push(0);

            // Set Size
            pscale.push(3)

        }

        const particles = {
            points: points,
            colors: colors,
            scales: pscale,
            startPoints: startPoints,
            durations: durations,
            jumps: jumps
        }

        console.log("Total particles:", particles.points.length / 3)

        return particles
    }

    const createParticlesObject = (particles, shaderMaterial) => {
        const bufferGeometry = new THREE.BufferGeometry()
        bufferGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particles.points, 3))
        bufferGeometry.setAttribute('color', new THREE.Float32BufferAttribute(particles.colors, 3))
        bufferGeometry.setAttribute('aStartPosition', new THREE.Float32BufferAttribute(particles.startPoints, 3))
        bufferGeometry.setAttribute('aScale', new THREE.Float32BufferAttribute(particles.scales, 1))
        bufferGeometry.setAttribute('aDuration', new THREE.Float32BufferAttribute(particles.durations, 1))
        bufferGeometry.setAttribute('aJump', new THREE.Float32BufferAttribute(particles.jumps, 1))
        return new THREE.Points(bufferGeometry, shaderMaterial)
    }

    // Random points in sphere
    const getSpherePoint = (scale) => {
        let x = Math.random() - 0.5;
        let y = Math.random() - 0.5;
        let z = Math.random() - 0.5;

        let mag = Math.sqrt(x * x + y * y + z * z);
        x /= mag; y /= mag; z /= mag;

        let d = Math.random() * scale;
        return { x: x * d, y: y * d, z: z * d };
    }

    const positionData = useLoader(FileLoader,
        props.positionFile,
        (loader) => {
            loader.setResponseType('arraybuffer')
        }
    )

    const colorData = useLoader(FileLoader,
        props.colorFile,
        (loader) => {
            loader.setResponseType('arraybuffer')
        }
    )

    const position = new DecodePNG(positionData, 16)
    const color = new DecodePNG(colorData, 16)
    // console.log('color', color)
    // console.log('position', position)

    const particles = getParticles(position, color)
    const particlesObject = createParticlesObject(particles, shaderMaterial)
    particlesObject.rotation.x = Math.PI
    particlesObject.rotation.y = Math.PI
    particlesObject.scale.x = -1


    useFrame((state, delta) => {
        shaderMaterial.uniforms.uTime.value += delta
    })

    return <primitive object={particlesObject} {...props} />
}