<template>
  <div class="lightbulb">
    <span class="lightbulb__button">
      <img
        v-if="mode === 'DARK'"
        class="lightbulb__light"
        src="../../assets/bulb_white_down.svg"
      />
      <img
        v-if="mode === 'LIGHT'"
        class="lightbulb__no-light"
        src="../../assets/bulb_no_light.svg"
      />
    </span>

    <!-- overlays -->
    <div class="overlay-light">
      <span></span>
    </div>

    <div class="overlay-dark">
      <span></span>
    </div>
    <!-- end overlay -->
  </div>
</template>

<script>
import gsap from "gsap";
import $ from "jquery";
const LIGHT = "LIGHT";
const DARK = "DARK";
const calculateDiameter = (height, width) =>
  Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2)) * 2;
export default {
  data() {
    return {
      diameter: 0,
      mode: DARK
    };
  },
  methods: {
    overlayInit(gsap, el, diameter) {
      return gsap.set(el, {
        height: diameter + "px",
        width: diameter + "px",
        top: -(diameter / 2) + "px",
        left: -(diameter / 2) + "px",
        scaleX: 0,
        scaleY: 0,
        translateZ: 0
      });
    },
    overlayExpander(timeline, el, type) {
      if (type === "EXPAND") {
        return timeline.to(el, {
          translateZ: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "Power4.easeIn"
        });
      } else {
        return timeline.set(el, {
          translateZ: 0,
          scaleX: 0,
          scaleY: 0
        });
      }
    }
  },
  mounted() {
    const appBody = $("#app");
    const bulb = $(".lightbulb__button");
    const overlayLight = $(".overlay-light").children("span");
    const overlayDark = $(".overlay-dark").children("span");

    this.overlayInit(gsap, overlayLight, this.diameter);
    this.overlayInit(gsap, overlayDark, this.diameter);

    bulb.on("click", () => {
      const tl = gsap.timeline();
      if (!bulb.hasClass("dark-button")) {
        bulb.addClass("dark-button");
        this.overlayExpander(tl, overlayLight, "EXPAND");
        this.overlayExpander(tl, overlayLight, "NOT_EXPAND");
        this.mode = LIGHT;
      } else {
        bulb.removeClass("dark-button");
        this.overlayExpander(tl, overlayDark, "EXPAND");
        this.overlayExpander(tl, overlayDark, "NOT_EXPAND");
        this.mode = DARK;
      }
      tl.add(() => appBody.toggleClass("dark"));
    });
  },
  created() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    this.diameter = calculateDiameter(windowHeight, windowWidth);
  }
};
</script>

<style lang="scss">
/* I think this is the important ones below */

.lightbulb {
  &__button {
    height: 44px;
    width: 44px;
    z-index: 5;
    background: #ffffff;
    border-radius: 50%;
    position: fixed;
    top: 18px;
    right: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 9px 7px 30px -6px rgba(0, 0, 0, 0.25);
  }
  &__light {
    height: 24px;
    width: 24px;
  }

  &__no-light {
    height: 24px;
    width: 24px;
  }
}
.lightbulb__button.dark-button {
  background: #222222;
}
.overlay-light,
.overlay-dark {
  /* containers of the 2 main rounded backgrounds - these containers are used to position the rounded bgs behind the menu icon */
  position: fixed;
  top: 18px;
  right: 5%; /* makes it start 5% from right */
  height: 4px;
  width: 4px;
  -webkit-transform: translateX(-20px) translateY(20px);
  -moz-transform: translateX(-20px) translateY(20px);
  -ms-transform: translateX(-20px) translateY(20px);
  -o-transform: translateX(-20px) translateY(20px);
  transform: translateX(-20px) translateY(20px);
}
/* overlay-nav span. Recall inside layerInit, it is set to have height, width, top, left */
.overlay-light span,
.overlay-dark span {
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  /* Force Hardware Acceleration in WebKit */
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform;
  -webkit-transform-origin: 50% 50%;
  -moz-transform-origin: 50% 50%;
  -ms-transform-origin: 50% 50%;
  -o-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  -ms-transform: scale(0);
  -o-transform: scale(0);
  transform: scale(0);
}

.overlay-light {
  /* main rounded colored bg 1 */
  z-index: 2;
}
.overlay-light span {
  background-color: #091d23;
}

.overlay-dark {
  /* main rounded colored bg 2 */
  z-index: 4;
}

.cd-content .cd-intro {
  height: 200px;
  padding-top: 4.6em;
}

/* dark cool gray-ish bg color */
.overlay-light span {
  background-color: #fff;
}
.overlay-dark span {
  background-color: #222; /* the EXPANDING orange (clicked after it was dark) */
}
</style>
