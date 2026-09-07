<script>
    import { gameStatus, revealedCells } from '$lib/stores/resultState';
</script>

<div class="right-panel">    
    <div class="score-section">
        <div class="score-item status-item">
            <span class="value status" class:playing={$gameStatus === 'playing'} 
                  class:won={$gameStatus === 'won'} class:lost={$gameStatus === 'lost'}>
                {#if $gameStatus === 'playing'}
                    💪 ファイト！
                {:else if $gameStatus === 'won'}
                    🎉 勝利！
                 {:else if $gameStatus === 'lost'}
                    💥 敗北...
                {/if}
            </span>
        </div>
        <div class="score-item">
            <span class="label">開かれたセル数:</span>
            <span class="value revealed">{$revealedCells}</span>
        </div>
    </div>
</div>

<style>
    .right-panel {
        background: #f8f9fa;
        border-left: 2px solid #ddd;
        padding: 20px;
        font-family: Arial, sans-serif;
        height: 100vh;
        overflow-y: auto;
        box-sizing: border-box;
    }

    .score-section {
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .score-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        padding: 8px 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .score-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }

    .score-item.status-item {
        justify-content: center;
    }

    .label {
        font-weight: 600;
        color: #666;
        font-size: 14px;
    }

    .value {
        font-weight: bold;
        font-size: 16px;
        color: #333;
    }

    .value.revealed {
        color: #4caf50;
        font-size: 18px;
        font-weight: bold;
    }

    .value.status.playing {
        color: #2196f3;
    }

    .value.status.won {
        color: #4caf50;
    }

    .value.status.lost {
        color: #f44336;
    }
</style>