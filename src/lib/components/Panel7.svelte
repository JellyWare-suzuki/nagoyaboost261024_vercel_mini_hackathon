<script>
    let {
        landColor = "#4caf70",
        extrusionHeight = 0.18,
        wireframe = false,
        autoRotate = false,
        onColorChange = () => {},
        onHeightChange = () => {},
        onWireframeChange = () => {},
        onAutoRotateChange = () => {},
        onReset = () => {},
    } = $props();
</script>

<div class="panel7">
    <div class="panel-header">
        <div class="panel-title">
            日本列島 3D コントロール
        </div>

        <div class="panel-number">
            Panel 7
        </div>
    </div>

    <div class="control-group">
        <label for="land-color">
            <span>陸地の色</span>

            <span class="color-code">
                {landColor}
            </span>
        </label>

        <div class="color-row">
            <input
                id="land-color"
                type="color"
                value={landColor}
                oninput={(event) =>
                    onColorChange(
                        event.currentTarget.value,
                    )}
            />

            <div
                class="color-preview"
                style={`background-color: ${landColor};`}
            ></div>
        </div>
    </div>

    <div class="control-group">
        <label for="height">
            <span>立体の高さ</span>

            <span class="value">
                {Number(extrusionHeight).toFixed(2)}
            </span>
        </label>

        <input
            id="height"
            class="range"
            type="range"
            min="0.02"
            max="0.8"
            step="0.01"
            value={extrusionHeight}
            oninput={(event) =>
                onHeightChange(
                    Number(
                        event.currentTarget.value,
                    ),
                )}
        />
    </div>

    <div class="control-group">
        <label class="checkbox-label">
            <input
                type="checkbox"
                checked={wireframe}
                onchange={(event) =>
                    onWireframeChange(
                        event.currentTarget.checked,
                    )}
            />

            <span>ワイヤーフレーム表示</span>
        </label>
    </div>

    <div class="control-group">
        <label class="checkbox-label">
            <input
                type="checkbox"
                checked={autoRotate}
                onchange={(event) =>
                    onAutoRotateChange(
                        event.currentTarget.checked,
                    )}
            />

            <span>自動回転</span>
        </label>
    </div>

    <button
        type="button"
        class="reset-button"
        onclick={onReset}
    >
        ↻ カメラをリセット
    </button>
</div>

<style>
    .panel7 {
        position: absolute;
        z-index: 20;
        top: 16px;
        right: 16px;

        width: 250px;
        box-sizing: border-box;

        padding: 16px;

        border-radius: 14px;

        background: rgba(255, 255, 255, 0.96);

        box-shadow:
            0 6px 24px
            rgba(0, 0, 0, 0.15);

        backdrop-filter: blur(8px);

        color: #263238;
    }

    .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 16px;
        padding-bottom: 10px;

        border-bottom: 1px solid #e0e0e0;
    }

    .panel-title {
        font-size: 14px;
        font-weight: 700;
    }

    .panel-number {
        padding: 3px 7px;

        border-radius: 6px;

        background: #e8f5e9;
        color: #2e7d32;

        font-size: 11px;
        font-weight: 700;
    }

    .control-group {
        margin-bottom: 16px;
    }

    .control-group label:not(.checkbox-label) {
        display: flex;
        align-items: center;
        justify-content: space-between;

        margin-bottom: 8px;

        font-size: 12px;
        font-weight: 600;
        color: #455a64;
    }

    .color-code,
    .value {
        font-family: monospace;
        color: #78909c;
    }

    .color-row {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    input[type="color"] {
        width: 46px;
        height: 34px;

        padding: 2px;

        border: 1px solid #cfd8dc;
        border-radius: 7px;

        background: white;
        cursor: pointer;
    }

    .color-preview {
        width: 34px;
        height: 34px;

        border-radius: 7px;

        border: 1px solid
            rgba(0, 0, 0, 0.12);
    }

    .range {
        width: 100%;
        accent-color: #4caf70;
        cursor: pointer;
    }

    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;

        cursor: pointer;

        font-size: 13px;
        color: #455a64;
    }

    .checkbox-label input {
        width: 16px;
        height: 16px;

        accent-color: #4caf70;

        cursor: pointer;
    }

    .reset-button {
        width: 100%;

        padding: 10px 12px;

        border: none;
        border-radius: 8px;

        background: #37474f;
        color: white;

        font-size: 12px;
        font-weight: 600;

        cursor: pointer;

        transition:
            background 0.2s,
            transform 0.1s;
    }

    .reset-button:hover {
        background: #263238;
    }

    .reset-button:active {
        transform: scale(0.98);
    }

    @media (max-width: 700px) {
        .panel7 {
            top: 10px;
            right: 10px;

            width: 220px;

            padding: 12px;
        }
    }
</style>
