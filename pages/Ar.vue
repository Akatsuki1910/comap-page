<template lang="pug">
.ar(ref='ar')
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import filter0 from '@/assets/glsl/filter0.frag'
import filter1 from '@/assets/glsl/filter1.frag'
import filter2 from '@/assets/glsl/filter2.frag'
import filter3 from '@/assets/glsl/filter3.frag'

@Component({})
export default class Ar extends Vue {
  @Ref() readonly ar!: HTMLDivElement

  count = 0
  myFilter: any
  renderer: any
  stage: any

  mounted() {
    let PIXI
    if (process.client) {
      PIXI = require('pixi.js')
    }

    const width = window.innerWidth
    const height = window.innerHeight

    const resolution = { w: width, h: height }

    const video = document.createElement('video')
    video.id = 'video'
    video.autoplay = true

    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { ideal: resolution.w },
          height: { ideal: resolution.h },
        },
      })
      .then(function (stream) {
        video.srcObject = stream
      })

    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width,
      height,
      resolution: 1,
      antialias: true,
    })
    this.renderer.view.style.transform = 'scaleX(-1)'
    this.ar.appendChild(this.renderer.view)
    const mm = PIXI.Texture.from(video)
    const img = new PIXI.Sprite(mm)
    this.stage.addChild(img)
    img.width = width
    img.height = height
    const uniforms = {
      time: 1.0,
      rand: 1.0,
    }

    let filtter = filter0
    switch (location.hash) {
      case '#1':
        filtter = filter1
        break
      case '#2':
        filtter = filter2
        break
      case '#3':
        filtter = filter3
        break
      default:
        break
    }

    this.myFilter = new PIXI.Filter(undefined, filtter, uniforms)
    this.stage.filters = [this.myFilter]

    this._canvasUpdate()
  }

  _canvasUpdate() {
    this.myFilter.uniforms.time = this.count / 60
    this.myFilter.uniforms.rand = Math.random()
    this.renderer.render(this.stage)
    requestAnimationFrame(this._canvasUpdate.bind(this))
  }
}
</script>

<style lang="scss" scoped>
.ar {
  margin: 0;
  overflow: none;
}
</style>
