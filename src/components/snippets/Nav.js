import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav () {
  const router = useRouter()

  // Back to Home button
  let node = (
    <ul>
      <li className={'page-title'}>
        <Link href={`/`}>Back to Index</Link>
      </li>
    </ul>
  )

  // Navigation menu
  if (router.route === '/') {
    node = (
      <nav>
        <h1>React Three Fiber (R3F) Samples Collection</h1>
        <p>
          <a href='https://docs.pmnd.rs/react-three-fiber/api/canvas'>R3F</a>{' '}
          and <a href='https://github.com/pmndrs/drei'>drei</a> code samples.
        </p>
        <ul>
          <li className={'page-title'}>
            <Link href={`/samples/01`}>01 Simple Animation</Link>
            <ul>
              <li>Simple animation</li>
              <li>Load GLTF file</li>
              <li>Simple shadow</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/02`}>02 Grid & Shadows</Link>
            <ul>
              <li>Grid</li>
              <li>AccumulativeShadows</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/03`}>03 Custom Shader</Link>
            <ul>
              <li>Create custom shader</li>
              <li>Import shader (glsl) files</li>
              <li>Animate shader</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/04`}>04 Particles Shader</Link>
            <ul>
              <li>Load particles position and color data form PNG files</li>
              <li>Render particles with custom ParticlesShader</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/05`}>05 Hover & Click Object</Link>
            <ul>
              <li>Hover and Click events</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/06`}>06 GLTF to Components</Link>
            <ul>
              <li>
                <a href='https://github.com/pmndrs/gltfjsx'>
                  Using gltf to jsx
                </a>
              </li>
              <li>Modify gltf components</li>
              <li>Embed HTML to components</li>
              <li>Using Suspense and show Loading...</li>
              <li>Using Float</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/07`}>07 PivotControls</Link>
            <ul>
              <li>PivotControls</li>
              <li>Extract rotation from PivotControls</li>
              <li>Copy rotation from one object to other</li>
            </ul>
          </li>
          <li className={'page-title'}>
            <Link href={`/samples/08`}>08 Animation in gltf</Link>
            <ul>
              <li>three: fog</li>
              <li>fiber: useThree get Camera</li>
              <li>drei: useAnimation</li>
              <li>drei: SoftShadows</li>
              <li>leva: useControls</li>
            </ul>
          </li>
        </ul>
      </nav>
    )
  }

  return <>{node}</>
}
