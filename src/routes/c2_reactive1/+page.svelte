<script>
    let currentTime = $state("");

    // 現在時刻を取得するコード
    function updateTime() {
        const now = new Date();
        currentTime = now.toLocaleTimeString("ja-JP");
    }

    //時間を取得する
    updateTime();
    setInterval(updateTime, 1000);

    $effect(() => {
        console.log("今の時刻はこちら：", currentTime);
    });
</script>

<h1>Reactive Page</h1>

<div>
    今の時間: {currentTime}
</div>