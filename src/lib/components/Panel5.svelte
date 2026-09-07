<script>
    import { onMount } from 'svelte';
    import { gameStatus, revealedCells } from '$lib/stores/resultState';

    let rows = 8;
    let cols = 8;
    let mines = 10;
    let board = $state([]);

    function initBoard() {
        // ゲーム状態をリセット
        $gameStatus = "playing";
        $revealedCells = 0;
        
        board = Array(rows)
            .fill()
            .map(() =>
                Array(cols)
                    .fill()
                    .map(() => ({
                        isMine: false,
                        isRevealed: false,
                        neighborMines: 0,
                    })),
            );

        // 地雷を配置
        let mineCount = 0;
        while (mineCount < mines) {
            let r = Math.floor(Math.random() * rows);
            let c = Math.floor(Math.random() * cols);
            if (!board[r][c].isMine) {
                board[r][c].isMine = true;
                mineCount++;
            }
        }

                
        // 各セルの周囲の地雷数を計算
        calculateNeighborMines();
    }

    function calculateNeighborMines() {
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!board[r][c].isMine) {
                    let count = 0;
                    // 周囲8方向をチェック
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            if (dr === 0 && dc === 0) continue;
                            let nr = r + dr;
                            let nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                                if (board[nr][nc].isMine) {
                                    count++;
                                }
                            }
                        }
                    }
                    board[r][c].neighborMines = count;
                }
            }
        }
    }

    function revealCell(row, col) {
        if ($gameStatus !== "playing" || board[row][col].isRevealed) {
            return;
        }

        board[row][col].isRevealed = true;

        // 地雷を踏んだ場合
        if (board[row][col].isMine) {
            $gameStatus = "lost";
            
            // 全ての地雷を表示
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (board[r][c].isMine) {
                        board[r][c].isRevealed = true;
                    }
                }
            }
            return;
        }

        // 空のセル（周囲に地雷がない）の場合、連鎖的に開く
        if (board[row][col].neighborMines === 0) {
            revealAdjacentCells(row, col);
        }

        // 開けたセルの数を更新（連鎖的に開かれたセルも含む）
        updateRevealedCells();

        // 勝利判定
        checkWin();
    }

    function revealAdjacentCells(row, col) {
        // 周囲8方向をチェック
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue; // 自分自身はスキップ

                let nr = row + dr;
                let nc = col + dc;

                // 範囲内かチェック
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    let cell = board[nr][nc];

                    // まだ開かれていない、かつ地雷でない場合
                    if (!cell.isRevealed && !cell.isMine) {
                        cell.isRevealed = true;

                        // 隣接セルも空の場合、再帰的に開く
                        if (cell.neighborMines === 0) {
                            revealAdjacentCells(nr, nc);
                        }
                    }
                }
            }
        }
        // 連鎖的に開かれた後にセル数を更新
        updateRevealedCells();
    }

    function updateRevealedCells() {
        let count = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c].isRevealed && !board[r][c].isMine) {
                    count++;
                }
            }
        }
        $revealedCells = count;
    }

    function checkWin() {
        // 地雷以外の全てのセルが開かれた場合は勝利
        if ($revealedCells === rows * cols - mines) {
            $gameStatus = "won";
        }
    }

    // テンプレートシンタックスでセルの内容を決定する関数群
    function isCellMine(cell) {
        return cell.isRevealed && cell.isMine;
    }

    function isCellNumber(cell) {
        return cell.isRevealed && !cell.isMine && cell.neighborMines > 0;
    }

    function isCellEmpty(cell) {
        return cell.isRevealed && !cell.isMine && cell.neighborMines === 0;
    }

    onMount(() => {
        // ゲーム開始
        initBoard();
    });
</script>

<div class="left-panel">
    <h1>マインスイーパー💣️</h1>

    <div class="game-info">
        <button onclick={initBoard}>新しいゲーム</button>
        {#if $gameStatus === "won"}
            <div class="status-message">🎉 勝利！</div>
        {:else if $gameStatus === "lost"}
            <div class="status-message">💥 敗北...</div>
        {/if}
    </div>

    <table class="board">
        <tbody>
            {#each board as row, r}
                <tr>
                    {#each row as cell, c}
                        <td>
                            <button
                                class="cell"
                                class:revealed={cell.isRevealed}
                                class:mine={isCellMine(cell)}
                                class:number={isCellNumber(cell)}
                                class:empty={isCellEmpty(cell)}
                                onclick={() => revealCell(r, c)}
                                disabled={$gameStatus !== "playing"}
                            >
                                {#if isCellMine(cell)}
                                    💣
                                {:else if isCellNumber(cell)}
                                    {cell.neighborMines}
                                {:else}
                                    <!-- 表示なし -->
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
    .left-panel {
        text-align: center;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    h1 {
        color: #333;
        margin-bottom: 20px;
    }

    .game-info {
        margin-bottom: 20px;
    }

    .status-message {
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
        color: #333;
    }

    button {
        background: #4caf50;
        border: none;
        color: white;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
    }

    button:hover {
        background: #45a049;
    }

    button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    .board {
        margin: 0 auto;
        border: 2px solid #333;
        background: #ccc;
        border-collapse: collapse;
    }

    .board td {
        padding: 0;
        border: none;
    }

    .cell {
        width: 30px;
        height: 30px;
        border: 2px outset #ccc;
        background: #ccc;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #333;
    }

    .cell:hover:not(:disabled) {
        background: #ddd;
    }

    .cell.revealed {
        border: 1px solid #999;
        background: #eee;
    }

    .cell.mine {
        background: #ff6b6b;
    }

    .cell.number {
        background: #e8f4f8;
        color: #1976d2;
    }

    .cell.empty {
        background: #f5f5f5;
    }

    .cell:disabled {
        cursor: not-allowed;
    }
</style>