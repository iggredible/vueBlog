<template>
  <div @click="toggleMode" class="lightbulb">
    <img src="../../assets/bulb_white_down.svg" />
    <span class="lightbulb__dark"></span>

    <!-- overlays -->
    <div class="cd-overlay-nav">
      <span></span>
    </div>
    <!-- cd-overlay-nav -->

    <div class="cd-overlay-content">
      <span></span>
    </div>
    <!-- cd-overlay-content -->
    <!-- end overlay -->
  </div>
</template>

<script>
import gsap from "gsap";
import $ from "jquery";
const calculateDiameter = (height, width) =>
  Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2)) * 2;
export default {
  data() {
    return {
      diameter: 0
    };
  },
  methods: {
    toggleMode() {}
  },
  mounted() {
    const bulb = $(".lightbulb");
    const overlayNav = $(".cd-overlay-nav").children("span");
    const overlayContent = $(".cd-overlay-content").children("span");

    const appBody = $("#app");

    gsap.to(overlayNav, 0, {
      height: this.diameter + "px",
      width: this.diameter + "px",
      top: -(this.diameter / 2) + "px",
      left: -(this.diameter / 2) + "px",
      scaleX: 0,
      scaleY: 0,
      translateZ: 0
    });

    gsap.to(overlayContent, 0, {
      height: this.diameter + "px",
      width: this.diameter + "px",
      top: -(this.diameter / 2) + "px",
      left: -(this.diameter / 2) + "px",
      scaleX: 0,
      scaleY: 0,
      translateZ: 0
    });

    bulb.on("click", function() {
      const tl = gsap.timeline();
      if (!bulb.hasClass("close-nav")) {
        bulb.addClass("close-nav");
        tl.to(overlayNav, {
          translateZ: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "Power3.easeIn"
        });
        tl.to(overlayNav, {
          translateZ: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 0
        });
        tl.add(() => {
          appBody.toggleClass("dark");
        });
      } else {
        bulb.removeClass("close-nav");
        // overlayContent
        tl.to(overlayContent, {
          translateZ: 0,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          ease: "Power3.easeIn"
        });
        tl.to(overlayContent, {
          translateZ: 0,
          scaleX: 0,
          scaleY: 0,
          duration: 0
        });
        tl.add(() => {
          appBody.toggleClass("dark");
        });
      }
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

.lightbulb,
.cd-overlay-nav,
.cd-overlay-content {
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
.cd-overlay-nav span,
.cd-overlay-content span {
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

.cd-overlay-nav {
  /* main rounded colored bg 1 */
  z-index: 2;
}
.cd-overlay-nav span {
  background-color: #091d23;
}

.cd-overlay-content {
  /* main rounded colored bg 2 */
  z-index: 4;
}

.cd-content .cd-intro {
  height: 200px;
  padding-top: 4.6em;
}

/* dark cool gray-ish bg color */
.cd-overlay-nav span {
  background-color: #fff;
}
.cd-overlay-content span {
  background-color: #222; /* the EXPANDING orange (clicked after it was dark) */
}
</style>
