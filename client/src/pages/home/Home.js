import React from 'react';
import '../../App.css';
import Cards from '../../components/cards/Cards';
import HeroSection from '../../components/heroSection/HeroSection';
import Footer from '../../components/footer/Footer';

function Home() {
  return (
    <>
      <HeroSection />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
