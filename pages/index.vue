<template lang="pug">
.wrapper(ref='wrapper')
  #map.map
  img.button(src='@/assets/img/share.png', alt='alt', @click='activeModal')
  CoModal
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import 'mapbox-gl/dist/mapbox-gl.css'

@Component({
  asyncData({ $config }) {
    const accessToken = $config.accessToken
    return { accessToken }
  },
})
export default class Index extends Vue {
  @Ref() readonly wrapper!: HTMLDivElement

  map!: mapboxgl.Map
  accessToken: string = ''

  mounted() {
    this.map = new mapboxgl.Map({
      accessToken: this.accessToken,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [139.7671, 35.6812],
      zoom: 9,
    })

    this.map.addControl(
      new MapboxLanguage({
        defaultLanguage: 'ja',
      }),
    )

    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      'bottom-left',
    )

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-left')

    this.map.on('load', () => {
      this.map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
        (error, image) => {
          if (error) throw error
          this.map.addImage('cat', image!)
          this.map.addSource('point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [-77.4144, 25.0759],
                  },
                } as any,
                {
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [77.4144, 25.0759],
                  },
                },
              ],
            },
          })

          // Add a layer to use the image to represent the data.
          this.map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'point',
            layout: {
              'icon-image': 'cat',
              'icon-size': 0.25,
            },
          })
        },
      )
    })
  }

  activeModal() {
    document.body.setAttribute('data-is-active', 'true')
  }

  hiddenModal() {
    document.body.removeAttribute('data-is-active')
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: relative;
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

.button {
  position: absolute;
  bottom: p2w(80);
  right: p2w(20);
  width: p2w(200);
  height: p2w(200);
  border-radius: 50%;
}
</style>
