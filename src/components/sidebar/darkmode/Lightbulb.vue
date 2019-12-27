<template>
  <div class="lightbulb">
    <div class="lightbulb__button">
      <img
        v-if="mode === 'LIGHT'"
        class="lightbulb__light"
        src="../../../assets/images/bulb_no_light.svg"
      />
      <img
        v-if="mode === 'DARK'"
        class="lightbulb__no-light"
        src="../../../assets/images/bulb_light.svg"
      />

      <!-- overlays -->
      <div class="overlay-light">
        <span></span>
      </div>

      <div class="overlay-dark">
        <span></span>
      </div>
      <!-- end overlay -->
    </div>
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
      mode: LIGHT
    };
  },
  beforeCreate() {
    this.mode = this.$store.state.mode;
  },
  methods: {
    overlayInit(gsap, el, diameter) {
      return gsap.set(el, {
        height: diameter + "px",
        width: diameter + "px",
        top: -(diameter / 2) + "px",
        right: -(diameter / 2) + "px",
        scaleX: 0,
        scaleY: 0,
        translateZ: 0,
        x: "-50%",
        y: "-50%"
      });
    },
    overlayExpander(timeline, el, type) {
      if (type === "EXPAND") {
        return timeline.to(el, {
          translateZ: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.22,
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
        this.$store.dispatch("setMode", DARK);
        bulb.addClass("dark-button");
        this.overlayExpander(tl, overlayDark, "EXPAND");
        this.overlayExpander(tl, overlayDark, "NOT_EXPAND");
        this.mode = this.$store.state.mode;
      } else {
        this.$store.dispatch("setMode", LIGHT);
        bulb.removeClass("dark-button");
        this.overlayExpander(tl, overlayLight, "EXPAND");
        this.overlayExpander(tl, overlayLight, "NOT_EXPAND");
        this.mode = this.$store.state.mode;
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

.lightbulb {
  &__button {
    height: 44px;
    width: 44px;
    z-index: 5;
    background: $lm-bg-button;
    border-radius: 50%;
    position: fixed;
    bottom: 12px;
    right: 1.3%;
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
    z-index: 9;
  }

  &__no-light {
    height: 24px;
    width: 24px;
    z-index: 8;
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
  position: absolute;
  top: 50%;
  right: 50%;
  height: 1px;
  width: 1px;
  z-index: 3;
}

.overlay-light span,
.overlay-dark span {
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  z-index: 4;
}

.overlay-light span {
  background-color: $lm-bg-page;
  position: absolute;
  z-index: 3;
}
.overlay-dark span {
  background-color: $dm-bg-page;
  position: absolute;
  z-index: 4;
}
</style>
