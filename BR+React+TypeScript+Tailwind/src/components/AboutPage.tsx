import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import cksir from "/professor/ck_sir.jpg";
import sbsir from "/professor/sb_sir.jpg";
import pbsir from "/professor/pb_coFIC.jpg";
import Navbar from './Navbar.tsx';

const AboutPage = () => {

    return (
        <div className="w-full min-h-screen bg-[#FFFEF3]">
            {/* Navbar */}
            <Navbar />

            {/* About Content */}
            <div
                className="bg-gradient-to-r from-[#63d9fa] to-[#a8ffb1] pb-[7rem] pt-[6rem] px-10 flex flex-col justify-center overflow-hidden relative"
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <div
                    className="capitalize text-[2.25rem] font-bold text-[#134e4a]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    Our Aim ?
                </div>
                <div
                    className="w-10/12 pr-7 pt-4 pb-4 leading-[1.6] text-[#333]"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    Buffered Reader transcends the realm of a mere magazine, serving as a catalyst for intellectual curiosity and creativity within the CSE Society. We bridge the gap between theory and real-world application with insights into cutting-edge technological advancements. Our meticulously curated content ignites innovation, cultivates collaboration, and empowers readers with indispensable knowledge for both academic and professional triumphs. Ultimately, Buffered Reader cultivates a strong sense of community and champions lifelong learning in the ever-evolving world of Computer Science and Engineering.
                </div>
            </div>
            <div className="flex items-center justify-center w-full">
                <section className="w-full py-20 px-5 bg-[#f9fafb]">
                    <div className="max-w-[900px] mx-auto text-center">
                        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded-xl">
                            <img
                                alt="testimonial"
                                className="object-cover w-40 h-40 mb-5 bg-gray-100 border-2 border-gray-200 rounded-full shadow-md"
                                src={cksir}
                            />
                            <h2
                                className="mb-1 text-base font-semibold text-gray-900"
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                            >
                                Prof. Chiranjeev Kumar
                            </h2>
                            <p
                                className="mb-4 text-sm font-normal text-gray-500"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Head: Department Of Computer Science and Engineering
                            </p>

                            <span className="inline-block w-10 h-1 mx-auto my-5 bg-indigo-700 rounded" />

                            <p
                                className="mb-6 text-base leading-relaxed text-gray-800 profile-description"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                As the Head of the Computer Science and Engineering Department, I am
                                excited to introduce our CSE Society's digital platform, a vibrant
                                space where the intellectual and creative endeavors of our students
                                come together. This website, featuring the digital archives of{" "}
                                <i>Buffered Reader</i>, our department's magazine, represents our
                                dedication to nurturing a culture of innovation and
                                knowledge-sharing. By preserving and making accessible the wealth of
                                ideas captured in past editions, we aim to inspire our current and
                                future students to explore the frontiers of technology and
                                creativity. This platform will stand as both a celebration of our
                                achievements and a beacon for the limitless possibilities that lie
                                ahead.
                            </p>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="quote-icon w-5 h-5 text-[#9ca3af] mx-auto"
                                viewBox="0 0 975.036 975.036"
                            >
                                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                            </svg>
                        </div>
                    </div>
                </section>
            </div>

            <hr className="my-8 border-t border-gray-200" />
            <div className="flex items-center justify-center w-full">
                <section>
                    <div className="container">
                        <div className="text-center max-w-[900px] mx-auto">
                            <div className="flex justify-center gap-10 mb-6">
                                <div className="image-wrapper">
                                    <img
                                        src={sbsir}
                                        alt="Prof. Soumen Bag"
                                        className="object-cover w-40 h-40 mx-auto mb-2 rounded-full"
                                    />
                                    <h2
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        className="m-0 text-lg font-semibold"
                                    >
                                        Prof. Soumen Bag
                                    </h2>
                                </div>
                                <div className="image-wrapper">
                                    <img
                                        src={pbsir}
                                        alt="Dr. Pranav Bisht"
                                        className="object-cover w-40 h-40 mx-auto mb-2 rounded-full"
                                    />
                                    <h2
                                        style={{ fontFamily: 'Poppins, sans-serif' }}
                                        className="m-0 text-lg font-semibold"
                                    >
                                        Dr. Pranav Bisht
                                    </h2>
                                </div>
                            </div>

                            <p
                                className="mb-4 text-base font-normal text-gray-600 "
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                Faculty Incharge & Co-Faculty Incharge: Buffered Reader
                            </p>

                            <span className="block w-10 h-1 bg-[#63d9fa] rounded mx-auto my-8"></span>

                            <p
                                className="mb-6 text-base leading-relaxed text-gray-800"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                                As the faculty in charge and co-faculty in charge of Buffered Reader,
                                it brings us immense pride to witness the launch of our digital
                                platform, a project that embodies the spirit of collaboration and
                                innovation that defines our community. The Buffered Reader magazine
                                has always been a cornerstone of our society, showcasing the
                                creativity, technical prowess, and diverse perspectives of our
                                students. By transitioning to a digital format, we are not only
                                preserving this rich tradition but also expanding its reach, enabling
                                our content to inspire and engage a broader audience. This platform
                                will serve as a living archive of our students' journey through the
                                ever-evolving field of computer science, and we are confident that it
                                will continue to motivate and challenge our community to strive for
                                excellence.
                            </p>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-[#9ca3af] mx-auto mb-40"
                                viewBox="0 0 975.036 975.036"
                            >
                                <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                            </svg>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer
                className="py-6 text-center text-white bg-gray-800 "
                style={{ fontFamily: 'Inter, sans-serif' }}
            >
                <p>
                    CSE Society: IIT ISM
                    <br />
                    Dhanbad
                </p>
            </footer>
        </div>
    );
};

export default AboutPage;