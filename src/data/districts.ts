import type { District, City } from '@/types';

export const HANGZHOU_DISTRICTS: District[] = [
  { id: 'xihu', name: '西湖区', cityId: 'hangzhou', lat: 30.2590, lng: 120.1300 },
  { id: 'shangcheng', name: '上城区', cityId: 'hangzhou', lat: 30.2500, lng: 120.1700 },
  { id: 'gongshu', name: '拱墅区', cityId: 'hangzhou', lat: 30.3200, lng: 120.1400 },
  { id: 'binjiang', name: '滨江区', cityId: 'hangzhou', lat: 30.2100, lng: 120.2100 },
  { id: 'yuhang', name: '余杭区', cityId: 'hangzhou', lat: 30.4200, lng: 120.0000 },
  { id: 'xiaoshan', name: '萧山区', cityId: 'hangzhou', lat: 30.1800, lng: 120.2600 },
  { id: 'qiantang', name: '钱塘区', cityId: 'hangzhou', lat: 30.3100, lng: 120.4900 },
  { id: 'linping', name: '临平区', cityId: 'hangzhou', lat: 30.4200, lng: 120.3000 },
  { id: 'linan', name: '临安区', cityId: 'hangzhou', lat: 30.2300, lng: 119.7200 },
  { id: 'fuyang', name: '富阳区', cityId: 'hangzhou', lat: 30.0500, lng: 119.9600 },
];

export const HANGZHOU: City = {
  id: 'hangzhou',
  name: '杭州',
  lat: 30.2741,
  lng: 120.1551,
  districts: HANGZHOU_DISTRICTS,
};

export const CITIES: City[] = [HANGZHOU];

export function getCity(cityId: string): City | undefined {
  return CITIES.find(c => c.id === cityId);
}

export function getDistrict(cityId: string, districtId: string): District | undefined {
  const city = getCity(cityId);
  return city?.districts.find(d => d.id === districtId);
}
