/**
 * @description
 *      key-point 로 예외를 막기위해 최대한 노력했습니다.
 *
 *        1. 프레임이 아직 끝나지 않았을 때 마지막 값 추가안하기
 *        2. Strike, Spare 시 다음 프레임의 A 여부에 따른 증감
 *        3. Input 자체가 문제가 있는 경우(long-long, 숫자외, 범위초과 등)
 *        4. 10 프레임 때 3개 칠수 있는지 2개 칠수 있는지 체크
 *        5. 0A 는 Spare 이므로 해당 예외 처리
 *
 * @return Cumulative sum array for each frame.
 */
const ERR: readonly number[] = [-1];

export default (str: string): number[] | readonly number[] => {
    if (str.length > 21) return ERR;

    const status: readonly string[] = ['NONE', 'SPARE', 'STRIKE'];
    let ret: number[] = [];
    let frames: Array<[number, number, number, string]> = [];
    let prev: number = 0;
    let preFlag: boolean = false;

    // get single scores with status;
    for (let i = 0; i < str.length; i++) {
        let cur: number = str.charAt(i) === 'A' ? 10 : Number(str.charAt(i));

        if (isNaN(cur)) return ERR;
        if (frames.length === 9) {
            let cnt: number = 0;
            let lasts: number[] = [];
            for (let j = i; j < str.length; j++) {
                let next = Number(str.charAt(j));
                if (isNaN(next)) next = 10;
                lasts.push(next);
                cnt++;
            }
            if (cnt > 3) return ERR;
            for (let i = 0; i < 3; i++) if (lasts[i] === undefined) lasts[i] = 0;
            frames.push([lasts[0], lasts[1], lasts[2], status[0]]);
            break;
        }

        if (prev + cur > 10) return ERR;
        else if (preFlag) {
            if (prev + cur === 10) frames.push([prev, cur, 0, status[1]]);
            else frames.push([prev, cur, 0, status[0]]);
            prev = 0;
            preFlag = false;
        } else if (cur === 10) frames.push([cur, 0, 0, status[2]]);
        else {
            prev = cur;
            preFlag = true;
        }
    }

    // get return array
    let cumulative: number = 0;
    let lastOrder: string = '';
    for (let i = 0; i < frames.length; i++) {
        cumulative += (frames[i][0] + frames[i][1] + frames[i][2]);
        if (frames[i][3] === status[2]) {
            if (i + 1 < frames.length) cumulative += (frames[i + 1][0] + frames[i + 1][1]);
            if (i + 2 < frames.length && frames[i + 1][0] === 10) cumulative += frames[i + 2][0];
        } else if (frames[i][3] === status[1]) {
            if (i + 1 < frames.length) cumulative += frames[i + 1][0];
        }
        lastOrder = frames[i][3];
        ret.push(cumulative);
    }

    // frame end check
    if (ret.length < 9 && (lastOrder === status[1] || lastOrder === status[2])) ret.pop();
    return ret;
}
