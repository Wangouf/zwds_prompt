import { astro } from 'iztro';

/**
 * 生成星盘数据并返回结果字符串
 * @param {string} solarDate - 公历生日，格式为 'YYYY-MM-DD'
 * @param {number} timeIndex - 时辰索引（0-11）
 * @param {string} gender - 性别，'男' 或 '女'
 * @param {boolean} isLeapMonth - 是否闰月
 * @param {string} locale - 语言，例如 'zh-CN'
 * @returns {string} - 返回星盘数据的字符串
 */
export function zwPromptGenerate(solarDate, timeIndex, gender, isLeapMonth, locale) {
    let resultString = '';

    // 自定义函数用于收集输出结果
    function collectOutput(message) {
        resultString += message + '\n';
    }

    // 生成星盘数据
    const astrolabe = astro.bySolar(solarDate, timeIndex, gender, isLeapMonth, locale);

    // 输出星盘基本数据
    collectOutput('=========================================');
    collectOutput('星盘基本数据:');
    collectOutput(`性别: ${astrolabe.gender}`);
    collectOutput(`阳历日期: ${astrolabe.solarDate}`);
    collectOutput(`农历日期: ${astrolabe.lunarDate}`);
    collectOutput(`干支纪年日期: ${astrolabe.chineseDate}`);
    collectOutput(`时辰: ${astrolabe.time}`);
    collectOutput(`时辰对应的时间段: ${astrolabe.timeRange}`);
    collectOutput(`星座: ${astrolabe.sign}`);
    collectOutput(`生肖: ${astrolabe.zodiac}`);
    collectOutput(`命宫地支: ${astrolabe.earthlyBranchOfSoulPalace}`);
    collectOutput(`身宫地支: ${astrolabe.earthlyBranchOfBodyPalace}`);
    collectOutput(`命主: ${astrolabe.soul}`);
    collectOutput(`身主: ${astrolabe.body}`);
    collectOutput(`五行局: ${astrolabe.fiveElementsClass}`);
    collectOutput('=========================================');

    // 创建函数输出三方四正数据
    function printSurroundedPalaces(surroundedPalaces) {
        collectOutput('三方四正数据:');
        collectOutput(`--本宫: ${surroundedPalaces.target.name}`);
        collectOutput(`--对宫: ${surroundedPalaces.opposite.name}`);
        collectOutput(`--三方: ${surroundedPalaces.target.name}，${surroundedPalaces.wealth.name}，${surroundedPalaces.career.name}`);
    }

    // 创建函数返回星曜详情
    function printStarDetails(star) {
        const brightness = (star.brightness != '' && star.brightness != undefined) ? `(亮度:${star.brightness})` : '';
        const mutagen = (star.mutagen != '' && star.mutagen != undefined) ? `(四化:${star.mutagen})` : '';
        return `${star.name}${brightness}${mutagen}`;
    }

    // 遍历 12 个宫位
    for (let i = 0; i < 12; i++) {
        const palace = astrolabe.palace(i);
        collectOutput(`宫位名称: ${palace.name}`);
        printSurroundedPalaces(astrolabe.surroundedPalaces(i));
        collectOutput(`是否为身宫: ${palace.isBodyPalace}`);
        collectOutput(`是否为来因宫: ${palace.isOriginalPalace}`);
        collectOutput(`宫位天干: ${palace.heavenlyStem}`);
        collectOutput(`宫位地支: ${palace.earthlyBranch}`);
        collectOutput(`主星: ${palace.majorStars.map(star => printStarDetails(star)).join(', ')}`);
        collectOutput(`辅星: ${palace.minorStars.map(star => printStarDetails(star)).join(', ')}`);
        collectOutput(`杂耀: ${palace.adjectiveStars.map(star => printStarDetails(star)).join(', ')}`);
        collectOutput(`长生 12 神: ${palace.changsheng12}`);
        collectOutput(`博士 12 神: ${palace.boshi12}`);
        collectOutput(`流年将前 12 神: ${palace.jiangqian12}`);
        collectOutput(`流年岁前 12 神: ${palace.suiqian12}`);
        collectOutput(`大限: ${palace.decadal.range[0]} - ${palace.decadal.range[1]}`);
        collectOutput(`小限: ${palace.ages.join(', ')}`);
        collectOutput('=========================================');
    }

    return resultString;
}

// // 示例调用
// const result = zwPromptGenerate('2003-1-1', 11, '男', true, 'zh-CN');
// console.log(result);