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


let comScore = 0;
let comPercent2 = 0.5; // 2점슛 확률(조작)
let comPercent3 = 0.33; // 3점슛 확률(조작)

let userScore = 0;
let userPercent2 = 0.5; // 2점슛 확률(조작)
let userPercent3 = 0.33; // 3점슛 확률(조작)

let isComputerTurn = true; // 현재 컴퓨터의 차례인지, 첫슛을 컴퓨터가 쏘기위해 true
let shotsLeft = 15;

const showText = (s) => {
    const textElem = document.getElementById('text');
    textElem.innerHTML = s;
}
const updateComputerScore = (score) => {
    comScore += score;
    const comScoreElem = document.getElementById('computer-score');
    comScoreElem.innerHTML = comScore;
}
const updateUserScore = (score) => {
    userScore += score;
    const userScoreElem = document.getElementById('user-score');
    userScoreElem.innerHTML = userScore;
}
const dusableComputerButtons = (flag) => {
    
    const computerButtons = document.getElementsByClassName('btn-computer');

    for(let i = 0; i < computerButtons.length; i++){
        computerButtons[i].disabled = flag;
    }
}
const disableUserButtons = (flag) => {
    const userButtons = document.getElementsByClassName('btn-user');

    for(let i = 0; i < userButtons.length; i++){
        userButtons[i].disabled = flag;
    }
}
const updateAI = () => {
    let diff = userScore - comScore; //사용자의 점수에서 컴퓨터의 점수를 뺀 값(diff)

    if(diff >= 6){ // diff가 6이상일 경우
        comPercent2 = 0.6;
        comPercent3 = 0.38;
    } else if(diff >= 10){ // diff가 10이상일 경우
        comPercent2 = 0.7;
        comPercent3 = 0.43;
    }else if(diff <= -6){ //diff가 -6이하일 경우
        comPercent2 = 0.4;
        comPercent3 = 0.28;
    } else if(diff <= -10){ // diff가 -10이하일 경우
        comPercent2 = 0.3;
        comPercent3 = 0.23;
    }
}

const onComputerShoot = () => {
    if(!isComputerTurn){ // 컴퓨터의 차례가 아니라면 슛 로직을 실행하지 않고 함수에서 리턴
        return;
    }  
    updateAI();  
    /*
        2점슛이 성공할 확률은 50%, 3점슛이 성공할 확률은 33% 
     */
    const shootType = Math.random() < 0.5 ? 2 : 3;

    if(shootType === 2){
        // if(Math.random() < 0.5) {
        if(Math.random() < comPercent2) {
            // 2점슛 1/2 확률로 성공
            showText("컴퓨터가 2점슛을 성공시켰습니다!");
            updateComputerScore(2);

        }else {
            // 실패 시
            showText("컴퓨터가 2점슛을 실패하였습니다!");
        }
    } else{
        // if(Math.random() < 0.33){
        if(Math.random() < comPercent3){
            // 3점슛 1/3확률로 성공
            showText("컴퓨터가 3점슛을 성공시켰습니다!");
            updateComputerScore(3);

        }else{
            // 실패시
            showText("컴퓨터가 3점슛을 실패하였습니다!");
        }
    }
    isComputerTurn = false;// 컴퓨터가 슛을 쏘고 나면 사용자의 차례로 바꿈

    dusableComputerButtons(true)
    /*
        컴퓨터 측 슛 버튼 엘리먼트들을 돌면서 disabled속서의 값을 'true' 바꿔 주고 동시에
        모든 사용자측 슛 버튼 엘리먼트들의 disabled 속성은 'false'로 풀어 주고 있다.
        이렇게 바꿔주면 슛이 끝난 컴퓨터측 버튼들은 클릭이 되지 않는 '비활성화' 상태로, 차례가 된
        사용자측 버튼들은 '활성화' 상태로 바뀐다.
     */
    disableUserButtons(false)
}

const onUserShoot = (shootType) => {
    if(isComputerTurn){ 
        return;
    }

    if(shootType === 2){ // shootType이 2점슛이면 2,
        if(Math.random() < userPercent2) {
            // 2점슛 1/2 확률로 성공
            showText("사용자가 2점슛을 성공시켰습니다!");
            updateUserScore(2)

        }else {
            // 실패 시
            showText("사용자가 2점슛을 실패하였습니다!");
        }
    } else{ // shootType이 3점슛이면 3,
        if(Math.random() < userPercent3){
            // 3점슛 1/3확률로 성공
            showText("사용자가 3점슛을 성공시켰습니다!");
            updateUserScore(3)

        }else{
            // 실패시
            showText("사용자가 3점슛을 실패하였습니다!");
        }
    }
    isComputerTurn = true;
    
    dusableComputerButtons(false)
    /*
        앞서와 반대로 'btn-computer'클래스를 가진 엘리먼트들을 가져와서 disabled 속성을
        'false'로 바꿔 주고, 마찬가지로 'btn-user'클래스를 가진 엘리먼트들의 disabled속성은
        모두 'true'로 변경해 컴퓨터의 차례가 되었음을 보여주면 된다.
     */
    disableUserButtons(true)

    shotsLeft --;
    
    const shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = shotsLeft;

    if(shotsLeft === 0){
        if(userScore > comScore){
            showText('승리했습니다.')
        }else if(userScore < comScore) {
            showText('아쉽게도 졌습니다...')
        }else {
            showText('비겼습니다.')
        }

        // 버튼 비활성화
        dusableComputerButtons(true)

        // 버튼 비활성화
        disableUserButtons(true)
    }
}