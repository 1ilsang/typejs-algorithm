import {ALTER_CASE} from "./alter-date-format/alterDateFormatTestCase";
import alterDateFormat from "./alter-date-format/alterDateFormat";
import bowlingScoreCalculator from './bowling-score-calculator/bowlingScoreCalculator';
import inflectString from './inflect-string/inflectString';
import {BOWLING_CASE} from "./bowling-score-calculator/bowlingTestCase";
import {INFLECT_STRING_CASE} from "./inflect-string/inflectStringTestCase";

let results: any[] = [];

const go = function (fn: any, testCase: any[]): number {
    let ret: number = -1;

    for (let i = 0; i < testCase.length; i++) {
        const answer = fn(testCase[i][0]);
        if (typeof answer === "string" && answer === testCase[i][1]) continue;
        else if (Array.isArray(answer)) {
            if (!testCase[i][1].some((e, idx) => e !== answer[idx])) continue;
        }
        return i;
    }

    return ret;
};

results.push([`ALTER_DATE_FORMAT`, go(alterDateFormat, ALTER_CASE)]);
results.push([`BOWLING_SCORE_CALCULATOR`, go(bowlingScoreCalculator, BOWLING_CASE)]);
results.push([`INFLECT_STRING`, go(inflectString, INFLECT_STRING_CASE)]);

results.forEach((e: any, idx: number): void => {
    console.log(
        `${idx + 1}. ${e[0]} is ${e[1] === -1 ?
            `\u001b[32mSuccess!!` :
            `\u001b[31mFailure. \u001b[33mbecause test case [${e[1]}] is wrong.`}\u001b[0m`
    );
});
