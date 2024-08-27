<template>
  <div class="board">
    <canvas
      ref='carte'
      :width="size.w"
      :height="size.h"
      tabindex='0'
      style="border:1px solid #000000;"
    ></canvas>
  </div>
  <div id="texteRemplacement" v-if="petit">
    <p v-for="p in texte.split('\n')" v-bind:key="p">
      {{ p }}
    </p>
  </div>
</template>

<script>

import {
  defineComponent, onMounted, ref, reactive, nextTick, toRefs, watch,
} from 'vue';

export default defineComponent({
  name: 'Visionneuse',
  props: ['texteEnvoye', 'taille'],
  setup(props) {
    const myCanvas = ref(null);
    const carte = ref(null);
    const { texteEnvoye, taille } = toRefs(props);
    const texte = ref('');

    const rapport = ref(0);
    const petit = ref((window.innerWidth < 750));

    const size = reactive({
      w: window.innerWidth * taille.value,
      h: window.innerWidth * taille.value,
    });

    function drawText() {
      const fontSize = 0.05 * size.w - 10;
      myCanvas.value.font = `${fontSize}px Adrip`;
      myCanvas.value.textAlign = 'center';
      myCanvas.value.fillStyle = 'lightgrey';
      myCanvas.value.strokeStyle = 'black';
      myCanvas.value.lineWidth = 0.006 * size.w - 10;
      const x = size.w / 2;
      const lineHeight = fontSize;
      const lines = texte.value.split('\n');
      for (let i = 0; i < lines.length; i += 1) {
        myCanvas.value.fillText(
          lines[lines.length - i - 1],
          x,
          (size.h * 0.98) - (i * lineHeight),
        );
        myCanvas.value.strokeText(
          lines[lines.length - i - 1],
          x,
          (size.h * 0.98) - (i * lineHeight),
        );
      }
    }

    function initCarte() {
      const background = new Image();
      background.src = '/img/fond.jpeg';
      background.onload = function () {
        rapport.value = background.naturalWidth / background.naturalHeight;
        size.h = size.w / rapport.value;
        nextTick(() => {
          try {
            myCanvas.value.drawImage(background, 0, 0, size.w, size.h);
          } catch (e) {
            console.log(`ERREUR DE CHARGEMENT D'IMAGE: ${e}`);
          }
          if (!petit.value) {
            drawText();
          }
        });
      };
    }

    function handleResize() {
      size.w = window.innerWidth * taille.value;
      size.h = size.w / rapport.value;
      petit.value = window.innerWidth < 750;
      initCarte();
    }

    window.addEventListener('resize', handleResize);

    watch(texteEnvoye, (x) => {
      texte.value = x;
      initCarte();
    });

    onMounted(() => {
      const c = carte.value;
      const ctx = c.getContext('2d');
      myCanvas.value = ctx;
      initCarte();
    });

    return {
      myCanvas,
      size,
      texte,
      petit,
      carte,
    };
  },
});

</script>