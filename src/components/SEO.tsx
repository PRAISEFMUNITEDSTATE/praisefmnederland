import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  url?: string
  image?: string
}

export default function SEO({
  title,
  description,
  url,
  image = 'https://praisefmnederland.vercel.app/icon-512.png'
}: SEOProps) {
  useEffect(() => {
    const currentUrl = url || window.location.href

    document.title = title

    const setNameMeta = (name: string, content: string) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', name)
        document.head.appendChild(tag)
      }

      tag.setAttribute('content', content)
    }

    const setPropertyMeta = (
      property: string,
      content: string
    ) => {
      let tag = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null

      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }

      tag.setAttribute('content', content)
    }

    // Description
    setNameMeta('description', description)

    // Canonical
    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null

    if (!canonicalTag) {
      canonicalTag = document.createElement('link')
      canonicalTag.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalTag)
    }

    canonicalTag.setAttribute('href', currentUrl)

    // Open Graph
    setPropertyMeta('og:title', title)
    setPropertyMeta('og:description', description)
    setPropertyMeta('og:type', 'website')
    setPropertyMeta('og:url', currentUrl)
    setPropertyMeta('og:image', image)
    setPropertyMeta('og:locale', 'nl_NL')

    // Twitter
    setNameMeta('twitter:card', 'summary_large_image')
    setNameMeta('twitter:title', title)
    setNameMeta('twitter:description', description)
    setNameMeta('twitter:url', currentUrl)
    setNameMeta('twitter:image', image)
  }, [title, description, url, image])

  return null
}