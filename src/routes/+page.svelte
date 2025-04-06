<script lang="ts">
    import { onMount } from 'svelte';
    import * as THREE from 'three';
  
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      
      // Create multiple geometric shapes
      const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
      const sphereGeometry = new THREE.SphereGeometry(8, 32, 32);
      const icosahedronGeometry = new THREE.IcosahedronGeometry(12, 0);
      
      // Create materials with different colors and properties
      const torusMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3
      });
      
      const sphereMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      
      const icosahedronMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      
      // Create meshes
      const torus = new THREE.Mesh(torusGeometry, torusMaterial);
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const icosahedron = new THREE.Mesh(icosahedronGeometry, icosahedronMaterial);
      
      // Add meshes to scene
      scene.add(torus);
      scene.add(sphere);
      scene.add(icosahedron);
      
      // Create particle system
      const particleCount = 0;
      const particles = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 50;
        positions[i3 + 1] = (Math.random() - 0.5) * 50;
        positions[i3 + 2] = (Math.random() - 0.5) * 50;
        
        colors[i3] = Math.random();
        colors[i3 + 1] = Math.random();
        colors[i3 + 2] = Math.random();
      }
      
      particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
      });
      
      const particleSystem = new THREE.Points(particles, particleMaterial);
      scene.add(particleSystem);
      
      camera.position.z = 30;
      
      function animate() {
        requestAnimationFrame(animate);
        
        // Rotate shapes at different speeds
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.01;
        
        icosahedron.rotation.x += 0.007;
        icosahedron.rotation.y += 0.007;
        
        // Animate particles
        const positions = particles.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] += (Math.random() - 0.5) * 0.1;
          positions[i + 1] += (Math.random() - 0.5) * 0.1;
          positions[i + 2] += (Math.random() - 0.5) * 0.1;
        }
        particles.attributes.position.needsUpdate = true;
        
        renderer.render(scene, camera);
      }
      
      animate();
      
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });
  </script>
  
  <div class="hero">
    <div class="hero-overlay"></div>
    <div class="laser-background">
      <div class="laser cyan"></div>
      <div class="laser cyan"></div>
      <div class="laser magenta"></div>
      <div class="laser magenta"></div>
      <div class="laser yellow"></div>
      <div class="laser yellow"></div>
    </div>
    <canvas bind:this={canvas} class="hero-canvas"></canvas>
    <div class="hero-content">
      <h1>Secure File Transfer<br />Without the Risk</h1>
      <p>Send files from any computer without risking your accounts getting hacked.</p>
      <button class="cta-button coming-soon" disabled>
        Coming Soon
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"></path>
          <path d="m12 5 7 7-7 7"></path>
        </svg>
      </button>
    </div>
    <div class="steps">
      <div class="steps-container">
        <div class="step">
          <div class="step-number">1</div>
          <h3>Select Files</h3>
          <p>Choose the files you want to transfer from your computer.</p>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <h3>Enter One-Time Code</h3>
          <p>Input your username and a temporary code from your authenticator.</p>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <h3>Files Securely Delivered</h3>
          <p>Your files are encrypted and securely emailed to you.</p>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .hero {
      height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      overflow: hidden;
      padding: 0 2rem;
    }
  
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
      z-index: 1;
    }
  
    .laser-background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 0;
    }
  
    .laser {
      position: absolute;
      width: 100%;
      height: 1px;
      opacity: 0.9;
      filter: blur(1px);
      box-shadow: 0 0 20px currentColor;
    }
  
    .laser.cyan:nth-child(1) {
      background: #00ffff;
      top: 15%;
      animation: laserMove 5s infinite linear;
    }
  
    .laser.cyan:nth-child(2) {
      background: #00ffff;
      top: 35%;
      animation: laserMove 7s infinite linear reverse;
    }
  
    .laser.magenta:nth-child(3) {
      background: #ff00ff;
      top: 45%;
      animation: laserMove 8s infinite linear;
    }
  
    .laser.magenta:nth-child(4) {
      background: #ff00ff;
      top: 65%;
      animation: laserMove 6s infinite linear reverse;
    }
  
    .laser.yellow:nth-child(5) {
      background: #ffff00;
      top: 75%;
      animation: laserMove 7s infinite linear;
    }
  
    .laser.yellow:nth-child(6) {
      background: #ffff00;
      top: 85%;
      animation: laserMove 4s infinite linear reverse;
    }
  
    @keyframes laserMove {
      0% {
        transform: translateX(-100%) rotate(15deg);
      }
      100% {
        transform: translateX(100%) rotate(15deg);
      }
    }
  
    .hero-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  
    .hero-content {
      position: relative;
      z-index: 2;
      max-width: 600px;
      padding: 2rem;
    }
  
    h1 {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
  
    h1 .cyan {
      color: #00ffff;
    }
  
    h1 .magenta {
      color: #ff00ff;
    }
  
    p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      opacity: 0.8;
    }
  
    p .yellow {
      color: #ffff00;
    }
  
    :global(.hero-content .cta-button) {
      font-size: 1.2rem;
      text-decoration: none;
      background: var(--primary-color);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
  
    :global(.hero-content .cta-button.coming-soon) {
      background: #666;
      cursor: not-allowed;
      opacity: 0.7;
    }
  
    :global(.hero-content .cta-button.coming-soon:hover) {
      transform: none;
      background: #666;
    }
  
    :global(.hero-content .cta-button:hover) {
      transform: translateY(-2px);
      background: var(--primary-color-dark);
    }
  
    :global(.hero-content .cta-button:hover svg) {
      transform: translateX(4px);
    }
  
    :global(.hero-content .cta-button svg) {
      transition: transform 0.3s ease;
    }
  
    .steps {
      position: relative;
      z-index: 2;
      width: 300px;
      padding: 2rem;
    }
  
    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
  
    .step {
      text-align: left;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      backdrop-filter: blur(5px);
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
  
    .step:hover {
      transform: translateY(-5px);
    }
  
    .step:nth-child(1) {
      border-color: #00ffff;
    }
  
    .step:nth-child(1) .step-number {
      border-color: #00ffff;
      color: #00ffff;
    }
  
    .step:nth-child(2) {
      border-color: #ff00ff;
    }
  
    .step:nth-child(2) .step-number {
      border-color: #ff00ff;
      color: #ff00ff;
    }
  
    .step:nth-child(3) {
      border-color: #ffff00;
    }
  
    .step:nth-child(3) .step-number {
      border-color: #ffff00;
      color: #ffff00;
    }
  
    .step-number {
      width: 2.5rem;
      height: 2.5rem;
      margin-bottom: 1rem;
      background: transparent;
      border: 1px solid var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 700;
      transition: all 0.3s ease;
    }
  
    .step:hover .step-number {
      transform: scale(1.1);
    }
  
    .step h3 {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
  
    .step p {
      font-size: 0.9rem;
      opacity: 0.7;
      line-height: 1.6;
      margin: 0;
    }
  
    @media (max-width: 1024px) {
      .hero {
        flex-direction: column;
        text-align: center;
        padding: 2rem;
      }
  
      .hero-content {
        max-width: 100%;
        margin-bottom: 2rem;
      }
  
      .steps {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
      }
  
      .steps-container {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
      }
  
      .step {
        flex: 1;
        min-width: 250px;
        text-align: center;
      }
  
      .step-number {
        margin: 0 auto 1rem;
      }
    }
  
    @media (max-width: 768px) {
      .steps-container {
        flex-direction: column;
      }
  
      .step {
        min-width: 100%;
      }
    }
  </style>