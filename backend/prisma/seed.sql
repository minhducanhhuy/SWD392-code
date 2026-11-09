--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products (id, name, slug, description, "basePrice", "originalPrice", images, "isActive", "createdAt", "updatedAt") VALUES ('a3ab9978-9692-43e2-851d-53eb38fcccc9', 'Áo Thun Thierlavier Signature Tee', 'ao-thun-thierlavier-signature-tee', 'Chất liệu Cotton 100% 250gsm dệt xước cao cấp, phom dáng oversize cá tính.', 320000, 380000, '{https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop,https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop}', true, '2026-11-08 23:29:04.512', '2026-11-08 23:29:04.512');
INSERT INTO public.products (id, name, slug, description, "basePrice", "originalPrice", images, "isActive", "createdAt", "updatedAt") VALUES ('ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 'Quần Jean Thierlavier Streetwear Baggy', 'quan-jean-thierlavier-streetwear-baggy', 'Denim dày dặn wash rách nhẹ phong cách đường phố năng động.', 550000, 650000, '{https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop}', true, '2026-11-08 23:29:04.519', '2026-11-08 23:29:04.519');
INSERT INTO public.products (id, name, slug, description, "basePrice", "originalPrice", images, "isActive", "createdAt", "updatedAt") VALUES ('bf54898c-d355-4c6b-935d-3b8574594d49', 'Áo Khoác Thierlavier Varsity Jacket', 'ao-khoac-thierlavier-varsity-jacket', 'Thân dạ phối tay da tổng hợp mềm mịn, dệt bo cổ và gấu áo dầy dặn giữ ấm.', 890000, 990000, '{https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop}', true, '2026-11-08 23:29:04.521', '2026-11-08 23:29:04.521');
INSERT INTO public.products (id, name, slug, description, "basePrice", "originalPrice", images, "isActive", "createdAt", "updatedAt") VALUES ('8478aa69-3751-494c-816a-ea36e53b96e6', 'Mũ Len Beanie Thierlavier Logo Thêu', 'mu-len-beanie-thierlavier-logo-theu', 'Len dệt kim co giãn 4 chiều mềm mại, logo thierlavier thêu nổi bật.', 180000, 220000, '{https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&auto=format&fit=crop}', true, '2026-11-08 23:29:04.523', '2026-11-08 23:29:04.523');


--
-- Data for Name: product_variants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('0bfc0191-68c6-4884-8237-46483751f05b', 'a3ab9978-9692-43e2-851d-53eb38fcccc9', 'Đen (Black)', 'M', 'TEE-BLK-M', NULL, 25, '2026-11-08 23:29:04.512', '2026-11-08 23:29:04.512');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('aafe1bb7-b6bb-4d16-ad1a-c20f176904b6', 'a3ab9978-9692-43e2-851d-53eb38fcccc9', 'Đen (Black)', 'L', 'TEE-BLK-L', NULL, 30, '2026-11-08 23:29:04.512', '2026-11-08 23:29:04.512');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('bcd6d3e5-4df4-46a3-ba5d-c794bc35d08f', 'a3ab9978-9692-43e2-851d-53eb38fcccc9', 'Trắng (White)', 'M', 'TEE-WHT-M', NULL, 15, '2026-11-08 23:29:04.512', '2026-11-08 23:29:04.512');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('2543358b-44a3-48da-a38a-d76532ac1333', 'a3ab9978-9692-43e2-851d-53eb38fcccc9', 'Trắng (White)', 'L', 'TEE-WHT-L', NULL, 20, '2026-11-08 23:29:04.512', '2026-11-08 23:29:04.512');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('9d0a5e9f-6908-444b-9b0a-a5b248569da4', 'ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 'Xanh Khói (Smoke Blue)', '29', 'PANT-BLU-29', NULL, 18, '2026-11-08 23:29:04.519', '2026-11-08 23:29:04.519');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('e9ea4e50-fea4-4760-8173-233fa69dc355', 'ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 'Xanh Khói (Smoke Blue)', '30', 'PANT-BLU-30', NULL, 22, '2026-11-08 23:29:04.519', '2026-11-08 23:29:04.519');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('194e2d47-4863-4350-b08b-993d3d771613', 'ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 'Đen Xám (Washed Black)', '29', 'PANT-BLK-29', NULL, 12, '2026-11-08 23:29:04.519', '2026-11-08 23:29:04.519');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('857b9b53-2610-47ce-ac21-3ad547d253c4', 'ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 'Đen Xám (Washed Black)', '30', 'PANT-BLK-30', NULL, 16, '2026-11-08 23:29:04.519', '2026-11-08 23:29:04.519');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('86375478-8192-4009-8f87-6fa106af93ec', 'bf54898c-d355-4c6b-935d-3b8574594d49', 'Xanh Rêu (Forest Green)', 'L', 'JKT-GRN-L', NULL, 8, '2026-11-08 23:29:04.521', '2026-11-08 23:29:04.521');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('e92d3a31-67bb-4017-9eba-f78fce8ab3ef', 'bf54898c-d355-4c6b-935d-3b8574594d49', 'Xanh Rêu (Forest Green)', 'XL', 'JKT-GRN-XL', NULL, 10, '2026-11-08 23:29:04.521', '2026-11-08 23:29:04.521');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('c1829c8e-3c53-49e6-ade7-6f88946c2d33', 'bf54898c-d355-4c6b-935d-3b8574594d49', 'Đen (Black)', 'L', 'JKT-BLK-L', NULL, 14, '2026-11-08 23:29:04.521', '2026-11-08 23:29:04.521');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('ce06122d-0fe1-4328-98c8-3916647ae269', '8478aa69-3751-494c-816a-ea36e53b96e6', 'Đen (Black)', 'Freesize', 'BEAN-BLK-FS', NULL, 40, '2026-11-08 23:29:04.523', '2026-11-08 23:29:04.523');
INSERT INTO public.product_variants (id, "productId", color, size, sku, price, "stockQty", "createdAt", "updatedAt") VALUES ('8209927b-6940-4f20-8346-2dd3a1698d79', '8478aa69-3751-494c-816a-ea36e53b96e6', 'Xám (Grey)', 'Freesize', 'BEAN-GRY-FS', NULL, 30, '2026-11-08 23:29:04.523', '2026-11-08 23:29:04.523');


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cart_items (id, "sessionId", "variantId", quantity, "comboId", "comboGroupId", "createdAt", "updatedAt") VALUES ('2b979745-c66d-4630-8e85-21bec8cef268', 'duc-user-live-test', 'ce06122d-0fe1-4328-98c8-3916647ae269', 4, NULL, NULL, '2026-11-08 23:39:43.082', '2026-11-08 23:39:43.107');
INSERT INTO public.cart_items (id, "sessionId", "variantId", quantity, "comboId", "comboGroupId", "createdAt", "updatedAt") VALUES ('86c9e541-58cf-4d67-9413-a39dba8dd989', 'duc-user-live-test', '86375478-8192-4009-8f87-6fa106af93ec', 1, '2272a68c-6ece-4642-885a-d1aa639e128d', 'cc22a00c-dc74-40a4-b6dd-85aa5a973417', '2026-11-08 23:39:43.138', '2026-11-08 23:39:43.138');
INSERT INTO public.cart_items (id, "sessionId", "variantId", quantity, "comboId", "comboGroupId", "createdAt", "updatedAt") VALUES ('9e6df52e-adf0-4ab7-8ce2-fdfdcaa375f4', 'duc-user-live-test', 'ce06122d-0fe1-4328-98c8-3916647ae269', 1, '2272a68c-6ece-4642-885a-d1aa639e128d', 'cc22a00c-dc74-40a4-b6dd-85aa5a973417', '2026-11-08 23:39:43.145', '2026-11-08 23:39:43.145');
INSERT INTO public.cart_items (id, "sessionId", "variantId", quantity, "comboId", "comboGroupId", "createdAt", "updatedAt") VALUES ('ff632621-2407-49d4-bd1f-d1d98ad6aeeb', 'duc-guest-session-001', '86375478-8192-4009-8f87-6fa106af93ec', 1, '2272a68c-6ece-4642-885a-d1aa639e128d', '2821e21e-c293-40cd-933c-1ea050405c37', '2026-11-08 23:42:40.735', '2026-11-08 23:42:40.735');
INSERT INTO public.cart_items (id, "sessionId", "variantId", quantity, "comboId", "comboGroupId", "createdAt", "updatedAt") VALUES ('999ad132-7968-498a-930c-3cc4b4e5f07c', 'duc-guest-session-001', 'ce06122d-0fe1-4328-98c8-3916647ae269', 1, '2272a68c-6ece-4642-885a-d1aa639e128d', '2821e21e-c293-40cd-933c-1ea050405c37', '2026-11-08 23:42:40.739', '2026-11-08 23:42:40.739');


--
-- Data for Name: combos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.combos (id, name, code, description, "discountType", "discountVal", "bundlePrice", "startDate", "endDate", "isActive", "createdAt", "updatedAt") VALUES ('ae7b53da-097e-4784-9bfd-f2e777b976b2', 'Combo Mùa Hè: Áo Thun + Quần Jean Baggy', 'COMBO-SUMMER-01', 'Mua trọn bộ Tee & Jean để nhận ngay ưu đãi giảm 15% trên tổng giá trị gói sản phẩm.', 'PERCENTAGE', 15, NULL, '2026-11-08 23:29:04.524', '2026-12-08 23:29:04.524', true, '2026-11-08 23:29:04.526', '2026-11-08 23:29:04.526');
INSERT INTO public.combos (id, name, code, description, "discountType", "discountVal", "bundlePrice", "startDate", "endDate", "isActive", "createdAt", "updatedAt") VALUES ('2272a68c-6ece-4642-885a-d1aa639e128d', 'Combo Trọn Bộ Thu Đông: Varsity Jacket + Mũ Len', 'COMBO-WINTER-02', 'Bộ đôi giữ ấm thời thượng Varsity Jacket và Beanie, giảm ngay 150.000 VNĐ.', 'FIXED_AMOUNT', 150000, NULL, '2026-11-08 23:29:04.524', '2026-12-08 23:29:04.524', true, '2026-11-08 23:29:04.529', '2026-11-08 23:29:04.529');


--
-- Data for Name: combo_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.combo_items (id, "comboId", "productId", quantity) VALUES ('cd063eaa-990a-4a3d-9bd4-bf6df7ba01da', 'ae7b53da-097e-4784-9bfd-f2e777b976b2', 'a3ab9978-9692-43e2-851d-53eb38fcccc9', 1);
INSERT INTO public.combo_items (id, "comboId", "productId", quantity) VALUES ('d178dcdb-5447-4b3d-a12d-bbd6a736dd01', 'ae7b53da-097e-4784-9bfd-f2e777b976b2', 'ec8c7717-ebeb-489e-bf3e-9a1bb41a6b6b', 1);
INSERT INTO public.combo_items (id, "comboId", "productId", quantity) VALUES ('76d05b3e-2626-4099-baf4-88a6cb51353c', '2272a68c-6ece-4642-885a-d1aa639e128d', 'bf54898c-d355-4c6b-935d-3b8574594d49', 1);
INSERT INTO public.combo_items (id, "comboId", "productId", quantity) VALUES ('93b6ece7-311b-4cf4-8678-dbe20d86b993', '2272a68c-6ece-4642-885a-d1aa639e128d', '8478aa69-3751-494c-816a-ea36e53b96e6', 1);


--
-- PostgreSQL database dump complete
--

