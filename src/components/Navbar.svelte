<script lang="ts">
  // import { Link } from "svelte-routing";
  import BeamLogo from "./BeamLogo.svelte";
</script>

<nav>
  <div class="container nav-content">
    <div class="spacer"></div>
    <!-- <Link to="/" class="logo-link"> -->
      <BeamLogo />
      
    <!-- </Link> -->
    <div class="spacer"></div>
  </div>
</nav>

<style>
  nav {
    padding: 1.5rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(10px);
    /* border-bottom: 1px solid var(--border-color); */
  }

  .nav-content {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
  }

  .logo-link {
    text-decoration: none;
    color: var(--text-color);
  }

  .spacer {
    height: 100%;
  }
</style>