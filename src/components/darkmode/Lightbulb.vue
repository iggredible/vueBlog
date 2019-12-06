<template>
  <div class="lightbulb">
    <span class="lightbulb__button">
      <img
        v-if="mode === 'DARK'"
        class="lightbulb__light"
        src="../../assets/images/bulb_light.svg"
      />
      <img
        v-if="mode === 'LIGHT'"
        class="lightbulb__no-light"
        src="../../assets/images/bulb_no_light.svg"
      />
      <div class="overlay-light">
        <span></span>
      </div>

      <div class="overlay-dark">
        <span></span>
      </div>
    </span>

    <!-- overlays -->
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
          duration: 4.5,
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
        this.overlayExpander(tl, overlayDark, "EXPAND");
        this.overlayExpander(tl, overlayDark, "NOT_EXPAND");
        this.mode = LIGHT;
      } else {
        bulb.removeClass("dark-button");
        this.overlayExpander(tl, overlayLight, "EXPAND");
        this.overlayExpander(tl, overlayLight, "NOT_EXPAND");
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
@import "@/assets/styles/colors.scss";
/* I think this is the important ones below */

.lightbulb {
  &__button {
    height: 44px;
    width: 44px;
    z-index: 5;
    background: $lm-bg-button;
    border-radius: 50%;
    position: fixed;
    top: 18px;
    left: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in;
  }
  &__button:hover {
    box-shadow: 4px 4px 15px -7px $lm-shadow-button;
  }
  &__light {
    height: 24px;
    width: 24px;
  }

  &__no-light {
    height: 24px;
    width: 24px;
  }
  &__button.dark-button {
    background: $dm-bg-button;
    transition: box-shadow 0.3s ease-in;
  }
  &__button.dark-button:hover {
    box-shadow: 4px 4px 15px -7px $dm-shadow-button;
  }
}
.overlay-light,
.overlay-dark {
  /* containers of the 2 main rounded backgrounds - these containers are used to position the rounded bgs behind the menu icon */
  /* position: fixed; */
  position: absolute;
  /* top: 18px; */
  top: 50%;
  left: 50%; /* makes it start 5% from right */
  height: 1px;
  width: 1px;
  -webkit-transform: translateX(50%) translateY(50%);
  -moz-transform: translateX(50%) translateY(50%);
  -ms-transform: translateX(50%) translateY(50%);
  -o-transform: translateX(50%) translateY(50%);
  transform: translateX(50%) translateY(50%);
}
/* overlay-nav span. Recall inside layerInit, it is set to have height, width, top, left */
.overlay-light span,
.overlay-dark span {
  display: inline-block;
  position: absolute;
  border-radius: 50%;
}

/* dark cool gray-ish bg color */
.overlay-light span {
  background-color: $lm-bg-page;
}
.overlay-dark span {
  background-color: $dm-bg-page; /* the EXPANDING orange (clicked after it was dark) */
}
</style>
