import { expect, it, describe, vi } from 'vitest'
import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  getPostsByPage,
  POSTS_PER_PAGE,
} from './posts' // テスト対象

// 課題：テストデータのmock化

describe('getAllPosts', () => {
  it('全記事を取得し、日付の新しい順にソートすること', () => {
    const posts = getAllPosts()
    expect(posts).toHaveLength(10)
    // 日付順
    expect(posts[0].frontmatter.title).toBe(
      'はじめまして！ブログを作りました！'
    )
    expect(posts[1].frontmatter.title).toBe('当ブログで利用可能なMDXの記法')
    expect(posts[2].frontmatter.title).toBe('カテゴリー2')
  })
})

describe('getPostsBySlug', () => {
  it('特定の記事を取得できること', () => {
    const post = getPostBySlug('notes', 'hello')
    expect(post).not.toBeNull()
    expect(post?.frontmatter.title).toBe('はじめまして！ブログを作りました！')
  })
  it('存在しない場合はnullを返すこと', () => {
    const post = getPostBySlug('notes', 'notfound')
    expect(post).toBeNull()
  })
})

describe('getPostsByCategory', () => {
  it('指定したカテゴリーの記事のみ取得すること', () => {
    const techPosts = getPostsByCategory('tech')
    expect(techPosts).toHaveLength(1)
  })
})

describe('getPostsByTag', () => {
  it('指定したタグを含む記事のみ取得すること', () => {
    const nextjsPosts = getPostsByTag('Next.js')
    expect(nextjsPosts).toHaveLength(9)
  })
  it('存在しないタグの場合はから配列を返すこと', () => {
    const emptyPosts = getPostsByTag('Nothing')
    expect(emptyPosts).toHaveLength(0)
  })
})

describe('getPostsByPage', () => {
  it('1ページ目の記事を正しく取得すること', () => {
    const posts = getPostsByPage(1)
    expect(posts.length).toBeLessThanOrEqual(POSTS_PER_PAGE)
    if (POSTS_PER_PAGE >= 6) {
      expect(posts).toHaveLength(6)
    }
  })
})
