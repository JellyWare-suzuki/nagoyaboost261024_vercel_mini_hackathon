<script>
    // ヒント：こちらの変数を用いて修正する
    let num1 = $state(0);       // 足し算する２つの値が入る変数
    let num2 = $state(0);       // 足し算する２つの値が入る変数
    let score = $state(0);      // 正解した回数
    let choice1 = $state(0);    // 解答の選択肢が入る値（左）
    let choice2 = $state(0);    // 解答の選択肢が入る値（中央）
    let choice3 = $state(0);    // 解答の選択肢が入る値（右）

    // ★1 リアクティブに変数num1と変数num2の足し算した結果を変数answerに代入する
    // ヒント：1と2を変数に差し替えればOK

    let answer = $derived(num1 + num2);   // 足し算した結果が入る変数


    // 新しい問題を生成
    function generateProblem() {
        num1 = Math.floor(Math.random() * 10) + 1; // 1-10の乱数
        num2 = Math.floor(Math.random() * 10) + 1; // 1-10の乱数
        
        const correctAnswer = num1 + num2;
        
        // ランダムに正解を配置（0, 1, 2のどこか）
        const position = Math.floor(Math.random() * 3);
        if (position === 0) {
            choice1 = correctAnswer;
            choice2 = correctAnswer + 1;
            choice3 = correctAnswer + 2;
        } else if (position === 1) {
            choice1 = correctAnswer - 1;
            choice2 = correctAnswer;
            choice3 = correctAnswer + 1;
        } else {
            choice1 = correctAnswer - 2;
            choice2 = correctAnswer - 1;
            choice3 = correctAnswer;
        }
    }

    // 答えをチェック
    function checkAnswer(selectedAnswer) {
        if (selectedAnswer === answer) {
            score++;
        }
        generateProblem();
    }

    // 初期化
    generateProblem();
</script>

<main>
    <h1>脳トレ足し算ゲーム</h1>
    
    <div class="score">
        <!-- ★2 score変数を用いてスコアを表示する -->
        <!-- ヒント：100を変数に差し替えればOK -->
        <h2>スコア: {score}</h2>
    </div>

    <div class="problem">
        <!-- ★3 num1とnum2の足し算を表示する -->
        <!-- ヒント：1と2を変数に差し替えればOK -->
        <h3> {num1} + {num2} </h3>
    </div>

    <div class="choices">
        <!-- ★4 クリックされたときに引数に変数choice1が入れ、checkAnswer関数を実行する -->
        <!-- ヒント：1を変数に差し替えればOK -->
        <button onclick={() => checkAnswer(choice1)}>
            {choice1}
        </button>

        <button onclick={() => checkAnswer(choice2)}>
            {choice2}
        </button>

        <button onclick={() => checkAnswer(choice3)}>
            {choice3}
        </button>
    </div>
</main>