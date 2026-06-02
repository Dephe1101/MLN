# Guidelines: 3D Interactive Book — React 19 + Three.js

## Technology Stack

### Core Framework

```txt
React 19
Vite 8
JavaScript (JSX)
```

### 3D Engine

```txt
three
@react-three/fiber
@react-three/drei
```

### Styling

```txt
Tailwind CSS v4
Google Fonts:
- Cinzel
- Lora
```

### Animation

```txt
GSAP
THREE.MathUtils.damp
React Three Fiber useFrame
```

---

## Project Goal

Xây dựng một cuốn sách triết học 3D tương tác hoàn chỉnh.

Người dùng có thể:

* Mở sách
* Đóng sách
* Lật trang
* Xoay góc nhìn
* Zoom nhẹ
* Quan sát bóng đổ và chiều sâu không gian

Trải nghiệm phải giống một cuốn sách thật đặt trên bàn.

---

## Project Structure

```txt
src/

├── App.jsx
├── components/
│   ├── BookBase.jsx
│   ├── ClosedBook.jsx
│   ├── Page.jsx
│   ├── StaticPage.jsx
│   ├── PageContent.jsx
│   ├── TableOfContents.jsx
│   └── SVGIcons.jsx
│
├── content/
│   └── content.js
│
├── assets/
│   ├── book-cover.png
│   ├── page.png
│   ├── book-bg.png
│   └── textures/
│
└── styles/
```

---

## Scene Architecture

```jsx
<Canvas>
  <Scene>
    <Lights />

    <Float>
      <Book />
    </Float>

    <ContactShadows />

    <OrbitControls />
  </Scene>
</Canvas>
```

---

## Camera

Perspective Camera

```js
position = [0, 1.5, 8]
fov = 40
```

Camera phải tập trung vào trung tâm cuốn sách.

Không được zoom quá gần làm mất bố cục.

---

## Lighting

Bắt buộc sử dụng:

```jsx
<ambientLight />
<directionalLight />
<spotLight />
```

Phong cách:

```txt
Warm Library Lighting
Luxury Academic Style
```

Ánh sáng vàng ấm giống thư viện cổ.

Không dùng ánh sáng trắng xanh hiện đại.

---

## Design Tokens

```css
--navy: #0D1B2A;
--navy-light: #162438;

--gold: #C9A84C;

--cream: #F5EFE0;

--red: #C0392B;

--paper: #F7F1E4;

--shadow: rgba(0,0,0,0.35);
```

---

## Typography

### Title

```txt
Cinzel
```

Dùng cho:

* Cover
* Chapter Titles
* Section Headers

### Body

```txt
Lora
```

Dùng cho:

* Nội dung
* Trích dẫn
* Giải thích

### Không sử dụng

```txt
Inter
Roboto
Arial
system-ui
```

---

## Book States

### State 1 — Closed

```jsx
<ClosedBook />
```

Hiển thị:

* Front Cover
* Back Cover
* Spine

Người dùng click:

→ chuyển sang Open State

---

### State 2 — Open

```jsx
<BookBase />
```

Hiển thị:

* Trang trái
* Trang phải

Cho phép lật trang.

---

## Book Layout

```txt
Cover
Table Of Contents

Chapter 1
Chapter 2
Chapter 3
Chapter 4
Chapter 5

Conclusion
```

---

## Content Mapping

### Chapter 1

Giai cấp – Dân tộc – Nhân loại

### Chapter 2

Nhà nước

### Chapter 3

Cách mạng xã hội

### Chapter 4

Quan hệ Nhà nước và Cách mạng xã hội

### Chapter 5

Sự tự tiêu vong của Nhà nước

### Conclusion

Tổng kết nội dung

---

## Page Structure

Mỗi trang gồm:

```jsx
<Page>
  <Mesh />

  <Html transform>
    <PageContent />
  </Html>
</Page>
```

Không render text bằng texture.

Nội dung hiển thị bằng HTML.

---

## Page Flip System

Mỗi trang là một mesh độc lập.

Sử dụng:

```js
rotation.y
```

Giá trị:

```js
0 → -Math.PI
```

Animation:

```js
THREE.MathUtils.damp()
```

bên trong:

```js
useFrame()
```

Không dùng:

```txt
CSS rotateY
CSS keyframes
translateX fake page flip
```

---

## Floating Effect

Toàn bộ cuốn sách phải chuyển động nhẹ.

```jsx
<Float
  speed={1.2}
  rotationIntensity={0.15}
  floatIntensity={0.3}
>
```

Hiệu ứng phải tinh tế.

Không rung lắc mạnh.

---

## Orbit Controls

Cho phép:

```txt
Rotate
Pan nhẹ
Zoom nhẹ
```

Giới hạn góc nhìn hợp lý.

Không cho phép lật ngược thế giới 3D.

---

## Shadows

Bắt buộc:

```jsx
<ContactShadows />
```

Mục tiêu:

* Tạo cảm giác sách có trọng lượng
* Tăng chiều sâu không gian

---

## Texture Guidelines

### Cover Texture

```txt
book-cover.png
```

Màu:

* Navy
* Gold

### Page Texture

```txt
page.png
```

Hiệu ứng:

* Giấy cổ nhẹ
* Không quá bẩn
* Không vintage quá mức

---

## Page Content Design

Không hiển thị các đoạn văn dài liên tục.

Ưu tiên:

### Timeline

Dùng cho:

* Tiến trình lịch sử
* Quan hệ nhân quả

### Feature List

Dùng cho:

* Đặc điểm
* Chức năng
* Thuộc tính

### Comparison Layout

Dùng cho:

* Hai quan điểm đối lập
* So sánh khái niệm

### Hierarchy Layout

Dùng cho:

* Quan hệ cấp bậc
* Quan hệ cấu trúc

### Flow Layout

Dùng cho:

* Chuỗi nguyên nhân → kết quả

### Card Grid

Dùng cho:

* Danh sách luận điểm
* Ý chính

---

## SVG Icons

Tất cả icon phải:

```txt
SVG
Stroke-based
fill="none"
strokeWidth="1.5"
```

Phong cách:

```txt
Academic
Minimal
Luxury
```

Không dùng emoji.

---

## Animation Principles

Tất cả chuyển động phải:

```txt
Smooth
Natural
Weighty
Physical
```

Ưu tiên:

```txt
GSAP
THREE.MathUtils.damp
```

Không dùng animation giật hoặc chuyển trạng thái đột ngột.

---

## Performance Rules

Sử dụng:

```js
React.memo
useMemo
useCallback
```

khi phù hợp.

Texture phải preload.

Không re-render toàn bộ sách khi đổi trang.

---

## Accessibility

Tất cả nút phải có:

```jsx
aria-label
```

Hỗ trợ:

* Keyboard Navigation
* Screen Reader cơ bản

---

## Quality Checklist

Trước khi hoàn thành:

[ ] Không lỗi console

[ ] Không texture missing

[ ] Không overflow nội dung

[ ] Không lag khi lật trang

[ ] Camera hoạt động ổn định

[ ] OrbitControls hoạt động

[ ] ContactShadows hiển thị

[ ] Font Cinzel load thành công

[ ] Font Lora load thành công

[ ] Tất cả chapter hiển thị đúng

[ ] Book mở và đóng chính xác

[ ] Page flip mượt ở 60fps

[ ] Responsive cho desktop và laptop
