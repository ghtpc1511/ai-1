import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="px-4 pt-20 text-center space-y-4">
      <div className="text-6xl">🍼</div>
      <h1 className="text-xl font-bold text-gray-900">页面未找到</h1>
      <p className="text-sm text-gray-500">你要找的页面不存在，回到首页看看推荐吧</p>
      <Link
        href="/"
        className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
