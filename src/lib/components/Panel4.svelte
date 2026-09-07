<script>
  import { number1, number2 } from '$lib/stores/calcState';
  
  let result = $derived($number1 + $number2);
</script>

<div class="panel">
  <h2>Panel4</h2>
  Panel3の値を足した結果が表示されます

  <div>
    結果: {result}
  </div>
</div>

<style>
  .panel {
    background-color: lightgreen;
  }
</style>