declare module '@mapbox/mapbox-gl-language'

interface Feature {
  type: string
  geometry: {
    type: 'Point'
    coordinates: [number, number]
  }
}
