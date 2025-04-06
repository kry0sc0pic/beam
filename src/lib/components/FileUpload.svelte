<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let fileInput: HTMLInputElement;
    let isUploading = false;
    let uploadProgress = 0;

    async function handleFileSelect(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (!files || files.length === 0) return;

        isUploading = true;
        uploadProgress = 0;

        try {
            const file = files[0];
            
            // Create form data
            const formData = new FormData();
            formData.append('file', file);

            // Upload to server
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            dispatch('uploadComplete', { fileId: result.fileId });
            
        } catch (error) {
            console.error('Upload error:', error);
            dispatch('uploadError', { error: error instanceof Error ? error.message : 'Upload failed' });
        } finally {
            isUploading = false;
            uploadProgress = 0;
            fileInput.value = '';
        }
    }
</script>

<div class="file-upload">
    <input
        type="file"
        bind:this={fileInput}
        on:change={handleFileSelect}
        accept="*"
        class="file-input"
    />
    <div class="upload-area" on:click={() => fileInput.click()}>
        {#if isUploading}
            <div class="upload-progress">
                <div class="progress-bar" style="width: {uploadProgress}%"></div>
            </div>
        {:else}
            <div class="upload-prompt">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                <span>Click to upload files</span>
            </div>
        {/if}
    </div>
</div>

<style>
    .file-upload {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
    }

    .file-input {
        display: none;
    }

    .upload-area {
        border: 2px dashed var(--border-color);
        border-radius: 8px;
        padding: 2rem;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .upload-area:hover {
        border-color: var(--primary-color);
        background: rgba(var(--primary-color-rgb), 0.05);
    }

    .upload-prompt {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    .upload-prompt svg {
        width: 48px;
        height: 48px;
        color: var(--primary-color);
    }

    .upload-progress {
        width: 100%;
        height: 4px;
        background: var(--border-color);
        border-radius: 2px;
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        background: var(--primary-color);
        transition: width 0.3s ease;
    }
</style> 