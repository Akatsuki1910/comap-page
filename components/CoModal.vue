<template lang="pug">
.modal-wrapper
  .modal
    img.closeimg(src='@/assets/img/close.png', alt='alt', @click='hiddenModal')
    .content
      header.header
        img.img(src='@/assets/img/icon.png', alt='alt')
        .header-name
          .name {{ data.name }}
          time.time {{ data.time }}
      .text {{ data.text }}
      img.img2(src='@/assets/img/img.png', alt='alt')
      .tags
        .tag(v-for='t of data.tag?.split(",")', :key='t') {{ t }}
      .exp
        .exp-title 色覚障害とは？
        .exp-exp 色覚異常とは、正常とされる他の大勢の人とは色が異なって見えてしまう・感じてしまう状態のことをいいます。 そのため色の区別がつきにくい場合があり、日常生活に支障をきたしてしまう可能性があります。 物を正常にみるためには、視力・視野・色覚の三つの機能が必要ですが、色覚異常とはこの三つの機能のうち、色覚に異常がある状態です。(色覚異常 - 目の病気百科 - 参天製薬)
    img.ar(
      src='@/assets/img/ar.png',
      alt='alt',
      @click='openUrl("https://arfilter.vercel.app/#1")'
    )
  //- button.close(@click='hiddenModal') close
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class CoModal extends Vue {
  @Prop({ type: Object })
  data: Object | undefined

  openUrl(url: string) {
    window.open(url, '_blank')
  }

  hiddenModal() {
    document.body.removeAttribute('data-is-active')
  }
}
</script>

<style lang="scss" scoped>
.modal-wrapper {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.5);
  display: none;
  z-index: 999;
}
.modal {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.content {
  padding: p2w(30) p2w(50);
  background-color: #ffffff;
  overflow-y: scroll;
  width: 80vw;
  /* height: 80vh; */
  margin: 0 auto;
  max-height: 80vh;
}

.closeimg {
  position: absolute;
  top: p2w(20);
  right: p2w(100);
  width: p2w(70);
  height: p2w(70);
}

.close {
  position: absolute;
  bottom: p2w(50);
  left: 50%;
  transform: translateX(-50%);
  width: p2w(300);
  height: p2w(100);
  background-color: #f2f2f2;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  border-radius: p2w(100);
}

body[data-is-active] {
  .modal-wrapper {
    display: block;
  }
}

.name {
  font-size: p2w(40);
}

.time {
  font-size: p2w(20);
  color: #838383;
}

.header {
  display: flex;
  margin-bottom: p2w(20);

  &-name {
    margin-left: p2w(30);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.img {
  width: p2w(150);
  height: p2w(150);
}

.text {
  font-size: p2w(20);
  height: 4rem;
  overflow-x: scroll;
  margin-bottom: p2w(20);
}

.img2 {
  margin-bottom: p2w(20);
}

.tags {
  display: flex;
  column-gap: p2w(10);
  margin-bottom: p2w(20);
}

.tag {
  padding: p2w(3) p2w(10);
  font-size: p2w(10);
  background-color: #ffc900;
  border-radius: p2w(30);
}

.exp {
  background-color: #f2f2f2;
  padding: p2w(20);

  &-text {
    color: #838383;
    font-weight: bold;
    font-size: p2w(15);
  }

  &-exp {
    color: #838383;
    font-size: p2w(10);
  }
}

.ar {
  position: absolute;
  bottom: p2w(-100);
  right: p2w(20);
  width: p2w(150);
  height: p2w(150);
  border-radius: 50%;
}
</style>
