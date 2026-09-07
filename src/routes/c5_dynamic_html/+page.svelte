<script>
    // ボタンの状態を管理する配列（初期値は全てfalse）
    let clickedButtons = $state(Array(64).fill(false));

    // ボタンクリック時の処理
    function handleButtonClick(index) {
        clickedButtons[index] = true;
        console.log(`ボタン ${index + 1} が💣に変わりました`);
    }
</script>

<h1>Dynamic HTML Page</h1>

<div>
    <!-- 8x8の表にボタンを埋め込むことで8x8のボタンのグリッドを作成する -->
    <table>
        <tbody>
            {#each Array(8) as _, row}
                <tr>
                    {#each Array(8) as _, col}
                        <td>
                            <button onclick={() => handleButtonClick(row * 8 + col)}>
                                {#if clickedButtons[row * 8 + col]}
                                    💣
                                {:else}
                                    {row * 8 + col + 1}
                                {/if}
                            </button>
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>

</div>

<style>
    button {
        width: 40px;
        height: 40px;
        font-size: 14px;
        border: 1px solid #ccc;
        background-color: #f9f9f9;
        cursor: pointer;
    }
    
    button:hover {
        background-color: #e9e9e9;
    }
    
    table {
        border-collapse: collapse;
    }
    
    td {
        padding: 0;
        border: none;
    }
</style>