import React from 'react';
import Navbar from '../components/ui/Navbar';
import Hero from '../components/sections/Hero';
import Map from '../components/sections/Map';
import Story from '../components/sections/Story';
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
                <CaptureLove />
            </ScrollReveal>
            <ScrollReveal>
                <FAQ />
            </ScrollReveal>
            <DownloadInvitation />
            <Footer />
        </div>
    );
};

export default Home;
