
export function gaussianRandom(mean=0, stdev=1) {
  let u = 1 - Math.random()
  let v = Math.random()
  let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  return z * stdev + mean
}

export function clamp(value:number, minimum:number, maximum:number) {
  return Math.min(maximum, Math.max(minimum, value))
}

export function spiral(x:number,y:number,z:number,offset:number,armXDist:number, spiral:number) {
  let r = Math.sqrt(x**2 + y**2)
  let theta = offset
  theta += x > 0 ? Math.atan(y/x) : Math.atan(y/x) + Math.PI
  theta += (r/armXDist) * spiral
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
    z
  }
}

