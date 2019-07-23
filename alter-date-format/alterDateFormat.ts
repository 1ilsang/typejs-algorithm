/**
 *  @return Convert AM/PM to 24 Hour Clock + n seconds.
 */
export default (input: [string, number]): string => {
    return getAddHms(convertTimeToHms(input[0]), convertNtoHms(input[1]));
};

function convertTimeToHms(time: string): number[] {
    let timeHeader: string = time.slice(0, 2);
    let ret: any[] = time.substring(3).split(":");
    if (timeHeader === 'PM') ret[0] = Number(ret[0]) + 12;
    else if (timeHeader === 'AM' && ret[0] === '12') ret[0] = '00';
    return ret.map(e => Number(e));
}

function convertNtoHms(n: number): number[] {
    let ret: number[] = [];
    ret.push(Math.floor(n / 3600));
    n %= 3600;
    ret.push(Math.floor(n / 60));
    n %= 60;
    ret.push(Math.floor(n));
    return ret;
}

function getAddHms(hms: any[], nToHms: number[]): string {
    let ret: string = '';
    let carry: number = 0;

    for (let i = 2; i >= 0; i--) {
        let cur: number = hms[i] + nToHms[i] + carry;
        if (i == 0) cur %= 24;
        else {
            if (cur >= 60) {
                carry = 1;
                cur %= 60;
            } else carry = 0;
        }
        if (cur < 10) ret = ':0' + cur + ret;
        else ret = ':' + cur + ret;
    }
    return ret.slice(1);
}
