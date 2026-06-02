// ============================================================
// Content Data Layer — Triết Học Mác–Lênin
// 7 physical sheets × 2 faces = 14 page surfaces
// ============================================================

export const TOTAL_SHEETS = 7;

// Chapter metadata for Table of Contents navigation
export const chapters = [
  { id: 1, title: "Giai cấp – Dân tộc – Nhân loại", startPage: 2, icon: "scales" },
  { id: 2, title: "Nhà nước", startPage: 4, icon: "crown" },
  { id: 3, title: "Cách mạng xã hội", startPage: 6, icon: "revolution" },
  { id: 4, title: "Quan hệ Nhà nước và CMXH", startPage: 8, icon: "link" },
  { id: 5, title: "Sự tự tiêu vong của Nhà nước", startPage: 10, icon: "fade" },
  { id: 6, title: "Kết luận", startPage: 12, icon: "scroll", isConclusion: true },
];

// Convert 1-indexed display page number to spread index
export function pageToSpread(displayPage) {
  return Math.floor(displayPage / 2);
}

// Get chapter info for a given spread
export function getChapterAtSpread(spread) {
  if (spread === 0) return { title: "Mục Lục" };
  const leftPageNum = 2 * spread; // 1-indexed display page on left side
  for (let i = chapters.length - 1; i >= 0; i--) {
    if (leftPageNum >= chapters[i].startPage) {
      return chapters[i];
    }
  }
  return null;
}

// ============================================================
// Page Surfaces — index = surfaceIndex, displayPage = index + 1
// Even indices = front of sheet, Odd indices = back of sheet
// ============================================================
export const pageContents = [

  // ─── Surface 0 (Page 1): Table of Contents ───
  {
    id: 0,
    type: "toc",
  },

  // ─── Surface 1 (Page 2): Chapter 1, Part 1 ───
  {
    id: 1,
    type: "content",
    chapter: 1,
    chapterTitle: "Giai cấp – Dân tộc – Nhân loại",
    pageTitle: "Giai cấp và Dân tộc",
    subtitle: "Quan hệ biện chứng giữa giai cấp và dân tộc",
    layoutType: "featureList",
    isChapterStart: true,
    introduction: "Trong chủ nghĩa duy vật lịch sử, mối quan hệ giữa giai cấp và dân tộc là nền tảng phương pháp luận để giải thích các thiết chế chính trị và động lực biến đổi lịch sử.",
    sections: [
      {
        heading: "Giai cấp có trước dân tộc",
        text: "Giai cấp xuất hiện trước dân tộc trong lịch sử. Khi giai cấp mất đi, dân tộc vẫn còn tồn tại lâu dài."
      },
      {
        heading: "Phương thức sản xuất quyết định",
        text: "Sự phát triển của phương thức sản xuất quyết định sự hình thành và phát triển của dân tộc."
      },
      {
        heading: "Giai cấp thống trị chi phối dân tộc",
        text: "Giai cấp thống trị thường đại diện và chi phối tính chất của dân tộc trong mỗi thời kỳ lịch sử."
      },
      {
        heading: "Mâu thuẫn dẫn đến cách mạng",
        text: "Khi giai cấp thống trị trở nên phản động, lợi ích của họ có thể mâu thuẫn với lợi ích dân tộc, dẫn đến yêu cầu cách mạng xã hội."
      },
      {
        heading: "Dân tộc tác động trở lại giai cấp",
        text: "Vấn đề dân tộc cũng tác động trở lại vấn đề giai cấp; giải phóng dân tộc là tiền đề để giải phóng giai cấp ở các nước thuộc địa."
      }
    ],
  },

  // ─── Surface 2 (Page 3): Chapter 1, Part 2 ───
  {
    id: 2,
    type: "content",
    chapter: 1,
    pageTitle: "Giai cấp, Dân tộc và Nhân loại",
    subtitle: "Mối quan hệ ba chiều trong xã hội",
    layoutType: "cardGrid",
    isChapterEnd: true,
    sections: [
      {
        heading: "Khái niệm nhân loại",
        text: "Nhân loại là toàn bộ cộng đồng người trên Trái Đất, thống nhất bởi bản chất xã hội của con người."
      },
      {
        heading: "Thành tựu văn minh chung",
        text: "Thành tựu văn minh là kết quả đóng góp của toàn nhân loại qua nhiều thời kỳ lịch sử, không phải của riêng một giai cấp hay dân tộc nào."
      },
      {
        heading: "Lợi ích gắn liền",
        text: "Trong xã hội có giai cấp, lợi ích nhân loại luôn gắn với lợi ích giai cấp và dân tộc, không thể tách rời."
      },
      {
        heading: "Vấn đề toàn cầu",
        text: "Hiện nay, các vấn đề toàn cầu như môi trường, dịch bệnh, nghèo đói, khủng bố... đòi hỏi sự hợp tác của toàn nhân loại."
      }
    ],
    summary: "Giai cấp, dân tộc và nhân loại có mối quan hệ biện chứng chặt chẽ. Giai cấp quyết định dân tộc, dân tộc tác động trở lại giai cấp, và cả hai đều gắn với lợi ích toàn nhân loại."
  },

  // ─── Surface 3 (Page 4): Chapter 2, Part 1 ───
  {
    id: 3,
    type: "content",
    chapter: 2,
    chapterTitle: "Nhà nước",
    pageTitle: "Nguồn gốc và Bản chất",
    subtitle: "Thiết chế quyền lực chính trị đặc biệt",
    layoutType: "hierarchy",
    isChapterStart: true,
    introduction: "Nhà nước không phải là sản phẩm của \"khế ước xã hội\" phi giai cấp, mà là hiện tượng xã hội mang tính lịch sử sâu sắc.",
    sections: [
      {
        heading: "Nguồn gốc nhà nước",
        text: "Nhà nước xuất hiện do hai nguyên nhân cơ bản:",
        level: 0
      },
      {
        heading: "Nguyên nhân kinh tế",
        text: "Sự phát triển của lực lượng sản xuất dẫn đến dư thừa của cải, xuất hiện chế độ tư hữu về tư liệu sản xuất.",
        level: 1
      },
      {
        heading: "Nguyên nhân xã hội",
        text: "Xã hội phân hóa thành các giai cấp đối kháng không thể điều hòa, đòi hỏi một bộ máy quyền lực đặc biệt để duy trì trật tự.",
        level: 1
      },
      {
        heading: "Bản chất giai cấp",
        text: "Nhà nước là công cụ thống trị chính trị của giai cấp thống trị. Không tồn tại nhà nước đứng ngoài hoặc trên các giai cấp.",
        level: 0
      },
      {
        heading: "Tính xã hội",
        text: "Nhà nước quản lý các công việc chung như giáo dục, y tế, giao thông, an ninh... để duy trì sự ổn định xã hội.",
        level: 0
      },
      {
        heading: "Nhà nước xã hội chủ nghĩa",
        text: "Là công cụ của đa số nhân dân lao động. Hướng tới xóa bỏ giai cấp và tiến tới sự tự tiêu vong của nhà nước.",
        level: 0
      }
    ],
  },

  // ─── Surface 4 (Page 5): Chapter 2, Part 2 ───
  {
    id: 4,
    type: "content",
    chapter: 2,
    pageTitle: "Đặc trưng và Chức năng",
    subtitle: "Ba đặc trưng cơ bản và hệ thống chức năng",
    layoutType: "featureList",
    isChapterEnd: true,
    sections: [
      {
        heading: "Quản lý theo lãnh thổ",
        text: "Nhà nước quản lý dân cư theo lãnh thổ, phân chia theo biên giới quốc gia và địa vực hành chính, không dựa trên quan hệ huyết thống."
      },
      {
        heading: "Bộ máy cưỡng chế chuyên nghiệp",
        text: "Có bộ máy quyền lực và cưỡng chế chuyên nghiệp: quân đội, công an, tòa án, nhà tù... tách rời khỏi nhân dân."
      },
      {
        heading: "Hệ thống thuế khóa",
        text: "Có hệ thống thuế để duy trì hoạt động của bộ máy nhà nước và các lực lượng vũ trang."
      },
      {
        heading: "Chức năng thống trị chính trị",
        text: "Sử dụng quyền lực để trấn áp giai cấp bị trị, bảo vệ địa vị và lợi ích của giai cấp thống trị. Giữ vai trò quyết định."
      },
      {
        heading: "Chức năng xã hội",
        text: "Quản lý, điều hành các công việc chung của xã hội để duy trì trật tự. Là cơ sở thực tiễn cho chức năng chính trị."
      },
      {
        heading: "Đối nội và Đối ngoại",
        text: "Đối nội: duy trì trật tự trong nước (vai trò chủ yếu). Đối ngoại: bảo vệ lãnh thổ, chủ quyền và giao lưu quốc tế."
      }
    ],
    summary: "Nhà nước là sản phẩm của mâu thuẫn giai cấp, có ba đặc trưng cơ bản và hai nhóm chức năng. Nhà nước XHCN hướng tới xóa bỏ giai cấp và tự tiêu vong."
  },

  // ─── Surface 5 (Page 6): Chapter 3, Part 1 ───
  {
    id: 5,
    type: "content",
    chapter: 3,
    chapterTitle: "Cách mạng xã hội",
    pageTitle: "Nguồn gốc và Bản chất",
    subtitle: "Động lực phát triển của lịch sử",
    layoutType: "flow",
    isChapterStart: true,
    introduction: "Cách mạng xã hội không phải là biến cố ngẫu nhiên, mà là phương thức tất yếu để thay thế hình thái kinh tế - xã hội lỗi thời.",
    sections: [
      {
        heading: "Nguyên nhân sâu xa",
        text: "Mâu thuẫn giữa lực lượng sản xuất phát triển với quan hệ sản xuất lỗi thời, lạc hậu."
      },
      {
        heading: "Nguyên nhân trực tiếp",
        text: "Đấu tranh giai cấp giữa lực lượng tiến bộ (đại diện cho LLSX mới) và lực lượng thống trị (đại diện cho QHSX cũ) phát triển đến đỉnh cao."
      },
      {
        heading: "Bản chất (nghĩa rộng)",
        text: "Sự biến đổi có tính bước ngoặt và căn bản về chất trong toàn bộ đời sống xã hội — phương thức chuyển đổi hình thái kinh tế - xã hội."
      },
      {
        heading: "Bản chất (nghĩa hẹp)",
        text: "Lật đổ chính quyền nhà nước lỗi thời, thiết lập chính quyền mới tiến bộ hơn của giai cấp cách mạng."
      },
      {
        heading: "Vấn đề cốt lõi",
        text: "Giành chính quyền nhà nước — vấn đề cơ bản quyết định mọi bước phát triển của cách mạng."
      }
    ],
  },

  // ─── Surface 6 (Page 7): Chapter 3, Part 2 ───
  {
    id: 6,
    type: "content",
    chapter: 3,
    pageTitle: "Các hình thức biến đổi xã hội",
    subtitle: "Phân biệt cách mạng với các hình thức khác",
    layoutType: "comparison",
    isChapterEnd: true,
    sections: [
      {
        heading: "Cách mạng xã hội",
        text: "Thay đổi toàn diện về chất, bước nhảy đột biến làm thay đổi toàn bộ đời sống xã hội."
      },
      {
        heading: "Tiến hóa xã hội",
        text: "Thay đổi dần dần, tiệm tiến, từng bộ phận. Tạo tiền đề cho cách mạng xã hội."
      },
      {
        heading: "Cải cách xã hội",
        text: "Thay đổi từng bộ phận, lĩnh vực riêng lẻ. Do giai cấp thống trị thực hiện để điều chỉnh mâu thuẫn."
      },
      {
        heading: "Đảo chính",
        text: "Chỉ thay đổi người cầm quyền, do một nhóm người tiến hành, không thay đổi căn bản chế độ xã hội."
      }
    ],
    summary: "Cách mạng xã hội là hình thức biến đổi căn bản nhất — thay đổi toàn diện về chất. Tiến hóa tạo tiền đề, cải cách chỉ điều chỉnh bộ phận, đảo chính chỉ đổi người cầm quyền."
  },

  // ─── Surface 7 (Page 8): Chapter 4, Part 1 ───
  {
    id: 7,
    type: "content",
    chapter: 4,
    chapterTitle: "Quan hệ Nhà nước và CMXH",
    pageTitle: "Nhà nước và Cách mạng",
    subtitle: "Mối quan hệ biện chứng hai chiều",
    layoutType: "timeline",
    isChapterStart: true,
    introduction: "Nhà nước và cách mạng xã hội tồn tại trong thế tác động qua lại biện chứng, là hai mặt của quá trình vận động mâu thuẫn giai cấp.",
    sections: [
      {
        heading: "Nhà nước cản trở cách mạng",
        text: "Giai cấp thống trị sử dụng nhà nước cùng bộ máy bạo lực, pháp luật và thuế khóa để bảo vệ lợi ích, duy trì trật tự cũ và trấn áp mầm mống cách mạng."
      },
      {
        heading: "Cách mạng phải giành chính quyền",
        text: "Mục tiêu quan trọng nhất, cơ bản và quyết định của mọi cuộc cách mạng xã hội là chiếm lấy chính quyền nhà nước từ tay giai cấp thống trị cũ."
      }
    ],
  },

  // ─── Surface 8 (Page 9): Chapter 4, Part 2 ───
  {
    id: 8,
    type: "content",
    chapter: 4,
    pageTitle: "Bạo lực và Xây dựng",
    subtitle: "Phương thức và kết quả cách mạng",
    layoutType: "flow",
    isChapterEnd: true,
    sections: [
      {
        heading: "Nguyên tắc bạo lực cách mạng",
        text: "Theo lý luận Mác – Lênin, giai cấp thống trị không tự nguyện từ bỏ quyền lực nên cách mạng thường phải sử dụng bạo lực để đập tan bộ máy nhà nước cũ."
      },
      {
        heading: "Xây dựng nhà nước kiểu mới",
        text: "Sau cách mạng, hình thành nhà nước chuyên chính vô sản — \"nhà nước nửa nhà nước\" — để bảo vệ thành quả cách mạng và xây dựng xã hội mới."
      }
    ],
    summary: "Nhà nước và cách mạng xã hội tác động qua lại biện chứng. Cách mạng phải giành chính quyền bằng bạo lực khi cần thiết, sau đó xây dựng nhà nước kiểu mới phục vụ đa số nhân dân."
  },

  // ─── Surface 9 (Page 10): Chapter 5, Part 1 ───
  {
    id: 9,
    type: "content",
    chapter: 5,
    chapterTitle: "Sự tự tiêu vong của Nhà nước",
    pageTitle: "Điều kiện tự tiêu vong",
    subtitle: "Theo học thuyết Mác – Lênin",
    layoutType: "featureList",
    isChapterStart: true,
    introduction: "Sự \"tự tiêu vong\" của nhà nước không phải xóa bỏ bằng mệnh lệnh hành chính, mà là quá trình tự nhiên, tất yếu tuân theo quy luật khách quan.",
    sections: [
      {
        heading: "Lực lượng sản xuất phát triển rất cao",
        text: "Giải phóng hoàn toàn năng suất lao động, tạo ra dư thừa tuyệt đối về của cải vật chất. Nguyên tắc: \"làm theo năng lực, hưởng theo nhu cầu\"."
      },
      {
        heading: "Xóa bỏ chế độ tư hữu",
        text: "Khi của cải dồi dào, chế độ tư hữu bị triệt tiêu tận gốc, kéo theo xóa bỏ cơ sở kinh tế của sự phân hóa giai cấp."
      },
      {
        heading: "Không còn giai cấp đối kháng",
        text: "Khi chế độ tư hữu bị xóa bỏ, các giai cấp đối kháng không còn tồn tại, mâu thuẫn giai cấp bị triệt tiêu."
      },
      {
        heading: "Ý thức tự giác cao",
        text: "Con người tự giác tuân thủ các quy tắc sống chung cơ bản của nhân loại mà không cần bộ máy cưỡng chế hay hình phạt."
      }
    ],
  },

  // ─── Surface 10 (Page 11): Chapter 5, Part 2 ───
  {
    id: 10,
    type: "content",
    chapter: 5,
    pageTitle: "Kết quả tự tiêu vong",
    subtitle: "Từ cai trị chính trị đến tự quản quần chúng",
    layoutType: "cardGrid",
    isChapterEnd: true,
    sections: [
      {
        heading: "Nhà nước tự tiêu vong",
        text: "Khi giai cấp và đấu tranh giai cấp không còn, chức năng trấn áp bạo lực tự động mất đi lý do tồn tại. Nhà nước trở nên vô dụng."
      },
      {
        heading: "Chuyển sang tự quản",
        text: "Các chức năng xã hội hữu ích (thống kê, giáo dục, y tế) không bị xóa bỏ mà phân tán vào tay nhân dân thông qua tổ chức tự quản."
      },
      {
        heading: "Chấm dứt bạo lực đối kháng",
        text: "Cách mạng bạo lực khép lại sứ mệnh lịch sử. Xã hội vận động dưới hình thức chuyển hóa tự giác, khoa học và tiến hóa dần dần."
      }
    ],
    summary: "Nhà nước tự tiêu vong khi lực lượng sản xuất phát triển cao, giai cấp bị xóa bỏ, con người đạt ý thức tự giác. Chính phủ cai trị con người được thay thế bằng cơ quan quản lý sự vật."
  },

  // ─── Surface 11 (Page 12): Conclusion, Part 1 ───
  {
    id: 11,
    type: "conclusion",
    chapter: 6,
    chapterTitle: "Kết luận",
    pageTitle: "Sơ đồ tư duy tổng hợp",
    subtitle: "Mối liên hệ logic giữa các khái niệm",
    layoutType: "flow",
    isChapterStart: true,
    sections: [
      { text: "Giai cấp ↔ Dân tộc ↔ Nhân loại" },
      { text: "Mâu thuẫn giai cấp" },
      { text: "Nhà nước ra đời" },
      { text: "Nhà nước bảo vệ giai cấp thống trị" },
      { text: "Mâu thuẫn phát triển" },
      { text: "Cách mạng xã hội" },
      { text: "Giành chính quyền" },
      { text: "Xây dựng nhà nước mới" },
      { text: "Xóa bỏ giai cấp" },
      { text: "Nhà nước tự tiêu vong" },
      { text: "Xã hội cộng sản chủ nghĩa" }
    ],
  },

  // ─── Surface 12 (Page 13): Conclusion, Part 2 ───
  {
    id: 12,
    type: "conclusion",
    chapter: 6,
    pageTitle: "Tổng kết — 5 Từ khóa cốt lõi",
    subtitle: "Chủ nghĩa duy vật lịch sử",
    layoutType: "cardGrid",
    isChapterEnd: true,
    sections: [
      {
        heading: "1. Giai cấp",
        text: "Nền tảng phân tích xã hội — phạm trù phản ánh quan hệ sản xuất và quyết định mọi thiết chế chính trị."
      },
      {
        heading: "2. Dân tộc",
        text: "Hình thức cộng đồng chịu ảnh hưởng giai cấp — tác động trở lại và là tiền đề giải phóng giai cấp."
      },
      {
        heading: "3. Nhà nước",
        text: "Công cụ thống trị của giai cấp nắm quyền — sản phẩm tất yếu của mâu thuẫn giai cấp không thể điều hòa."
      },
      {
        heading: "4. Cách mạng xã hội",
        text: "Động lực biến đổi lịch sử — phương thức tất yếu thay thế hình thái kinh tế - xã hội lỗi thời."
      },
      {
        heading: "5. Tự tiêu vong",
        text: "Đích đến cuối cùng — khi lực lượng sản xuất đạt tới trình độ cao nhất, giai cấp và nhà nước đều biến mất."
      }
    ],
    summary: "Giai cấp → Dân tộc → Nhà nước → Cách mạng xã hội → Tự tiêu vong của Nhà nước. Đây là 5 từ khóa lớn của Chủ nghĩa duy vật lịch sử cần ghi nhớ."
  },

  // ─── Surface 13 (Page 14): End Page ───
  {
    id: 13,
    type: "end",
    pageTitle: "Hết",
    subtitle: "Triết Học Mác–Lênin",
    endText: "Chủ Nghĩa Duy Vật Lịch Sử",
    credit: "Chương 03 — Khảo sát toàn diện về mối quan hệ biện chứng giữa Giai cấp, Dân tộc, Nhân loại và Thể chế Nhà nước, Cách mạng Xã hội"
  },
];
