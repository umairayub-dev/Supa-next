import Link from 'next/link';
import { MdHistory, MdSettings, MdBookmarks, MdInfoOutline } from 'react-icons/md';

export const Navbar = () => {
    return (
        <nav className='w-full dark:text-white dark:bg-gray-700 shadow'>
            <div className='flex h-14 items-center justify-between px-5'>
                <div className='flex gap-1'>
                    <button
                        className='cursor-pointer dark:stroke-white'
                        aria-label='Open settings'>
                        <MdSettings className='h-6 w-6' />
                    </button>
                    <button
                        className='cursor-pointer dark:stroke-white'
                        aria-label='Open Information'>
                        <MdInfoOutline className='h-6 w-6' />
                    </button>
                </div>
                <Link href='/' aria-label='Home'>
                    <p className='text-2xl font-bold dark:text-white'>سیدگنج</p>
                </Link>
                <div className="flex gap-1">
                    <Link href='/history' aria-label='History'>
                        <MdHistory className='h-6 w-6 cursor-pointer dark:stroke-white' />
                    </Link>
                    <Link href='/favorites' aria-label='Favorites'>
                        <MdBookmarks className='h-6 w-6 cursor-pointer dark:stroke-white' />
                    </Link>
                </div>
            </div>
        </nav>
    );
};