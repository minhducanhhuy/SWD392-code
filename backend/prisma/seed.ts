import { PrismaClient, DiscountType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed Duc DB] Starting data population for Duc Module (Cart & Combo)...');

  // Xóa sạch dữ liệu cũ để idempotent
  await prisma.cartItem.deleteMany({});
  await prisma.comboItem.deleteMany({});
  await prisma.combo.deleteMany({});
  await prisma.productVariant.deleteMany({});
  await prisma.product.deleteMany({});

  // 1. Tạo các sản phẩm thời trang mẫu (Thierlavier Apparel)
  const tee = await prisma.product.create({
    data: {
      name: 'Áo Thun Thierlavier Signature Tee',
      slug: 'ao-thun-thierlavier-signature-tee',
      description: 'Chất liệu Cotton 100% 250gsm dệt xước cao cấp, phom dáng oversize cá tính.',
      basePrice: 320000,
      originalPrice: 380000,
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop',
      ],
      variants: {
        create: [
          { color: 'Đen (Black)', size: 'M', sku: 'TEE-BLK-M', stockQty: 25 },
          { color: 'Đen (Black)', size: 'L', sku: 'TEE-BLK-L', stockQty: 30 },
          { color: 'Trắng (White)', size: 'M', sku: 'TEE-WHT-M', stockQty: 15 },
          { color: 'Trắng (White)', size: 'L', sku: 'TEE-WHT-L', stockQty: 20 },
        ],
      },
    },
  });

  const pant = await prisma.product.create({
    data: {
      name: 'Quần Jean Thierlavier Streetwear Baggy',
      slug: 'quan-jean-thierlavier-streetwear-baggy',
      description: 'Denim dày dặn wash rách nhẹ phong cách đường phố năng động.',
      basePrice: 550000,
      originalPrice: 650000,
      images: [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop',
      ],
      variants: {
        create: [
          { color: 'Xanh Khói (Smoke Blue)', size: '29', sku: 'PANT-BLU-29', stockQty: 18 },
          { color: 'Xanh Khói (Smoke Blue)', size: '30', sku: 'PANT-BLU-30', stockQty: 22 },
          { color: 'Đen Xám (Washed Black)', size: '29', sku: 'PANT-BLK-29', stockQty: 12 },
          { color: 'Đen Xám (Washed Black)', size: '30', sku: 'PANT-BLK-30', stockQty: 16 },
        ],
      },
    },
  });

  const jacket = await prisma.product.create({
    data: {
      name: 'Áo Khoác Thierlavier Varsity Jacket',
      slug: 'ao-khoac-thierlavier-varsity-jacket',
      description: 'Thân dạ phối tay da tổng hợp mềm mịn, dệt bo cổ và gấu áo dầy dặn giữ ấm.',
      basePrice: 890000,
      originalPrice: 990000,
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop',
      ],
      variants: {
        create: [
          { color: 'Xanh Rêu (Forest Green)', size: 'L', sku: 'JKT-GRN-L', stockQty: 8 },
          { color: 'Xanh Rêu (Forest Green)', size: 'XL', sku: 'JKT-GRN-XL', stockQty: 10 },
          { color: 'Đen (Black)', size: 'L', sku: 'JKT-BLK-L', stockQty: 14 },
        ],
      },
    },
  });

  const beanie = await prisma.product.create({
    data: {
      name: 'Mũ Len Beanie Thierlavier Logo Thêu',
      slug: 'mu-len-beanie-thierlavier-logo-theu',
      description: 'Len dệt kim co giãn 4 chiều mềm mại, logo thierlavier thêu nổi bật.',
      basePrice: 180000,
      originalPrice: 220000,
      images: [
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop',
      ],
      variants: {
        create: [
          { color: 'Đen (Black)', size: 'Freesize', sku: 'BEAN-BLK-FS', stockQty: 40 },
          { color: 'Xám (Grey)', size: 'Freesize', sku: 'BEAN-GRY-FS', stockQty: 30 },
        ],
      },
    },
  });

  // 2. Tạo Combo khuyến mãi (BR-35: startDate <= now, endDate > now)
  const now = new Date();
  const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const summerCombo = await prisma.combo.create({
    data: {
      name: 'Combo Mùa Hè: Áo Thun + Quần Jean Baggy',
      code: 'COMBO-SUMMER-01',
      description: 'Mua trọn bộ Tee & Jean để nhận ngay ưu đãi giảm 15% trên tổng giá trị gói sản phẩm.',
      discountType: DiscountType.PERCENTAGE,
      discountVal: 15, // 15% discount
      startDate: now,
      endDate: nextMonth,
      isActive: true,
      items: {
        create: [
          { productId: tee.id, quantity: 1 },
          { productId: pant.id, quantity: 1 },
        ],
      },
    },
  });

  const winterCombo = await prisma.combo.create({
    data: {
      name: 'Combo Trọn Bộ Thu Đông: Varsity Jacket + Mũ Len',
      code: 'COMBO-WINTER-02',
      description: 'Bộ đôi giữ ấm thời thượng Varsity Jacket và Beanie, giảm ngay 150.000 VNĐ.',
      discountType: DiscountType.FIXED_AMOUNT,
      discountVal: 150000, // Giảm 150,000 VND
      startDate: now,
      endDate: nextMonth,
      isActive: true,
      items: {
        create: [
          { productId: jacket.id, quantity: 1 },
          { productId: beanie.id, quantity: 1 },
        ],
      },
    },
  });

  console.log('[Seed Duc DB] Success! Populated:');
  console.log(`- 4 Products with Variants`);
  console.log(`- 2 Active Combos (${summerCombo.name}, ${winterCombo.name})`);
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

