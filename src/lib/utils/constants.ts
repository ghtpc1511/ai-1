// Province and city data for China
export const PROVINCES: { value: string; label: string; cities: { value: string; label: string }[] }[] = [
  { value: '浙江省', label: '浙江省', cities: [
    { value: '杭州市', label: '杭州市' }, { value: '宁波市', label: '宁波市' },
    { value: '温州市', label: '温州市' }, { value: '嘉兴市', label: '嘉兴市' },
    { value: '湖州市', label: '湖州市' }, { value: '绍兴市', label: '绍兴市' },
    { value: '金华市', label: '金华市' }, { value: '台州市', label: '台州市' },
  ]},
  { value: '江苏省', label: '江苏省', cities: [
    { value: '南京市', label: '南京市' }, { value: '苏州市', label: '苏州市' },
    { value: '无锡市', label: '无锡市' }, { value: '常州市', label: '常州市' },
  ]},
  { value: '上海市', label: '上海市', cities: [
    { value: '上海市', label: '上海市' },
  ]},
  { value: '北京市', label: '北京市', cities: [
    { value: '北京市', label: '北京市' },
  ]},
  { value: '广东省', label: '广东省', cities: [
    { value: '广州市', label: '广州市' }, { value: '深圳市', label: '深圳市' },
    { value: '东莞市', label: '东莞市' }, { value: '佛山市', label: '佛山市' },
  ]},
  { value: '四川省', label: '四川省', cities: [
    { value: '成都市', label: '成都市' }, { value: '绵阳市', label: '绵阳市' },
  ]},
  { value: '湖北省', label: '湖北省', cities: [
    { value: '武汉市', label: '武汉市' }, { value: '宜昌市', label: '宜昌市' },
  ]},
  { value: '湖南省', label: '湖南省', cities: [
    { value: '长沙市', label: '长沙市' }, { value: '株洲市', label: '株洲市' },
  ]},
  { value: '山东省', label: '山东省', cities: [
    { value: '济南市', label: '济南市' }, { value: '青岛市', label: '青岛市' },
  ]},
  { value: '河南省', label: '河南省', cities: [
    { value: '郑州市', label: '郑州市' }, { value: '洛阳市', label: '洛阳市' },
  ]},
  { value: '福建省', label: '福建省', cities: [
    { value: '福州市', label: '福州市' }, { value: '厦门市', label: '厦门市' },
  ]},
  { value: '安徽省', label: '安徽省', cities: [
    { value: '合肥市', label: '合肥市' }, { value: '芜湖市', label: '芜湖市' },
  ]},
  { value: '江西省', label: '江西省', cities: [
    { value: '南昌市', label: '南昌市' }, { value: '九江市', label: '九江市' },
  ]},
  { value: '重庆市', label: '重庆市', cities: [
    { value: '重庆市', label: '重庆市' },
  ]},
  { value: '天津市', label: '天津市', cities: [
    { value: '天津市', label: '天津市' },
  ]},
];

export function generateId(): string {
  return crypto.randomUUID();
}
