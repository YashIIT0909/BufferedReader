import { useState, useEffect } from 'react';
import Navbar from './Navbar.jsx';
import teamMembers from "../StaticData/peopleData.json";


const Teams = () => {
    const [activeSection, setActiveSection] = useState('admin');
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Make navbar sticky when scrolling down
            setIsSticky(window.scrollY > 115);

            // Detect which section is in view
            const sections = ['admin', 'writers', 'designers', 'developers'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetHeight = element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    // Function to capitalize the first letter of each word
    const capitalizeFirstLetter = (name: string) => {
        return name.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };




    return (
        <div className="w-full min-h-screen overflow-hidden bg-white">
            {/* Navbar - Same as HomePage */}
            <Navbar />

            {/* Team Header */}
            <div
                className="w-full pt-12 pb-12 bg-gradient-to-b from-[#FBEEC5] to-white text-center"
                style={{ marginTop: isSticky ? '118px' : '0' }}
            >
                <h1
                    className="text-[40px] font-normal tracking-[2.4px] mb-8"
                    style={{ fontFamily: "'Inria Serif', serif" }}
                >
                    OUR TEAM
                </h1>
                <div className="flex items-center justify-center p-2">
                    <div
                        className={`h-12 px-[4vw] border-r border-black text-black text-[20px] font-normal cursor-pointer transition-all duration-300 ${activeSection === 'admin' ? 'font-bold text-[#333]' : ''
                            } hover:bg-black/5`}
                        onClick={() => scrollToSection('admin')}
                    >
                        ADMIN
                    </div>
                    <div
                        className={`h-12 px-[4vw] border-r border-black text-black text-[20px] font-normal cursor-pointer transition-all duration-300 ${activeSection === 'writers' ? 'font-bold text-[#333]' : ''
                            } hover:bg-black/5`}
                        onClick={() => scrollToSection('writers')}
                    >
                        WRITERS
                    </div>
                    <div
                        className={`h-12 px-[4vw] border-r border-black text-black text-[20px] font-normal cursor-pointer transition-all duration-300 ${activeSection === 'designers' ? 'font-bold text-[#333]' : ''
                            } hover:bg-black/5`}
                        onClick={() => scrollToSection('designers')}
                    >
                        DESIGNERS
                    </div>
                    <div
                        className={`h-12 px-[4vw] text-black text-[20px] font-normal cursor-pointer transition-all duration-300 ${activeSection === 'developers' ? 'font-bold text-[#333]' : ''
                            } hover:bg-black/5`}
                        onClick={() => scrollToSection('developers')}
                    >
                        DEVELOPERS
                    </div>
                </div>
            </div>

            {/* Team Sections with Pink Backgrounds */}
            <div className="py-8">
                <section
                    id="admin"
                    className="mb-16 pt-8 flex flex-col items-center w-full bg-[#FFF5F9] py-8 relative box-border"
                    style={{
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                        marginRight: 'calc(-50vw + 50%)',
                    }}
                >
                    <div
                        className="px-8 py-2 rounded-[20px] mb-12 text-center inline-block"
                        style={{
                            background: 'linear-gradient(90deg, #FFD6EC 0%, #FFF2C4 100%)',
                        }}
                    >
                        <h2
                            className="text-[1.5rem] m-0 text-[#333] font-bold"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            ADMIN
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 w-full max-w-[1200px] mx-auto px-8">
                        {teamMembers.admin.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-[208px] mb-10"
                            >
                                <div className="w-[208px] h-[208px] rounded-lg overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-5">
                                    <img
                                        src={member.photo}
                                        alt={`${member.name} photo`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-[1.1rem] mb-1 text-center font-bold text-[#333]"
                                        style={{ fontFamily: 'Arial, sans-serif' }}
                                    >
                                        {capitalizeFirstLetter(member.name)}
                                    </h3>
                                    <div className="flex flex-row justify-center">
                                        <a href={member.linkedin} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[30px] h-[25px] mr-2.5" src="LI.png" />
                                        </a>
                                        <a href={member.email} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[25px] h-[25px]" src="Mail.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Repeat the above section for writers, designers, developers, just change the id, header, and data */}
                <section
                    id="writers"
                    className="mb-16 pt-8 flex flex-col items-center w-full bg-[#FFF5F9] py-8 relative box-border"
                    style={{
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                        marginRight: 'calc(-50vw + 50%)',
                    }}
                >
                    <div
                        className="px-8 py-2 rounded-[20px] mb-12 text-center inline-block"
                        style={{
                            background: 'linear-gradient(90deg, #FFD6EC 0%, #FFF2C4 100%)',
                        }}
                    >
                        <h2
                            className="text-[1.5rem] m-0 text-[#333] font-bold"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            WRITERS
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 w-full max-w-[1200px] mx-auto px-8">
                        {teamMembers.writers.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-[208px] mb-10"
                            >
                                <div className="w-[208px] h-[208px] rounded-lg overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-5">
                                    <img
                                        src={member.photo}
                                        alt={`${member.name} photo`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-[1.1rem] mb-1 text-center font-bold text-[#333]"
                                        style={{ fontFamily: 'Arial, sans-serif' }}
                                    >
                                        {capitalizeFirstLetter(member.name)}
                                    </h3>
                                    <div className="flex flex-row justify-center">
                                        <a href={member.linkedin} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[30px] h-[25px] mr-2.5" src="/LI.png" />
                                        </a>
                                        <a href={member.email} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[25px] h-[25px]" src="/Mail.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Designers */}
                <section
                    id="designers"
                    className="mb-16 pt-8 flex flex-col items-center w-full bg-[#FFF5F9] py-8 relative box-border"
                    style={{
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                        marginRight: 'calc(-50vw + 50%)',
                    }}
                >
                    <div
                        className="px-8 py-2 rounded-[20px] mb-12 text-center inline-block"
                        style={{
                            background: 'linear-gradient(90deg, #FFD6EC 0%, #FFF2C4 100%)',
                        }}
                    >
                        <h2
                            className="text-[1.5rem] m-0 text-[#333] font-bold"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            DESIGNERS
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 w-full max-w-[1200px] mx-auto px-8">
                        {teamMembers.designers.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-[208px] mb-10"
                            >
                                <div className="w-[208px] h-[208px] rounded-lg overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-5">
                                    <img
                                        src={member.photo}
                                        alt={`${member.name} photo`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-[1.1rem] mb-1 text-center font-bold text-[#333]"
                                        style={{ fontFamily: 'Arial, sans-serif' }}
                                    >
                                        {capitalizeFirstLetter(member.name)}
                                    </h3>
                                    <div className="flex flex-row justify-center">
                                        <a href={member.linkedin} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[30px] h-[25px] mr-2.5" src="LI.png" />
                                        </a>
                                        <a href={member.email} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[25px] h-[25px]" src="Mail.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Developers */}
                <section
                    id="developers"
                    className="mb-16 pt-8 flex flex-col items-center w-full bg-[#FFF5F9] py-8 relative box-border"
                    style={{
                        width: '100vw',
                        marginLeft: 'calc(-50vw + 50%)',
                        marginRight: 'calc(-50vw + 50%)',
                    }}
                >
                    <div
                        className="px-8 py-2 rounded-[20px] mb-12 text-center inline-block"
                        style={{
                            background: 'linear-gradient(90deg, #FFD6EC 0%, #FFF2C4 100%)',
                        }}
                    >
                        <h2
                            className="text-[1.5rem] m-0 text-[#333] font-bold"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                        >
                            DEVELOPERS
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-16 w-full max-w-[1200px] mx-auto px-8">
                        {teamMembers.developers.map((member, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-[208px] mb-10"
                            >
                                <div className="w-[208px] h-[208px] rounded-lg overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.1)] mb-5">
                                    <img
                                        src={member.photo}
                                        alt={`${member.name} photo`}
                                        className="object-cover w-full h-full rounded-lg"
                                    />
                                </div>
                                <div className="mt-2 text-center">
                                    <h3
                                        className="text-[1.1rem] mb-1 text-center font-bold text-[#333]"
                                        style={{ fontFamily: 'Arial, sans-serif' }}
                                    >
                                        {capitalizeFirstLetter(member.name)}
                                    </h3>
                                    <div className="flex flex-row justify-center">
                                        <a href={member.linkedin} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[30px] h-[25px] mr-2.5" src="LI.png" />
                                        </a>
                                        <a href={member.email} className="block text-[#0077b5] no-underline font-normal text-center text-[0.9rem]" style={{ fontFamily: "'Inter', sans-serif" }}>
                                            <img className="w-[25px] h-[25px]" src="Mail.png" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-[#333] text-white text-center py-6">
                <p>
                    CSE Society: IIT ISM
                    <br /> Dhanbad
                </p>
            </footer>
        </div>
    );

};

export default Teams;
