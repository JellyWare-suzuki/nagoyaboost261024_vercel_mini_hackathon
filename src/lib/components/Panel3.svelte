<script>
  import { number1, number2 } from '$lib/stores/calcState';
</script>

<div class="panel">
    <h2>Panel3</h2>
    ２つの数字を入れてください

    <div>
       <input type="number" bind:value={$number1} placeholder="数字1">
       <input type="number" bind:value={$number2} placeholder="数字2">
    </div>
</div>

<style>
  .panel {
    background-color: lightblue;
  }
</style>