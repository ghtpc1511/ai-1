import type { MonthlyRecommendation } from '@/types';

function generateMonthlyRecommendations(): MonthlyRecommendation[] {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const results: MonthlyRecommendation[] = [];

  const monthThemes: Record<number, { theme: string; desc: string; tips: string[]; placeIds: string[]; itinIds: string[] }> = {
    1: {
      theme: '冬日暖阳·室内遛娃季',
      desc: '一月天冷，以室内活动为主。博物馆、商场和室内亲子中心是最佳选择，暖气充足宝宝舒适。',
      tips: ['注意保暖，室内外温差大', '室内活动为主', '注意加湿防止干燥'],
      placeIds: ['zhejiang-museum', 'nature-museum', 'binjiang-baolong', 'kids-play-center', 'gongshu-library', 'baby-gym-xihu'],
      itinIds: ['rainy-day-indoor', 'culture-half-day'],
    },
    2: {
      theme: '新春出游·年味亲子行',
      desc: '二月有春节假期，适合全家一起出门。室内景点和商场是寒冷天气的好选择，也可以逛逛灵隐祈福。',
      tips: ['春节景点人多注意安全', '提前预约热门景点', '注意保暖防寒'],
      placeIds: ['binjiang-baolong', 'nature-museum', 'intime-city-mall', 'kids-play-center', 'songcheng'],
      itinIds: ['rainy-day-indoor', 'culture-half-day'],
    },
    3: {
      theme: '早春踏青·花开初见',
      desc: '三月春暖花开，太子湾的郁金香开始绽放，植物园也万物复苏。适合带宝宝感受春天。',
      tips: ['春季花粉过敏注意', '早晚温差大备好外套', '周末景点人多'],
      placeIds: ['taiziwan-park', 'hz-botanical', 'xihu-sudi', 'xianghu-park', 'yuhang-dream-town'],
      itinIds: ['xihu-half-day', 'botanical-zoo-day', 'xianghu-picnic-half'],
    },
    4: {
      theme: '春游正当时·亲子出行黄金月',
      desc: '四月是杭州最美的季节之一。气温舒适，花开最盛，户外活动非常适宜。各公园草坪上都是亲子家庭。',
      tips: ['最佳户外出游月份', '清明假期景点人流大', '准备防晒和饮水'],
      placeIds: ['taiziwan-park', 'xihu-sudi', 'hz-botanical', 'xixi-wetland', 'xianghu-park', 'hz-zoo', 'yuhang-dream-town'],
      itinIds: ['xihu-half-day', 'botanical-zoo-day', 'xixi-easy-half', 'xianghu-picnic-half'],
    },
    5: {
      theme: '初夏时光·绿意盎然',
      desc: '五月气温开始升高但还不酷热，是户外活动的好时节。五一假期可安排稍远的行程。',
      tips: ['注意防晒和补水', '蚊虫开始多注意防护', '五一假期人流大'],
      placeIds: ['xihu-sudi', 'xixi-wetland', 'xianghu-park', 'hz-zoo', 'hz-botanical', 'linping-park'],
      itinIds: ['xihu-half-day', 'xixi-easy-half', 'botanical-zoo-day', 'xianghu-picnic-half'],
    },
    6: {
      theme: '梅雨季·室内外灵活安排',
      desc: '六月进入梅雨季，雨天较多。需要灵活安排室内外行程，雨天备选方案很重要。',
      tips: ['随时关注天气预报', '准备雨天备选方案', '闷热潮湿注意宝宝皮肤'],
      placeIds: ['binjiang-baolong', 'nature-museum', 'kids-play-center', 'gongshu-library', 'zhejiang-museum', 'yunqi-bamboo'],
      itinIds: ['rainy-day-indoor', 'culture-half-day', 'summer-cool-half'],
    },
    7: {
      theme: '盛夏避暑·清凉遛娃',
      desc: '七月高温，避暑成为主题。竹林、室内空间、商场都是好选择。早晚温度适中可短暂户外。',
      tips: ['避开中午最热时段', '室内活动为主', '注意防暑降温和补水'],
      placeIds: ['yunqi-bamboo', 'binjiang-baolong', 'kids-play-center', 'nature-museum', 'gongshu-library', 'intime-city-mall'],
      itinIds: ['rainy-day-indoor', 'summer-cool-half', 'culture-half-day'],
    },
    8: {
      theme: '仲夏夜·傍晚亲子时光',
      desc: '八月依然炎热，傍晚时分是最佳出行时间。钱江新城灯光秀、湖边散步都适合傍晚进行。',
      tips: ['傍晚出门最舒适', '注意防蚊', '随时补充水分'],
      placeIds: ['qianjiang-newcity', 'yunqi-bamboo', 'binjiang-baolong', 'kids-play-center', 'gongshu-library'],
      itinIds: ['summer-cool-half', 'rainy-day-indoor', 'culture-half-day'],
    },
    9: {
      theme: '金秋送爽·最佳出游季',
      desc: '九月秋高气爽，是杭州一年中最舒适的月份之一。户外活动非常适宜，桂花开始飘香。',
      tips: ['天气最舒适的月份', '桂花季植物园很香', '中秋假期可安排出行'],
      placeIds: ['xihu-sudi', 'hz-botanical', 'xixi-wetland', 'taiziwan-park', 'xianghu-park', 'hz-zoo', 'yuhang-dream-town'],
      itinIds: ['xihu-half-day', 'xixi-easy-half', 'botanical-zoo-day', 'xianghu-picnic-half'],
    },
    10: {
      theme: '十月金秋·赏秋遛娃',
      desc: '十月国庆长假加上秋色正好，是全年出游旺季。西溪湿地芦花开始白，西湖秋色也很美。',
      tips: ['国庆人流极大提前规划', '秋高气爽适合户外', '早晚开始凉备好外套'],
      placeIds: ['xixi-wetland', 'xihu-sudi', 'hz-botanical', 'xianghu-park', 'lingyin-scenic', 'hz-zoo'],
      itinIds: ['xixi-easy-half', 'xihu-half-day', 'botanical-zoo-day', 'xianghu-picnic-half'],
    },
    11: {
      theme: '深秋暖阳·最后的户外好时光',
      desc: '十一月深秋，银杏黄了枫叶红了。气温开始下降但白天阳光还好，抓住最后的户外好天气。',
      tips: ['注意添衣保暖', '银杏和枫叶正当时', '阴雨天增多注意天气'],
      placeIds: ['xihu-sudi', 'hz-botanical', 'taiziwan-park', 'yuhang-dream-town', 'xianghu-park'],
      itinIds: ['xihu-half-day', 'botanical-zoo-day', 'xianghu-picnic-half'],
    },
    12: {
      theme: '冬日暖房·室内亲子季',
      desc: '十二月天冷，转入室内活动为主。商场、博物馆、室内亲子中心是冬日遛娃的好去处。',
      tips: ['注意保暖', '室内活动为主', '商场暖气足适合遛娃'],
      placeIds: ['binjiang-baolong', 'nature-museum', 'kids-play-center', 'zhejiang-museum', 'gongshu-library', 'songcheng'],
      itinIds: ['rainy-day-indoor', 'culture-half-day'],
    },
  };

  for (let i = 0; i < 4; i++) {
    let m = currentMonth + i;
    let y = currentYear;
    if (m > 12) {
      m -= 12;
      y += 1;
    }
    const data = monthThemes[m];
    results.push({
      monthKey: `${y}-${String(m).padStart(2, '0')}`,
      month: m,
      year: y,
      cityId: 'hangzhou',
      theme: data.theme,
      themeDescription: data.desc,
      colorSeed: `month-${m}`,
      suitableAgeRanges: ['0-3个月', '4-6个月', '7-9个月', '10-12个月', '13-18个月', '19-24个月', '2-3岁'],
      recommendedPlaceIds: data.placeIds,
      recommendedItineraryIds: data.itinIds,
      seasonalTips: data.tips,
      notes: '',
      updatedAt: new Date().toISOString().split('T')[0],
    });
  }

  return results;
}

export const MONTHLY_RECOMMENDATIONS = generateMonthlyRecommendations();
