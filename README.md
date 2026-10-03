# ReBrew & ReDistill

## 酒造りを歩く。

東京23区の醸造所・蒸留所を訪ね、酒造りの現場とそこで生まれる酒を記録するWebメディア。

---

# 1. コンセプト

**ReBrew & ReDistill** は、東京23区に存在する醸造所・蒸留所を探し、実際に訪問し、その場所で行われている酒造りを記録する。

単なる施設情報サイトではなく、

> **酒造りを歩く。**

をテーマに、東京の街を歩きながら酒が生まれる場所を訪ねるメディアとする。

### 名前の意味

**ReBrew**

* Re + Brew
* 東京で行われている醸造をもう一度見つめる
* Brewery / Brewingを連想させる

**ReDistill**

* Re + Distill
* 東京で行われている蒸留をもう一度見つめる
* Distillery / Distillingを連想させる

**&**

醸造と蒸留の両方を扱うことを表現する。

---

# 2. ブランド

### 正式名称

**ReBrew & ReDistill**

### タグライン

**酒造りを歩く。**

### サブコピー

> 東京23区の醸造所・蒸留所を訪ねる。

### 表記例

```text
ReBrew & ReDistill
酒造りを歩く。
```

または

```text
ReBrew & ReDistill
東京23区の醸造所・蒸留所を訪ねる。
```

---

# 3. サイトの目的

以下の3つを組み合わせる。

### ① データベース

東京23区の醸造所・蒸留所を網羅的に掲載する。

### ② 訪問記録

運営者自身が実際に施設を訪問し、写真・情報・体験を記録する。

### ③ 東京の街歩き

醸造所・蒸留所を目的地として東京の街を歩くコンテンツを作る。

---

# 4. 対象施設

東京23区内に所在する酒類製造施設を対象とする。

## 醸造

* ビール
* 日本酒
* ワイン
* その他の醸造酒

## 蒸留

* ジン
* ウイスキー
* 焼酎
* スピリッツ
* その他の蒸留酒

将来的に対象カテゴリーを追加可能にする。

---

# 5. サイト構成

```text
/
├── /makers/
│   └── 醸造所・蒸留所一覧
│
├── /makers/[maker]/
│   └── 施設詳細
│
├── /articles/
│   └── 訪問記事一覧
│
├── /articles/[article]/
│   └── 訪問記事
│
├── /areas/
│   └── 区一覧
│
├── /areas/[ward]/
│   └── 区別ページ
│
├── /types/
│   └── 酒類一覧
│
├── /types/[type]/
│   └── 酒類別ページ
│
├── /map/
│   └── 地図
│
├── /routes/
│   └── 酒造りを歩くルート
│
└── /about/
    └── ReBrew & ReDistillについて
```

---

# 6. トップページ

ブランドの世界観を最初に伝える。

## Hero

```text
ReBrew & ReDistill

酒造りを歩く。

東京23区の醸造所・蒸留所を訪ねる。
```

大きな施設写真・街の写真などを使用する。

---

## トップページ構成

```text
Hero
 ↓
ReBrew & ReDistillとは
 ↓
東京23区の醸造所・蒸留所
 ↓
Map
 ↓
最近訪問した場所
 ↓
最新の訪問記事
 ↓
区から探す
 ↓
酒類から探す
 ↓
酒造りを歩くルート
```

---

# 7. 醸造所・蒸留所一覧

URL:

```text
/makers/
```

タイトル:

> 東京23区の醸造所・蒸留所｜ReBrew & ReDistill

施設を一覧表示する。

## 絞り込み

* 区
* エリア
* 醸造 / 蒸留
* 酒類
* 見学可能
* 店舗あり
* バーあり
* 飲食可能
* 商品購入可能
* 訪問記事あり

---

# 8. 施設詳細

URL:

```text
/makers/[maker]/
```

## 表示内容

### 基本情報

* 施設名
* 種別
* 酒類
* 区
* エリア
* 住所
* 最寄駅
* 地図
* 営業時間
* 定休日
* 公式サイト
* SNS

### 施設情報

* 見学
* 店舗
* バー
* 飲食
* 商品販売
* オンライン販売
* 製造設備
* 製造方法
* 主な商品

### ReBrew & ReDistill独自情報

* 初回訪問日
* 訪問回数
* 訪問記事
* 写真
* インタビュー
* 運営者メモ

---

# 9. 訪問記事

URL:

```text
/articles/[article]/
```

サイトの独自コンテンツの中心とする。

## 記事構成

```text
タイトル
↓
アイキャッチ
↓
訪問日
↓
訪問した施設
↓
概要
↓
なぜ訪問したか
↓
街・アクセス
↓
施設外観
↓
酒造りの現場
↓
設備
↓
製造工程
↓
製品
↓
インタビュー
↓
実際に訪問して分かったこと
↓
飲食・購入体験
↓
周辺情報
↓
関連する醸造所・蒸留所
```

---

# 10. 「酒造りを歩く」コンテンツ

ReBrew & ReDistillの独自コンテンツとして、複数の施設を巡るルートを作成する。

例:

> **蔵前で酒造りを歩く。**

```text
蔵前駅
 ↓
蒸留所 A
 ↓ 徒歩
ブルワリー B
 ↓ 徒歩
バー C
```

ルートページには、

* 所要時間
* 距離
* 徒歩区間
* 各施設
* 周辺スポット
* 訪問記事

を掲載する。

---

# 11. 区別ページ

URL:

```text
/areas/taito/
/areas/koto/
/areas/chiyoda/
...
```

例:

> **台東区の醸造所・蒸留所｜ReBrew & ReDistill**

表示内容:

* 区の簡単な紹介
* 地図
* 施設一覧
* 酒類別集計
* 訪問記事
* 酒造りを歩くルート

23区すべてにページを生成可能な構造にする。

---

# 12. 酒類別ページ

URL:

```text
/types/beer/
/types/gin/
/types/sake/
/types/whisky/
```

例:

> **東京23区のクラフトジン蒸留所｜ReBrew & ReDistill**

表示内容:

* 施設一覧
* 地図
* 区別分布
* 訪問記事
* 関連商品

---

# 13. 地図

URL:

```text
/map/
```

東京23区の施設を地図上に表示する。

## 絞り込み

* 醸造所
* 蒸留所
* 酒類
* 区
* 訪問済み
* 見学可能

マーカーから施設詳細へ遷移できるようにする。

---

# 14. データモデル

## Maker

```typescript
type Maker = {
  id: string
  name: string

  category: "brewery" | "distillery"

  types: string[]

  ward: string
  area?: string

  address: string

  latitude?: number
  longitude?: number

  nearestStations?: string[]

  description?: string

  openingHours?: string
  closedDays?: string

  visitable?: boolean
  shop?: boolean
  bar?: boolean
  restaurant?: boolean
  onlineShop?: boolean

  website?: string

  sns?: {
    x?: string
    instagram?: string
    facebook?: string
  }

  products?: Product[]

  images?: Image[]

  articleIds?: string[]

  sourceUrls?: string[]

  createdAt: string
  updatedAt: string
}
```

---

# 15. Article

```typescript
type Article = {
  id: string

  title: string
  slug: string

  makerIds: string[]

  publishedAt: string
  visitedAt?: string

  excerpt: string

  tags: string[]

  content: string

  thumbnail?: string

  images?: Image[]

  updatedAt: string
}
```

---

# 16. データ管理

施設情報と記事本文を分離する。

```text
data/
├── makers/
│   ├── maker-001.json
│   ├── maker-002.json
│   └── ...
│
├── articles/
│   ├── article-001.mdx
│   ├── article-002.mdx
│   └── ...
│
├── areas.json
├── types.json
└── routes/
```

施設と記事はIDで関連付ける。

---

# 17. 技術構成

静的サイトとして構築する。

* Next.js
* TypeScript
* MDX
* JSON
* Static Generation
* Tailwind CSS

GitHub Pages / Cloudflare Pages等へのデプロイを想定。

サーバーサイドDBを必須としない。

---

# 18. SEO

SEOを重要要件とする。

## 施設

```text
東京リバーサイド蒸溜所｜台東区のクラフトジン蒸留所
```

## 区

```text
台東区の醸造所・蒸留所一覧｜東京23区
```

## 酒類

```text
東京23区のクラフトジン蒸留所一覧
```

## 訪問記事

```text
東京リバーサイド蒸溜所を訪ねてみた｜蔵前で酒造りを歩く
```

## 必須

* title
* description
* canonical
* OGP
* sitemap.xml
* robots.txt
* JSON-LD
* BreadcrumbList
* Article
* LocalBusiness等の適切な構造化データ
* 内部リンク
* 適切な見出し構造

---

# 19. 内部リンク設計

施設を中心にサイト全体をリンクする。

```text
区ページ
  ↓
施設ページ
  ↓
訪問記事
  ↓
酒類ページ
  ↓
関連施設
  ↓
ルート
```

記事から必ず対象施設へリンクする。

施設ページから関連する訪問記事へリンクする。

---

# 20. 独自情報

施設の公式情報を転載するだけのサイトにはしない。

以下を独自情報として蓄積する。

* 運営者による訪問
* 自分で撮影した写真
* 現地での観察
* 製造設備
* 製造工程
* インタビュー
* 訪問時の状況
* 周辺の街の様子
* 酒造りを歩いたルート

**「実際に行ったから分かる情報」をサイトの価値の中心にする。**

---

# 21. 情報源

施設情報には情報源を記録する。

```typescript
sourceUrls: string[]
```

優先順位:

1. 公式サイト
2. 公式SNS
3. 公的機関
4. 業界団体
5. 現地訪問
6. その他公開情報

営業時間・営業状況など変更される情報には更新日を記録する。

---

# 22. 写真

施設ごとに以下を掲載できるようにする。

* 外観
* 店舗
* 醸造設備
* 蒸留器
* タンク
* 樽
* 製品
* 飲食スペース
* 街・周辺風景

記事では写真を大きく使い、**「酒造りの現場を訪れた」感覚が伝わるデザイン**にする。

---

# 23. デザイン

## ブランドイメージ

**ReBrew & ReDistill**

という英語名を活かし、海外のクラフト酒メディアのような雰囲気を持たせつつ、東京の街歩きメディアとして成立するデザインにする。

### キーワード

* Craft
* Tokyo
* Walk
* Brewery
* Distillery
* Factory
* Street
* Photography

### 避けるもの

* 居酒屋風デザイン
* 酒通販サイト風デザイン
* 過度に和風なデザイン
* 派手な酒広告サイト風デザイン

### 重視するもの

* 写真
* 地図
* タイポグラフィ
* 余白
* 街歩き感
* 工場・設備のディテール

---

# 24. ブランド表記

サイト内では以下の表記を統一する。

```text
ReBrew & ReDistill
酒造りを歩く。
```

ヘッダー:

```text
ReBrew & ReDistill
```

ロゴ下:

```text
酒造りを歩く。
```

フッター:

```text
ReBrew & ReDistill
酒造りを歩く。

Tokyo, Japan
```

---

# 25. MVP

最初のリリースでは以下を実装する。

### 必須

* トップページ
* 醸造所・蒸留所一覧
* 施設詳細
* 訪問記事一覧
* 訪問記事詳細
* 区別ページ
* 酒類別ページ
* 地図
* 検索・絞り込み
* SEO
* JSON / MDXデータ管理
* レスポンシブ対応

### 後回し

* ユーザー登録
* コメント
* ユーザー投稿
* レビュー
* ランキング
* EC
* 会員機能

---

# 26. 将来的な拡張

## 銘柄データベース

```text
施設
 ↓
銘柄
 ↓
酒類
```

## イベント

```text
施設
 ↓
見学会
試飲会
イベント
```

## 営業状態

```text
営業中
休業
閉業
移転
```

## 訪問記録

```text
施設
 ↓
訪問
 ↓
記事
 ↓
写真
 ↓
インタビュー
```

---

# 27. サイトの最終的な価値

ReBrew & ReDistillは、単なる「東京の醸造所一覧」にはしない。

```text
東京23区
   ↓
酒造りを探す
   ↓
施設を知る
   ↓
実際に歩いて訪ねる
   ↓
酒造りを見る
   ↓
記事に記録する
   ↓
次の施設を探す
   ↓
また歩く
```

この循環そのものをサイトのコンセプトとする。

**ReBrew & ReDistill**

**酒造りを歩く。**
