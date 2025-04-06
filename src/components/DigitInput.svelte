<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  export let value = '';
  
  let inputs: HTMLInputElement[] = [];
  
  function handleInput(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const nextInput = inputs[index + 1];
    const prevInput = inputs[index - 1];
    
    // Only allow numbers
    const numericValue = input.value.replace(/[^0-9]/g, '');
    input.value = numericValue;
    
    if (!numericValue) return;
    
    // Update the value string
    const digits = value.split('');
    digits[index] = numericValue;
    value = digits.join('');
    dispatch('change', value);
    
    // Handle navigation
    if (numericValue && nextInput) {
      nextInput.focus();
    }
  }
  
  function handleKeydown(index: number, event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const prevInput = inputs[index - 1];
    
    if (event.key === 'Backspace' && !input.value && prevInput) {
      prevInput.focus();
      prevInput.value = '';
      const digits = value.split('');
      digits[index - 1] = '';
      value = digits.join('');
      dispatch('change', value);
    }
  }
  
  function handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;
    
    const digits = pastedData.replace(/[^0-9]/g, '').slice(0, 6).split('');
    inputs.forEach((input, index) => {
      input.value = digits[index] || '';
    });
    
    value = digits.join('');
    dispatch('change', value);
    
    if (inputs[5]) inputs[5].focus();
  }
</script>

<div class="digit-input" on:paste={handlePaste}>
  {#each Array(6) as _, i}
    <input
      type="text"
      maxlength="1"
      pattern="[0-9]"
      inputmode="numeric"
      bind:this={inputs[i]}
      on:input={(e) => handleInput(i, e)}
      on:keydown={(e) => handleKeydown(i, e)}
    />
  {/each}
</div>

<style>
  .digit-input {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    height: 3.5rem;
    text-align: center;
    font-size: 1.5rem;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-color);
    font-family: 'Radio Grotesk', monospace;
    transition: all 0.3s ease;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 1px var(--primary-color);
  }
</style>