export type SampleSite = {
  id: string;
  name: string;
  title: string;
  type: string;
  href: string;
  description: string;
};

export const sampleSites: SampleSite[] = [
  {
    id: 'mau1',
    name: 'Mẫu 1',
    title: 'Shop bán hàng hiện đại',
    type: 'Website bán hàng',
    href: '/mau1',
    description: 'Mẫu cửa hàng online có hero sản phẩm, danh mục, sản phẩm nổi bật, ưu đãi và CTA đặt mua.',
  },
  {
    id: 'mau2',
    name: 'Mẫu 2',
    title: 'Cửa hàng lifestyle / mỹ phẩm',
    type: 'Website bán hàng',
    href: '/mau2/home',
    description: 'Mẫu bán hàng mềm mại hơn, phù hợp mỹ phẩm, phụ kiện, đồ handmade, thời trang hoặc quà tặng.',
  },
  {
    id: 'mau3',
    name: 'Mẫu 3',
    title: 'Mạng xã hội mini',
    type: 'Mẫu social app',
    href: '/mau3/facebook',
    description: 'Mẫu giao diện mạng xã hội kiểu feed, story, bài đăng, sidebar và danh sách liên hệ.',
  },
];
