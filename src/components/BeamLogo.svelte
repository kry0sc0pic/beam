<script lang="ts">
</script>

<div class="logo">
  <span class="beam">BEAM</span>
  <div class="laser-lines">
    <div class="laser-line cyan"></div>
    <div class="laser-line magenta"></div>
    <div class="laser-line yellow"></div>
  </div>
</div>

<style>
  .logo {
    position: relative;
    display: inline-flex;
    align-items: center;
  }

  .beam {
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #00ffff;
    animation: colorCycle 3s infinite;
  }

  .laser-lines {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 3px;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .laser-line {
    width: 100%;
    height: 1px;
    box-shadow: 0 0 8px currentColor;
    animation: beam 2s infinite;
  }

  .laser-line.cyan {
    background: #00ffff;
    animation-delay: 0s;
  }

  .laser-line.magenta {
    background: #ff00ff;
    animation-delay: 0.4s;
  }

  .laser-line.yellow {
    background: #ffff00;
    animation-delay: 0.8s;
  }

  @keyframes beam {
    0% {
      transform: scaleX(0);
      transform-origin: left;
      opacity: 0.5;
    }
    50% {
      transform: scaleX(1);
      transform-origin: left;
      opacity: 1;
    }
    50.1% {
      transform: scaleX(1);
      transform-origin: right;
      opacity: 1;
    }
    100% {
      transform: scaleX(0);
      transform-origin: right;
      opacity: 0.5;
    }
  }

  @keyframes colorCycle {
    0% {
      color: #00ffff;
    }
    33% {
      color: #ff00ff;
    }
    66% {
      color: #ffff00;
    }
    100% {
      color: #00ffff;
    }
  }
</style>