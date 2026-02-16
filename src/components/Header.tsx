import { memo } from 'react'
import Navigation from './Navigation'

const Header = memo(() => {
  return (
    <header className="sticky top-0 z-40 w-full">
      <Navigation />
    </header>
  )
})

Header.displayName = 'Header'

export default Header
