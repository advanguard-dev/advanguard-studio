import { useState, useEffect, useRef, useCallback } from 'react'

export interface SearchItem {
  type: 'service' | 'formation'
  title: string
  slug: string
  tags: string[]
  description: string
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  const dp: number[] = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= n; j++) {
      const temp = dp[j]
      dp[j] = a[i - 1] === b[j - 1]
        ? prev
        : 1 + Math.min(prev, dp[j], dp[j - 1])
      prev = temp
    }
  }
  return dp[n]
}

function scoreItem(query: string, item: SearchItem): number {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return 0

  const fields = [
    item.title.toLowerCase(),
    item.description.toLowerCase(),
    item.tags.join(' ').toLowerCase(),
  ]

  let best = 0

  for (const field of fields) {
    if (field.includes(q)) {
      best = Math.max(best, 100 - field.indexOf(q) * 0.05)
      continue
    }

    if (q.length < 3) continue

    const qWords = q.split(/\s+/)
    const fWords = field.split(/[\s,]+/)

    for (const qw of qWords) {
      if (qw.length < 3) continue
      for (const fw of fWords) {
        if (fw.length < 2) continue
        const maxLen = Math.max(qw.length, fw.length)
        const dist = levenshtein(qw, fw)
        const sim = 1 - dist / maxLen
        if (sim > 0.55) best = Math.max(best, sim * 80)
      }
    }
  }

  return best
}

interface Props {
  items: SearchItem[]
}

const S = {
  trigger: {
    background: 'none',
    border: '1px solid rgba(255,255,255,.1)',
    color: '#A0A09A',
    padding: '5px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: '11px',
    letterSpacing: '0.05em',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'border-color 0.15s',
  } as React.CSSProperties,
  overlay: {
    position: 'fixed' as const,
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: '12vh',
  },
  modal: {
    background: '#181818',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '560px',
    margin: '0 16px',
    overflow: 'hidden',
    boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
  },
  input: {
    width: '100%',
    background: 'none',
    border: 'none',
    outline: 'none',
    color: '#EDECEA',
    fontSize: '18px',
    fontFamily: "'Space Grotesk', sans-serif",
    padding: '20px 20px',
    borderBottom: '1px solid rgba(255,255,255,.1)',
  },
  resultList: {
    maxHeight: '360px',
    overflowY: 'auto' as const,
  },
  resultItem: (active: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 20px',
    cursor: 'pointer',
    background: active ? 'rgba(191,254,46,.06)' : 'transparent',
    borderBottom: '1px solid rgba(255,255,255,.05)',
    transition: 'background 0.1s',
  }),
  badge: (type: string): React.CSSProperties => ({
    fontSize: '9px',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: type === 'service' ? '#BFFE2E' : '#D4FF7A',
    border: `1px solid ${type === 'service' ? '#BFFE2E' : '#D4FF7A'}`,
    borderRadius: '4px',
    padding: '2px 6px',
    flexShrink: 0,
  }),
  title: {
    color: '#EDECEA',
    fontSize: '14px',
    fontWeight: 500,
  } as React.CSSProperties,
  tags: {
    color: '#A0A09A',
    fontSize: '11px',
    fontFamily: "'JetBrains Mono', monospace",
    marginTop: '2px',
  } as React.CSSProperties,
  empty: {
    padding: '24px 20px',
    color: '#A0A09A',
    fontSize: '13px',
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '0.05em',
  } as React.CSSProperties,
  footer: {
    padding: '8px 20px',
    color: '#A0A09A',
    fontSize: '10px',
    fontFamily: "'JetBrains Mono', monospace',",
    letterSpacing: '0.05em',
    borderTop: '1px solid rgba(255,255,255,.06)',
    display: 'flex',
    gap: '16px',
  } as React.CSSProperties,
}

export default function Search({ items }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.length >= 2
    ? items
        .map((item) => ({ item, score: scoreItem(query, item) }))
        .filter(({ score }) => score > 20)
        .sort((a, b) => b.score - a.score)
        .slice(0, 6)
        .map(({ item }) => item)
    : []

  const open_ = useCallback(() => {
    setOpen(true)
    setQuery('')
    setActive(0)
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
  }, [])

  const navigate = useCallback((item: SearchItem) => {
    const url = `/${item.type === 'service' ? 'services' : 'formations'}/${item.slug}`
    window.location.href = url
    close()
  }, [close])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        open ? close() : open_()
      }
      if (!open) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      if (e.key === 'Enter' && results[active]) navigate(results[active])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, close, open_, navigate])

  useEffect(() => { setActive(0) }, [query])

  return (
    <>
      <button
        className="search-trigger"
        style={S.trigger}
        onClick={open_}
        aria-label="Rechercher"
        data-umami-event="search_open"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <span>Rechercher</span>
        <span style={{ opacity: 0.5, marginLeft: '4px' }}>⌘K</span>
      </button>

      {open && (
        <div style={S.overlay} onClick={close} role="dialog" aria-modal="true" aria-label="Recherche">
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              style={S.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Services, formations, compétences…"
              aria-label="Requête de recherche"
              spellCheck={false}
              autoComplete="off"
            />

            <div style={S.resultList} role="listbox">
              {query.length >= 2 && results.length === 0 && (
                <p style={S.empty}>Aucun résultat pour « {query} »</p>
              )}
              {results.map((item, i) => (
                <div
                  key={`${item.type}-${item.slug}`}
                  style={S.resultItem(i === active)}
                  onClick={() => navigate(item)}
                  onMouseEnter={() => setActive(i)}
                  role="option"
                  aria-selected={i === active}
                >
                  <span style={S.badge(item.type)}>
                    {item.type === 'service' ? 'Service' : 'Formation'}
                  </span>
                  <div>
                    <div style={S.title}>{item.title}</div>
                    {item.tags.length > 0 && (
                      <div style={S.tags}>{item.tags.slice(0, 4).join(' · ')}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={S.footer}>
              <span>↑↓ naviguer</span>
              <span>↵ ouvrir</span>
              <span>Esc fermer</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
