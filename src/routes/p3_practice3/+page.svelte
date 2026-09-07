<script>
    // ★1 $lib/components/Panel5.svelteからPanel5という名前でコンポーネントをimportする
    // ヒント：importの後のaaaaaを変更する
    import Panel5 from '$lib/components/Panel5.svelte';
    // ★2 $lib/components/Panel6.svelteからPanel6という名前でコンポーネントをimportする
    // ヒント：importの後のbbbbbを変更する
    import Panel6  from '$lib/components/Panel6.svelte';
</script>

<div class="app-container">
    <div class="left">
        <!-- ★3 コンポーネントPanel5を配置する -->
        <!-- ヒント：タグの要素名がPanel5となる -->
        <Panel5 />
    </div>
    <div class="right">
        <!-- ★4 コンポーネントPanel6を配置する -->
        <!-- ヒント：タグの要素名がPanel6となる -->
        <Panel6 />
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background: #f5f5f5;
    }

    .app-container {
        display: flex;
        min-height: 100vh;
    }

    .left {
        flex: 2;
        background: white;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding: 20px;
        box-sizing: border-box;
    }

    .right {
        flex: 1;
        min-width: 300px;
        max-width: 400px;
    }

    @media (max-width: 768px) {
        .app-container {
            flex-direction: column;
        }
        
        .right {
            min-width: unset;
            max-width: unset;
        }
    }
</style>