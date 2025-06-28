import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage1 from '/cse.png';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900);
            if (window.innerWidth > 900) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 115);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={`relative w-full h-[118px] flex items-center z-1000 px-[50px] bg-[#FFFEF3] 
                max-[900px]:flex-col max-[900px]:items-start max-[900px]:px-[20px] max-[900px]:h-auto max-[900px]: justify-between
        ${isSticky ? ' fixed top-0 left-0 shadow-[0_2px_10px_rgba(0,0,0,0.1)]' : ''}`}>
            <div className=" w-[123px] h-[59px]">
                <a href="https://cses.iitism.ac.in/" target="_blank" rel="noopener noreferrer">
                    <img src={logoImage1} alt="CSE Logo" className='w-full h-full object-contain' />
                </a>
            </div>

            {/* Desktop Navigation */}
            <div className="flex justify-between items-center w-full ml-[40px] max-[900px]:flex-col max-[900px]:ml-[0px] max-[900px]:mt-[10px] max-[900px]:hidden">
                <div className="flex justify-between items-center w-[190px] max-[900px]:hidden mb-[10px] max-[930px]:w-[150px]">
                    <Link to="/" className="text-black text-[20px] font-inter font-normal leading-[39px] no-underline relative active" style={{ fontFamily: 'Inter' }} onClick={closeMenu}>
                        Home
                        <div className="active-indicator"></div>
                    </Link>
                    <Link to="/teams" className="text-black text-[20px] font-inter font-normal leading-[39px] no-underline relative" style={{ fontFamily: 'Inter' }} onClick={closeMenu}>Teams</Link>
                </div>
                <div className="flex gap-[14px] max-[900px]: mb-[10px] max-[900px]:hidden">
                    <Link to="/bytestreams" className=" no-underline relative text-[#666262] text-[20px] font-inria font-normal leading-[39px] tracking-[0.8px] px-[12px] py-[10px] rounded-[8px] bg-[#D5FDFF]" style={{ fontFamily: 'Inria Serif' }} onClick={closeMenu}>
                        Bytestreams
                    </Link>
                    <Link to="/buffered-readers" className="no-underline relative text-[#666262] text-[20px] font-inriaserif font-normal leading-[39px] tracking-[0.8px] px-[12px] py-[10px] rounded-[8px] bg-[#FFFAC3]" style={{ fontFamily: 'Inria Serif' }} onClick={closeMenu}>
                        Buffered Readers
                    </Link>

                </div>
                <div className="mr-[50px] max-[900px]:mr-[0px] max-[900px]:hidden">
                    <Link to="/about" className="text-black text-[20px] font-inter font-normal leading-[39px] no-underline relative-link" style={{ fontFamily: 'Inter' }} onClick={closeMenu}>About Us</Link>
                </div>
            </div>

            {/* Hamburger Icon */}

            <div
                className="
                  hidden
                  max-[900px]:flex max-[900px]:flex-col max-[900px]:justify-between
                  max-[900px]:absolute max-[900px]:right-[20px] max-[900px]:top-[20px]
                  max-[900px]:w-[30px] max-[900px]:h-[24px] max-[900px]:cursor-pointer
                  max-[900px]:z-[1000]
                "
                onClick={toggleMenu}
                aria-label="Menu"
            >
                <span
                    className={`
                    max-[900px]:w-full max-[900px]:h-[3px] max-[900px]:bg-[#333] max-[900px]:rounded max-[900px]:transition-all max-[900px]:duration-300
                    ${isMenuOpen ? 'max-[900px]:translate-y-[10px] max-[900px]:rotate-45' : ''}
                  `}
                ></span>
                <span
                    className={`
                    max-[900px]:w-full max-[900px]:h-[3px] max-[900px]:bg-[#333] max-[900px]:rounded max-[900px]:transition-all max-[900px]:duration-300
                    ${isMenuOpen ? 'max-[900px]:opacity-0' : ''}
                  `}
                ></span>
                <span
                    className={`
                    max-[900px]:w-full max-[900px]:h-[3px] max-[900px]:bg-[#333] max-[900px]:rounded max-[900px]:transition-all max-[900px]:duration-300
                    ${isMenuOpen ? 'max-[900px]:-translate-y-[10px] max-[900px]:-rotate-45' : ''}
                  `}
                ></span>
            </div>


            {/* Dropdown Menu */}

            <div
                className={`
                    hidden
    max-[900px]:block
                  max-[900px]:absolute max-[900px]:top-[70px] max-[900px]:left-0 max-[900px]:right-0
                  max-[900px]:w-full max-[900px]:max-h-[400px] max-[900px]:overflow-y-auto
                  max-[900px]:bg-white max-[900px]:shadow-[0_8px_16px_rgba(0,0,0,0.1)]
                  max-[900px]:z-[999] max-[900px]:transition-all max-[900px]:duration-300
                  max-[900px]:transform max-[900px]:-translate-y-[20px] max-[900px]:opacity-0 max-[900px]:invisible
                  ${isMenuOpen ? 'max-[900px]:translate-y-0 max-[900px]:opacity-100 max-[900px]:visible' : ''}
                `}
            >
                <div className=" hidden max-[900px]:flex max-[900px]:flex-col max-[900px]:w-full max-[900px]:py-[10px]">
                    <Link to="/" className="max-[900px]:text-[#333] max-[900px]:text-[16px] max-[900px]:no-underline max-[900px]:px-[20px] max-[900px]:py-[12px] max-[900px]:block max-[900px]:text-left max-[900px]:transition-colors max-[900px]:duration-200 hover:max-[900px]:bg-[#f5f5f5]" onClick={closeMenu}>Home</Link>
                    <Link to="/teams" className="max-[900px]:text-[#333] max-[900px]:text-[16px] max-[900px]:no-underline max-[900px]:px-[20px] max-[900px]:py-[12px] max-[900px]:block max-[900px]:text-left max-[900px]:transition-colors max-[900px]:duration-200 hover:max-[900px]:bg-[#f5f5f5]" onClick={closeMenu}>Teams</Link>
                    <Link to="/bytestreams" className="max-[900px]:text-[#4CAF50] max-[900px]:font-bold max-[900px]:text-[16px] max-[900px]:no-underline max-[900px]:px-[20px] max-[900px]:py-[12px] max-[900px]:block max-[900px]:text-left max-[900px]:transition-colors max-[900px]:duration-200 hover:max-[900px]:bg-[#f5f5f5]" onClick={closeMenu}>Bytestreams</Link>
                    <Link to="/buffered-readers" className="max-[900px]:text-[#4CAF50] max-[900px]:font-bold max-[900px]:text-[16px] max-[900px]:no-underline max-[900px]:px-[20px] max-[900px]:py-[12px] max-[900px]:block max-[900px]:text-left max-[900px]:transition-colors max-[900px]:duration-200 hover:max-[900px]:bg-[#f5f5f5]" onClick={closeMenu}>Buffered Readers</Link>
                    <Link to="/about" className="max-[900px]:text-[#333] max-[900px]:text-[16px] max-[900px]:no-underline max-[900px]:px-[20px] max-[900px]:py-[12px] max-[900px]:block max-[900px]:text-left max-[900px]:transition-colors max-[900px]:duration-200 hover:max-[900px]:bg-[#f5f5f5]" onClick={closeMenu}>About Us</Link>
                </div>
            </div>


        </nav>
    );

}

export default Navbar;
