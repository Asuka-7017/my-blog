'use client'
import Link from 'next/link'
import { useState, useLayoutEffect, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import SearchForm from '@/components/searchform'
import styles from './style.module.scss'

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav>
      <div>
        <div
          className={
            styles.buttonContainer + ' ' + (isOpen ? styles.openMenu : '')
          }
          onClick={toggleMenu}
        >
          <span className={styles.meat + ' ' + styles.meat1} />
          <span className={styles.meat + ' ' + styles.meat2} />
          <span className={styles.meat + ' ' + styles.meat3} />
        </div>

        <div
          className={
            styles.menuContainer + ' ' + (isOpen ? styles.openMenu : '')
          }
        >
          <div className={styles.menuContents}>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-3xl underline hover:no-underline"
                >
                  Top
                </Link>
              </li>
              <li>
                <Link
                  href={'/category'}
                  className="text-3xl underline hover:no-underline"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  href={'/tag'}
                  className="text-3xl underline hover:no-underline"
                >
                  Tag
                </Link>
              </li>
              <li>
                <Suspense>
                  <SearchForm />
                </Suspense>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
