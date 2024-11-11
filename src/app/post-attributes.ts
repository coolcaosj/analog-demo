export default interface PostAttributes {
  title: string;  // 标题
  slug: string;   // path
  date: string;   // 日期
  description: string;  // 描述
  coverImage: string;   // 封面
  tags: string[];       // 标签
  category: string;     // 分类
  pinned?: boolean;      // 是否置顶
}
