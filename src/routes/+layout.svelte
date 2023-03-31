<slot/>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :global(img) {
    image-rendering: pixelated;
  }

  :global(.tooltip::before) {
    visibility: visible !important;
  }
</style>