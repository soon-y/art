'use client'

import Link from 'next/link'
import Github from './logo/github'
import Facebook from './logo/facebook'
import Instagram from './logo/instagram'
import LinkedIn from './logo/linkedIn'
import { Mail } from 'lucide-react'

export default function Header() {
  return (
    <>
      <footer className="web w-full bg-muted text-foreground py-8 border-t px-6 lg:px-20 xl:px-28">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Navigation</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <Link href={'/'}><p className="hover:text-primary">Guide</p></Link>
              <Link href={'/docent'}><p className="hover:text-primary">Docent</p></Link>
              <Link href={'/'}><p className="hover:text-primary">Support</p></Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">art</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              <Link href={'/'}><p className="hover:text-primary">Newsroom</p></Link>
              <Link href={'/'}><p className="hover:text-primary">Careers</p></Link>
              <Link href={'/'}><p className="hover:text-primary">Partners</p></Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <div className="space-y-1 text-sm text-muted-foreground grid grid-rows gap-2">
              <div className='flex items-center gap-2'>
                <Mail size={18} /><span>info@art-plus.com</span>
              </div>
              <div className='flex items-center gap-2'>
                <a href="https://github.com/soon-y/art" target='_blank' className="hover:text-primary"><Github /></a>
                <a href="https://www.linkedin.com/in/soonyoung-park/" target='_blank' className="hover:text-primary"><LinkedIn /></a>
                <Facebook />
                <Instagram />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Soonyoung. All rights reserved.</p>
          <p>Privacy&nbsp;&nbsp;&#183;&nbsp;&nbsp;
            Terms&nbsp;&nbsp;&#183;&nbsp;&nbsp;
            Sitemap&nbsp;&nbsp;&#183;&nbsp;&nbsp;
            Company details&nbsp;&nbsp;&#183;&nbsp;&nbsp;
            Statement</p>
        </div>
      </footer>
    </>
  )
}
