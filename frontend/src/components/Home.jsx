import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Map from './Map';
import Story from './Story';
import CaptureLove from './CaptureLove';
import DownloadInvitation from './DownloadInvitation';
import Footer from './Footer';

import ScrollReveal from './ScrollReveal';

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
            <DownloadInvitation />
            <Footer />
        </div>
    );
};

export default Home;
