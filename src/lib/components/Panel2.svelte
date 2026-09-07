<div class="panel2 layout">
    <header>
        <h1>田中太郎</h1>
        <p>フロントエンドエンジニア</p>
    </header>

    <section>
        <h2>プロフィール</h2>
        <p>
            こんにちは！私はWebアプリケーション開発を専門とするフロントエンドエンジニアです。ユーザー体験を向上させることに情熱を持っています。
        </p>
    </section>

    <section>
        <h2>スキル</h2>
        <div class="skills">
            <span class="skill">JavaScript</span>
            <span class="skill">React</span>
            <span class="skill">Svelte</span>
            <span class="skill">TypeScript</span>
            <span class="skill">CSS</span>
        </div>
    </section>

    <section>
        <h2>経歴</h2>
        <div class="experience">
            <h4>2020年 - 現在: ABC株式会社</h4>
            <p>フロントエンドエンジニアとして従事</p>
        </div>
        <div class="experience">
            <h4>2018年 - 2020年: XYZ会社</h4>
            <p>Webデザイナーとして活動</p>
        </div>
    </section>
</div>

<style>
    .panel2 {
        background-color: #f8f9fa;
        flex: 2;   
    }

    .layout {
        padding: 20px;
    }

    header {
        text-align: center;
        margin-bottom: 40px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e9ecef;
    }

    h1 {
        margin: 0;
        color: #2c3e50;
        font-size: 2.5em;
    }

    header p {
        color: #7f8c8d;
        font-size: 1.2em;
        margin-top: 10px;
    }

    h2 {
        color: #34495e;
        margin-top: 30px;
        margin-bottom: 15px;
    }

    section {
        margin-bottom: 30px;
    }

    .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .skill {
        background-color: #3498db;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9em;
    }

    .experience {
        margin-bottom: 20px;
    }

    h4 {
        color: #2c3e50;
        margin-bottom: 5px;
    }

    .experience p {
        color: #7f8c8d;
        margin-top: 5px;
    }
</style>