import React from 'react';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/sections/Hero';
import Map from '../components/sections/Map';
import Story from '../components/sections/Story';
import Transport from '../components/sections/Transport';
import CaptureLove from '../components/sections/CaptureLove';
import FAQ from '../components/sections/FAQ';
import DownloadInvitation from '../components/sections/DownloadInvitation';
import Footer from '../components/ui/Footer';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home = () => {
    return (
        <div className="app-container">
            <Navbar />
            <ScrollReveal>
                <Hero />
            </ScrollReveal>
            <ScrollReveal>
                <Map />
            </ScrollReveal>
            <ScrollReveal>
                <Story />
            </ScrollReveal>
            <ScrollReveal>
                <Transport />
            </ScrollReveal>
            <ScrollReveal>
                <FAQ />
            </ScrollReveal>
            <ScrollReveal>
                <CaptureLove />
            </ScrollReveal>
            <DownloadInvitation />
            <Footer />
        </div>
    );
};

export default Home;
