<template lang="pug">
.wrapper(ref='wrapper')
  #map.map
  img.button(
    src='@/assets/img/share.png',
    alt='alt',
    @click='openUrl("https://comap-front.vercel.app/")'
  )
  CoModal(:data='data')
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
  data = {}

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

    const pngName = ['me', 'kurumaisu', 'kodomo', 'mimi']

    this.map.on('load', () => {
      pngName.forEach((name) => {
        this.map.loadImage(`/pin/${name}.png`, (error, image) => {
          if (error) throw error
          this.map.addImage(name, image!)
          this.map.addSource(name, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {
                    name: 'はびえる',
                    time: '2022/09/17',
                    text: 'ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章ここに文章',
                    tag: '#色覚障害,#2型3色覚',
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      Math.random() * 360 - 180,
                      Math.random() * 180 - 90,
                    ],
                  },
                },
              ],
            },
          })

          this.map.addLayer({
            id: name,
            type: 'symbol',
            source: name,
            layout: {
              'icon-image': name,
              'icon-size': 0.5,
            },
          })

          this.map.on('click', name, (e) => {
            const description = (e.features![0] as any).properties
            if (description !== undefined) {
              this.data = description
              this.activeModal()
            }
          })
        })
      })
    })
  }

  openUrl(url: string) {
    window.open(url, '_blank')
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
