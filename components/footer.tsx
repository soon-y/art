'use client'

import Link from 'next/link'
import Github from './logo/github'
import Facebook from './logo/facebook'
import Instagram from './logo/instagram'
import LinkedIn from './logo/linkedIn'
import { Mail } from 'lucide-react'
import ArtLogo from './logo/art-logo'

export default function Header() {
  return (
    <>
      <footer className="web w-full bg-muted text-foreground py-8 border-t px-6 lg:px-20 xl:px-28">
        <div className="max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <ArtLogo/>
            <p className='py-4 text-sm text-muted-foreground'>Expanding Art <br/>with Augmented Reality <br/>for Everone.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Navigation</h3>
            <div className="text-sm text-muted-foreground">
              <Link href={'/'}><p className="hover:text-primary py-1">Guide</p></Link>
              <Link href={'/docent'}><p className="hover:text-primary py-1">Docent</p></Link>
              <Link href={'/'}><p className="hover:text-primary py-1">Support</p></Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <div className="text-sm text-muted-foreground">
              <Link href={'/'}><p className="hover:text-primary py-1">Newsroom</p></Link>
              <Link href={'/'}><p className="hover:text-primary py-1">Careers</p></Link>
              <Link href={'/'}><p className="hover:text-primary py-1">Partners</p></Link>
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
                <a href="https://www.linkedin.com/in/soonyoung-park/" target='_blank' className="hover:text-primary p-1"><LinkedIn /></a>
                <a href="https://www.facebook.com/" target='_blank' className="hover:text-primary p-1"><Facebook /></a>
                <a href="https://www.instagram.com/?hl=en" target='_blank' className="hover:text-primary p-1"><Instagram /></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-muted-foreground text-sm">
          <p className='py-2'>&copy; {new Date().getFullYear()} Soonyoung. All rights reserved.</p>
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
