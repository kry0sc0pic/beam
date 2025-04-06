<script lang="ts">
    import DigitInput from '../../components/DigitInput.svelte';
    
    let selectedFiles: File[] = [];
    let showDialog = false;
    let isUploading = false;
    let error = '';
    let success = '';
    let totpCode = '';
  
    const handleSubmit = () => {
      showDialog = true;
    };
  
    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        selectedFiles = Array.from(input.files);
      }
    };
  
    const handleCodeChange = (event: CustomEvent<string>) => {
      totpCode = event.detail;
      error = '';
    };
  
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
  
    const handleUpload = async () => {
      try {
        isUploading = true;
        error = '';
        success = '';
  
        const formData = new FormData();
        formData.append('code', totpCode);
        selectedFiles.forEach(file => {
          formData.append('files', file);
        });
  
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Upload failed');
        }
  
        const data = await response.json();
        success = data.message || 'Files have been sent successfully!';
        selectedFiles = [];
        totpCode = '';
        showDialog = false;
  
      } catch (err) {
        error = err instanceof Error ? err.message : 'Upload failed';
      } finally {
        isUploading = false;
      }
    };
  </script>
  
  <div class="beam-page">
    <div class="upload-section">
      <h1>Upload Files</h1>
      {#if success}
        <div class="success">{success}</div>
      {/if}
      {#if error}
        <div class="error">{error}</div>
      {/if}
      <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
          <label for="files">Select Files</label>
          <div class="file-input-container">
            <input
              type="file"
              id="files"
              multiple
              on:change={handleFileSelect}
              required
            />
            <div class="file-input-overlay">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span>Drop files here or click to select</span>
            </div>
          </div>
  
          {#if selectedFiles.length > 0}
            <div class="selected-files">
              <div class="files-header">
                <span>Selected Files ({selectedFiles.length})</span>
                <span class="total-size">
                  Total: {formatFileSize(selectedFiles.reduce((acc, file) => acc + file.size, 0))}
                </span>
              </div>
              <div class="files-list">
                {#each selectedFiles as file}
                  <div class="file-item">
                    <div class="file-info">
                      <span class="file-name">{file.name}</span>
                      <span class="file-size">{formatFileSize(file.size)}</span>
                    </div>
                    <div class="file-type">{file.type || 'Unknown type'}</div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
  
        <button 
          type="submit" 
          class="cta-button beam-button"
          disabled={selectedFiles.length === 0}
        >
          <span class="beam">BEAM</span>
        </button>
      </form>
    </div>
  </div>
  
  {#if showDialog}
    <div class="dialog-overlay" on:click={() => !isUploading && (showDialog = false)}>
      <div class="dialog" on:click|stopPropagation>
        <h2>Enter 6-Digit Code</h2>
        <div class="dialog-content">
          {#if error}
            <div class="error">{error}</div>
          {/if}
          <DigitInput value={totpCode} on:change={handleCodeChange} />
          <button 
            class="cta-button beam-button" 
            on:click={handleUpload}
            disabled={totpCode.length !== 6 || isUploading}
          >
            <span class="beam">{isUploading ? 'UPLOADING...' : 'CONFIRM'}</span>
          </button>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .beam-page {
      min-height: 100vh;
      padding: 120px 0;
      display: grid;
      place-items: center;
      background: linear-gradient(45deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%);
    }
  
    .upload-section {
      width: 100%;
      max-width: 480px;
      padding: 0 2rem;
    }
  
    h1 {
      margin-bottom: 3rem;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }
  
    .form-group {
      margin-bottom: 2rem;
    }
  
    label {
      display: block;
      margin-bottom: 0.75rem;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.8;
    }
  
    .file-input-container {
      position: relative;
      height: 240px;
    }
  
    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  
    .file-input-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      border: 1px dashed var(--border-color);
      border-radius: 4px;
      pointer-events: none;
      transition: all 0.3s ease;
    }
  
    input[type="file"]:hover + .file-input-overlay,
    input[type="file"]:focus + .file-input-overlay {
      border-color: var(--primary-color);
      background: var(--hover-color);
    }
  
    .file-input-overlay svg {
      opacity: 0.5;
      transition: all 0.3s ease;
    }
  
    input[type="file"]:hover + .file-input-overlay svg,
    input[type="file"]:focus + .file-input-overlay svg {
      opacity: 1;
      transform: translateY(-4px);
    }
  
    .selected-files {
      margin-top: 1rem;
      background: var(--hover-color);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      overflow: hidden;
    }
  
    .files-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: rgba(0, 0, 0, 0.2);
      font-size: 0.9rem;
    }
  
    .total-size {
      opacity: 0.7;
    }
  
    .files-list {
      max-height: 200px;
      overflow-y: auto;
    }
  
    .file-item {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border-color);
    }
  
    .file-item:last-child {
      border-bottom: none;
    }
  
    .file-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.25rem;
    }
  
    .file-name {
      font-size: 0.9rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70%;
    }
  
    .file-size {
      font-size: 0.8rem;
      opacity: 0.7;
    }
  
    .file-type {
      font-size: 0.8rem;
      opacity: 0.5;
    }
  
    button {
      width: 100%;
      margin-top: 1rem;
      font-size: 1rem;
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  
    button:disabled::after {
      animation: none;
    }
  
    .beam-button {
      position: relative;
      overflow: hidden;
    }
  
    .beam-button::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent,
        rgba(0, 255, 255, 0.1),
        transparent
      );
      transform: translateX(-100%);
      animation: beam-pulse 2s infinite;
    }
  
    @keyframes beam-pulse {
      0% {
        transform: translateX(-100%) rotate(45deg);
      }
      100% {
        transform: translateX(100%) rotate(45deg);
      }
    }
  
    .beam {
      font-size: 1.5rem;
      font-weight: 700;
      letter-spacing: 0.1em;
    }
  
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      display: grid;
      place-items: center;
      z-index: 1000;
    }
  
    .dialog {
      background: var(--background-color);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 2rem;
      width: 90%;
      max-width: 400px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
  
    .dialog h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      font-weight: 700;
    }
  
    .dialog-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  
    .error {
      color: #ff4444;
      text-align: center;
      font-size: 0.9rem;
      padding: 0.5rem;
      background: rgba(255, 68, 68, 0.1);
      border-radius: 4px;
    }
  
    .success {
      color: #00ff00;
      text-align: center;
      font-size: 0.9rem;
      padding: 0.5rem;
      background: rgba(0, 255, 0, 0.1);
      border-radius: 4px;
      margin-bottom: 2rem;
    }
  </style>