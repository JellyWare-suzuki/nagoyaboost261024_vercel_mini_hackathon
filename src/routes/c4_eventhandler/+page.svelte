<script>
    // カウンターの値
    let count = $state(0);

    // ボタンクリック時の処理
    function increment() {
        count += 1;
    }
</script>

<h1>Event Handler Page</h1>

<div>
    <button onclick={increment}>
        クリックした回数：{count}
    </button>
</div>