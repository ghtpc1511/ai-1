#!/bin/bash
# 宝宝出行推荐网站 - Cloudflare Pages 一键部署脚本
# 用法: CLOUDFLARE_API_TOKEN=你的token bash deploy.sh
#
# 获取 Token: https://dash.cloudflare.com/profile/api-tokens
# 创建 Token 时选择模板 "Edit Cloudflare Workers" 或自定义权限包含 Cloudflare Pages:Edit

set -e

PROJECT_NAME="baby-outing"

if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "错误: 请设置 CLOUDFLARE_API_TOKEN 环境变量"
  echo ""
  echo "用法: CLOUDFLARE_API_TOKEN=你的token bash deploy.sh"
  echo ""
  echo "获取 Token: https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi

echo "==> 安装依赖..."
npm install

echo "==> 构建静态站点..."
npx next build

echo "==> 复制 SPA fallback..."
cp out/index.html out/200.html

echo "==> 部署到 Cloudflare Pages..."
npx wrangler pages deploy out --project-name="$PROJECT_NAME" --commit-dirty=true

echo ""
echo "部署完成! 访问 https://${PROJECT_NAME}.pages.dev"
