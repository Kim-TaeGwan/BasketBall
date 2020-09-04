/*
    농구 게임 로직
    
    1. 컴퓨터 차례로 시작
    2. 사용자가 컴퓨터의 슛버튼을 클릭한다.
    3. 컴퓨터는 2점슛을 쏠 지, 3점슛을 쏠 지 랜덤하게 결정한다.
    4. 슛이 성공하면 컴퓨터의 점수를 올려 준다.
    5. 사용자의 차례로 바꿔 준다.
    6. 사용자가 2점슛 또는 3점슛 버튼을 클릭한다.
    7. 슛이 성공하면 사용자의 점수를 올려 준다.
    8. 컴퓨터의 차례로 바꿔 주고 남은 슛 횟루를 1만큼 줄인다.
    9. 남은 슛 횟수가 0이 될 때 까지 1~8번 항목을 반복한다.
    10. 양쪽의 점수를 비교해 승자를 정한다.

*/

// getElementById() : id가 일치하는 엘리먼트를 찾는다.
// getElementsByClassName() : class까 일치하는 엘리먼트를 찾는다.
// getElementsByTagName() : 태그 이름이 일치하는 엘리먼트를 찾는다.
// querySelectorAll() : 셀렉터에 해당하는 엘리먼트를 찾는다.

/*
    컴퓨터 AI조작
    
    1. 컴퓨터의 기본 슛 확률은 다음과 같다. 2점슛(50%), 3점슛(33%)
    2. 사용자에게 6점 이상 지고 있을 경우, 슛 확률을 각각 60%, 38%로 올린다.
    3. 사용자에게 10점 이상 지고 있을 경우, 슛 확률을 각각 70%, 43%로 올린다.
    4. 반대로, 사용자에게 6점 이상 이기고 있을 경우, 슛 확률을 각각 40%, 28%로 내린다.
    5. 사용자에게 10점 이상 이기고 있을 경우, 슛 확률을 각각 30%, 23%로 내린다.
*/

// 컴퓨터 오브젝트
const computer = {
    score: 0,
    percent2: 0.5, // 2점슛 확률(조작)
    percent3: 0.33 // 3점슛 확률(조작)
};

// 사용자 오브젝트
const user = {
    score: 0,
    percent2: 0.5, // 2점슛 확률(조작)
    percent3: 0.33 // 3점슛 확률(조작)
}

// 게임 오브젝트
const game = {
    isComputerTurn : true, // 현재 컴퓨터의 차례인지, 첫슛을 컴퓨터가 쏘기위해 true
    shotsLeft : 15
}

const showText = (s) => {
    // const textElem = document.getElementById('text');
    const $textElem = $("#text");
    $textElem.fadeOut();

    // textElem.innerHTML = s;
    $textElem.html(s);
    $textElem.fadeIn();
}
const updateComputerScore = (score) => {
    computer.score += score;
    // const comScoreElem = document.getElementById('computer-score');
    const $comScoreElem = $("#computer-score");

    // comScoreElem.innerHTML = computer.score;
    $comScoreElem.html(computer.score);
}
const updateUserScore = (score) => {
    user.score += score;
    // const userScoreElem = document.getElementById('user-score');
    const $userScoreElem = $("#user-score");

    // userScoreElem.innerHTML = user.score;
    $userScoreElem.html(user.score);
}
const disableComputerButtons = (flag) => {
    
    // const computerButtons = document.getElementsByClassName('btn-computer');

    // for(let i = 0; i < computerButtons.length; i++){
    //     computerButtons[i].disabled = flag;
    // }
    $(".btn-computer").prop('disabled', flag);
}
const disableUserButtons = (flag) => {
    // const userButtons = document.getElementsByClassName('btn-user');

    // for(let i = 0; i < userButtons.length; i++){
    //     userButtons[i].disabled = flag;
    // }
    $(".btn-user").prop('disabled', flag);
}
const updateAI = () => {
    let diff = user.score - computer.score; //사용자의 점수에서 컴퓨터의 점수를 뺀 값(diff)

    if(diff >= 10){ // diff가 10이상일 경우
        computer.percent2 = 0.7;
        computer.percent3 = 0.45;
    } else if(diff >= 6){ // diff가 6이상일 경우
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    }else if(diff <= -10){ //diff가 -10이하일 경우
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if(diff <= -6){ // diff가 -6이하일 경우
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

const onComputerShoot = () => {
    if(!game.isComputerTurn){ // 컴퓨터의 차례가 아니라면 슛 로직을 실행하지 않고 함수에서 리턴
        return;
    }  
    updateAI();  
    /*
        2점슛이 성공할 확률은 50%, 3점슛이 성공할 확률은 33% 
     */
    let shootType = Math.random() < 0.5 ? 2 : 3;

    if(Math.random() < computer['percent' + shootType]){
        showText('컴퓨터가 ' + shootType + "점슛을 성공시켰습니다!")
        updateComputerScore(shootType);
    } else {
        showText('컴퓨터가 ' + shootType + '점슛을 실패했습니다.');
    }

    game.isComputerTurn = false;// 컴퓨터가 슛을 쏘고 나면 사용자의 차례로 바꿈

    disableComputerButtons(true)
    /*
        컴퓨터 측 슛 버튼 엘리먼트들을 돌면서 disabled속서의 값을 'true' 바꿔 주고 동시에
        모든 사용자측 슛 버튼 엘리먼트들의 disabled 속성은 'false'로 풀어 주고 있다.
        이렇게 바꿔주면 슛이 끝난 컴퓨터측 버튼들은 클릭이 되지 않는 '비활성화' 상태로, 차례가 된
        사용자측 버튼들은 '활성화' 상태로 바뀐다.
     */
    disableUserButtons(false)
}

const onUserShoot = (shootType) => {
    if(game.isComputerTurn){ 
        return;
    }

    if(Math.random() < user['percent' + shootType]) {
        showText(shootType + '점슛이 성공했습니다.');
        updateUserScore(shootType);
    }else {
        showText(shootType + '점슛이 실패했습니다.');
    }

    game.isComputerTurn = true;
    
    disableComputerButtons(false)
    /*
        앞서와 반대로 'btn-computer'클래스를 가진 엘리먼트들을 가져와서 disabled 속성을
        'false'로 바꿔 주고, 마찬가지로 'btn-user'클래스를 가진 엘리먼트들의 disabled속성은
        모두 'true'로 변경해 컴퓨터의 차례가 되었음을 보여주면 된다.
     */
    disableUserButtons(true)

    game.shotsLeft --;
    
    // const shotsLeftElem = document.getElementById('shots-left');
    const $shotLeftElem = $('#shots-left');

    // shotsLeftElem.innerHTML = game.shotsLeft;
    $shotLeftElem.html(game.shotsLeft);

    if(game.shotsLeft === 0){
        if(user.score > computer.score){
            showText('승리했습니다.')
        }else if(user.score < computer.score) {
            showText('아쉽게도 졌습니다...')
        }else {
            showText('비겼습니다.')
        }

        // 버튼 비활성화
        disableComputerButtons(true)

        // 버튼 비활성화
        disableUserButtons(true)
    }
}