<script lang="ts">
    import '../app.css';
    import { page } from '$app/stores';
    import Navbar from '../components/Navbar.svelte';
</script>

<svelte:head>
    <title>Beam - Secure File Transfer</title>
    <meta name="description" content="Send files securely without risking your accounts. Beam provides encrypted file transfer with one-time codes." />
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beam.krishaay.dev/" />
    <meta property="og:title" content="Beam - Secure File Transfer" />
    <meta property="og:description" content="Send files securely without risking your accounts. Beam provides encrypted file transfer with one-time codes." />
    <meta property="og:image" content="https://beam.krishaay.dev/og-image.png" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://beam.krishaay.dev/" />
    <meta property="twitter:title" content="Beam - Secure File Transfer" />
    <meta property="twitter:description" content="Send files securely without risking your accounts. Beam provides encrypted file transfer with one-time codes." />
    <meta property="twitter:image" content="https://beam.krishaay.dev/og-image.png" />
    
    <!-- Additional Meta Tags -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#000000" />
    <meta name="keywords" content="file transfer, secure transfer, encryption, one-time code, temporary code, file sharing" />
</svelte:head>

<Navbar />
<!-- <div class="beam-pill-container">
    <BeamPill />
</div> -->

<slot />
