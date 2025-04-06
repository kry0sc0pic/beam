<script lang="ts">
    import { page } from '$app/stores';
</script>

<a href="/beam" class="pill">
    <div class="pill-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <span>Go to Beam</span>
    </div>
</a>

<style>
    .pill {
        display: inline-block;
        text-decoration: none;
        margin-top: 1rem;
    }

    .pill-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 9999px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .pill:hover .pill-content {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        border-color: rgba(255, 255, 255, 0.3);
    }

    .pill svg {
        width: 20px;
        height: 20px;
    }

    .pill span {
        font-weight: 500;
    }
</style> 