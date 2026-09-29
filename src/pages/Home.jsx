import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Promotions from "../components/Promotions";
import Locations from "../components/Locations";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";


function Home() {

    const [selectedCategory, setSelectedCategory] =
        useState("All");


    return (
        <>
            <Navbar />

            <Hero />

            <Categories
                setSelectedCategory={setSelectedCategory}
            />

            <Products
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <Promotions />

            <Locations />

            <About />

            <Contact />

            <Footer />
        </>
    );
}


export default Home;