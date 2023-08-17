import { Canvas, MeshProps, extend, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import { BufferGeometry, BufferAttribute, PointsMaterial, ShaderMaterial,
  Vector3, GridHelper, AxesHelper, TextureLoader, Sprite, SpriteMaterial, Float32BufferAttribute, Color } from 'three'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { ShaderPass } from 'three-stdlib'
import { CompositionShader } from './Shader'
import { clamp, gaussianRandom, spiral } from '@/utils/math'

extend({ShaderPass})

interface StarBackgroundProps{
  count: number,
  arms: number,
  spiral:number,
  coreXDistance: number,
  coreYDistance: number,
  outerCoreXDistance:number,
  outerCoreYDistance:number,
  thickness: number,
  armXDistance:number,
  armYDistance:number,
  armXMean: number,
  armYMean: number,

  radius?: number,
  spin?: number,
  randomness?: number,
  randomnessPower?: number,
  insideColor?: number,
  outsideColor?: number
}

export default function StarBackground(props: StarBackgroundProps) {
  const renderTarget = useRef<any>(null)
    
  return (
    <Canvas>
      <OrbitControls zoomSpeed={10} autoRotate autoRotateSpeed={1} target={[0, 0, 0]}  />
      <PerspectiveCamera makeDefault position={[0, 300, 300]}/>
      <axesHelper args={[5.0]}  />
      <gridHelper args={[100]} />
      <group rotation={[Math.PI/2, 0, 0]}>
        <Galaxy {...props}  />
      </group>
      <EffectComposer multisampling={0} ref={renderTarget}>
        <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={300} />
        <shaderPass
          attach="passes"
          args={[
            new ShaderMaterial({
              uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: renderTarget.current ? renderTarget.current.textures[2] : null },
                overlayTexture: { value: null },
              },
              vertexShader: CompositionShader.vertex,
              fragmentShader: CompositionShader.fragment,
            }),
            'baseTexture',
          ]}
        />
      </EffectComposer>
    </Canvas>
  )
}



export const starTypes = {
  percentage : [76.45, 12.1, 7.6, 3.0, 0.6, 0.13],
  color: [0xffcc6f, 0xffd2a1, 0xfff4ea, 0xf8f7ff, 0xcad7ff, 0xaabfff],
  size: [0.7, 1.15, 1.48, 2.0, 2.5, 3.5]
}

function generateStarType() {
  let num = Math.random() * 100.0
  let pct = starTypes.percentage
  for (let i = 0; i < pct.length; i++) {
    num -= pct[i]
    if (num < 0) {
      return i
    }
  }
  return 0
}

function Galaxy(props:StarBackgroundProps & MeshProps){
  const starTexture = useTexture('/images/star.png')

  const stars = useMemo(() => {
    const positions = [];
    const colors = []
    const sizes = []
    const luminances = []
    for (let i = 0; i < props.count / 4 ; i++) {
      const x = gaussianRandom(0, props.coreXDistance);
      const y = gaussianRandom(0, props.coreYDistance);
      const z = gaussianRandom(0, props.thickness);

      const starTypeIndex = generateStarType()
      const color = new Color(starTypes.color[starTypeIndex]);
      const size = starTypes.size[starTypeIndex]
      colors.push(color.r, color.g, color.b);
      positions.push(x, y, z);
      sizes.push(size);
      const minLuminosity = starTypes.percentage[starTypes.percentage.length - 1]
      const maxLuminosity = starTypes.percentage[0]
      const luminosity = (starTypes.percentage[starTypeIndex] - minLuminosity) / (maxLuminosity - minLuminosity) * 0.2
      luminances.push(luminosity)
    }
    for (let i = 0; i < props.count / 4 ; i++) {
      const x = gaussianRandom(0, props.outerCoreXDistance);
      const y = gaussianRandom(0, props.outerCoreYDistance);
      const z = gaussianRandom(0, props.thickness);

      const starTypeIndex = generateStarType()
      const color = new Color(starTypes.color[starTypeIndex]);
      const size = starTypes.size[starTypeIndex]
      colors.push(color.r, color.g, color.b);
      positions.push(x, y, z);
      sizes.push(size);
      const minLuminosity = starTypes.percentage[starTypes.percentage.length - 1]
      const maxLuminosity = starTypes.percentage[0]
      const luminosity = (starTypes.percentage[starTypeIndex] - minLuminosity) / (maxLuminosity - minLuminosity) * 0.2
      luminances.push(luminosity)
    }
    for (let i = 0; i < props.arms; i++){
      for (let j = 0; j < props.count / props.arms / 2; j++){
        const pos = spiral(
          gaussianRandom(props.armXMean, props.armXDistance), 
          gaussianRandom(props.armYMean, props.armYDistance), 
          gaussianRandom(0, props.thickness),
          i * 2 * Math.PI / props.arms, 
          props.armXDistance, 
          props.spiral
        )
        const starTypeIndex = generateStarType()
        const color = new Color(starTypes.color[starTypeIndex]);
        const size = starTypes.size[starTypeIndex]
        colors.push(color.r, color.g, color.b);
        positions.push(pos.x, pos.y, pos.z);
        sizes.push(size);
        const minLuminosity = starTypes.percentage[starTypes.percentage.length - 1]
        const maxLuminosity = starTypes.percentage[0]
        const luminosity = (starTypes.percentage[starTypeIndex] - minLuminosity) / (maxLuminosity - minLuminosity) * 0.2
        luminances.push(luminosity)
      }
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3))
    geometry.setAttribute('size', new Float32BufferAttribute(sizes, 1))
    // geometry.setAttribute('luminance', new Float32BufferAttribute(luminances, 1));
    return {positions, colors, sizes, geometry, luminances}
  }, [props.count, props.coreXDistance, props.coreYDistance, props.thickness, props.outerCoreXDistance, props.outerCoreYDistance, props.arms, props.armXMean, props.armXDistance, props.armYMean, props.armYDistance, props.spiral]);

  // useFrame(({camera}, delta)=>{
  //   const positions = stars.geometry.attributes.position.array;
  //   const sizes = stars.geometry.attributes.size.array;
  //   for (let i = 0; i < sizes.length / 3; i+=3) {
  //     const index = i * 3;
  //     const x = positions[index];
  //     const y = positions[index + 1];
  //     const z = positions[index + 2];
  //     const dist = camera.position.distanceTo(new Vector3(x, y, z)) / 250;
  //     let starSize = dist * stars.sizes[i];
  //     starSize = clamp(starSize, 0.25, 5)
  //     sizes[i] = starSize; 
  //   }

  //   stars.geometry.attributes.size.needsUpdate = true;
  // })

  return <points geometry={stars.geometry} layers={0}>
    <pointsMaterial map={starTexture} vertexColors={true}  alphaTest={0.5} sizeAttenuation={true}/>
  </points>
}