# PROMPT — 3D Interactive Philosophy Book (React 19 + Vite + Three.js)

Bạn là Senior React + Three.js Engineer.

Nhiệm vụ: xây dựng một ứng dụng web dạng cuốn sách triết học 3D tương tác, sử dụng React 19, Vite, Three.js và React Three Fiber.

## TECHNOLOGY STACK

### Core

* React 19
* Vite 8
* JavaScript (JSX)

### 3D

* three
* @react-three/fiber
* @react-three/drei

### Styling

* Tailwind CSS v4
* Google Fonts:

  * Cinzel
  * Lora

### Animation

* GSAP
* THREE.MathUtils.damp
* React Three Fiber useFrame

---

## PROJECT STRUCTURE

src/

├── App.jsx

├── components/

│ ├── BookBase.jsx

│ ├── ClosedBook.jsx

│ ├── Page.jsx

│ ├── PageContent.jsx

│ ├── StaticPage.jsx

│ └── TableOfContents.jsx

├── content/

│ └── content.js

├── assets/

│ ├── book-cover.png

│ ├── page.png

│ └── book-bg.png

└── styles/

---

## APPLICATION GOAL

Hiển thị nội dung triết học dưới dạng một cuốn sách 3D có thể:

* mở sách
* đóng sách
* lật từng trang
* xoay góc nhìn
* zoom nhẹ
* đổ bóng chân thực
* hiệu ứng chuyển động tự nhiên

Người dùng có cảm giác đang cầm và đọc một cuốn sách thật.

---

## 3D SCENE REQUIREMENTS

Sử dụng:

Canvas
OrbitControls
Float
ContactShadows
Html
useTexture

### Camera

Perspective Camera

FOV: 35–45

Position:

[0, 1.5, 8]

### Lighting

ambientLight

spotLight

directionalLight

Ánh sáng vàng ấm kiểu thư viện cổ.

### Floating Effect

Cuốn sách dao động rất nhẹ:

Float

rotationIntensity={0.15}

floatIntensity={0.3}

speed={1.2}

---

## BOOK MODEL

Book gồm:

### Closed State

<ClosedBook />

* Bìa trước
* Bìa sau
* Gáy sách

Click:

→ mở sách

### Open State

<BookBase />

Bao gồm:

* Left Page
* Right Page

Mỗi trang là mesh riêng.

---

## PAGE FLIP SYSTEM

Mỗi trang:

<Page />

Khi lật:

rotation.y thay đổi từ:

0 → -Math.PI

Sử dụng:

THREE.MathUtils.damp()

bên trong:

useFrame()

để chuyển động mượt.

Không dùng CSS rotate.

Không dùng animation giả lập 2D.

---

## PAGE CONTENT

Nội dung lấy từ:

content.js

Mỗi chapter gồm:

id

title

subtitle

sections

summary

### Render

<PageContent />

Hiển thị bằng:

<Html transform>

đặt trực tiếp trên bề mặt trang.

---

## CONTENT MAPPING

Từ content.md:

Chapter 1

Giai cấp – Dân tộc – Nhân loại

Chapter 2

Nhà nước

Chapter 3

Cách mạng xã hội

Chapter 4

Quan hệ Nhà nước và Cách mạng xã hội

Chapter 5

Sự tự tiêu vong của Nhà nước

---

## TABLE OF CONTENTS

Trang đầu tiên sau bìa:

Mục lục

Cho phép click:

→ chuyển đến chapter tương ứng

Có animation camera ngắn khi chuyển.

---

## VISUAL STYLE

Phong cách:

Luxury Academic Book

Màu chủ đạo:

#0D1B2A Navy

#C9A84C Gold

#F5EFE0 Paper

Typography:

Cinzel

Lora

Không dùng font hiện đại kiểu Inter hoặc Roboto.

---

## TEXT PRESENTATION

Không hiển thị nguyên khối.

Ưu tiên:

* Timeline
* Comparison Cards
* Feature Lists
* Hierarchy Diagram
* Flow Diagram

Tùy nội dung từng chương.

---

## IMMERSION DETAILS

Trang giấy:

Texture cũ nhẹ.

Mép giấy:

Roughness khác bìa.

Bóng đổ:

ContactShadows.

Hiệu ứng hover:

Sách nghiêng nhẹ theo vị trí chuột.

---

## PERFORMANCE

* React.memo khi cần
* useMemo cho dữ liệu tĩnh
* Texture preload
* Không re-render toàn bộ sách khi đổi trang

---

## OUTPUT

Sinh toàn bộ source code React hoàn chỉnh.

Code phải chạy trực tiếp bằng:

npm install

npm run dev

không cần chỉnh sửa thêm.
