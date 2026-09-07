<div class="panel1 layout">
    <h3>メニュー</h3>
    <ul>
        <li>ホーム</li>
        <li>プロフィール</li>
        <li>スキル</li>
        <li>経歴</li>
        <li>ポートフォリオ</li>
        <li>お問い合わせ</li>
    </ul>
</div>

<style>
    .panel1 {
        background-color: #2c3e50;
        flex: 1;
    }

    .layout {
        padding: 40px;
        color: white;
    }
    
    h3 {
        margin-top: 0;
        margin-bottom: 20px;
        color: #ecf0f1;
    }
    
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    li {
        padding: 12px 0;
        border-bottom: 1px solid #34495e;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    
    li:hover {
        background-color: #34495e;
        padding-left: 10px;
    }
    
    li:last-child {
        border-bottom: none;
    }
</style>